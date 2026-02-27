# Syntax Highlighting Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add server-side syntax highlighting to all code blocks on the `/docs` page using Shiki and the `github-dark` theme.

**Architecture:** Install `shiki`, convert `CodeBlock` to an async Server Component that calls `codeToHtml()`, add a `lang` prop, tag all 16 call sites. Shiki's generated `<pre>` background is overridden with Tailwind's arbitrary variant selector `[&_pre]:!bg-transparent` so the existing dark green `bg-[var(--fg)]` wrapper continues to control the background colour.

**Tech Stack:** Shiki (server-side syntax highlighter), Next.js 16 App Router async Server Components, Tailwind CSS 4 arbitrary variants.

---

## Important Context

- **File:** `src/app/docs/page.tsx` in `/Volumes/ssd/Repos/tokenist/tokenist.dev`
- **Static export:** `output: "export"` — async Server Components work fine because they are resolved at build time
- **Current `CodeBlock`** (line 38–44): sync, no `lang` prop, renders a `<pre>` with `bg-[var(--fg)]`
- **16 call sites** — language breakdown:
  - `bash` (2): `npm install tokenist-js` at lines 178 and 397
  - `json` (8): all API request/response body examples (lines 237, 247, 298, 311, 351, 372, and the two-column pair in each endpoint)
  - `typescript` (6): SDK usage examples, interface definitions, "Putting it together" middleware (lines 398, 418, 434, 460, 475, 497, 514, 535)
- **Shiki output:** `codeToHtml()` returns a full `<pre style="background-color:#24292e ...">` string. We inject it via `dangerouslySetInnerHTML` on a wrapper `<div>`, and use `[&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0` to strip Shiki's background and spacing so our Tailwind wrapper controls those.

---

## Task 1: Install Shiki

**Files:**
- Modify: `package.json` (via npm install)

**Step 1: Install shiki**

```bash
cd /Volumes/ssd/Repos/tokenist/tokenist.dev && npm install shiki
```

Expected: `shiki` added to `dependencies` in `package.json`. No errors.

**Step 2: Verify it resolves**

```bash
cd /Volumes/ssd/Repos/tokenist/tokenist.dev && node -e "require('shiki'); console.log('ok')"
```

Expected: prints `ok`.

**Step 3: Commit**

```bash
cd /Volumes/ssd/Repos/tokenist/tokenist.dev && git add package.json package-lock.json && git commit -m "feat: add shiki for server-side syntax highlighting"
```

---

## Task 2: Convert CodeBlock and tag all call sites

**Files:**
- Modify: `src/app/docs/page.tsx`

This is a single task because the `lang` prop and call-site changes must land together — a `lang` prop without tagged call sites (or vice versa) leaves the file in a broken intermediate state.

**Step 1: Replace the `CodeBlock` function (lines 38–44)**

Find the current `CodeBlock` function:
```tsx
function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-[var(--fg)] px-5 py-4 text-sm leading-relaxed text-[var(--accent-light)]">
      <code>{children.trim()}</code>
    </pre>
  );
}
```

Replace it with an async version that uses Shiki. You also need to add the import at the top of the file:

**Add import at the top of the file** (after the existing imports, before `export const dynamic`):
```tsx
import { codeToHtml } from "shiki";
```

**Replace the `CodeBlock` function with:**
```tsx
async function CodeBlock({
  children,
  lang = "typescript",
}: {
  children: string;
  lang?: string;
}) {
  const html = await codeToHtml(children.trim(), {
    lang,
    theme: "github-dark",
  });
  return (
    <div
      className="overflow-x-auto rounded-xl bg-[var(--fg)] px-5 py-4 text-sm leading-relaxed [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: shiki output is trusted
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
```

**Step 2: Tag the 2 bash call sites**

Find line 178 (Getting Started, Step 2):
```tsx
<CodeBlock>{`npm install tokenist-js`}</CodeBlock>
```
Change to:
```tsx
<CodeBlock lang="bash">{`npm install tokenist-js`}</CodeBlock>
```

Find line 397 (TypeScript SDK, Installation):
```tsx
<CodeBlock>{`npm install tokenist-js`}</CodeBlock>
```
Change to:
```tsx
<CodeBlock lang="bash">{`npm install tokenist-js`}</CodeBlock>
```

**Step 3: Tag the 8 JSON call sites**

Find each `<CodeBlock>` whose content starts with `{` (all API request/response bodies) and add `lang="json"`. There are exactly 8 of them — one pair per endpoint (check, record, log) plus two extra for log's two-column layout:

```
Line ~237  <CodeBlock>{`{            ← /sdk/check Request
Line ~247  <CodeBlock>{`{            ← /sdk/check Response (allowed)
Line ~298  <CodeBlock>{`{            ← /sdk/record Request
Line ~311  <CodeBlock>{`{            ← /sdk/record Response
Line ~351  <CodeBlock>{`{            ← /sdk/log Request
Line ~372  <CodeBlock>{`{            ← /sdk/log Response
```

Change each of these from `<CodeBlock>` to `<CodeBlock lang="json">`.

**Step 4: The remaining call sites are TypeScript — no change needed**

The `lang` prop defaults to `"typescript"`, so the following 6 call sites require no change:
- Line ~398: TokenistClient constructor
- Line ~418: sdk.check() usage example
- Line ~434: SdkCheckRequest/SdkCheckResponse interfaces
- Line ~460: sdk.record() usage example
- Line ~475: SdkRecordRequest interface
- Line ~497: sdk.log() usage example
- Line ~514: SdkLogRequest interface
- Line ~535: "Putting it together" middleware

**Step 5: Verify build**

```bash
cd /Volumes/ssd/Repos/tokenist/tokenist.dev && npm run build
```

Expected: Build completes. All 4 static pages generated. No TypeScript errors.

If you see an error about Shiki not being able to load language grammars, ensure `shiki` is in `dependencies` (not `devDependencies`).

**Step 6: Verify lint**

```bash
cd /Volumes/ssd/Repos/tokenist/tokenist.dev && npm run lint
```

Expected: No errors. The `dangerouslySetInnerHTML` eslint suppression comment handles any lint rules that flag that prop.

**Step 7: Commit**

```bash
cd /Volumes/ssd/Repos/tokenist/tokenist.dev && git add src/app/docs/page.tsx && git commit -m "feat: add syntax highlighting to /docs code blocks using shiki github-dark"
```
