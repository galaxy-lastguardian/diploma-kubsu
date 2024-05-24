Для установки приложения необходимо:
1) cd frontend
2) docker build -t accenmagorgopella/frontend_vue
3) cd ../backend
4) в файле settings.py изменить значение переменной REAL_DATABASE_URL, поменять default="postgresql://<имя_пользователя_бд>:<пароль_бд>@<адрес_сервера>/<название_бд>"
5) приложение будет обращаться к таблицам users и movies это надо иметь в виду
6) docker build -t accenmagorgopella/backend_fastapi
7) cd ..
8) docker-compose up -d

После этого можно обращаться к приложению по следующим портам:
- :8000/docs/ для бэкенда
- :8080 для фронтенда 
