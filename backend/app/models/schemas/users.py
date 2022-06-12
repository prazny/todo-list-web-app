from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from pydantic import BaseModel, SecretStr, validator, EmailStr


class UserBase(BaseModel):
    firstname: str
    lastname: str

    @validator('firstname')
    def firstname_must_be_of_length_between_3_50(cls, v):
        if len(v) > 50 or len(v) < 3:
            raise ValueError('must be of length between 3 and 50')
        return v.title()

    @validator('lastname')
    def lastname_must_be_of_length_between_3_50(cls, v):
        if len(v) > 50 or len(v) < 3:
            raise ValueError('must be of length between 3 and 50')
        return v.title()


class UserCreate(UserBase):
    email: EmailStr
    password: str

    @validator('password')
    def password_must_be_of_length_between_3_50(cls, v):
        if len(v) > 50 or len(v) < 3:
            raise ValueError('must be of length between 3 and 50')
        return v.title()


class UserUpdate(UserBase):
    password: str

    @validator('password')
    def password_must_be_of_length_between_3_50(cls, v):
        if len(v) > 50 or len(v) < 3:
            raise ValueError('must be of length between 3 and 50')
        return v.title()

class User(UserBase):
    email: str

    # id: int

    class Config:
        orm_mode = True
