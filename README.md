# DATAFORGE — Data Science Club Hackathon

Premium, editorial hackathon site built with React + Vite + Tailwind + GSAP + Lenis.

**Live:** https://dataforge-two-azure.vercel.app

**Repo:** https://github.com/heynikcse/dataforge

## Project structure

```
dataforge/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css                     # tokens, typography, animation CSS
    ├── hooks/
    │   └── useLenis.js               # Lenis smooth scroll wired to GSAP ticker
    └── components/
        ├── Navbar.jsx                # floating nav strip, scroll-extend, custom cursor
        ├── Hero.jsx                  # centered title reveal, presented-by block
        ├── BackgroundAnimation.jsx   # canvas neural-network background
        ├── MenuOverlay.jsx           # fullscreen slide-down navigation
        ├── About.jsx                 # intro copy + stat row
        ├── CountUp.jsx               # animated count-up numbers (used in About's stats)
        ├── Schedule.jsx              # 3-day event timeline
        ├── Prizes.jsx                # prize tiers
        ├── Sponsors.jsx              # sponsor grid
        └── Register.jsx              # registration form UI
```

## 1. Run it locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## 2. Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

This outputs a static `dist/` folder — that's what gets deployed.

## 3. Push changes to GitHub

The repo is already set up and connected to Vercel, so any push to `main`
triggers a new production deployment automatically.

```bash
git add .
git commit -m "Describe your change"
git push
```

## 4. Deployment

Already live on Vercel, connected directly to this GitHub repo:

- Build command: `npm run build` (Vercel auto-detects Vite)
- Output directory: `dist`
- Every push to `main` redeploys automatically — check the **Deployments**
  tab on Vercel or the commit checkmark on GitHub to confirm a build succeeded.

To deploy a different branch or preview a change before merging, open a
pull request — Vercel will generate a preview URL for it automatically.
