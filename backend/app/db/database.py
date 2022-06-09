from dotenv import load_dotenv, dotenv_values
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

config = dotenv_values()
print(config)


engine = create_engine("mysql+pymysql://user:password@localhost:3306/app_db?charset=utf8mb4", connect_args={})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
