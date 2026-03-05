import { CopyCodeButton } from "@/components/CopyCodeButton";

const nodeSnippet = `import { tokenist } from '@tokenist/guardrails';

tokenist.init({ apiKey: process.env.TOKENIST_API_KEY });

// 1. Before you call OpenAI
await tokenist.check({
  userId: 'user_abc123',
  feature: 'voice-assistant',
  model: 'gpt-4o-mini',
});

// 2. Call your provider as usual
const completion = await openai.responses.create({ ... });

// 3. Record usage + metadata (Tokenist handles cost calc)
await tokenist.record({
  userId: 'user_abc123',
  feature: 'voice-assistant',
  usage: completion.usage,
  sentiment: completion.response_text,
});`;

const restSnippet = `curl https://api.tokenist.dev/sdk/check \
  -H "Authorization: Bearer ug_..." \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_abc123",
    "feature": "support-bot",
    "model": "gpt-4o",
    "requestType": "chat"
  }'

# Response: { "allowed": true, "labels": ["safe"] }
# Use /sdk/record to log usage, /sdk/log for full payloads.`;

export function CodeExample() {
  return (
    <section id="code" className="scroll-mt-20 bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-[var(--border)] bg-[var(--accent-light)] px-4 py-1 text-sm font-medium text-[var(--accent-dim)]">
            Integration
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            Use the SDK or hit the REST endpoints
          </h2>
          <p className="mt-4 text-lg text-[var(--fg-muted)]">
            Works with any backend stack. Wrap your OpenAI calls with Tokenist
            and you get metering, guardrails, and intent detection instantly.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-white shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] px-4 py-3 bg-[var(--bg-elevated)]">
              <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--success)]" />
              <span className="ml-3 font-mono text-xs font-medium text-[var(--fg-muted)] uppercase tracking-wider">
                Node / TypeScript
              </span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-sm text-[var(--fg)]">
              <code>{nodeSnippet}</code>
            </pre>
            <CopyCodeButton text={nodeSnippet} />
          </div>
          <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-white shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] px-4 py-3 bg-[var(--bg-elevated)]">
              <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--success)]" />
              <span className="ml-3 font-mono text-xs font-medium text-[var(--fg-muted)] uppercase tracking-wider">
                REST (any backend)
              </span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-sm text-[var(--fg)]">
              <code>{restSnippet}</code>
            </pre>
            <CopyCodeButton text={restSnippet} />
          </div>
        </div>
        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--accent-light)] px-6 py-4 text-center">
          <p className="text-sm text-[var(--accent-dim)]">
            Need Python, Go, or another runtime? Hit the REST endpoints directly
            — same rules engine, same intent labels, same dashboard visibility.
          </p>
        </div>
      </div>
    </section>
  );
}
