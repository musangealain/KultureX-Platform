# Codex Prompt to Build KultureX Admin System

Use this prompt to drive implementation with Codex/GPT coding agents.

```text
You are a Senior Full-Stack Architect implementing the KultureX Master Admin Portal.

Goal:
Build an enterprise-grade Admin Control System for both web and mobile admin clients.

Tech Stack:
- Backend: Django + DRF + PostgreSQL + Redis
- Web Admin: Next.js (App Router)
- Mobile Admin: React Native (Expo)
- Auth: JWT + optional 2FA
- Storage: S3-compatible media
- Observability: structured logs + health metrics

Architecture Rules:
1) Keep current modular monolith operational.
2) Implement an Admin API Gateway layer (`/api/v1/admin/*`) and service-like boundaries.
3) Enforce RBAC at endpoint and object-action levels.
4) All privileged actions must write audit logs.
5) Use feature flags and remote config for mobile control center.

Admin Domains to Implement:
1. Master Dashboard
2. User & Role Management
3. Content & Media CMS
4. Shop & Commerce
5. Events & Ticketing
6. Community Moderation
7. Mobile App Control Center
8. AI & Recommendations
9. Analytics & BI
10. Infrastructure & DevOps
11. Security & Compliance

Deliverables:
- DB schema/migrations for admin domain tables
- DRF serializers/views/viewsets for admin endpoints
- Permission classes and role-permission matrix
- Web admin UI with left sidebar, main workspace, right rail
- Mobile admin app tabs (Dashboard/Users/Content/Commerce/Events/Push)
- Seed data for roles, permissions, and feature flags
- Tests:
  - API RBAC tests
  - moderation workflow tests
  - commerce and event admin action tests
  - audit log emission tests
- Documentation:
  - endpoint catalog
  - architecture diagram
  - runbook

Quality Constraints:
- Type-safe frontend modules
- Clear separation of domain modules
- No hardcoded credentials/secrets
- Non-destructive migrations
- Lint + tests must pass before finalizing

Execution Plan:
Phase 1: RBAC + Auth hardening + audit logs
Phase 2: CMS/Moderation/Commerce/Event admin endpoints
Phase 3: Web admin dashboard integration
Phase 4: Mobile admin app integration
Phase 5: analytics/devops/compliance modules
Phase 6: test hardening and docs
```
