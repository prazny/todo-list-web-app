from fastapi import APIRouter
from app.api.routes.account import projects, subtasks, tasks, users
from app.api.routes import oauth

from app.api.routes import me

router = APIRouter(prefix="/api")
router.include_router(oauth.router, tags=['oauth'], prefix="/oauth")
router.include_router(me.router, tags=['me'], prefix="/me")
router.include_router(projects.router, tags=['projects'], prefix="/account/projects")
router.include_router(tasks.router, tags=['tasks'], prefix="/account/tasks")
router.include_router(subtasks.router, tags=['subtasks'], prefix="/account/subtasks")
