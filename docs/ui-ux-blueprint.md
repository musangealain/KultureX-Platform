# KultureX UI/UX Blueprint

## 1) Web UI

### Homepage Concept
Tone: dark, cinematic, neon-accented, streetwear-energy.

Wireframe:

```text
+---------------------------------------------------------------+
| Glass Header: Logo | Home | Articles | Skate | Store | ...  |
+---------------------------------------------------------------+
| HERO                                                        |
| "Own the culture signal..."                                 |
| Tags: Skate / Fashion / Events / Creator Economy            |
| CTA: Explore Shop | Discover Events                         |
| Metrics: Modules, Roles, Web+Mobile, Culture Data           |
+---------------------------------------------------------------+
| Culture Pulse Cards (3 columns)                             |
| Editorial | Drops | Event Grid                              |
+---------------------------------------------------------------+
| Spotlight Story + Scene Timeline                            |
+---------------------------------------------------------------+
```

Sample homepage content:
- Headline: `Own the culture signal across stories, streetwear, and sessions.`
- Subtext: `KultureX is a unified youth culture operating system where creators publish, skaters discover scenes, and brands launch products with real community energy.`

### Articles / News Page
Purpose: editorial credibility + creator discoverability.

Wireframe:

```text
+--------------------+
| Page Intro         |
| Creator journalism |
+--------------------+
| Top Stories Grid   |
| [story cards with status chips + author + read time]       |
+--------------------+
| Editorial Workflow Timeline                                |
| Draft -> Submitted -> Approved -> Published                |
+--------------------+
```

Dummy headlines:
- `Inside The DIY Ramp Movement Rebuilding Local Skate Spots`
- `Streetwear After Midnight: The Rise Of Reflective Utility Fits`
- `Session Economics: How Small Brands Sponsor Crews`

### Shop Page (3D UI Concept)
Purpose: premium commerce with depth and movement.

Wireframe:

```text
+-------------------------------+
| Intro: "Streetwear drops ..."|
+-------------------------------+
| 3D Drop Room (depth cards)   |
| [rotated card] [rotated card]|
| [rotated card] [rotated card]|
+-------------------------------+
| WebGL Upgrade Path Timeline  |
| R3F Canvas -> Scroll Camera  |
| Fallback cards -> API overlay|
+-------------------------------+
```

Dummy products:
- `Neon Rail Deck 8.25`
- `Pulse Runner Jacket`
- `Streetline Utility Bag`
- `Night Session Wheels 54mm`

### Events Page
Purpose: discovery -> RSVP -> ticket flow.

Wireframe:

```text
+----------------------------+
| Intro + Event Narrative    |
+----------------------------+
| Upcoming Calendar Cards    |
| Session | Pop-up | Talk    |
+----------------------------+
| Interaction Pattern List   |
| Map/List toggle, quick RSVP|
+----------------------------+
```

Dummy events:
- `KX Street Jam: Downtown Lines`
- `Future Fabric Night Market`
- `Night Wheels Open Qualifier`

### Community / Author Profile Page
Purpose: creator identity + follow graph + role visibility.

Wireframe:

```text
+----------------------------+
| Intro: creator ecosystem   |
+----------------------------+
| Featured Creator Cards     |
| name + discipline + handle |
+----------------------------+
| Profile UX Direction list  |
| follow, pinned reels, etc. |
+----------------------------+
```

Dummy creators:
- `Nia Volt` - Street Skate
- `Kairo Lane` - Fashion Design
- `Mara Flux` - Editorial

## 2) Mobile UI

Navigation:
- Bottom tabs: `Articles`, `Store`, `Events`, `Profile`
- Auth stack: `Landing -> Login`
- Gesture-friendly cards, larger hit targets, strong hierarchy.

Mobile landing structure:

```text
+--------------------------------+
| Brand Row (KX)                |
| Glass Hero Card               |
| - Headline                    |
| - Highlights chips            |
| - Enter KultureX CTA          |
| Footer                        |
+--------------------------------+
```

Mobile screen pattern:
- Gradient page background
- Glass section header
- Reusable info cards with role/status badges
- Pull-to-refresh for data feeds

## 3) 3D Shop Experience Direction

Current (implemented now):
- CSS 3D product cards (`perspective`, `rotateX/rotateY`, neon glow).
- Hover lifts and depth transitions.

Phase 2 (futuristic):
- React Three Fiber hero canvas per collection.
- Rotating GLB models (jackets/decks/shoes).
- Scroll timeline controlling camera.
- SKU detail panel layered over WebGL scene.
- Fallback to static cards for reduced-motion and low-end devices.

## 4) Animation & Interaction Patterns

- Page reveal: short `fade + rise` on route load.
- Neon hover: card border glow increases on focus/hover.
- Sticky glass header: backdrop blur with subtle shadow.
- Shop depth motion: cards flatten slightly on hover for realism.
- Mobile auth transition: fade-from-bottom stack animation.
- Pull-to-refresh: keeps list interactions tactile on mobile.

## 5) Image & Media Suggestions

Categories:
- Street skate action (rails, bowls, night sessions)
- Streetwear portraits / editorial lookbooks
- Event crowd energy / stage / urban spaces
- Creator portraits and behind-the-scenes work

Example source links:
- Unsplash skate search: `https://unsplash.com/s/photos/skateboarding`
- Unsplash streetwear search: `https://unsplash.com/s/photos/streetwear`
- Unsplash nightlife city search: `https://unsplash.com/s/photos/neon-city`
- Pexels skate videos: `https://www.pexels.com/search/videos/skateboarding/`
- Pexels street fashion: `https://www.pexels.com/search/streetwear/`
- Pexels event crowd: `https://www.pexels.com/search/concert%20crowd/`

Placeholder images:
- `https://picsum.photos/seed/kx-skate/1200/800`
- `https://picsum.photos/seed/kx-fashion/1200/800`
- `https://picsum.photos/seed/kx-event/1200/800`

## 6) React/Next Component Structure (Suggested)

```text
web/
  app/
    page.tsx
    articles/page.tsx
    store/page.tsx
    events/page.tsx
    community/page.tsx
  src/components/
    layout/GlassHeader.tsx
    sections/HeroSection.tsx
    cards/StoryCard.tsx
    cards/Product3DCard.tsx
    cards/EventCard.tsx
    cards/CreatorCard.tsx
```

Mobile structure:

```text
mobile/src/
  navigation/{AuthStack,AppTabs,RootNavigator}.tsx
  screens/{Landing,Login,Articles,Store,Events,Profile}.tsx
  components/{ScreenContainer,InfoCard}.tsx
  theme/tokens.ts
```

## 7) Design Tokens (CSS/Tailwind-ready)

Core tokens:
- `--bg-0: #05070f`
- `--bg-1: #0b1224`
- `--surface: rgba(13,20,40,.72)`
- `--text-0: #f4f8ff`
- `--text-1: #b8c4de`
- `--accent-cyan: #3cf5ff`
- `--accent-pink: #ff5ad9`
- `--accent-lime: #b8ff44`
- `--accent-orange: #ff9330`

Typography:
- Display: `Syne`
- Body/UI: `Space Mono`

Spacing scale:
- `6, 10, 14, 18, 24`

Radius scale:
- `12, 16, 22`

Motion:
- Fast: `170ms`
- Standard: `240ms`
- Enter transitions: `440-550ms`
