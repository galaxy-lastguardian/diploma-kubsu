# ~/movie-service/app/main.py
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from app.api.db import metadata, database, engine
from app.api.movies_handler import movies_router
from app.api.users_handler import users_router
from app.api.login_handlers import login_router
import uvicorn
import settings

metadata.create_all(engine)

app = FastAPI()

#TODO
# 1) разобраться с cors во время деплоя в кубы
origigns = [
    "http://192.168.1.134:8080",
    "http://frontend.nginx",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origigns,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


main_api_router = APIRouter()
main_api_router.include_router(users_router, prefix="/user", tags=["user"])
main_api_router.include_router(movies_router, prefix="/movie", tags=["movie"])
main_api_router.include_router(login_router, prefix="/login", tags=["login"])
app.include_router(main_api_router)

if __name__ == "__main__":
    # run app on the host and port
    uvicorn.run(app, host="0.0.0.0", port=settings.APP_PORT)
