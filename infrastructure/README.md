# ARROYO ALERT — Infrastructure

## Overview

Local database infrastructure for development and testing environments.

## Technology Stack

- Docker
- Docker Compose
- PostgreSQL 16
- PostGIS 3.7

## Environment Setup

Copy `.env.example` to `.env` and configure your local database credentials.

Never commit the `.env` file.

## Database Configuration

| Environment | Host | Port | Database |
|---|---|---|---|
| Development | 127.0.0.1 | 5434 | arroyo_alert |
| Testing | 127.0.0.1 | 5435 | arroyo_alert_test |

## Docker Commands

Run the following commands from the infrastructure directory.

### Start services

`docker compose up -d`

### Check container status

`docker compose ps`

### View logs

`docker compose logs -f`

### Stop services

`docker compose stop`

### Remove containers

`docker compose down`

### Validate configuration

`docker compose --env-file .env.example config --quiet`

## Security

- Independent development and testing credentials.
- Isolated Docker networks.
- Local-only database port bindings.
- Independent persistent volumes.
- Environment variables excluded from version control.

## Health Checks

Both PostgreSQL containers use pg_isready to monitor database availability.

## Data Persistence

Database data is stored in named Docker volumes:

- postgres_data
- postgres_test_data

**Warning:** Running `docker compose down -v` permanently removes the associated database volumes and their stored data.

## Database Management

DBeaver can be used to manage both PostgreSQL databases independently.

Database schemas will be managed through TypeORM entities and migrations.