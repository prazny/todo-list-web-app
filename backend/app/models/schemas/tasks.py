from typing import List

from pydantic import BaseModel
from pydantic.color import Color

from app.models.schemas.subtasks import Subtask


class TaskBase(BaseModel):
    name: str
    color: Color


class TaskCreate(TaskBase):
    pass


class Task(TaskBase):
    id: int
    subtasks: List[Subtask]

    class Config:
        orm_mode = True
