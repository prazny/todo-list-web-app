import enum

from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.orm import relationship

from app.models.domain.base import Base


class TaskStatus(enum.Enum):
    active = 1
    pending = 2
    completed = 3


class Subtask(Base):
    __tablename__ = 'subtasks'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    status = Column(Enum(TaskStatus), nullable=False)
    # owner = User
    # assignment = User
