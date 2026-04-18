# Atlasify — Project Context

## What this is
Atlasify is a commercial map poster generator built on top of the terraink MIT snapshot (commit d952c59, April 2 2026 — one day before they switched to AGPL). Deployed at KshitijKoranne/Atlasify on GitHub. Built and maintained under KJR Labs (kjrlabs.in) by Kshitij Koranne (@kshitijkoranne on X).

## Tech stack
- Vite + React + TypeScript
- MapLibre GL for rendering
- OpenFreeMap (free, no API key) for vector tiles
- Nominatim for geocoding
- Deployed on Vercel

## Monetization plan
One-time purchase via Razorpay for high-res exports (2K / 4K / 8K PNG). Free tier gets standard PNG, PDF, SVG. Razorpay is NOT yet wired — the 3 pro buttons exist in the UI but are disabled placeholders.

## Current state (as of this context file)
### Done
- Full rebrand from terraink → Atlasify
- 23 themes (Atlas, Cyberpunk, Ember, Ruby, Emerald, Noir, Dusk, Terracotta, Saffron, Coral, Sage, Forest, Ocean, Sand, Arctic, Copper, Patina, Parchment, Blueprint, Ink Wash, Monochrome, Slate, Mist)
- Amber accent design language throughout the app UI
- Nav labels renamed: Place / Style / Size / Text / Details / Pins
- Export panel: always-visible with PNG/PDF/SVG (free) + 2K/4K/8K (pro, disabled)
- Landing page (Framer-inspired, pure black, amber accent, poster stack hero, scrolling theme pills, feature cards, how-it-works steps)
- PWA / browser routing split: browser → landing page, /app or standalone → editor
- Startup modal: Search + Coordinates tab (lat/lon input with reverse geocoding)
- About / Help Us Grow removed
- X social button hardcoded to https://x.com/kshitijkoranne
- vercel.json for SPA routing (/app rewrite)
- DESIGN.md (Framer design system) in project root

### Not yet done
1. Razorpay paywall for 2K/4K/8K export
2. Real poster screenshot for landing page hero (placeholder frame currently shown)
3. Privacy policy / Terms pages
4. OG image for social sharing

## Key files
- `src/App.tsx` — routing: landing vs app
- `src/LandingPage.tsx` — landing page component
- `src/styles/landing.css` — landing page styles
- `src/shared/ui/AppShell.tsx` — app shell (desktop + mobile layout)
- `src/shared/ui/GeneralHeader.tsx` — top header bar
- `src/shared/ui/DesktopNavBar.tsx` — left sidebar nav tabs
- `src/features/export/ui/DesktopExportFab.tsx` — export panel (free + pro buttons)
- `src/features/location/ui/StartupLocationModal.tsx` — startup modal with search + coords
- `src/features/theme/infrastructure/themeRepository.ts` — theme ordering
- `src/data/themes.json` — all 23 theme definitions
- `src/styles/desktop.css` — desktop layout + export panel CSS (1300+ lines)
- `src/core/config.ts` — env vars + app constants
- `public/site.webmanifest` — PWA manifest (start_url: /app)
- `vercel.json` — /app SPA rewrite

## Env vars (set on Vercel)
```
VITE_REPO_URL=https://github.com/KshitijKoranne/Atlasify
VITE_REPO_API_URL=https://api.github.com/repos/KshitijKoranne/Atlasify
VITE_DEVELOPER_NAME=KJR Labs
VITE_DEVELOPER_PROFILE_URL=https://kjrlabs.in
VITE_SOCIAL_X=https://x.com/kshitijkoranne
VITE_APP_CREDIT_URL=atlasify.kjrlabs.in
```

## Design system
- App UI: dark navy background (#080f18), amber accent rgba(196,148,60), Bebas Neue display, Spline Sans Mono labels, Instrument Sans body
- Landing page: pure black (#000), amber accent (#d4a43a), Bebas Neue headings, Inter body — see DESIGN.md (Framer-inspired)
- Theme naming convention: evocative single words preferred (Atlas, Ember, Parchment, not "Midnight Blue", "Heatwave", "Rustic")

## GitHub
Repo: https://github.com/KshitijKoranne/Atlasify
Token scope needed: repo (classic PAT)

## Next priorities
1. Wire Razorpay — one-time purchase modal, verify payment, unlock hi-res download
2. Real landing page screenshot — take a poster screenshot and replace the placeholder frame in LandingPage.tsx
3. Privacy + Terms pages (needed before Razorpay goes live)
4. OG/social meta image
