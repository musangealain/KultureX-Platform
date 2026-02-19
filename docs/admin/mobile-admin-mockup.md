# KultureX Mobile Admin App UI Mockup

## 1. App Purpose

Mobile Admin is a remote command panel for admins/moderators to manage KultureX without desktop access.

## 2. Navigation Model

- Bottom tabs:
  - `Dashboard`
  - `Users`
  - `Content`
  - `Commerce`
  - `Events`
  - `Push`
- Global top actions:
  - Search
  - Alerts
  - Profile/2FA

## 3. Screen Mockups (Text Wireframes)

### 3.1 Dashboard Tab

```text
[Top Bar: KultureX Admin | alerts]
-----------------------------------
Today Revenue       Active Users
Incidents Open      Events Live
-----------------------------------
[Card] Queue Health
[Card] Content moderation backlog
[Card] Commerce conversion trend
```

### 3.2 Users Tab

```text
[Search users]
[Filter chips: role, status, verification]
-----------------------------------
@userA   Author     Verified
Actions: Warn | Suspend | Role
-----------------------------------
@userB   Registered Flagged
Actions: Review timeline
```

### 3.3 Content Tab

```text
[Submission queue]
Article title
Author | submitted_at
Actions: Approve | Reject | Publish
-----------------------------------
[Comment moderation queue]
```

### 3.4 Commerce Tab

```text
[Inventory alerts]
SKU-001 low stock
Action: Reorder / adjust
-----------------------------------
[Orders requiring action]
Order #A1201 status: pending-fulfillment
```

### 3.5 Events Tab

```text
[Upcoming events]
Event card
Actions: Publish | Notify attendees
-----------------------------------
[QR Scanner]
Scan ticket -> check-in result
```

### 3.6 Push Tab

```text
Create campaign
- audience segment
- title/body
- schedule time
[Send now] [Schedule]

Campaign analytics:
delivery rate | open rate
```

## 4. Mobile Component Tree

```text
MobileAdminApp
  RootTabs
    DashboardScreen
    UsersScreen
    ContentScreen
    CommerceScreen
    EventsScreen
    PushScreen
  Shared
    AdminSearchBar
    KpiTile
    ActionSheet
    StatusBadge
```

## 5. Mobile RBAC Behavior

- Moderators: moderation + reports + limited user actions
- Editors: content workflow only
- Admins/Super Admins: full tab access

Tabs render dynamically by role permission map from `/api/v1/admin/auth/me/`.
