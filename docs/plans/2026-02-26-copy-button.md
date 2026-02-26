# Copy Button Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a clipboard icon copy button to the top-right corner of every code block on the site that copies the raw code text to the clipboard and swaps to a checkmark for 2 seconds.

**Architecture:** One shared `CopyCodeButton` client component takes a `text` prop and an optional `className` for icon colour tuning. The async `CodeBlock` server component wraps its output in a `relative` div and renders the button alongside the Shiki HTML. `CodeExample` extracts each snippet to a `const` and adds the button inside each `relative` panel div. No new dependencies needed — clipboard API and inline SVGs only.

**Tech Stack:** React `"use client"`, `navigator.clipboard`, `useState`/`setTimeout`, Tailwind CSS 4, Next.js App Router.

---

## Task 1: Create CopyCodeButton

**Files:**
- Create: `src/components/CopyCodeButton.tsx`

**Step 1: Create the file**

```tsx
"use client";

import { useState } from "react";

export function CopyCodeButton({
  text,
  className = "text-[var(--fg)]/50 hover:text-[var(--fg)]",
}: {
  text: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={copy}
      aria-label={copied ? "Copied!" : "Copy code"}
      className={`absolute right-2 top-2 rounded-md p-1.5 transition-colors ${className}`}
    >
      {copied ? (
        // Checkmark icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        // Clipboard icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="9" y="2" width="6" height="4" rx="1" />
          <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
        </svg>
      )}
    </button>
  );
}
```

**Step 2: Verify build**

```bash
cd /Volumes/ssd/Repos/tokenist/tokenist.dev && npm run build
```

Expected: Build completes. No TypeScript errors.

**Step 3: Commit**

```bash
cd /Volumes/ssd/Repos/tokenist/tokenist.dev && git add src/components/CopyCodeButton.tsx && git commit -m "feat: add CopyCodeButton client component"
```

---

## Task 2: Wire CopyCodeButton into CodeBlock (docs page)

**Files:**
- Modify: `src/app/docs/page.tsx` (lines 39–61)

### Context

The current `CodeBlock` returns a self-closing `<div>` with `dangerouslySetInnerHTML`. Since you can't mix `dangerouslySetInnerHTML` with children, the copy button needs a separate sibling div inside an outer `relative` wrapper.

**Step 1: Add the import**

At line 5, after the existing imports, add:
```tsx
import { CopyCodeButton } from "@/components/CopyCodeButton";
```

**Step 2: Replace the CodeBlock return statement**

Find (lines 54–60):
```tsx
  return (
    <div
      className="overflow-x-auto rounded-xl bg-[var(--fg)] px-5 py-4 text-sm leading-relaxed [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: shiki output is trusted
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
```

Replace with:
```tsx
  return (
    <div className="relative">
      <div
        className="overflow-x-auto rounded-xl bg-[var(--fg)] px-5 py-4 text-sm leading-relaxed [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: shiki output is trusted
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <CopyCodeButton
        text={children.trim()}
        className="text-white/40 hover:text-white/90"
      />
    </div>
  );
```

**Step 3: Verify build**

```bash
cd /Volumes/ssd/Repos/tokenist/tokenist.dev && npm run build
```

Expected: Build completes, all 4 static pages generated. No TypeScript errors.

**Step 4: Verify lint**

```bash
cd /Volumes/ssd/Repos/tokenist/tokenist.dev && npm run lint
```

Expected: No errors.

**Step 5: Commit**

```bash
cd /Volumes/ssd/Repos/tokenist/tokenist.dev && git add src/app/docs/page.tsx && git commit -m "feat: add copy button to docs CodeBlock"
```

---

## Task 3: Wire CopyCodeButton into CodeExample (landing page)

**Files:**
- Modify: `src/components/CodeExample.tsx`

### Context

`CodeExample.tsx` has two Mac-style code panels. Each panel has an outer `<div>` containing a title bar and a `<pre><code>` block. The code strings are currently inline template literals — they need to be extracted to `const` variables so the same string can be passed to both `<code>` and `<CopyCodeButton>`.

