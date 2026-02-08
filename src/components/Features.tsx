const features = [
  {
    title: "Identity & headers",
    description:
      "Clients send x-user-id (required) and optional x-org-id on the WebSocket handshake. In-memory or MongoDB modes; proxy API keys (ug_...) when using MongoDB.",
  },
  {
    title: "Per-user usage & cost",
    description:
      "Input and output tokens estimated from realtime events. Cost from configurable model pricing. In-memory (LRU) or MongoDB; optional Redis for multi-instance.",
  },
  {
    title: "Usage windows",
    description:
      "When MongoDB is enabled: daily (UTC midnight), monthly, or rolling_24h. Default and per-user window configurable.",
  },
  {
    title: "Guardrail thresholds",
    description:
      "Per-user max_cost_usd and max_total_tokens. Enforced on connect and after each message; connection closed with defined close codes when exceeded.",
  },
  {
    title: "Blocklist",
    description:
      "Block by user ID with optional reason and expiry. Unblock and list blocked users via admin API. Blocked users cannot open new connections.",
  },
  {
    title: "Admin HTTP API",
    description:
      "Health, user usage, list users, set threshold, block/unblock, list blocked. With MongoDB: create user, rotate key, usage by period, org summary.",
  },
  {
    title: "Dashboard",
    description:
      "React + Next.js app for org-level visibility: total cost, filters by period (monthly/daily/rolling 24h), feature, and users. Refreshes on interval and focus.",
  },
  {
    title: "Protocols & latency",
    description:
      "WebSocket primary; WebRTC supported. Designed for sub-10ms added latency; bidirectional relay with lightweight parsing and policy checks.",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-b border-[var(--border)] bg-[var(--bg)] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            Everything you need to control realtime AI usage
          </h2>
          <p className="mt-4 text-lg text-[var(--fg-muted)]">
            Developer-friendly, minimal configuration. No SDK lock-in—just a
            thin proxy that enforces limits and keeps usage under your control.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 transition-colors hover:border-[var(--accent-dim)]/50"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <h3 className="font-display text-lg font-semibold text-[var(--fg)]">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--fg-muted)]">{f.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <h3 className="font-display text-lg font-semibold text-[var(--fg)]">
            Connection close codes
          </h3>
          <p className="mt-2 text-sm text-[var(--fg-muted)]">
            Consistent close codes so clients can handle failures.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              { code: "4001", meaning: "Missing user ID" },
              { code: "4003", meaning: "User blocked" },
              { code: "4004", meaning: "Threshold exceeded" },
              { code: "4502", meaning: "Upstream error" },
            ].map((row) => (
              <div
                key={row.code}
                className="flex items-center gap-3 rounded-lg bg-[var(--bg-elevated)] px-3 py-2 font-mono text-sm"
              >
                <span className="text-[var(--accent)]">{row.code}</span>
                <span className="text-[var(--fg-muted)]">{row.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
