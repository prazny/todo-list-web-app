from sqlalchemy import Column, Integer, String, Text, Boolean
from sqlalchemy.orm import relationship

from app.models.domain.base import Base


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(320), unique=True)
    firstname = Column(String(50), nullable=True)
    lastname = Column(String(50), nullable=True)
    is_active = Column(Boolean, default=False)
    activation_token = Column(String(100))
    password = Column(Text(200))
    projects = relationship("Project", back_populates="owner")
