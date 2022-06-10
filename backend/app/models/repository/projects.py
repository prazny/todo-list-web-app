from app.models.domain.projects import Project
from app.models.schemas import projects as project_schema
from sqlalchemy.orm import Session


def get_user_projects(db: Session, user_id: int, offset: int = 0, limit: int = 25):
    return db.query(Project).filter(Project.owner_id == user_id).offset(offset).limit(limit).all()


def create_project(db: Session, project: project_schema.ProjectCreate, user_id: int):
    db_item = Project(**project.dict(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
