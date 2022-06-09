from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy_utils import ColorType
from app.models.domain.base import Base
from colour import Color
from app.models.domain.base import HashColumn


class Project(Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    description = Column(String(400))
    color = Column(ColorType, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    owner = relationship("User", back_populates="projects")


    def __repr__(self):
        return 'id: {}, root cause: {}'.format(self.id, self.root_cause)
