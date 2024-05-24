#~/movie-service/app/api/db.py

from sqlalchemy import (Column, Integer, MetaData, String, Table, Text,
                        create_engine, ARRAY)

from databases import Database
import settings


engine = create_engine(settings.REAL_DATABASE_URL)
metadata = MetaData()

movies = Table(
    'movies',
    metadata,
    Column('id', Integer, primary_key=True),
    Column('name', String(50)),
    Column('plot', Text),
    Column('genres', ARRAY(String)),
    Column('casts', ARRAY(String))
)

users = Table(
    'users',
    metadata,
    Column('id', Integer, primary_key=True),
    Column('email', String(50)),
    Column('hashed_password', String(250), nullable=False),
)

database = Database(settings.REAL_DATABASE_URL)