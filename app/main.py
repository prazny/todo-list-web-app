from fastapi import FastAPI
from app.api.routes import  routes


def get_app() -> FastAPI:
    application = FastAPI()
    application.include_router(routes.router)
    return application


app = get_app()
