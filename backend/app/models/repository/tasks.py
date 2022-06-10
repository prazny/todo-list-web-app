from app.models.domain.tasks import Task
from app.models.schemas import tasks as task_schema
from sqlalchemy.orm import Session


def get_project_tasks(db: Session, project_id: int, offset: int = 0, limit: int = 25):
    return db.query(Task).filter(Task.project_id == project_id).offset(offset).limit(limit).all()


def create_task(db: Session, task: task_schema.TaskCreate, project_id: int):
    db_item = Task(**task.dict(), project_id=project_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
