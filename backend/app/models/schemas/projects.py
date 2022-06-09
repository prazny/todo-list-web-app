from pydantic import BaseModel


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
