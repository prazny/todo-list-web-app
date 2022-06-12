from pydantic import BaseModel
from enum import Enum, IntEnum

from app.models.domain.subtasks import TaskStatus


class SubtaskBase(BaseModel):
    name: str
    status: TaskStatus


class SubtaskCreate(SubtaskBase):
    pass


class SubtaskUpdate(SubtaskBase):
    pass


class SubtaskChangeStatus(BaseModel):
    status: TaskStatus


class Subtask(SubtaskBase):
    id: int

    class Config:
        orm_mode = True
