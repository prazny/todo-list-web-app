import random
import string

from app.models.domain.users import User
from app.models.schemas import users as user_schema
from app.models.domain import users as user_model
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from sqlalchemy import inspect

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_user_by_email(db: Session, user_login: str):
    return db.query(User).filter(User.email == user_login).first()


def create_user(db: Session, user: user_schema.UserCreate, activate_token: str):
    user.password = pwd_context.hash(user.password)
    db_user = user_model.User(**user.dict())
    db_user.is_activate = 0
    db_user.activation_token = activate_token
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def activate_user(db: Session, activation_token: str):
    db.query(User).filter(User.activation_token == activation_token).update({"is_active": 1})
    db.commit()
    return True


def update_user(db: Session, user_id: int, user: user_schema.UserUpdate):
    db_user = db.query(User).filter(User.id == user_id).first()
    db_user.password = pwd_context.hash(user.password)
    db_user.firstname = user.firstname
    db_user.lastname = user.lastname
    db.commit()
    return db_user


def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return False

    if not user.is_active:
        return False

    print(user.email)

    if not pwd_context.verify(password, user.password):
        return False
    return user
