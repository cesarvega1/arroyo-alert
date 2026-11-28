# ARROYO ALERT — Getting Started

## 1. Introduction

This guide describes how to configure and run
the ARROYO ALERT development environment.

## 2. Prerequisites

Install the following tools:

| Tool | Version |
|---|---|
| Node.js | 24.x |
| npm | Compatible with Node.js 24 |
| Git | 2.x |
| Docker | With Docker Compose support |
| Python | 3.12 recommended for the planned AI service |
| Visual Studio Code | Recommended |
| DBeaver | Optional |

Verify the installations:

```bash
node --version
npm --version
git --version
docker --version
docker compose version
python --version
```

## 3. Clone the Repository

```bash
git clone https://github.com/cesarvega1/arroyo-alert.git
cd arroyo-alert
git switch develop
git pull origin develop
```

## 4. Configure Infrastructure

Navigate to the infrastructure directory:

```bash
cd infrastructure
```

Create the environment file.

### Windows PowerShell

```powershell
Copy-Item .env.example .env
```

### Linux and macOS

```bash
cp .env.example .env
```

Configure the development and testing database
credentials in the environment file.

Never use production credentials in local
development environments.

## 5. Start PostgreSQL and PostGIS

```bash
docker compose up -d
docker compose ps
```

The expected containers are:

- arroyo_alert_db
- arroyo_alert_db_test

Both containers should become healthy before
continuing.

### Database Configuration

| Environment | Database | Port | User |
|---|---|---|---|
| Development | arroyo_alert | 5434 | arroyo |
| Testing | arroyo_alert_test | 5435 | arroyo_test |

The databases use independent containers,
networks and persistent volumes.

## 6. Configure the Backend

From the infrastructure directory:

```bash
cd ../backend
npm ci
```

### Windows PowerShell

```powershell
Copy-Item .env.example .env
Copy-Item .env.test.example .env.test
```

### Linux and macOS

```bash
cp .env.example .env
cp .env.test.example .env.test
```

Configure the database passwords to match the
credentials defined in infrastructure/.env.

### Development Environment

```dotenv
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

DB_HOST=127.0.0.1
DB_PORT=5434
DB_USER=arroyo
DB_PASSWORD=change_me
DB_NAME=arroyo_alert
```

### Testing Environment

```dotenv
NODE_ENV=test
PORT=3001
API_PREFIX=api/v1

DB_HOST=127.0.0.1
DB_PORT=5435
DB_USER=arroyo_test
DB_PASSWORD=change_me
DB_NAME=arroyo_alert_test
```

Replace placeholder passwords with the local
database credentials.

Real environment files must never be committed.

## 7. Execute Database Migrations

Apply migrations to the development database:

```bash
npm run migration:run
npm run migration:show
```

Apply migrations to the testing database:

```bash
npm run migration:run:test
npm run migration:show:test
```

All required migrations should appear as executed.

## 8. Start the Backend

```bash
npm run start:dev
```

The backend should be available at:

http://localhost:3000/api/v1

### Health Check

http://localhost:3000/api/v1/health

Expected response:

```json
{
  "status": "ok",
  "service": "arroyo-alert-api",
  "timestamp": "2026-11-28T18:00:00.000Z",
  "uptime": 10,
  "database": {
    "status": "up"
  }
}
```

The timestamp and uptime will vary.

## 9. Run Automated Tests

### Unit Tests

```bash
npm run test
```

### Code Coverage

```bash
npm run test:cov
```

### End-to-End Tests

```bash
npm run test:e2e
```

End-to-end tests require the testing database
to be running with all required migrations applied.

## 10. Code Quality

```bash
npm run format
npm run lint -- --deny-warnings
npm run build
```

All validations must pass before submitting
a pull request.

## 11. Database Administration

DBeaver may be used to inspect local databases.

### Development Connection

- Host: 127.0.0.1
- Port: 5434
- Database: arroyo_alert
- Username: arroyo

### Testing Connection

- Host: 127.0.0.1
- Port: 5435
- Database: arroyo_alert_test
- Username: arroyo_test

Use the corresponding local passwords.

## 12. Troubleshooting

### Docker Engine Is Not Available

Verify that Docker Desktop or the Docker
daemon is running.

```bash
docker info
```

### Database Connection Failed

Verify:

- Database container status.
- Database host and port.
- Database credentials.
- Environment file configuration.

```bash
docker compose ps
```

Run Docker Compose commands from the
infrastructure directory.

### Port Already in Use

Check whether another application or container
is using the required port.

Testing port changes require reviewing the
environment isolation safeguards and CI configuration.

### Pending Migrations

Execute the appropriate migration command
for the selected environment.

### Testing Environment Validation Failed

Verify that the testing configuration uses:

- Host: 127.0.0.1
- Port: 5435
- Database: arroyo_alert_test
- Username: arroyo_test

Never disable the isolation safeguards to
resolve configuration errors.

## 13. Stop the Environment

From the infrastructure directory:

```bash
docker compose stop
```

To remove containers while preserving named volumes:

```bash
docker compose down
```

Do not use docker compose down -v unless
intentional database deletion is required.

## 14. Current Implementation Scope

The backend foundation, database infrastructure,
migration system and continuous integration
are currently implemented.

The frontend application, AI service and business
modules will be introduced during upcoming sprints.
