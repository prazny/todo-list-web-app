from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.schemas import boards as schema_board
import app.models.domain.boards as boards


router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("", response_model=list[schema_board.Board])
def get_boards(offset: int = 0, limit: int = 25, db: Session = Depends(get_db)):
    return db.query(boards.Board).offset(offset).limit(limit).all()

@router.post("", response_model=schema_board.Board)
def create_board(board: schema_board.BoardCreate, db: Session = Depends(get_db)):
    db_boards = db.query(boards.Board).filter(boards.Board.name == board.name).first()
    if(db_boards):
        raise HTTPException(status_code=400, detail="Name already exists.")
    db_item = boards.Board(**board.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item