from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse

import modal

web_app = FastAPI()
stub = modal.Stub("zoom")

web_image = modal.Image.debian_slim()


@web_app.post("/foo")
async def foo(request: Request):
    body = await request.json()
    return body


@web_app.get("/")
async def bar(arg="world"):
    return HTMLResponse(f"<h1>Hello Fast {arg}!</h1>")


@stub.asgi(image=web_image)
def fastapi_app():
    return web_app


stub.run()
