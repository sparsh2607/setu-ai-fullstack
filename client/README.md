# Setu AI — Frontend

A premium, animation-rich React frontend for **Setu AI**, an AI-powered government scheme
discovery assistant. Built with React + Vite + Tailwind CSS + Framer Motion.

## What's inside

- **Hero** — a hand-built "3D" bridge scene (real CSS `perspective`/`rotateX`/`rotateY`/`translateZ`
  layered planes, no WebGL dependency) with a traveling light-pulse along an animated SVG cable,
  mouse-parallax tilt, floating glass cards, and animated stat counters.
- **Pipeline** — the 3-step RAG explainer (hard filter → semantic retrieval → grounded explanation)
  with a scroll-driven progress line.
- **Features** — a bento-grid of feature cards with 3D tilt-on-hover, a live WhatsApp mock
  conversation, and a mini before/after match demo.
- **Dashboard preview** — a fully tilted 3D "app window" mockup with animated match cards and
  an animated bar chart, all driven by scroll-into-view.
- **Trust** — DPDP-Act-aligned privacy/security cards.
- Global: custom cursor, magnetic buttons, glassmorphic nav, scroll progress bar, grain texture,
  full `prefers-reduced-motion` support, and mobile-responsive layouts throughout.

## Setup

Requires [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # to preview the production build locally
```

The production build outputs to `dist/` — deploy that folder to Vercel, Netlify, or any static host.

## Project structure

```
src/
  components/
    Hero.jsx              — hero section + 3D bridge scene
    BridgeScene.jsx        — the animated 3D bridge (CSS 3D + SVG)
    Navbar.jsx              — glassmorphic nav + mobile menu
    Pipeline.jsx            — RAG 3-step explainer
    Features.jsx            — bento feature grid
    DashboardPreview.jsx    — tilted 3D dashboard mockup
    Trust.jsx               — privacy/security cards
    FinalCTA.jsx / Footer.jsx / TrustStrip.jsx
    CustomCursor.jsx / ScrollProgress.jsx / MagneticButton.jsx
    TiltCard.jsx / Reveal.jsx / Counter.jsx   — reusable interaction primitives
  App.jsx     — assembles all sections
  main.jsx    — React entry point
  index.css   — Tailwind directives + a few global utility classes
tailwind.config.js  — design tokens (colors, spacing, durations)
```

## Design tokens

| Token | Value | Use |
|---|---|---|
| `paper` | `#FAF9F6` | page background |
| `ink` | `#0F172A` | primary text |
| `teal` / `teal-deep` / `teal-soft` | `#0D9488` / `#0B7A70` / `#E4F5F3` | primary accent |
| `amber` / `amber-deep` / `amber-soft` | `#F59E0B` / `#D97E06` / `#FDF0DA` | secondary accent |
| Display font | Fraunces | headings |
| Body font | Inter | UI text |
| Mono font | JetBrains Mono | tags, data |

## Notes

- All animation respects `prefers-reduced-motion` automatically.
- The custom cursor and magnetic buttons disable themselves on touch devices.
- No backend is wired up — this is the frontend layer only, built against the mock data
  described in the Setu AI roadmap docs. Connect it to your real `/match`, `/schemes`, etc.
  endpoints when the backend is ready.
