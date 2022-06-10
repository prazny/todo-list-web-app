from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from pydantic import BaseModel, SecretStr


class UserBase(BaseModel):
    email: str
    firstname: str
    lastname: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    # id: int

    class Config:
        orm_mode = True