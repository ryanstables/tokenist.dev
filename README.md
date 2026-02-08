# Tokenist — Marketing Website

Single-page marketing site for [Tokenist](https://tokenist.dev): Guardrails as a Service for realtime AI APIs.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **TypeScript**

## Content

- **Product copy:** `docs/PRODUCT.md`
- **Pricing tiers:** `docs/PRICING.md`

Sections: Hero, Product overview, Features, Code examples, Pricing, FAQ. Header and footer with in-page anchors. Placeholder areas are marked for hero and product images; replace with real assets when ready.

## Run locally

```bash
cd tokenist
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy

Suitable for Vercel, Netlify, or any static/Node host. Configure root directory as `tokenist` if the repo root is the monorepo.
