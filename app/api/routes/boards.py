from fastapi import APIRouter

from sqlalchemy.orm import Session
from app.models.domain import boards

router = APIRouter()


@router.get("")
async def get_boards(db: Session, offset: int = 0, limit: int = 25):
    return db.query(boards).offset(offset).limit(limit).all()
