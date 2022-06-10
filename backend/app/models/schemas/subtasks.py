from pydantic import BaseModel


class SubtaskBase(BaseModel):
    name: str
    status: str


class SubtaskCreate(SubtaskBase):
    pass


class Subtask(SubtaskBase):
    id: int

    class Config:
        orm_mode = True
