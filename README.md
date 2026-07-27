# DATAFORGE — Data Science Club Hackathon

Premium, editorial hero site built with React + Vite + Tailwind + GSAP + Lenis.

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
    ├── index.css              # tokens, typography, animation CSS
    ├── hooks/
    │   └── useLenis.js        # Lenis smooth scroll wired to GSAP ticker
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── BackgroundAnimation.jsx   # canvas neural-network background
        └── MenuOverlay.jsx
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

## 3. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — DATAFORGE hero"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## 4. Deploy to Vercel

**Option A — Vercel dashboard (no CLI needed)**
1. Go to https://vercel.com/new
2. Import the GitHub repo you just pushed.
3. Vercel auto-detects the framework as **Vite** — leave the defaults:
   - Build command: `npm run build` (or `vite build`)
   - Output directory: `dist`
   - Install command: `npm install`
4. Click **Deploy**. You'll get a live `*.vercel.app` URL in ~30 seconds.
5. (Optional) Add a custom domain under **Project → Settings → Domains**.

**Option B — Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel            # first run: link/create the project, deploys a preview
vercel --prod     # ships to your production domain
```

No environment variables or serverless functions are needed — this is a fully static build.

## 5. Where to extend

- Replace the placeholder `#about / #schedule / #prizes / #sponsors / #register`
  sections in `App.jsx` with real content — the menu already links to them
  and Lenis will smooth-scroll to each anchor.
- Swap the hackathon name/date/location in `Hero.jsx` and the corner labels.
- Tailwind is configured (`tailwind.config.js`) with the brand tokens
  (`bg-base`, `text-orange`, `font-display`, `font-mono`, etc.) if you want
  to build the rest of the page with utility classes instead of raw CSS.
- `BackgroundAnimation.jsx` is a plain `<canvas>` — swap in a WebGL/video
  background later without touching layout, since it's isolated in its own
  component behind the dark scrim.
