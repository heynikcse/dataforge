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
