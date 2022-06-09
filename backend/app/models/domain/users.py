from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship

from app.models.domain.base import Base


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(320), unique=True)
    firstname = Column(String(50), nullable=True)
    lastname = Column(String(50), nullable=True)
    password = Column(Text(200))
    projects = relationship("Project", back_populates="owner")
