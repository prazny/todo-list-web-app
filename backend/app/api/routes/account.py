from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.domain.users import User
from app.models.schemas import projects as project_schema
from app.models.repository import projects as project_repo
from app.models.schemas import tasks as task_schema
import app.models.repository.tasks as task_repo
from app.models.schemas import subtasks as subtask_schema
from app.models.repository import subtasks as subtask_repo
from app.services.jwt import get_current_user
from app.models.repository import users as crud_users
from app.models.schemas import users as schema_users

from app.models.domain.projects import Project

router = APIRouter()


@router.get("", tags=['account'])
def get_current_user_r(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return current_user


@router.put("", response_model=schema_users.User, tags=['account'])
def update_user(user: schema_users.UserUpdate, current_user: User = Depends(get_current_user),
                db: Session = Depends(get_db)):
    return crud_users.update_user(db, current_user.id, user)


@router.get("/projects", response_model=list[project_schema.Project], tags=['project'])
def get_user_projects(offset: int = 0, limit: int = 25, current_user: User = Depends(get_current_user),
                      db: Session = Depends(get_db)):
    return project_repo.get_user_projects(db, current_user.id, offset, limit)


@router.post("/projects", response_model=project_schema.Project, tags=['project'])
def create_project(project: project_schema.ProjectCreate, current_user: User = Depends(get_current_user),
                   db: Session = Depends(get_db)):
    return project_repo.create_project(db, project, current_user.id)


@router.get("/projects/{project_id}", response_model=project_schema.Project, tags=['project'])
def get_project(project_id: int, current_user: User = Depends(get_current_user),
                     db: Session = Depends(get_db)):
    project = project_repo.get_user_project(db, current_user.id, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project doesn't exist.")
    return project


@router.put("/projects/{project_id}", response_model=project_schema.Project, tags=['project'])
def get_project(project: project_schema.ProjectUpdate, project_id: int, current_user: User = Depends(get_current_user),
                     db: Session = Depends(get_db)):
    project = project_repo.get_user_project(db, current_user.id, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project doesn't exist.")
    return project_repo.update_project(db, project_id, project)


@router.delete("/projects/{project_id}", tags=['project'])
def delete_project(project_id: int, current_user: User = Depends(get_current_user),
                     db: Session = Depends(get_db)):
    project = project_repo.get_user_project(db, current_user.id, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project doesn't exist.")
    return project_repo.delete_project(db, project_id)


@router.get("/tasks/{task_id}", response_model=task_schema.Task, tags=['task'])
def get_task(task_id: int, current_user: User = Depends(get_current_user),
             db: Session = Depends(get_db)):
    task = task_repo.get_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task doesn't exist.")
    project = project_repo.get_user_project(db, current_user.id, task.project_id)
    if not task or project.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Task doesn't exist.")

    return task


@router.delete("/tasks/{task_id}", response_model=task_schema.Task, tags=['task'])
def delete_task(task_id: int, current_user: User = Depends(get_current_user),
             db: Session = Depends(get_db)):
    task = task_repo.get_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task doesn't exist.")
    project = project_repo.get_user_project(db, current_user.id, task.project_id)
    if not task or project.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Task doesn't exist.")

    return task_repo.delete_task(db, task_id)


@router.post("/tasks", response_model=task_schema.Task, tags=['task'])
def create_task(task: task_schema.TaskCreate, project_id: int,
                current_user: User = Depends(get_current_user),
                db: Session = Depends(get_db)):
    project = project_repo.get_user_project(db, current_user.id, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project doesn't exist.")

    return task_repo.create_task(db, task, project_id)


@router.post("/subtasks", response_model=subtask_schema.Subtask, tags=['subtask'])
def create_subtask(subtask: subtask_schema.SubtaskCreate, task_id: int,
                   current_user: User = Depends(get_current_user),
                   db: Session = Depends(get_db)):
    task = task_repo.get_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task doesn't exist.")
    project = project_repo.get_user_project(db, current_user.id, task.project_id)
    if not project or project.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Task doesn't exist.")

    return subtask_repo.create_subtask(db, subtask, task_id)


@router.delete("/subtasks/{subtask_id}", tags=['subtask'])
def delete_subtask(subtask_id: int, current_user: User = Depends(get_current_user),
                   db: Session = Depends(get_db)):
    subtask = subtask_repo.get_subtask(db, subtask_id)
    if not subtask:
        raise HTTPException(status_code=404, detail="Subtask doesn't exist.")

    task = task_repo.get_task(db, subtask.task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Subtask doesn't exist.")

    project = project_repo.get_user_project(db, current_user.id, task.project_id)
    if not project or project.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Subtask doesn't exist.")

    return subtask_repo.delete_subtask(db, subtask_id)


@router.put("/subtasks/{subtask_id}", response_model=subtask_schema.Subtask, tags=['subtask'])
def update_subtask(subtask_id: int, subtask: subtask_schema.SubtaskUpdate,
                   current_user: User = Depends(get_current_user),
                   db: Session = Depends(get_db)):
    subtask = subtask_repo.get_subtask(db, subtask_id)
    if not subtask:
        raise HTTPException(status_code=404, detail="Subtask doesn't exist.")

    task = task_repo.get_task(db, subtask.task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Subtask doesn't exist.")

    project = project_repo.get_user_project(db, current_user.id, task.project_id)
    if not project or project.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Subtask doesn't exist.")

    return subtask_repo.update_subtask(db, subtask_id, subtask)
