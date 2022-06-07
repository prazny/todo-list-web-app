from fastapi import APIRouter, Depends

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
    print(boards.Board.__module__)
    print(type(boards.Board))
    return db.query(boards.Board).offset(offset).limit(limit).all()
