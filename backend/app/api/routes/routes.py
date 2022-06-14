from fastapi import APIRouter, Depends
# from app.api.routes.account import projects, subtasks, tasks, users
from app.api.routes import auth, account
from fastapi.responses import RedirectResponse

# from app.api.routes import me
from app.services.jwt import get_current_user

router = APIRouter()


@router.get("/", include_in_schema=False)
@router.get("/api", include_in_schema=False)
def get_docs():
    return RedirectResponse("/docs")


router.include_router(auth.router, tags=['auth'], prefix="/api/auth")
router.include_router(
    account.router,
    prefix="/api/account",
    dependencies=[Depends(get_current_user)]
)

# router.include_router(me.router, tags=['me'], prefix="/me")

# router.include_router(projects.router, tags=['projects'], prefix="/account/projects")
# router.include_router(tasks.router, tags=['tasks'], prefix="/account/tasks")
# router.include_router(subtasks.router, tags=['subtasks'], prefix="/account/subtasks")
