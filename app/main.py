from dotenv import load_dotenv
from fastapi import FastAPI
from app.api.routes import routes

from app.db.database import SessionLocal

load_dotenv('.env')


def get_app() -> FastAPI:
    application = FastAPI()

    application.include_router(routes.router)
    return application


app = get_app()
