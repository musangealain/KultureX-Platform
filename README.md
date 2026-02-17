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

## Quick Start

### 1. Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

API root: `http://127.0.0.1:8000/api/v1/`

### 2. Web

```bash
cd web
npm install
copy .env.example .env.local
npm run dev
```

Web app: `http://localhost:3000`

### 3. Mobile

```bash
cd mobile
npm install
copy .env.example .env
npm run start
```

## Implementation Status

This baseline includes scalable project scaffolding, domain models, API routing, and client integration foundations. Feature-complete workflows (checkout, payments, moderation workflow, analytics, notifications) are tracked in `docs/roadmap.md`.
