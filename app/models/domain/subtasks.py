from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.models.domain.base import Base


class Board(Base):
    __tablename__ = 'boards'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    status = Column(String)
    #owner = User
    #assignment = User
