from datetime import timedelta
from typing import Union, Annotated

from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security.oauth2 import OAuth2PasswordRequestForm, OAuth2PasswordBearer

from app.api import db_manager
from app.api.hashing import Hasher
from app.api.models import Token
from app.api.models import UserHashed
from app.api.security import create_access_token
from jose import jwt, JWTError
from app.api.models import UserIn
import settings

login_router = APIRouter()


# TODO
#  1) обработка ошибок как в функции get_user_by_email


async def authenticate_user(email: str, password: str) -> Union[UserHashed, None]:
    user = await db_manager.get_user_by_email(email)
    if user is None:
        return
    if not Hasher.verify_password(password, user.hashed_password):
        return
    return user


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login/token")


async def get_current_user_from_token(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = await db_manager.get_user_by_email(email)
    if user is None:
        raise credentials_exception
    return user


@login_router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@login_router.get("/token/email")
async def get_email_by_token(current_user: UserIn = Depends(get_current_user_from_token)):
    if current_user:
        return current_user.email
    else:
        return
