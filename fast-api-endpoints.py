from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def home_page():
    return "Hi"
