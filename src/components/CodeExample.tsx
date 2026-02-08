export function CodeExample() {
  return (
    <section id="code" className="scroll-mt-20 border-b border-[var(--border)] bg-[var(--bg-elevated)] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            Minimal integration
          </h2>
          <p className="mt-4 text-lg text-[var(--fg-muted)]">
            Point your OpenAI-style client at the proxy URL and send identity
            headers. No SDK lock-in.
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-[var(--fg-muted)]">
              Connect to proxy (WebSocket)
            </h3>
            <pre className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 font-mono text-sm text-[var(--fg)]">
              <code>{`const ws = new WebSocket(
  'wss://proxy.example.com/v1/realtime?model=gpt-4o-realtime-preview',
  {
    headers: {
      'x-user-id': 'user_abc123',
      'x-org-id': 'org_xyz',  // optional
    },
  }
);`}</code>
            </pre>
          </div>
          <div>
            <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-[var(--fg-muted)]">
              OpenAI client with baseUrl
            </h3>
            <pre className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 font-mono text-sm text-[var(--fg)]">
              <code>{`import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://proxy.example.com',
  apiKey: process.env.OPENAI_API_KEY, // or proxy key in MongoDB mode
});

// Identity for usage tracking (e.g. via custom fetch/headers)
// Tokenist reads x-user-id and x-org-id from WebSocket handshake
const realtime = await client.beta.realtime.connect({
  model: 'gpt-4o-realtime-preview',
  // ... pass user/org in your connection layer
});`}</code>
            </pre>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-[var(--fg-muted)]">
          Guardrails apply automatically. Over limit or blocked? Connection
          closes with a defined code (4003, 4004) so your client can handle it.
        </p>
      </div>
    </section>
  );
}
