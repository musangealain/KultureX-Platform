# KultureX Admin API Endpoint Design (REST)

## 1. API Conventions

- Base URL: `/api/v1/admin/`
- Auth: JWT (`Authorization: Bearer <token>`)
- Required headers: `X-Request-Id` for traceability
- Pagination: `?page=1&page_size=25`
- Filtering: `?status=published&q=term`
- Sorting: `?ordering=-created_at`

## 2. Role Access Matrix (Abbreviated)

- `super_admin`: all endpoints
- `admin`: all business endpoints
- `moderator`: moderation and limited user/content actions
- `editor`: article review and publication
- `author`: own content endpoints only

## 3. Endpoint Catalog

## 3.1 Auth and Security

- `POST /auth/login/` admin login + session registration
- `POST /auth/refresh/` refresh access token
- `POST /auth/logout/` revoke current session
- `GET /auth/me/` current admin profile + effective permissions
- `POST /auth/2fa/challenge/` start 2FA
- `POST /auth/2fa/verify/` verify OTP/backup code
- `GET /security/sessions/` list active sessions
- `DELETE /security/sessions/{session_id}/` revoke session
- `GET /security/devices/` list trusted devices
- `PATCH /security/devices/{device_id}/` trust/untrust
- `GET /security/audit-logs/` privileged action logs

## 3.2 Master Dashboard and Health

- `GET /dashboard/overview/` KPI payload for dashboard cards
- `GET /dashboard/revenue-series/` time-series sales data
- `GET /dashboard/user-growth/` DAU/MAU trend
- `GET /dashboard/engagement-leaderboard/` top content and creators
- `GET /system/health/` API, DB, cache, queue health
- `GET /system/incidents/` open/closed incidents
- `GET /system/jobs/` background job states

## 3.3 User and RBAC

- `GET /users/` list users with filters
- `GET /users/{id}/` user detail
- `PATCH /users/{id}/` profile and state updates
- `POST /users/{id}/verify/` verify account
- `POST /users/{id}/warn/` send warning action
- `POST /users/{id}/suspend/` suspend account
- `POST /users/{id}/shadow-ban/` stealth ban
- `GET /users/{id}/timeline/` activity stream
- `GET /roles/` list roles
- `GET /permissions/` list permission atoms
- `GET /rbac/matrix/` role-permission matrix
- `PUT /rbac/users/{id}/roles/` assign roles atomically

## 3.4 Content and Media CMS

- `GET /content/articles/` list all articles
- `POST /content/articles/` create draft
- `GET /content/articles/{id}/` article detail
- `PATCH /content/articles/{id}/` edit article
- `POST /content/articles/{id}/submit/` send to editorial queue
- `POST /content/articles/{id}/approve/` approve
- `POST /content/articles/{id}/reject/` reject
- `POST /content/articles/{id}/publish/` publish
- `POST /content/articles/{id}/archive/` archive
- `GET /content/articles/{id}/versions/` revision history
- `POST /content/articles/{id}/restore-version/{version_id}/` rollback
- `GET /content/categories/`
- `POST /content/categories/`
- `GET /content/tags/`
- `POST /content/tags/`
- `POST /media/assets/` upload metadata registration
- `GET /media/assets/` media library search
- `POST /media/assets/{id}/derive/` trigger compress/transcode

## 3.5 Commerce Engine

- `GET /commerce/brands/`
- `POST /commerce/brands/`
- `GET /commerce/products/`
- `POST /commerce/products/`
- `PATCH /commerce/products/{id}/`
- `POST /commerce/products/{id}/3d-model/` upload 3D model metadata
- `GET /commerce/variants/`
- `POST /commerce/variants/`
- `GET /commerce/inventory/`
- `PATCH /commerce/inventory/{variant_id}/`
- `POST /commerce/inventory/{variant_id}/adjust/`
- `GET /commerce/orders/`
- `GET /commerce/orders/{id}/`
- `PATCH /commerce/orders/{id}/status/`
- `GET /commerce/payments/`
- `POST /commerce/payments/{id}/refund/`
- `GET /commerce/campaigns/`
- `POST /commerce/campaigns/`

## 3.6 Events and Ticketing

- `GET /events/`
- `POST /events/`
- `PATCH /events/{id}/`
- `POST /events/{id}/publish/`
- `GET /events/{id}/attendees/`
- `GET /events/{id}/analytics/`
- `GET /events/ticket-types/`
- `POST /events/ticket-types/`
- `GET /events/tickets/`
- `POST /events/tickets/{id}/check-in/` QR checkin endpoint
- `POST /events/{id}/livestream/start/`
- `POST /events/{id}/livestream/stop/`

## 3.7 Community Moderation

- `GET /moderation/reports/`
- `GET /moderation/cases/{id}/`
- `PATCH /moderation/cases/{id}/`
- `POST /moderation/cases/{id}/actions/` (warn/remove/suspend)
- `GET /moderation/queue/comments/`
- `POST /moderation/comments/{id}/remove/`
- `GET /moderation/toxicity/` model-scored queue
- `GET /moderation/policies/`
- `POST /moderation/policies/`

## 3.8 Mobile App Control

- `GET /mobile/feature-flags/`
- `POST /mobile/feature-flags/`
- `PATCH /mobile/feature-flags/{id}/`
- `GET /mobile/layout-configs/`
- `POST /mobile/layout-configs/`
- `PATCH /mobile/layout-configs/{id}/activate/`
- `POST /mobile/push-campaigns/`
- `GET /mobile/push-campaigns/{id}/delivery/`
- `POST /mobile/experiments/`
- `POST /mobile/experiments/{id}/start/`
- `POST /mobile/experiments/{id}/stop/`

## 3.9 AI and Recommendation

- `GET /ai/models/`
- `POST /ai/models/{id}/deploy/`
- `GET /ai/recommendations/articles-preview/?user_id=`
- `GET /ai/recommendations/products-preview/?user_id=`
- `GET /ai/trending/spots/`
- `GET /ai/moderation-assistant/suggestions/`
- `POST /ai/admin-assistant/query/`

## 3.10 Analytics and BI

- `GET /bi/kpis/?from=&to=`
- `GET /bi/cohorts/retention/`
- `GET /bi/conversion/funnel/`
- `GET /bi/events/attendance-trends/`
- `GET /bi/content/engagement/`
- `GET /bi/export/csv/?dataset=`
- `GET /bi/export/powerbi/?dataset=`

## 3.11 Compliance and DevOps

- `GET /infra/api-status/`
- `GET /infra/database/health/`
- `GET /infra/storage/usage/`
- `GET /infra/queues/`
- `GET /infra/deployments/`
- `GET /compliance/privacy-requests/`
- `POST /compliance/privacy-requests/{id}/process/`
- `GET /compliance/policies/`
- `GET /keys/`
- `POST /keys/`
- `DELETE /keys/{id}/`

## 4. Sample Response Shape

```json
{
  "id": 102,
  "status": "published",
  "created_at": "2026-02-19T10:20:05Z",
  "updated_at": "2026-02-19T10:44:51Z"
}
```

## 5. Error Contract

```json
{
  "code": "RBAC_FORBIDDEN",
  "message": "Editor role required for this action.",
  "request_id": "req_01hzn...."
}
```
