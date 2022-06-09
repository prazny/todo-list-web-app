from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.db.database import SessionLocal, get_db
from app.models.schemas import projects as schema_boards
import app.models.domain.projects as boards

router = APIRouter()