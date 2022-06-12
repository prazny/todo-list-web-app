from app.models.domain.projects import Project
from app.models.schemas import projects as project_schema
from sqlalchemy.orm import Session


def get_user_projects(db: Session, user_id: int, offset: int = 0, limit: int = 25):
    return db.query(Project).filter(Project.owner_id == user_id).offset(offset).limit(limit).all()


def get_user_project(db: Session, user_id: int, project_id: int):
    return db.query(Project).filter(Project.owner_id == user_id).filter(Project.id == project_id).first()


def delete_project(db: Session, project_id):
    db.query(Project).filter(Project.id == project_id).delete()
    db.commit()
    return True


def update_project(db: Session, project_id, project: project_schema.ProjectUpdate):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    db_project.name = project.name
    db_project.description = project.description
    db_project.color = project.color
    db.commit()
    return True


def create_project(db: Session, project: project_schema.ProjectCreate, user_id: int):
    db_item = Project(**project.dict(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