The two snippets are:

**Snippet 1** (WebSocket connection):
```
const ws = new WebSocket(
  'wss://proxy.example.com/v1/realtime?model=gpt-4o-realtime-preview',
  {
    headers: {
      'x-user-id': 'user_abc123',
      'x-org-id': 'org_xyz',  // optional
    },
  }
);
```

**Snippet 2** (OpenAI client):
```
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://proxy.example.com',
  apiKey: process.env.OPENAI_API_KEY, // or proxy key in MongoDB mode
});

// Identity for usage tracking (e.g. via custom fetch/headers)
// Tokenist reads x-user-id and x-org-id from WebSocket handshake
const realtime = await client.beta.realtime.connect({
  model: 'gpt-4o-realtime-preview',
  // ... pass user/org in your connection layer
});
```

**Step 1: Rewrite CodeExample.tsx**

Replace the entire file with:

```tsx
import { CopyCodeButton } from "@/components/CopyCodeButton";

const wsSnippet = `const ws = new WebSocket(
  'wss://proxy.example.com/v1/realtime?model=gpt-4o-realtime-preview',
  {
    headers: {
      'x-user-id': 'user_abc123',
      'x-org-id': 'org_xyz',  // optional
    },
  }
);`;

const openaiSnippet = `import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://proxy.example.com',
  apiKey: process.env.OPENAI_API_KEY, // or proxy key in MongoDB mode
});

// Identity for usage tracking (e.g. via custom fetch/headers)
// Tokenist reads x-user-id and x-org-id from WebSocket handshake
const realtime = await client.beta.realtime.connect({
  model: 'gpt-4o-realtime-preview',
  // ... pass user/org in your connection layer
});`;

export function CodeExample() {
  return (
    <section id="code" className="scroll-mt-20 bg-[var(--bg-elevated)] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-[var(--border)] bg-[var(--accent-light)] px-4 py-1 text-sm font-medium text-[var(--accent-dim)]">
            Integration
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            Minimal integration
          </h2>
          <p className="mt-4 text-lg text-[var(--fg-muted)]">
            Point your OpenAI-style client at the proxy URL and send identity
            headers. No SDK lock-in.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-white shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] px-4 py-3 bg-[var(--bg-elevated)]">
              <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--success)]" />
              <span className="ml-3 font-mono text-xs font-medium text-[var(--fg-muted)] uppercase tracking-wider">
                Connect to proxy (WebSocket)
              </span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-sm text-[var(--fg)]">
              <code>{wsSnippet}</code>
            </pre>
            <CopyCodeButton text={wsSnippet} />
          </div>
          <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-white shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] px-4 py-3 bg-[var(--bg-elevated)]">
              <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--success)]" />
              <span className="ml-3 font-mono text-xs font-medium text-[var(--fg-muted)] uppercase tracking-wider">
                OpenAI client with baseUrl
              </span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-sm text-[var(--fg)]">
              <code>{openaiSnippet}</code>
            </pre>
            <CopyCodeButton text={openaiSnippet} />
          </div>
        </div>
        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--accent-light)] px-6 py-4 text-center">
          <p className="text-sm text-[var(--accent-dim)]">
            Guardrails apply automatically. Over limit or blocked? Connection
            closes with a defined code (4003, 4004) so your client can handle it.
          </p>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify build**

```bash
cd /Volumes/ssd/Repos/tokenist/tokenist.dev && npm run build
```

Expected: Build completes. No TypeScript errors.

**Step 3: Verify lint**

```bash
cd /Volumes/ssd/Repos/tokenist/tokenist.dev && npm run lint
```

Expected: No errors.

**Step 4: Commit**

```bash
cd /Volumes/ssd/Repos/tokenist/tokenist.dev && git add src/components/CodeExample.tsx && git commit -m "feat: add copy button to landing page code examples"
```
