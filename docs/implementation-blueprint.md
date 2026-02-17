# KultureX Implementation Blueprint

## 1. File Structure

```text
KultureX/
  backend/
    apps/
      analytics/
      articles/
      community/
      events/
      health/
      media/
      skate/
      store/
      users/
    config/
      settings/
  web/
    app/
    src/features/
    src/lib/api/
  mobile/
    src/screens/
    src/features/
    src/api/
  docs/
```

## 2. Database Models

Core models currently implemented:

- `users.User`: role-based identity (`registered`, `author`, `editor`, `admin`)
- `articles.Article`: content workflow (`draft`, `submitted`, `approved`, `rejected`, `published`)
- `articles.Category`, `articles.Tag`
- `store.Product`, `store.Cart`, `store.CartItem`, `store.Order`, `store.OrderItem`, `store.Payment`
- `events.Event`, `events.TicketType`, `events.TicketBooking`, `events.RSVP`
- `community.CreatorProfile`, `community.Follow`
- `media.MediaAsset` (generic relation for gallery assets)

## 3. API Endpoints

Base: `/api/v1/`

- Auth/User
  - `POST /auth/token/`
  - `POST /auth/token/refresh/`
  - `GET /auth/me/`
  - `GET/POST /users/`

- Articles CMS
  - `GET/POST /articles/`
  - `POST /articles/{id}/submit/`
  - `POST /articles/{id}/approve/`
  - `POST /articles/{id}/reject/`
  - `POST /articles/{id}/publish/`
  - `GET/POST /articles/categories/`
  - `GET/POST /articles/tags/`

- Store
  - `GET/POST /store/products/`
  - `GET/POST /store/carts/`
  - `POST /store/carts/{id}/checkout/`
  - `GET/POST /store/cart-items/`
  - `GET/POST /store/orders/`
  - `GET/POST /store/order-items/`
  - `GET/POST /store/payments/`

- Events
  - `GET/POST /events/`
  - `GET/POST /events/ticket-types/`
  - `GET/POST /events/bookings/`
  - `GET/POST /events/rsvps/`

- Community/Media/Admin
  - `GET/POST /community/profiles/`
  - `GET/POST /community/follows/`
  - `GET/POST /media/assets/`
  - `GET /admin/analytics/`

## 4. Frontend Components

Recommended web components:

- `Navbar`: auth state + domain navigation
- `ArticleEditor`: author submit flow + tag/category assignment
- `EditorialQueue`: editor approve/reject/publish actions
- `ProductCatalog`, `CartDrawer`, `CheckoutPanel`
- `EventList`, `TicketBookingPanel`
- `ProfileDashboard`: profile, orders, events, article status
- `AdminAnalyticsCards`: metrics from `/admin/analytics/`

## 5. Mobile App Structure

Recommended feature slices:

- `screens/ArticlesScreen.tsx`
- `screens/StoreScreen.tsx`
- `screens/EventsScreen.tsx`
- `screens/CommunityScreen.tsx`
- `features/articles/api.ts`
- `features/store/api.ts`
- `features/events/api.ts`
- `features/community/api.ts`
- `api/client.ts` for shared JWT-aware requests

## 6. Deployment Guide

Deployment topology:

- Nginx reverse proxy
- Gunicorn serving Django (`backend`)
- Next.js web app runtime
- PostgreSQL managed DB
- S3-compatible media storage

Baseline steps:

1. Build API and web containers
2. Run DB migrations
3. Configure env secrets (JWT, DB, CORS, payment keys)
4. Route `/api/*` through Nginx to Gunicorn
5. Serve web app and static/media via Nginx + object storage

## 7. Code Snippets

Role-based article moderation:

```python
if request.user.role not in {UserRole.EDITOR, UserRole.ADMIN}:
    return Response({"detail": "Editor or Admin role required."}, status=403)
```

Cart checkout to order:

```python
order = Order.objects.create(user=cart.user, status="pending")
for cart_item in cart.items.select_related("product"):
    OrderItem.objects.create(
        order=order,
        product=cart_item.product,
        quantity=cart_item.quantity,
        unit_price=cart_item.product.price,
    )
order.recalculate_total()
```
