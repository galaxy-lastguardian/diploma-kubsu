from typing import List

from fastapi import APIRouter, HTTPException

from app.api import db_manager
from app.api.hashing import Hasher
from app.api.models import UserNotHashed, UserHashed, UserOut, UserIn

users_router = APIRouter()

#TODO
# 1) обработка ошибок как в функции get_user_by_email

@users_router.get('/users', response_model=List[UserOut])
async def get_all_users():
    return await db_manager.get_all_users()


@users_router.post('/', response_model=UserOut)
async def get_user(payload: UserIn):
    email = payload.dict().get('email')
    user = await db_manager.get_user_by_email(email)
    if user is None:
        raise HTTPException(
            status_code=404, detail=f"User with email {email} not found."
        )
    return user


@users_router.post('/add', status_code=201)
async def add_user(payload: UserNotHashed):
    hashed_password = Hasher.get_password_hash(payload.password)
    payload_data = payload.dict()
    if 'password' in payload_data:
        del payload_data['password']
    hashed_user = UserHashed(**payload_data, hashed_password=hashed_password)
    user_id = await db_manager.add_user(hashed_user)
    response = {
        'id': user_id,
        **payload.dict()
    }
    return response


@users_router.put('/{id}')
async def update_user(id: int, payload: UserNotHashed):
    user = await db_manager.get_user_by_id(id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    hashed_password = Hasher.get_password_hash(payload.password)
    payload_data = payload.dict()
    if 'password' in payload_data:
        del payload_data['password']
    hashed_user = UserHashed(**payload_data, hashed_password=hashed_password)

    update_data = hashed_user.dict(exclude_unset=True)
    user_in_db = UserHashed(**user)

    updated_user = user_in_db.copy(update=update_data)

    return await db_manager.update_user(id, updated_user)

@users_router.delete('/{id}')
async def delete_user(id: int):
    user = await db_manager.get_user_by_id(id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return await db_manager.delete_user(id)