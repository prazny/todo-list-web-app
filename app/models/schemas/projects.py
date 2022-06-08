from pydantic import BaseModel

from app.models.domain.users import User


class BoardBase(BaseModel):
    name: str
    description: str
    color: str


class BoardCreate(BoardBase):
    pass


class Board(BoardBase):
    id: int
    #owner: User

    class Config:
        orm_mode = True
