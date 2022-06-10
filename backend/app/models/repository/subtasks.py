from app.models.domain.subtasks import Subtask
from app.models.schemas import subtasks as subtask_schema
from sqlalchemy.orm import Session


def get_task_subtasks(db: Session, task_id: int, offset: int = 0, limit: int = 25):
    return db.query(Subtask).filter(Subtask.task_id == task_id).offset(offset).limit(limit).all()


def create_task(db: Session, subtaskk: subtask_schema.SubtaskCreate, task_id: int):
    db_item = Subtask(**subtaskk.dict(), task_id=task_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
