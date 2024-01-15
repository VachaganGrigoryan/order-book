FROM python:3.11-slim

# Add user that will be used in the container.
RUN useradd vachagan

# Port used by this container to serve HTTP.
EXPOSE 8000

# Set environment variables.
# 1. Force Python stdout and stderr streams to be unbuffered.
# 2. Set PORT variable that is used by Gunicorn. This should match "EXPOSE"
#    command.
ENV PYTHONUNBUFFERED=1 \
    PORT=8000

# Install system packages required by Wagtail and Django.
RUN apt-get update --yes --quiet && apt-get install --yes --quiet --no-install-recommends \
    build-essential \
    libpq-dev \
    libjpeg62-turbo-dev \
    zlib1g-dev \
    libwebp-dev \
 && rm -rf /var/lib/apt/lists/*

# Set the working directory to /tmp.
WORKDIR /tmp

# Install poetry.
RUN pip install poetry
# Copy the project requirements files.
COPY ./pyproject.toml ./poetry.lock* /tmp/
# Export the project requirements to a requirements.txt file.
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

# Upgrade pip.
RUN pip install --upgrade pip

# Install the project requirements.
#COPY ./tmp/requirements.txt /tmp/
RUN pip install -r ./requirements.txt

# Use /app folder as a directory where the source code is stored.
WORKDIR /app

# Set this directory to be owned by the "fireflies" user. This Wagtail project
# uses SQLite, the folder needs to be owned by the user that
# will be writing to the database file.
RUN chown vachagan:vachagan /app

# Copy the source code of the project into the container.
COPY --chown=vachagan:vachagan . .

# Use user "fireflies" to run the build commands below and the server itself.
USER vachagan

# Collect static files.
# RUN python manage.py collectstatic --noinput --clear

# Runtime command that executes when "docker run" is called, it does the
# following:
#   1. Migrate the database.
#   2. Start the application server.
# WARNING:
#   Migrating database at the same time as starting the server IS NOT THE BEST
#   PRACTICE. The database should be migrated manually or using the release
#   phase facilities of your hosting platform. This is used only so the
#   Wagtail instance can be started with a simple "docker run" command.
CMD set -xe; python manage.py migrate --noinput
