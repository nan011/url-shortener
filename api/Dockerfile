FROM python:3.8

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIPENV_VENV_IN_PROJECT=1

# Install OS dependencies
RUN apt-get update \
    && apt-get install --no-install-recommends -y

# Install pipenv
RUN pip install pipenv

# Install Python dependencies
WORKDIR /app
COPY Pipfile Pipfile.lock /app/
RUN pipenv install

# Copy the rest of the application code
COPY . /app/

# Collect static files
RUN python manage.py collectstatic --noinput

# Run migrations
RUN python manage.py migrate

# Create a non-root user to run the application
RUN useradd -m myuser
USER myuser