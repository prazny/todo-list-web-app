import time

from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.db.database import SessionLocal, get_db
from app.models.schemas import tokens as schema_tokens
from app.models.schemas import users as schema_users
from app.models.repository import users as crud_users
from app.models.domain import users as model_users
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.services.jwt import create_access_token
from app.mails.activate_account import send_activation_mail

from app.services.string_generator import get_random_string

router = APIRouter()


@router.post("/token", response_model=schema_tokens.Token)
def login_for_access_token(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud_users.authenticate_user(db, form.username, form.password)
    if user:
        jwt = create_access_token(data={"sub": user.email})
        ts = int(time.mktime(jwt["expired_at"].timetuple()))
        return {"access_token": jwt["token"], "token_type": "bearer", "expired_at": ts}
    else:
        raise HTTPException(status_code=401, detail="Invaild email or password.")


@router.post("/register", response_model=schema_users.User)
async def create_user(user: schema_users.UserCreate, db: Session = Depends(get_db)):
    db_user = crud_users.get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already exists.")
    activation_token = get_random_string(30)
    user = crud_users.create_user(db, user, activation_token)
    if user:
        await send_activation_mail(user.email, activation_token)
    return user


@router.post("/activate/{activation_token}")
def activate_user(activation_token: str, db: Session = Depends(get_db)):
    return crud_users.activate_user(db, activation_token)
