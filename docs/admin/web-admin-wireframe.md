# KultureX Web Admin UI Wireframe

## 1. Layout Blueprint

```text
+-----------------------------------------------------------------------------------------------------------+
| Left Sidebar (250)            | Main Workspace (fluid)                              | Right Rail (300)   |
|------------------------------ |----------------------------------------------------|--------------------|
| Profile + workspace switcher  | Top header: breadcrumb, page title, quick actions  | Resources           |
| Quick search (Ctrl+K)         |                                                    | Go further          |
| Primary nav (11 modules)      | Setup Card 1: Connect source / actions             | Help articles       |
| Internal monitoring section   | Setup Card 2: Incident guidance                    |                    |
| Trial card / utility links    | KPI snapshot grid                                  |                    |
| API environment info          | Domain panels (content/commerce/events etc.)       |                    |
+-----------------------------------------------------------------------------------------------------------+
```

## 2. Page Sections

### 2.1 Top Header (Global Command Layer)

- Global breadcrumb (`Get started > Dashboard`)
- Main heading
- Global actions:
  - Refresh state
  - Create (context-aware)
  - Notifications
  - Security/profile menu

### 2.2 Sidebar Information Architecture

1. Master Dashboard
2. User and Role Management
3. Content and Media CMS
4. Shop and Commerce Engine
5. Events and Ticketing
6. Community Moderation
7. Mobile App Control Center
8. AI and Recommendation Engine
9. Analytics and BI
10. Infrastructure and DevOps
11. Security and Compliance

### 2.3 Main Content Region

- `overview`: setup cards + KPI cards + workflow snapshot
- `products`: form column + list column
- `events`: form column + list column
- `authors`: role assignment table
- `articles`: moderation queue with action buttons

### 2.4 Right Rail

- Documentation links
- Tactical shortcuts
- Help knowledge base links

## 3. Component Structure (React)

```text
AdminPortal
  AdminTopBar
  AdminSidebar
    SidebarProfile
    SidebarSearch
    SidebarNav
    SidebarGroups
  AdminWorkspace
    WorkspaceHeader
    OverviewPane | ProductsPane | EventsPane | AuthorsPane | ArticlesPane
  AdminRightRail
    ResourceCard
    ActionCard
    HelpCard
```

## 4. Interaction Notes

- Sidebar nav item hover: subtle translate + border emphasis
- Active nav: high-contrast black state
- Main cards: soft hover shadow
- Buttons: black primary with disabled opacity
- Keyboard:
  - `Ctrl+K` quick search
  - `Esc` close overlays

## 5. Responsive Behavior

- `>= 1300px`: 3-column layout
- `980px - 1299px`: right rail wraps below workspace
- `< 980px`: stacked layout with sidebar first
