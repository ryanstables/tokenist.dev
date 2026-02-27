# Syntax Highlighting Design — 2026-02-26

## Overview

Add syntax highlighting to all `CodeBlock` usages on the `/docs` page using Shiki, keeping the existing dark green background.

## Approach

- Library: **Shiki** (server-side, zero runtime JS, works with `force-static`)
- Theme: **github-dark** (standard dark theme — blue keywords, orange strings, purple types, grey comments)
- Background: Shiki's generated background is overridden with `background: transparent` so `bg-[var(--fg)]` continues to control it

## Changes

### package.json
- Add `shiki` to dependencies

### src/app/docs/page.tsx
- Add `lang` prop back to `CodeBlock`: `{ children: string; lang?: string }`
- Convert `CodeBlock` to `async` function using `codeToHtml()` from `shiki`
- Use `dangerouslySetInnerHTML` to render Shiki's HTML output
- Wrap in the existing `<pre>` classes (background, padding, border-radius)
- Tag all 31 call sites with the appropriate `lang`:
  - `lang="bash"` — shell commands (`npm install ...`)
  - `lang="json"` — API request/response bodies
  - `lang="typescript"` — SDK usage examples, interface definitions, middleware pattern

## No other files change
`DocsSidebar.tsx`, `Header.tsx`, `Footer.tsx`, `MobileMenu.tsx` are untouched.
