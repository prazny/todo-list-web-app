from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.db.database import Base


class Board(Base):
    __tablename__ = 'boards'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    color = Column(String)
    owner = relationship("User", back_populates="boards")
