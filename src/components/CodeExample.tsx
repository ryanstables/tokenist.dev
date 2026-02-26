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
