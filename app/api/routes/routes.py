from fastapi import APIRouter
from app.api.routes.account import boards

router = APIRouter(prefix="/api")
router.include_router(boards.router, tags=['boards'], prefix="/account/boards")