# ~/movie-service/app/api/models.py

from pydantic import BaseModel
from typing import List, Optional


# movie models
class MovieIn(BaseModel):
    name: str
    plot: str
    genres: List[str]
    casts: List[str]


class MovieOut(MovieIn):
    id: int


class MovieUpdate(MovieIn):
    name: Optional[str] = None
    plot: Optional[str] = None
    genres: Optional[List[str]] = None
    casts: Optional[List[str]] = None


# user models
class UserIn(BaseModel):
    email: str


class UserNotHashed(UserIn):
    password: str


class UserHashed(UserIn):
    hashed_password: str


class UserOut(UserIn):
    id: int


# login models
class Token(BaseModel):
    access_token: str
    token_type: str
