from dotenv import load_dotenv
from fastapi import FastAPI
from app.api.routes import routes

from app.db.database import SessionLocal
from fastapi.middleware.cors import CORSMiddleware


def get_app() -> FastAPI:
    application = FastAPI()

    application.add_middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    application.include_router(routes.router)
    return application


app = get_app()
