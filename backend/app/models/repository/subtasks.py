from app.models.domain.subtasks import Subtask
from app.models.schemas import subtasks as subtask_schema
from sqlalchemy.orm import Session


def get_task_subtasks(db: Session, task_id: int, offset: int = 0, limit: int = 25):
    return db.query(Subtask).filter(Subtask.task_id == task_id).offset(offset).limit(limit).all()


def get_project_task(db: Session, task_id: int, subtask_id: int):
    return db.query(Subtask).filter(Subtask.task_id == task_id).filter(Subtask.id == subtask_id).first()


def get_subtask(db: Session, subtask_id: int):
    return db.query(Subtask).filter(Subtask.id == subtask_id).first()


def create_subtask(db: Session, subtask: subtask_schema.SubtaskCreate, task_id: int):
    db_item = Subtask(**subtask.dict(), task_id=task_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def change_task(db: Session, subtask_id, task_id: int):
    db_item = db.query(Subtask).filter(Subtask.id == subtask_id).first()
    db_item.task_id = task_id
    db.commit()
    db.refresh(db_item)
    return db_item


def change_status_subtask(db: Session, subtask: subtask_schema.SubtaskChangeStatus, subtask_id: int):
    db_item = db.query(Subtask).filter(Subtask.id == subtask_id).first()
    db_item.status = subtask.status
    db.commit()
    db.refresh(db_item)
    return db_item


def delete_subtask(db: Session, subtask_id):
    db.query(Subtask).filter(Subtask.id == subtask_id).delete()
    db.commit()
    return True


def update_subtask(db: Session, subtask_id: int, subtask: subtask_schema.SubtaskUpdate, task_id: int):
    db_item = db.query(Subtask).filter(Subtask.id == subtask_id).update(subtask)
    db.commit()
    return db_item
