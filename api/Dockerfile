FROM python:3.8

# Install pipenv
RUN pip install pipenv

# Install Python dependencies
WORKDIR /app/
COPY Pipfile Pipfile.lock /app/
RUN pipenv install --ignore-pipfile --system --dev

# Copy the rest of the application code
COPY . /app/

# Create a non-root user to run the application
RUN useradd -m myuser
USER myuser