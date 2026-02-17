# KultureX Architecture

## 1. System Overview

KultureX is a modular platform composed of:

- Web app (Next.js)
- Mobile app (React Native with Expo)
- Backend API (Django + Django REST Framework)
- PostgreSQL as primary relational datastore
- Object storage (future) for media assets

## 2. Monorepo Structure

```text
KultureX/
  backend/
  web/
  mobile/
  docs/
```

Each app is independently deployable while sharing domain language and API contracts.

## 3. Backend Design

### 3.1 App Modules

- `apps.users`: identity, roles, profile ownership
- `apps.articles`: creator articles and editorial publishing
- `apps.skate`: crews, skate spots, and video metadata
- `apps.store`: brands, products, variants, and orders
- `apps.events`: events, ticket tiers, and RSVPs
- `apps.community`: public creator profiles and follow graph
- `apps.common`: shared abstract models/utilities
- `apps.health`: liveness/readiness endpoint

### 3.2 Architectural Patterns

- Domain-driven modular apps
- Shared base classes in `apps.common`
- API-first boundaries using serializers + viewsets
- Configuration split by environment: `base.py`, `dev.py`, `prod.py`

### 3.3 Security Baseline

- Custom user model with role field
- JWT auth for API clients
- DRF default authentication/permission policy
- Secure cookie and header defaults in production settings
- CORS restricted by explicit allowlist

## 4. RBAC Model

Roles:

- `ADMIN`: platform operations
- `EDITOR`: article moderation and publishing
- `CREATOR`: article/video/profile content creation
- `ORGANIZER`: event creation and ticket management
- `BRAND`: product/store management
- `MEMBER`: normal platform member

Authorization:

- Role checks handled in dedicated permission classes (`apps.users.permissions`)
- Resource ownership checks for update/delete operations

## 5. API Conventions

Base URL: `/api/v1/`

Domain endpoints:

- `/users/`
- `/articles/`
- `/skate/`
- `/store/`
- `/events/`
- `/community/`
- `/health/`

Conventions:

- JSON request/response
- ISO-8601 timestamps
- Cursor or page-number pagination
- Explicit status transitions for publishable content

## 6. Web Architecture (Next.js)

- App Router structure in `app/`
- Domain feature folders in `src/features/*`
- Shared API client in `src/lib/api/client.ts`
- Token handling strategy isolated in auth layer

## 7. Mobile Architecture (React Native)

- Screen-first structure under `src/screens`
- Shared API client under `src/api`
- Platform-agnostic service contracts with backend API

## 8. Scaling Path

Phase-based scale strategy:

1. Monolith-first modular backend + single Postgres instance
2. Introduce async workers (Celery) for media processing and notifications
3. Add CDN/object storage for media
4. Extract high-throughput domains (events/store) if traffic requires

## 9. Observability and Ops

- Structured logging for API requests
- Health endpoint integration for load balancers
- Metrics pipeline planned (Prometheus/OpenTelemetry)
- CI checks: lint, typecheck, tests, migration validation
