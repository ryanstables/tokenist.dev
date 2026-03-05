import { CopyCodeButton } from "@/components/CopyCodeButton";

const wsSnippet = `const ws = new WebSocket(
  'wss://proxy.tokenist.dev/v1/realtime?model=gpt-4o-realtime-preview',
  {
    headers: {
      'x-user-id':  'user_abc123',   // required — identifies the user
      'x-org-id':   'org_xyz',       // optional — org-level grouping
      'x-feature':  'voice-assistant', // optional — cost by feature
    },
  }
);

// That's it. Guardrails apply automatically.
// Over limit → close code 4004. Blocked → 4003.`;

const sdkSnippet = `import OpenAI from 'openai';

// 1. Point your client at Tokenist instead of OpenAI
const client = new OpenAI({
  baseURL: 'https://proxy.tokenist.dev',
  apiKey: process.env.TOKENIST_API_KEY,
});

// 2. Use the SDK exactly as you would with OpenAI
const response = await client.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Hello' }],
});

// Usage tracked, limits enforced — nothing else changes.`;

export function CodeExample() {
  return (
    <section id="code" className="scroll-mt-20 bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-[var(--border)] bg-[var(--accent-light)] px-4 py-1 text-sm font-medium text-[var(--accent-dim)]">
            Integration
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            Change one line. Get full visibility.
          </h2>
          <p className="mt-4 text-lg text-[var(--fg-muted)]">
            Point your client at Tokenist, add identity headers, done. No SDK
            to install. No application code to restructure.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-white shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] px-4 py-3 bg-[var(--bg-elevated)]">
              <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--success)]" />
              <span className="ml-3 font-mono text-xs font-medium text-[var(--fg-muted)] uppercase tracking-wider">
                Realtime API (WebSocket)
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
                Chat Completions (SDK)
              </span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-sm text-[var(--fg)]">
              <code>{sdkSnippet}</code>
            </pre>
            <CopyCodeButton text={sdkSnippet} />
          </div>
        </div>
        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--accent-light)] px-6 py-4 text-center">
          <p className="text-sm text-[var(--accent-dim)]">
            Integration takes ~30 minutes. Read the{" "}
            <a href="/docs" className="font-medium underline underline-offset-2 hover:opacity-80">
              full docs
            </a>{" "}
            for SDK endpoints, threshold configuration, and dashboard setup.
          </p>
        </div>
      </div>
    </section>
  );
}
