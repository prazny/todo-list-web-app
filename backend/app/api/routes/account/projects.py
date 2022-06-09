from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.db.database import SessionLocal, get_db
from app.models.schemas import projects as schema_boards
import app.models.domain.projects as boards

router = APIRouter()


@router.get("", response_model=list[schema_boards.Project])
def get_boards(offset: int = 0, limit: int = 25, db: Session = Depends(get_db)):
    return db.query(boards.Project).offset(offset).limit(limit).all()


@router.post("", response_model=schema_boards.Project)
def create_board(board: schema_boards.ProjectCreate, db: Session = Depends(get_db)):
    db_boards = db.query(boards.Project).filter(boards.Project.name == board.name).first()
    if (db_boards):
        raise HTTPException(status_code=400, detail="Name already exists.")
    db_item = boards.Project(**board.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
