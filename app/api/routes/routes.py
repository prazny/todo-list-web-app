from fastapi import APIRouter
from app.api.routes.account import projects, subtasks, tasks

router = APIRouter(prefix="/api")
router.include_router(boards.router, tags=['projects'], prefix="/account/projects")
router.include_router(taska.router, tags=['tasks'], prefix="/account/tasks")
router.include_router(subtasks.router, tags=['subtasks'], prefix="/account/subtasks")