# KultureX Admin Portal - Phased Implementation Checklist

This checklist converts the admin design pack into executable phases mapped to the current codebase.

## 0. Current Baseline (already in repo)

- Backend modules exist: `backend/apps/users`, `backend/apps/articles`, `backend/apps/store`, `backend/apps/events`, `backend/apps/community`, `backend/apps/media`, `backend/apps/analytics`, `backend/apps/health`
- API router exists: `backend/config/urls.py`
- Admin web feature exists: `web/src/features/admin/AdminPortal.tsx`, `web/src/features/admin/AdminPortal.module.css`, `web/src/features/admin/api.ts`
- Auth + analytics endpoints already wired:
  - `/api/v1/auth/token/`
  - `/api/v1/auth/me/`
  - `/api/v1/admin/analytics/`

---

## Phase 1 - Foundation and Security Hardening

### Goal
Establish production-grade RBAC and admin security baseline.

### Backend tasks
- [x] Add `super_admin` and `moderator` roles in `backend/apps/users/models.py`
- [x] Expand permission classes in `backend/apps/users/permissions.py`:
  - `IsSuperAdmin`
  - `IsModeratorOrAdmin`
  - scoped object-level checks
- [x] Add admin action audit model in new app or `backend/apps/common/models.py`
- [x] Log all privileged mutations from viewsets (`users`, `articles`, `store`, `events`)
- [x] Add 2FA fields/challenge endpoints in `backend/apps/users/views.py`

### Web tasks
- [x] Add effective permission map loading in `web/src/features/admin/api.ts`
- [x] Gate tabs/actions by permission in `web/src/features/admin/AdminPortal.tsx`

### Acceptance criteria
- [x] Non-admin user cannot access `/admin` actions
- [x] All admin mutations generate audit logs
- [x] 2FA challenge/verify flow works for admin users

---

## Phase 2 - Admin API Gateway Layer

### Goal
Create explicit admin namespace (`/api/v1/admin/*`) without breaking existing endpoints.

### Backend tasks
- [ ] Add admin-focused routes in `backend/config/urls.py`
- [ ] Create admin API views in new folder `backend/apps/admin_portal/` (recommended)
  - `dashboard.py`
  - `users.py`
  - `content.py`
  - `commerce.py`
  - `events.py`
  - `moderation.py`
- [ ] Keep existing domain viewsets; wrap with admin orchestration endpoints

### Web tasks
- [ ] Switch admin client to gateway-style calls in `web/src/features/admin/api.ts`
- [ ] Keep fallback to existing endpoints during migration

### Acceptance criteria
- [ ] Admin web works against `/api/v1/admin/*`
- [ ] Existing public/mobile API endpoints remain unaffected

---

## Phase 3 - Master Dashboard (Command Overview)

### Goal
Deliver real-time command dashboard with actionable widgets.

### Backend tasks
- [ ] Expand `backend/apps/analytics/views.py` with:
  - active users
  - today revenue
  - event health
  - article throughput
- [ ] Add time-series endpoints for charts

### Web tasks
- [ ] Build dashboard widgets in `web/src/features/admin/AdminPortal.tsx`
  - KPI tiles
  - sales trend graph
  - content queue summary
  - system health strip
- [ ] Add chart components (lightweight lib or custom SVG)

### Acceptance criteria
- [ ] Dashboard loads < 2s with cached aggregates
- [ ] KPIs are consistent with DB snapshots

---

## Phase 4 - User and Role Management (RBAC Engine)

### Goal
Enterprise user governance and traceability.

### Backend tasks
- [ ] Add role-permission matrix endpoints
- [ ] Add session/device tracking tables and endpoints
- [ ] Add actions:
  - warn
  - suspend
  - shadow-ban
  - verify account

### Web tasks
- [ ] Replace simple role dropdown with full role matrix editor
- [ ] Add user timeline panel (activity + moderation history)

### Acceptance criteria
- [ ] Role changes are auditable and reversible
- [ ] Session revocation works immediately

---

## Phase 5 - Content and Media CMS

### Goal
Production publishing workflow with revision history.

### Backend tasks
- [ ] Add article version model and rollback actions
- [ ] Add editorial pipeline transitions with strict guards:
  - draft -> submitted -> approved/rejected -> published -> archived
- [ ] Add media derivative records and compression jobs

### Web tasks
- [ ] Add editorial queue UI section with version compare
- [ ] Add feature controls (pin/feature/unfeature content)

### Acceptance criteria
- [ ] Editor can review diff between article versions
- [ ] Publish flow enforces role and state transitions

