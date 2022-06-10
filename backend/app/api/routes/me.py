from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.schemas.users import User
from app.services.jwt import create_access_token, get_current_user

router = APIRouter()


@router.get("")
def get_current_user_r(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return current_user
