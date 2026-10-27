import json
import logging
import re
import time
from collections.abc import Awaitable, Callable
from uuid import uuid4

from fastapi import Request, Response

logger = logging.getLogger("promptlab.api")
REQUEST_ID_PATTERN = re.compile(r"^[A-Za-z0-9._-]{1,100}$")


def configure_logging() -> None:
    if not logging.getLogger().handlers:
        logging.basicConfig(level=logging.INFO, format="%(message)s")


def request_id_from(request: Request) -> str:
    candidate = request.headers.get("X-Request-ID", "")
    return candidate if REQUEST_ID_PATTERN.fullmatch(candidate) else str(uuid4())


def log_event(level: int, event: str, **fields: object) -> None:
    logger.log(level, json.dumps({"event": event, **fields}, separators=(",", ":")))


async def request_logging_middleware(
    request: Request,
    call_next: Callable[[Request], Awaitable[Response]],
) -> Response:
    request_id = request_id_from(request)
    started = time.perf_counter()
    try:
        response = await call_next(request)
    except Exception:
        duration_ms = round((time.perf_counter() - started) * 1000, 2)
        log_event(
            logging.ERROR,
            "request_failed",
            request_id=request_id,
            method=request.method,
            path=request.url.path,
            status=500,
            duration_ms=duration_ms,
            error_category="unhandled_exception",
        )
        raise

    duration_ms = round((time.perf_counter() - started) * 1000, 2)
    status = response.status_code
    error_category = "none" if status < 400 else "client_error" if status < 500 else "server_error"
    log_event(
        logging.WARNING if status >= 400 else logging.INFO,
        "request_completed",
        request_id=request_id,
        method=request.method,
        path=request.url.path,
        status=status,
        duration_ms=duration_ms,
        error_category=error_category,
    )
    response.headers["X-Request-ID"] = request_id
    return response
