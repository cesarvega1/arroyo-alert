# ARROYO ALERT — Coding Standards

## 1. Purpose

These standards define the development practices
required to maintain consistent, secure, readable
and testable code throughout ARROYO ALERT.

## 2. General Principles

- Clean Code.
- SOLID principles.
- Separation of concerns.
- Don't Repeat Yourself (DRY).
- Keep It Simple (KISS).
- You Aren't Gonna Need It (YAGNI).
- Secure development practices.
- Testable application design.

Avoid unnecessary architectural complexity.

## 3. Language

The following must be written in English:

- Source code identifiers.
- File names.
- Comments.
- Commit messages.
- Pull requests.
- Technical documentation.

User-facing content may support Spanish and
additional languages as required.

## 4. Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Variables | camelCase | reportCount |
| Functions | camelCase | createReport |
| Classes | PascalCase | ReportsService |
| Interfaces | PascalCase | ReportResponse |
| Constants | UPPER_SNAKE_CASE | MAX_FILE_SIZE |
| Enum names | PascalCase | ReportStatus |
| Enum values | UPPER_SNAKE_CASE | PENDING |
| File names | kebab-case | reports.service.ts |
| Database columns | snake_case | created_at |
| Database tables | snake_case | report_evidences |

## 5. TypeScript Standards

- Enable strict type checking.
- Avoid unnecessary use of any.
- Prefer explicit and meaningful types.
- Use unknown for untrusted values.
- Avoid unsafe type assertions.
- Use const when reassignment is unnecessary.
- Prefer async/await for asynchronous operations.
- Handle asynchronous errors appropriately.
- Follow the configured ESM import conventions.
- Use type-only imports where appropriate.

Example:

```typescript
interface ReportSummary {
  id: string;
  description: string;
}

function formatReport(report: ReportSummary): string {
  return `${report.id}: ${report.description}`;
}
```

## 6. NestJS Standards

- Organize business capabilities into modules.
- Use constructor-based dependency injection.
- Keep controllers focused on HTTP responsibilities.
- Place business rules inside services.
- Use repositories for persistence operations.
- Validate external input through appropriate DTOs.
- Avoid exposing persistence entities directly.
- Use appropriate HTTP exceptions.
- Avoid unnecessary circular dependencies.
- Introduce abstractions only when justified.

## 7. File Organization

Each business module should contain the
components required by its responsibilities.

Example:

```text
reports/
├── dto/
├── entities/
├── enums/
├── reports.controller.ts
├── reports.controller.spec.ts
├── reports.service.ts
├── reports.service.spec.ts
└── reports.module.ts
```

## 8. API Standards

- Use RESTful resource naming.
- Use plural resource names.
- Use appropriate HTTP methods.
- Return appropriate HTTP status codes.
- Maintain API versioning.
- Validate all external input.
- Avoid exposing internal implementation details.
- Never expose sensitive credentials.
- Document public endpoints.

Example planned endpoints:

```text
GET    /api/v1/reports
GET    /api/v1/reports/:id
POST   /api/v1/reports
PATCH  /api/v1/reports/:id
DELETE /api/v1/reports/:id
```

These endpoints are illustrative and must follow
the final business and authorization requirements.

## 9. Database Standards

- Use TypeORM migrations for schema changes.
- Keep synchronize disabled.
- Keep dropSchema disabled.
- Use UUID identifiers for business entities.
- Use meaningful table and column names.
- Define foreign key constraints explicitly.
- Use database transactions when required.
- Use parameterized queries.
- Introduce indexes based on query requirements.
- Preserve historical data when required.
- Review destructive database operations.

## 10. Error Handling

Use appropriate NestJS HTTP exceptions.

Examples:

- BadRequestException
- UnauthorizedException
- ForbiddenException
- NotFoundException
- ConflictException
- ServiceUnavailableException

Error responses must not expose:

- Database credentials.
- Authentication tokens.
- Sensitive internal configuration.
- Internal stack traces in production.

Avoid empty catch blocks and silently ignored errors.

## 11. Security Standards

The following requirements apply as the
corresponding features are implemented:

- Validate and sanitize untrusted input.
- Securely hash passwords.
- Protect authentication tokens.
- Apply authorization to protected endpoints.
- Validate uploaded files.
- Restrict access to sensitive information.
- Apply rate limiting where appropriate.
- Protect environment variables.
- Use least-privilege access policies.
- Review dependencies for security issues.

Citizen locations and uploaded evidence must
receive appropriate privacy protections.

## 12. Logging Standards

Use structured and meaningful application logs.

Logs should support:

- Error identification.
- Application monitoring.
- Operational troubleshooting.
- Security event analysis.

Never log passwords, access tokens,
refresh tokens or sensitive personal data.

## 13. Testing Standards

New business functionality must include
appropriate automated tests.

### Unit Tests

- Test isolated components.
- Mock external dependencies.
- Test successful and unsuccessful scenarios.
- Verify important business rules.

### End-to-End Tests

- Test HTTP behavior.
- Use the isolated testing database.
- Verify authorization and validation.
- Verify important database operations.

### Test Naming

Use descriptive behavior-oriented names.

```typescript
it('should return the report when it exists');

it('should reject invalid geographic coordinates');

it('should prevent unauthorized alert publication');
```

## 14. Code Formatting

Prettier is used for consistent formatting.

```bash
npm run format
```

Oxlint is used for static code analysis.

```bash
npm run lint -- --deny-warnings
```

Project formatting and linting configuration
must be respected.

Do not disable lint rules without a documented
technical justification.

## 15. Comments and Documentation

Comments should explain why a decision exists
rather than repeat what the code already does.

Avoid outdated comments and commented-out code.

Document complex business rules and important
architectural decisions.

Use Architecture Decision Records for significant
architecture changes.

## 16. AI Integration Standards

AI-generated output must be validated before
being used by business logic.

The application must:

- Treat AI-generated content as untrusted input.
- Validate response structures.
- Handle provider failures.
- Define request timeouts.
- Minimize sensitive information sent externally.
- Preserve human oversight.

AI must not independently verify emergency
conditions, publish official warnings or
guarantee citizen safety.

## 17. Code Review Checklist

Before integrating changes, verify:

- Requirements are satisfied.
- Naming conventions are respected.
- Business logic is correctly organized.
- Input validation is implemented.
- Security requirements are considered.
- Error handling is appropriate.
- Automated tests are included.
- Formatting and linting pass.
- Application compilation succeeds.
- Documentation is updated.
- No secrets are committed.

## 18. Continuous Improvement

Coding standards may evolve as the project grows.

Significant changes must be documented,
reviewed and applied consistently.