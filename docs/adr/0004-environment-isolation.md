# ADR 0004 — Environment Isolation

## Status

Accepted

## Date

2026-11-28

## Context

Automated tests must not modify development
or production data.

Sharing database instances or credentials between
environments increases the risk of accidental
data modification.

## Decision

Maintain independent development and testing
database environments.

### Development

- Database: arroyo_alert
- Host: 127.0.0.1
- Port: 5434
- User: arroyo
- Environment file: .env

### Testing

- Database: arroyo_alert_test
- Host: 127.0.0.1
- Port: 5435
- User: arroyo_test
- Environment file: .env.test

Each database runs in an independent Docker
container with its own persistent volume.

Use Zod to enforce testing database configuration.

End-to-end tests must verify the database identity
before executing test cases.

GitHub Actions uses an independent temporary
PostgreSQL and PostGIS service.

Real environment files must be excluded from
version control.

Only environment templates may be committed.

## Alternatives Considered

### Shared Database

Use the same database for development and testing.

Rejected due to the risk of accidental data
modification.

### Shared Instance with Separate Databases

Provides logical separation but shares database
infrastructure.

### Independent Database Containers

Provides stronger isolation and independent
database lifecycle management.

## Consequences

Additional local infrastructure resources
are required.

Development data is protected from automated
testing operations when isolation controls
are correctly enforced.

Testing becomes more reproducible.

Environment configuration errors are detected
before test execution.

Production database isolation and access policies
will be defined separately.