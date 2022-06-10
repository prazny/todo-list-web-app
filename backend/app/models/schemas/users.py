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


def fake_decode_token(token):
    # This doesn't provide any security at all
    # Check the next version
    user = get_user(fake_users_db, token)
    return user
