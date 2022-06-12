from app.models.domain.tasks import Task
from app.models.schemas import tasks as task_schema
from sqlalchemy.orm import Session


def get_task(db: Session, task_id: int):
    return db.query(Task).filter(Task.id == task_id).first()


def delete_task(db: Session, task_id: int):
    db.query(Task).filter(Task.id == task_id).delete()
    db.commit()
    return True


def create_task(db: Session, task: task_schema.TaskCreate, project_id: int):
    db_item = Task(**task.dict(), project_id=project_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
