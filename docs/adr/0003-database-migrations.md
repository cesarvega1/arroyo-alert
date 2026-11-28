# ADR 0003 — Migration-Based Database Management

## Status

Accepted

## Date

2026-11-28

## Context

ARROYO ALERT requires reliable and traceable database
schema changes across development, testing and
future production environments.

Automatic schema synchronization may introduce
uncontrolled changes and potential data loss.

## Decision

Use TypeORM migrations to manage all database
schema changes.

Disable the following TypeORM options:

- synchronize
- dropSchema
- migrationsRun

Database migrations must be explicitly executed,
reviewed and tested.

Migration history is stored in the
typeorm_migrations table.

The initial migration ensures that the PostGIS
extension is available.

## Alternatives Considered

### Automatic Schema Synchronization

Automatically updates the database schema according
to entity definitions.

Advantages:

- Fast initial prototyping.
- Reduced manual migration work.

Disadvantages:

- Limited control over schema changes.
- Potential data loss.
- Difficult production change management.

### Manual SQL Scripts

Provides direct control over SQL operations but
requires additional migration tracking and
execution management.

### TypeORM Migrations

Provides versioned, traceable and repeatable
database schema management.

## Consequences

Database changes require additional development
and review steps.

Schema changes become traceable through
version control.

Testing databases must receive pending migrations
before end-to-end tests are executed.

Previously deployed migrations must not be modified.

Destructive migrations require explicit review.

Production rollback and recovery procedures
must be defined before deployment.