from fastapi import FastAPI


def get_app() -> FastAPI:
    application = FastAPI()
    return application


app = get_app()
