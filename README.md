# KultureX

KultureX is a youth culture digital platform for skateboarding, fashion, events, and community storytelling.

This repository is structured as a modular monorepo:

- `backend/`: Django REST API + PostgreSQL-ready configuration
- `web/`: Next.js web client
- `mobile/`: React Native (Expo) app foundation
- `docs/`: architecture and delivery docs

## Product Domains

1. Media publishing (`articles`)
2. Skate culture (`skate`)
3. E-commerce (`store`)
4. Events and ticketing (`events`)
5. Community profiles (`community`)
6. Identity and RBAC (`users`)

## Architecture Summary

- Clean modular backend per domain app
- Token-based API authentication using JWT
- Role-based access controls for Creator, Editor, Organizer, Brand, and Admin workflows
- Shared service client conventions in web/mobile for API consistency
- Security-first defaults (env-based secrets, secure headers, CORS allowlist, strict auth classes)

See `docs/architecture.md` for full details.
Detailed implementation output is documented in `docs/implementation-blueprint.md`.

## Quick Start

### 1. Infrastructure

```bash
docker compose up -d
```

### 2. Backend setup (one-time)

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python manage.py makemigrations
python manage.py migrate
```

API root: `http://127.0.0.1:8000/api/v1/`

### 3. Web setup (one-time)

```bash
cd web
npm install
copy .env.example .env.local
```

### 4. Mobile setup (one-time)

```bash
cd mobile
npm install
copy .env.example .env
```

Mobile Sprint 1 now includes:

- Auth flow (JWT login + persisted session)
- App navigation (auth stack + bottom tabs)
- Core screens: Articles, Store, Events, Profile

If testing on a physical device, set `EXPO_PUBLIC_API_BASE_URL` in `mobile/.env` to your machine LAN IP (not `127.0.0.1`).

### 5. Run the project (recommended)

From repo root:

```bash
npm run dev
```

This starts:

- Django API (`backend`)
- Next.js web (`web`)

Optional (include mobile too):

```bash
npm run dev:mobile
```

Web app: `http://localhost:3000`

## Why This Strategy

KultureX is a monorepo with independent apps. Keeping API/web/mobile as separate processes is the correct scalable architecture. The root dev runner is only orchestration for convenience, not a coupling of runtimes.

## Implementation Status

This baseline includes scalable project scaffolding, domain models, API routing, and client integration foundations. Feature-complete workflows (checkout, payments, moderation workflow, analytics, notifications) are tracked in `docs/roadmap.md`.
