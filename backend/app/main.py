from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .api.analyses import router as analyses_router
from .config import get_settings
from .observability import configure_logging, request_logging_middleware



configure_logging()
settings = get_settings()
app = FastAPI(title="PromptLab API", version="0.1.0")
app.middleware("http")(request_logging_middleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(analyses_router)


@app.exception_handler(Exception)
async def unhandled_exception_handler(_: Request, exc: Exception) -> JSONResponse:
    return JSONResponse(
        status_code=500,
        content={
            "error": {
                "code": "INTERNAL_ERROR",
                "message": "An unexpected server error occurred.",
            }
        },
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(_: Request, exc: HTTPException) -> JSONResponse:
    detail = exc.detail if isinstance(exc.detail, dict) else {
        "code": "HTTP_ERROR",
        "message": str(exc.detail),
    }
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": {"code": detail.get("code", "HTTP_ERROR"), "message": detail.get("message", "Request failed")}},
    )


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "PromptLab API"}


@app.get("/api/v1/health")
def legacy_health() -> dict[str, str]:
    return {"status": "ok", "service": "PromptLab API"}
