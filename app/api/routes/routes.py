from fastapi import APIRouter
from . import boards


router = APIRouter()
router.include_router(boards.router, tags=['boards'], prefix="/boards")