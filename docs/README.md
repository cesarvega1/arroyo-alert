# ARROYO ALERT — Technical Documentation

Welcome to the technical documentation of
ARROYO ALERT.

This documentation describes the architecture,
development standards, database design,
testing strategy and infrastructure decisions
of the project.

## Architecture

| Document | Description |
|---|---|
| [System Overview](architecture/system-overview.md) | General system architecture |
| [Backend Architecture](architecture/backend-architecture.md) | NestJS architecture and application layers |
| [Database Design](architecture/database-design.md) | Relational and geospatial database design |

## Architecture Decision Records

| ADR | Decision |
|---|---|
| [ADR 0001](adr/0001-monorepo-architecture.md) | Monorepo Architecture |
| [ADR 0002](adr/0002-technology-stack.md) | Technology Stack |
| [ADR 0003](adr/0003-database-migrations.md) | Database Migrations |
| [ADR 0004](adr/0004-environment-isolation.md) | Environment Isolation |
| [ADR 0005](adr/0005-ai-service-architecture.md) | AI Service Architecture |

## Development Guides

| Document | Description |
|---|---|
| [Getting Started](development/getting-started.md) | Local environment installation and configuration |
| [Git Workflow](development/git-workflow.md) | Branches, commits and pull requests |
| [Coding Standards](development/coding-standards.md) | Development standards and best practices |

## Testing

- [Testing Strategy](testing/testing-strategy.md)

## DevOps

- [CI/CD Strategy](devops/ci-cd.md)

## Component Documentation

- [Backend API](../backend/README.md)

## Project Repository

- [Project README](../README.md)
- [GitHub Repository](https://github.com/cesarvega1/arroyo-alert)
- [GitHub Actions](https://github.com/cesarvega1/arroyo-alert/actions)

## Documentation Standards

All technical documentation must:

- Be written in English.
- Remain consistent with the implementation.
- Distinguish implemented and planned features.
- Avoid exposing sensitive information.
- Be updated when architectural decisions change.
- Use meaningful examples and diagrams.

## Project Status

ARROYO ALERT is under active development.

The initial project foundation includes:

- Monorepo architecture.
- NestJS backend.
- PostgreSQL and PostGIS.
- TypeORM migrations.
- Environment validation.
- Database isolation.
- Automated testing.
- Continuous integration.

Business functionality will be introduced
during the upcoming development sprints.

## Important Notice

ARROYO ALERT is a community information platform.

AI-assisted analysis and community alerts do not
replace official emergency management authorities
or guarantee safe conditions.