# ADR 0005 — Independent AI Service Architecture

## Status

Accepted — Implementation Planned

## Date

2026-11-28

## Context

ARROYO ALERT requires artificial intelligence
capabilities to assist with citizen report analysis,
classification and severity estimation.

Artificial intelligence dependencies and processing
requirements may differ from traditional backend
business operations.

## Decision

Implement artificial intelligence capabilities
through an independent Python FastAPI service.

The NestJS backend will communicate with the
AI service through defined HTTP interfaces.

The initial implementation will use an external
AI provider.

Custom machine learning models may be evaluated
in future project stages.

The NestJS backend remains responsible for:

- Business rules.
- Authentication and authorization.
- Database persistence.
- Report verification workflows.
- Incident management.
- Alert publication.

The AI service will assist with:

- Report classification.
- Suggested severity estimation.
- Evidence analysis.
- Information summarization.

AI-generated results must remain advisory.

Artificial intelligence must not independently
publish emergency alerts or guarantee citizen safety.

## Alternatives Considered

### Direct AI Integration in NestJS

Simplifies initial infrastructure but increases
coupling between AI processing and business logic.

### Independent Python AI Service

Provides separation of concerns and access to
Python's machine learning ecosystem.

### Custom Machine Learning Model

Provides greater model control but requires
training data, evaluation, infrastructure and
ongoing maintenance.

## Consequences

The AI service can evolve independently from
the core backend.

Additional service communication and failure
handling mechanisms are required.

External AI providers introduce dependencies,
usage costs and privacy considerations.

The system must tolerate AI service failures.

AI requests require appropriate timeout,
validation and security controls.

Personal and sensitive information must be
minimized before external processing.

AI recommendations require appropriate human
oversight and validation.