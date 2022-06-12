from typing import List

from pydantic import validator
from pydantic.main import BaseModel
from pydantic.color import Color

from app.models.schemas.tasks import Task


class ProjectBase(BaseModel):
    name: str
    description: str | None
    color: Color

    @validator('name')
    def name_must_be_of_length_between_3_50(cls, v):
        if len(v) > 50 or len(v) < 3:
            raise ValueError('must be of length between 3 and 50')
        return v.title()


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(ProjectBase):
    pass


class Project(ProjectBase):
    id: int
    tasks: List[Task]

    class Config:
        orm_mode = True
