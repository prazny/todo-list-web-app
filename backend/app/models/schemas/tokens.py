from typing import Any

from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str
    expired_at: Any


class TokenData(BaseModel):
    username: str | None = None
