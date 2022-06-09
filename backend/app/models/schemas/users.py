from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    firstname: str
    lastname: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class UserInDB(User):
    password: str


crypt_context = CryptContext(schemes=["sha256_crypt", "md5_crypt"])


def get_password_hash(password):
    return crypt_context.hash(password)


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
