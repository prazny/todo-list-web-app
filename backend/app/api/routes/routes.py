from fastapi import APIRouter
from app.api.routes.account import projects, subtasks, tasks, users

router = APIRouter(prefix="/api")
router.include_router(subtasks.router, tags=['users'], prefix="/users")
router.include_router(projects.router, tags=['projects'], prefix="/account/projects")
router.include_router(tasks.router, tags=['tasks'], prefix="/account/tasks")
router.include_router(subtasks.router, tags=['subtasks'], prefix="/account/subtasks")
