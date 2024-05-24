from typing import List

from fastapi import APIRouter, HTTPException, Depends

from app.api import db_manager
from app.api.models import MovieIn, MovieOut, UserIn
from app.api.login_handlers import get_current_user_from_token

movies_router = APIRouter()

#TODO
# 1) обработка ошибок в методах


@movies_router.get('/', response_model=List[MovieOut])
async def get_all_movies(current_user: UserIn = Depends(get_current_user_from_token)):
    if current_user:
        return await db_manager.get_all_movies()
    else:
        return


@movies_router.get('/{id}', response_model=MovieOut)
async def get_movie(id: int):
    return await db_manager.get_movie(id)


@movies_router.post('/', status_code=201)
async def add_movie(payload: MovieIn):
    movie_id = await db_manager.add_movie(payload)
    response = {
        'id': movie_id,
        **payload.dict()
    }

    return response


@movies_router.put('/{id}')
async def update_movie(id: int, payload: MovieIn):
    movie = await db_manager.get_movie(id)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    update_data = payload.dict(exclude_unset=True)
    movie_in_db = MovieIn(**movie)

    updated_movie = movie_in_db.copy(update=update_data)

    return await db_manager.update_movie(id, updated_movie)


@movies_router.delete('/{id}')
async def delete_movie(id: int):
    movie = await db_manager.get_movie(id)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return await db_manager.delete_movie(id)
