from pydantic import BaseModel

from app.models.domain.users import User


class ProjectBase(BaseModel):
    name: str
    description: str
    color: str


class ProjectCreate(ProjectBase):
    pass


class Project(ProjectBase):
    id: int
    #owner: User

    class Config:
        orm_mode = True
