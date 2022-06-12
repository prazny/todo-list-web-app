from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy_utils import ColorType
from sqlalchemy.orm import relationship
from colour import Color


from app.models.domain.base import Base
from app.models.domain.base import HashColumn


class Task(Base):
    __tablename__ = 'tasks'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    color = Column(String(50))
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    project = relationship("Project", back_populates="tasks")
    subtasks = relationship("Subtask", back_populates="task")

