from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse

import modal
import json

web_app = FastAPI()
stub = modal.Stub("zoom")

web_image = modal.Image.debian_slim()

cache = []


def score_func():
    num = 100
    num *= 100
    num /= 100
    num *= 100
    return num


@web_app.post("/clear")
async def foo(request: Request):
    cache.clear()


@web_app.get("/cur_score")
async def cur_score():
    return score_func()


@web_app.get("/get_score")
async def get_score():
    return json.dumps(cache)


@web_app.post("/post_score")
async def post_score(request: Request):
    body = await request.json()
    cache.append([body['x'], body['y'], body['z']])


@web_app.get("/")
async def bar(arg="world"):
    return HTMLResponse(f"<h1>Hello Fast {arg}!</h1>")


@stub.asgi(image=web_image)
def fastapi_app():
    return web_app
