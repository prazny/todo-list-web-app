from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.models.domain.base import Base


class User:
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email: Column(String, unique=True)
    firstname: Column(String, nullable=True)
    lastname: Column(String, nullable=True)
    #boards: relationship("Board", back_populates="owner")
    password = Column(String)
