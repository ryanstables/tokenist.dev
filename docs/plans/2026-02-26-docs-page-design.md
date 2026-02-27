# Docs Page Design — 2026-02-26

## Overview

Add a `/docs` page to tokenist.dev with sidebar + content panel layout. Documents the three public SDK HTTP endpoints and the `tokenist-js` TypeScript SDK.

## Routing & Files

- New: `src/app/docs/page.tsx` — static `/docs` page
- Modified: `src/components/Header.tsx` — add "Docs" nav link
- Modified: `src/components/Footer.tsx` — fix dead "Documentation" href to `/docs`

## Layout

Two-column layout below the shared Header:
- Left: `w-64` sticky sidebar, `sticky top-[65px]`, anchored below the header
- Right: fluid scrollable content area

## Sidebar Structure

```
Getting Started
SDK Reference
  └─ POST /sdk/check
  └─ POST /sdk/record
  └─ POST /sdk/log
TypeScript SDK
  └─ Installation
  └─ client.sdk.check()
  └─ client.sdk.record()
  └─ client.sdk.log()
```

Active section highlighted via IntersectionObserver scroll tracking.

## Content Sections

### Getting Started
- 3–4 sentence intro to what Tokenist does and who the SDK is for
- Step 1: Get an API key (link to dashboard)
- Step 2: Install the SDK (`npm install tokenist-js`)

### HTTP API Reference (for each of 3 endpoints)
- Method + path badge
- One-line description
- Request body table: field / type / required / description
- Response table
- JSON code block (request + response example)

### TypeScript SDK
- `npm install` + import snippet
- One section per method: TypeScript call signature + usage example with types

## Styling

- Matches site exactly: Roboto Mono, green CSS vars throughout
- Code blocks: `bg-[var(--fg)]` dark background, `text-[var(--accent-light)]` text (on-brand, same dark green as footer)
- HTTP method badges: POST in green accent
- Sidebar active state: `text-[var(--accent)]` + left border highlight

## Header/Footer Changes

- `Header.tsx`: Add `{ label: "Docs", href: "/docs" }` to `nav` array
- `Footer.tsx`: Update `Documentation` href from `"#"` to `"/docs"`
