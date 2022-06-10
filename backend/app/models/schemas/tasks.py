from pydantic import BaseModel


class TaskBase(BaseModel):
    name: str
    description: str
    color: str


class CreateTask(TaskBase):
    pass


class Task(TaskBase):
    id: int

    class Config:
        orm_mode = True
