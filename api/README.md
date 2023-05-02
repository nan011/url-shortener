# URL Shortener API

This is a URL shortener API built using Django, Django Rest Framework, PostgreSQL, and Python.

## Quick Setup (Without Docker)

To set up the project and run it locally, follow these steps:

1. Create and activate a virtual environment:
   ```
   pipenv shell
   ```

2. Install the required packages:
   ```
   pipenv install
   ```

3. Create file `.env` and set environment variables
    ```
    DATABASE_NAME=<DATABASE-NAME>
    DATABASE_USER=<ROLE-OR-USER-NAME>
    DATABASE_PASSWORD=<ROLE-OR-USER-PASSWORD>
    DATABASE_HOST=<DATABASE-HOST-NAME>
    DATABASE_PORT=<DATABASE-HOST-PORT>
    ```

4. Set up the database:
   ```
   python manage.py migrate
   ```

5. Run the server:
   ```
   python manage.py runserver
   ```

## Endpoints

The API has the following endpoints:

### POST /services/shortening-url/

Request body:
```
{
    "url": str
}
```

Response body:
```
{
    "original_url": str,
    "identifier": str
}
```

### POST /services/access-shortened-url

Request body:
```
{
    "identifier": str
}
```

Response body:
```
{
    "original_url": str,
    "identifier": str
}
```