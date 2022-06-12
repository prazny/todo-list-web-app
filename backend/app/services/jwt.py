from datetime import datetime, timedelta
from dotenv import dotenv_values
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

from sqlalchemy.orm import Session

from app.models.repository.users import get_user_by_email
from app.models.schemas.tokens import TokenData

from app.db.database import get_db

config = dotenv_values()


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=float(config['OAUTH_ACCESS_TOKEN_EXPIRE_MINUTES']))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, config['OAUTH_SECRET_KEY'], algorithm=config['OAUTH_ALGORITHM'])

    return {"token": encoded_jwt, "expired_at": expire}


def get_current_user(db: Session = Depends(get_db), token: str = Depends(OAuth2PasswordBearer(tokenUrl="/api/oauth"
                                                                                                       "/token"))):
    try:
        decode = jwt.decode(token, config['OAUTH_SECRET_KEY'], algorithms=config['OAUTH_ALGORITHM'])
        username: str = decode.get("sub")

        token_data = TokenData(username=username)
        db_user = get_user_by_email(db, username)
    except JWTError:
        raise HTTPException(status_code=401)

    return db_user
