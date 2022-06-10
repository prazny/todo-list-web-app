from app.models.domain.users import User
from app.models.schemas import users as user_schema
from app.models.domain import users as user_model
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from sqlalchemy import inspect

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_user_by_email(db: Session, user_login: str):
    return db.query(User).filter(User.email == user_login).first()


def create_user(db: Session, user: user_schema.UserCreate):
    user.password = pwd_context.hash(user.password)
    db_user = user_model.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return False

    print(user.email)

    if not pwd_context.verify(password, user.password):
        return False
    return user

