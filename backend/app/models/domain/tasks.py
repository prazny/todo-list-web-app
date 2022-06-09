from sqlalchemy import Column, Integer, String
from sqlalchemy_utils import ColorType
from sqlalchemy.orm import relationship
from colour import Color


from app.models.domain.base import Base
from app.models.domain.base import HashColumn


class Task(Base):
    __tablename__ = 'tasks'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    color = Column(ColorType)
