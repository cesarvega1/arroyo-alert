# ADR 0002 — Technology Stack

## Status

Accepted

## Date

2026-11-28

## Context

ARROYO ALERT requires a technology stack capable of
supporting a responsive web application, secure APIs,
geospatial data, real-time communication and
artificial intelligence integration.

The stack must balance development productivity,
maintainability, scalability and operational complexity.

## Decision

Adopt the following technology stack.

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Leaflet
- OpenStreetMap

### Backend

- Node.js 24
- NestJS
- TypeScript
- TypeORM
- Zod
- JWT
- Socket.IO
- Swagger

### Database

- PostgreSQL 16
- PostGIS 3.7

### Artificial Intelligence

- Python
- FastAPI
- External AI provider

### Infrastructure

- Docker
- Docker Compose
- GitHub
- GitHub Actions

### Testing and Code Quality

- Vitest
- Supertest
- Oxlint
- Prettier

## Alternatives Considered

### Express.js

Provides flexibility and simplicity but requires more
manual architectural decisions and project organization.

### Django

Provides a mature backend ecosystem but would require
a different primary backend development stack.

### MongoDB

Provides flexible document storage but PostgreSQL
better matches the project's relational requirements
and selected geospatial architecture.

### Microservices Architecture

Provides independent service scalability but introduces
additional infrastructure and operational complexity.

## Consequences

TypeScript provides a consistent language across
frontend and backend development.

NestJS supports modular architecture and dependency
injection.

PostgreSQL and PostGIS support relational integrity
and geographic queries.

Python provides access to artificial intelligence
and machine learning ecosystems.

The selected stack requires continuous dependency
maintenance and security updates.

Technologies that are not yet integrated remain
planned components of the MVP architecture.