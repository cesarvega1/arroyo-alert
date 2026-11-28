# ARROYO ALERT — Backend API

REST API for citizen reporting, flood monitoring, incident management and real-time alerts in Barranquilla, Colombia.

## Technology Stack

- Node.js 24
- NestJS 12
- TypeScript
- TypeORM
- PostgreSQL 16
- PostGIS 3.7
- Zod
- Vitest
- Supertest
- Docker
- GitHub Actions

## Installation

```bash
npm ci
```

## Environment Configuration

Create the local environment files using the provided templates:

- `.env.example` → `.env`
- `.env.test.example` → `.env.test`

Configure the database credentials according to the infrastructure configuration.

Never commit real environment files or credentials.

## Database Environments

| Environment | Database | Port |
|---|---|---|
| Development | arroyo_alert | 5434 |
| Testing | arroyo_alert_test | 5435 |

Testing database isolation is enforced through Zod configuration validation and database identity verification.

## Database Migrations

```bash
npm run migration:show
npm run migration:run
npm run migration:show:test
npm run migration:run:test
```

Create a migration:

```bash
npm run migration:create -- src/database/migrations/MigrationName
```

Automatic schema synchronization is disabled. All database schema changes must be managed through migrations.

## Running the Application

```bash
npm run start:dev
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/v1 | API information |
| GET | /api/v1/health | Application and database health |

The health endpoint returns HTTP 200 when PostgreSQL is available and HTTP 503 when the database health query fails.

## Testing

```bash
npm run test
npm run test:cov
npm run test:e2e
```

Unit tests use mocked dependencies. End-to-end tests use an isolated PostgreSQL database with PostGIS.

Database migrations must be applied to the testing database before running E2E tests.

## Code Quality

```bash
npm run format
npm run lint -- --deny-warnings
npm run build
```

## Continuous Integration

GitHub Actions validates:

- Project structure
- Environment file security
- Code formatting
- Static analysis
- Unit tests
- Database migrations
- End-to-end tests
- Application build
- Docker Compose configuration

## Architecture Principles

- Modular architecture
- Separation of concerns
- Environment isolation
- Migration-based database management
- Secure configuration
- Automated testing
- Continuous integration