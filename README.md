# DATAFORGE — Hackathon Registration Website

A premium, editorial-style registration site for a 48-hour national hackathon hosted by the Data Science Club, VIT Bhopal. Built as a **frontend-only** submission for the Software Development Team Recruitment (Round 1, Task 2).

**Live site:** https://dataforge-two-azure.vercel.app
**Repository:** https://github.com/heynikcse/dataforge

---

## Tech Stack

| Tool | Purpose |
|---|---|
| **React 18 (Vite)** | Component-based UI, fast dev server & build |
| **Tailwind CSS + PostCSS/Autoprefixer** | Utility-first responsive styling |
| **GSAP + ScrollTrigger** | All entrance, scroll, and interaction animations |
| **Lenis** | Buttery smooth-scrolling, synced to the GSAP ticker |
| **Vercel** | Live deployment, auto-redeploys on every push to `main` |

---

## Mandatory Sections

| Section | File | What it does |
|---|---|---|
| Home | `Hero.jsx` | Hero section with a blur-to-sharp letter-by-letter title reveal ("DATAFORGE") and the interactive 3D Retro TV centerpiece. |
| About | `About.jsx` | Intro copy about the event, plus a 4-stat row (Hours / Hackers / Prize Pool / Mentors) using the CountUp component. |
| Schedule | `Schedule.jsx` | 3-day vertical timeline with a scroll-scrubbed progress fill, dots that light up as you reach each day, and events that sharpen into focus on scroll. |
| Prizes | `Prizes.jsx` | Animated prize-pool total, plus a breakdown of Winner / Runner-up / Best Rookie Team tiers with amounts and perks. |
| Sponsors | `Sponsors.jsx` | Responsive sponsor grid tile layout with a sponsorship-contact line. |
| Registration Form | `Register.jsx` | Live countdown to the registration deadline, a spotlight-on-hover form card (name, email, team size, track), client-side submit state, and a confirmation message. |

---

## Bonus / Creative Features

The brief asked for 3+ creative features — this project has considerably more, all built from scratch with GSAP:

1. **3D Retro TV Hero Centerpiece** (`RetroTV.jsx`) — A real 6-faced 3D cube (CRT screen on the front face) that falls, spins, and bounces into place on load, then plays a looping video (`tv-loop.mp4`) on its screen with CRT scanline and glow overlays. Once landed, it's **fully draggable** — click/touch and drag left-right to spin it, complete with inertia on release.
2. **Letter-by-Letter "Bulb Glow" Headings** (`BulbHeading.jsx`) — Reusable component that splits any heading into letters and, the first time it scrolls into view, lights each one up in random order with an orange glow that settles into a soft resting glow. Used across About, Schedule, Sponsors, and Register.
3. **Animated Stat Counters** (`CountUp.jsx`) — Numbers count up from 0 to their target once scrolled into view, with locale-aware formatting (₹, +, decimals) and an optional coin-flip spinning prefix animation (used for the ₹3,00,000 prize total).
4. **Live Registration Countdown** (`Register.jsx`) — A real-time days/hours/minutes/seconds countdown to the registration deadline that updates every second and automatically switches to "REGISTRATION CLOSED" after the deadline passes.
5. **Neural-Network Canvas Background** (`BackgroundAnimation.jsx`) — A full-page `<canvas>` animation of drifting nodes connected by distance-based lines (with occasional binary digits), plus subtle mouse-parallax drift — evokes a flowing dataset without ever competing with the text.
6. **Scroll-Scrubbed Timeline Progress** (`Schedule.jsx`) — The vertical timeline's fill bar is tied directly to scroll position via `ScrollTrigger`, growing smoothly as you scroll through the 3-day schedule.
7. **Cursor-Spotlight Form Card** (`Register.jsx`) — The registration card tracks the mouse and renders a soft radial glow exactly under the cursor on hover.
8. **Full-Screen Animated Menu Overlay** (`MenuOverlay.jsx`) — A slide-down navigation panel with staggered item entrance/exit animations, closes on `Escape`, outside click, or item select.
9. **Smooth-Scroll Experience** (`useLenis.js`) — Lenis is wired directly into GSAP's ticker so every scroll-driven animation (ScrollTrigger) stays perfectly in sync with the eased, smooth scroll — not just the raw native scroll.
10. **Page-Load Transition** (`App.jsx`) — A loader overlay fades out only once the Retro TV has finished its entrance animation, so the reveal feels intentional rather than abrupt.

---

## Project Structure

```
dataforge/
├── Task 1_Product Thinking.pdf
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── videos/
│       └── tv-loop.mp4          # looping video played inside the Retro TV screen
└── src/
    ├── main.jsx
    ├── App.jsx                  # page assembly, loader transition, scroll state
    ├── index.css                # design tokens, typography, animation CSS
    ├── hooks/
    │   └── useLenis.js          # Lenis smooth scroll synced to GSAP ticker
    └── components/
        ├── Navbar.jsx           # floating nav strip, scroll-aware styling
        ├── MenuOverlay.jsx      # fullscreen animated navigation panel
        ├── Hero.jsx             # title reveal + Retro TV section
        ├── RetroTV.jsx          # draggable 3D CRT cube with looping video
        ├── BulbHeading.jsx      # reusable letter-by-letter glow heading
        ├── BackgroundAnimation.jsx  # canvas neural-network background
        ├── About.jsx            # intro + stat counters
        ├── CountUp.jsx           # animated number counter
        ├── Schedule.jsx          # 3-day scroll-scrubbed timeline
        ├── Prizes.jsx             # prize pool + tiers
        ├── Sponsors.jsx           # sponsor grid
        ├── Register.jsx          # countdown + registration form
        └── Footer.jsx             # socials + credits
```

---

## Running Locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

This outputs a static `dist/` folder — that's what gets deployed.

---

## Deployment

Live on **Vercel**, connected directly to this GitHub repository:

- Build command: `npm run build` (Vercel auto-detects Vite)
- Output directory: `dist`
- Every push to `main` redeploys automatically.

---

## Note

The registration form (`Register.jsx`) is frontend-only per the assignment brief — form submission currently simulates success on the client and would need to be wired to a real endpoint (e.g. Formspree, Google Forms, or a custom API route) before going live for an actual event.

---

Made by **Nikhil** for the Data Science Club, VIT Bhopal.