---

## Phase 6 - Shop and Commerce Engine

### Goal
Operational e-commerce controls (catalog, inventory, fulfillment).

### Backend tasks
- [ ] Extend `backend/apps/store/models.py`:
  - inventory ledger
  - campaign/drop support
  - vendor support (future)
- [ ] Add admin endpoints for:
  - inventory adjustments
  - campaign scheduling
  - order lifecycle controls
  - refund actions

### Web tasks
- [ ] Add inventory warning table + stock actions
- [ ] Add campaign creation UI (drop start/end, featured banners)

### Acceptance criteria
- [ ] Stock adjustments create movement records
- [ ] Order status and refund workflows auditable

---

## Phase 7 - Events and Ticketing System

### Goal
Complete event operations with ticket check-in and livestream controls.

### Backend tasks
- [ ] Extend `backend/apps/events/models.py` for check-ins and stream state
- [ ] Add admin actions:
  - publish/unpublish
  - attendee export
  - QR check-in
  - stream start/stop

### Web tasks
- [ ] Add event operations dashboard (attendance + ticket tiers)
- [ ] Add QR check-in validation panel (web fallback)

### Mobile admin tasks
- [ ] Create `mobile/src/features/admin/events/` for on-site check-in

### Acceptance criteria
- [ ] Ticket cannot be checked in twice
- [ ] Event attendance analytics update in near real-time

---

## Phase 8 - Community Moderation Hub

### Goal
Safety-first community operations with AI assistance.

### Backend tasks
- [ ] Add moderation case and action models
- [ ] Add report queue + case state transitions
- [ ] Add AI toxicity score endpoint integration

### Web tasks
- [ ] Add moderation queue tab:
  - reports
  - flagged comments
  - action history

### Mobile admin tasks
- [ ] Add quick moderation actions in mobile admin app

### Acceptance criteria
- [ ] Moderator actions are permission-scoped and logged
- [ ] SLA dashboard for pending cases exists

---

## Phase 9 - Mobile App Control Center

### Goal
Remote control of mobile experience without app redeploy.

### Backend tasks
- [ ] Add tables/endpoints for:
  - feature flags
  - app layout configs
  - push campaigns
  - A/B experiments
- [ ] Add rollout targeting rules by role/region/version

### Web tasks
- [ ] Add feature flag console in admin web
- [ ] Add push composer + audience targeting

### Mobile app tasks
- [ ] Add runtime config fetch in mobile app startup
- [ ] Respect feature flags per screen/module

### Acceptance criteria
- [ ] Toggling a feature flag updates mobile behavior without new build
- [ ] Push campaigns support schedule + analytics

---

## Phase 10 - AI, BI, DevOps, and Compliance

### Goal
Enterprise readiness for analytics, observability, and legal compliance.

### Backend tasks
- [ ] Add BI endpoints for DAU/MAU, retention, funnel, event trends
- [ ] Add export endpoints (CSV/PowerBI payload)
- [ ] Add infra status endpoints (DB, queues, storage, deploys)
- [ ] Add compliance endpoints:
  - privacy requests
  - API keys
  - policy management

### Web tasks
- [ ] Build BI dashboard and export actions
- [ ] Add security/compliance center section

### Acceptance criteria
- [ ] Admin can export BI datasets
- [ ] Compliance actions are fully auditable

---

## Phase 11 - QA, Release, and Operations

### Backend quality gates
- [ ] `python manage.py makemigrations --check`
- [ ] `python manage.py test`
- [ ] endpoint permission tests for every admin route

### Web quality gates
- [ ] `npm run lint` in `web/`
- [ ] role-based UI tests for hidden/visible actions
- [ ] smoke test all admin tabs

### Mobile quality gates
- [ ] runtime feature-flag tests on Expo
- [ ] critical moderator/admin task smoke tests

### Release checklist
- [ ] Update docs in `docs/admin/*`
- [ ] Add migration/rollback notes
- [ ] Tag release and changelog

---

## Suggested Sprint Plan (8 weeks)

- Week 1: Phase 1
- Week 2: Phase 2
- Week 3: Phase 3 + 4
- Week 4: Phase 5
- Week 5: Phase 6
- Week 6: Phase 7 + 8
- Week 7: Phase 9 + 10
- Week 8: Phase 11 and launch hardening

---

## Immediate Next Build Order (practical)

1. RBAC hardening and audit logs
2. Admin API gateway namespace
3. Dashboard data aggregation endpoints
4. User-role matrix and moderation case model
5. Feature flags and push campaign backend
