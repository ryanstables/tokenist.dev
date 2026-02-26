# Copy Button Design — 2026-02-26

## Overview

Add a clipboard icon copy button to the top-right corner of every code block on the site. On click, copies the raw code text to the clipboard and swaps the icon to a checkmark for 2 seconds.

## Surfaces

- **`/docs` page** — 16 `CodeBlock` components (async Server Components, Shiki-highlighted, dark background)
- **Landing page `#code` section** — 2 raw `<pre>` blocks inside Mac-style window chrome (`CodeExample.tsx`)

## Approach

Shared `CopyCodeButton` client component used on both surfaces. Server Components stay async — React handles the client boundary automatically.

## Components

### New: `src/components/CopyCodeButton.tsx`

- `"use client"`
- Props: `{ text: string }`
- State: `copied: boolean`, reset to `false` after 2000ms via `setTimeout`
- Position: `absolute top-2 right-2`
- Idle: clipboard SVG icon, semi-transparent (`opacity-40 hover:opacity-100`)
- Copied: checkmark SVG icon, green (`text-[var(--success)]`)
- Uses `navigator.clipboard.writeText(text)`
- Inline SVGs (no external icon library)

### Modified: `src/app/docs/page.tsx`

- Import `CopyCodeButton`
- Add `relative` to the wrapper `<div>` className in `CodeBlock`
- Render `<CopyCodeButton text={children.trim()} />` inside the wrapper

### Modified: `src/components/CodeExample.tsx`

- Import `CopyCodeButton`
- Extract each inline template literal to a `const` variable
- Add `relative` to each code panel's outer `<div>`
- Render `<CopyCodeButton text={snippet} />` inside each panel

## No other files change
