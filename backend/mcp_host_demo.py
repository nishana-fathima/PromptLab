"""Minimal AI-host style client demonstrating PromptLab MCP discovery.

Run from the backend directory after installing requirements. This client is
intentionally model-free: an AI host would use the returned tool descriptions
and results as context for its own model conversation.
"""

import asyncio

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client


async def main() -> None:
    server = StdioServerParameters(
        command=".venv/bin/python",
        args=["-m", "app.mcp_server"],
    )
    async with stdio_client(server) as (read_stream, write_stream):
        async with ClientSession(read_stream, write_stream) as session:
            await session.initialize()
            tools = await session.list_tools()
            print("Discovered tools:", ", ".join(tool.name for tool in tools.tools))
            rubric = await session.call_tool("get_rubric", {})
            print("Rubric response:", rubric.content[0].text)


if __name__ == "__main__":
    asyncio.run(main())
