# ~/movie-service/app/api/db_manager.py

from app.api.db import movies, database, users
from app.api.models import MovieIn, UserHashed, UserIn


# movie table methods
async def get_all_movies():
    query = movies.select()
    return await database.fetch_all(query=query)


async def get_movie(id: int):
    query = movies.select().where(movies.c.id == id)
    return await database.fetch_one(query=query)


async def add_movie(payload: MovieIn):
    query = movies.insert().values(**payload.dict())
    return await database.execute(query=query)


async def update_movie(id: int, payload: MovieIn):
    query = (
        movies
        .update()
        .where(movies.c.id == id)
        .values(**payload.dict())
    )
    return await database.execute(query=query)


async def delete_movie(id: int):
    query = movies.delete().where(movies.c.id == id)
    return await database.execute(query=query)


# user table methods
async def get_all_users():
    query = users.select()
    return await database.fetch_all(query=query)


async def get_user_by_email(email: str):
    query = users.select().where(users.c.email == email)
    return await database.fetch_one(query=query)


async def get_user_by_id(id: int):
    query = users.select().where(users.c.id == id)
    return await database.fetch_one(query=query)


async def add_user(payload: UserHashed):
    query = users.insert().values(**payload.dict())
    return await database.execute(query=query)


async def update_user(id: int, payload: UserHashed):
    query = (
        users
        .update()
        .where(users.c.id == id)
        .values(**payload.dict())
    )
    return await database.execute(query=query)


async def delete_user(id: int):
    query = users.delete().where(users.c.id == id)
    return await database.execute(query=query)