from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session
from app.models.schemas import boards as schema_board
from app.models.domain import boards

router = APIRouter()


#@router.get("", response_model=list[schema_board])
#def get_boards(db: Session, offset: int = 0, limit: int = 25):
#    return db.query(boards).offset(offset).limit(limit).all()
