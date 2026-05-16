# Chord

An opinionated design language and UI library for building beautiful web applications. By [dqnamo](https://dqnamo.com).

## Stack

- **Next.js 16** + **React 19**
- **Tailwind CSS 4** for styling
- **Base UI** (headless components)
- **Radix Colors** for themeable color scales
- **Phosphor Icons**
- **Biome** for linting and formatting

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Components

Copy-paste components live in `components/public/`:

- **Button** — primary and secondary variants
- **TextLink** — styled anchor
- **Tabs** — tabbed navigation with animated indicator
- **Switch** — toggle switch

## Theming

Chord supports swappable grayscale and accent color palettes via Radix Colors. Pick your colors from the homepage and the theme persists in localStorage.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Lint with Biome |
| `npm run format` | Format with Biome |
| `npm run check` | Lint + format check |
