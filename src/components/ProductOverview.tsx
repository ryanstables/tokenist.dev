export function ProductOverview() {
  return (
    <section className="bg-[var(--bg-elevated)] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
          {/* Image placeholder — left column */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-lg">
              {/* Architecture diagram placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                {/* Client block */}
                <div className="flex w-full max-w-xs items-center justify-between gap-3">
                  <div className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--accent-light)] px-3 py-2 text-center">
                    <div className="mx-auto mb-1 h-2 w-12 rounded bg-[var(--accent)]/40" />
                    <span className="text-xs font-medium text-[var(--accent-dim)]">Your Client</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="h-0.5 w-8 bg-[var(--accent)]/50" />
                    <span className="text-[10px] text-[var(--fg-muted)]">WS</span>
                  </div>
                  <div className="flex-1 rounded-lg border-2 border-[var(--accent)] bg-[var(--accent)]/10 px-3 py-2 text-center shadow-sm">
                    <div className="mx-auto mb-1 h-2 w-10 rounded bg-[var(--accent)]/50" />
                    <span className="text-xs font-semibold text-[var(--accent-dim)]">Tokenist</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="h-0.5 w-8 bg-[var(--accent)]/50" />
                    <span className="text-[10px] text-[var(--fg-muted)]">WS</span>
                  </div>
                  <div className="flex-1 rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-center">
                    <div className="mx-auto mb-1 h-2 w-12 rounded bg-[var(--border)]" />
                    <span className="text-xs font-medium text-[var(--fg-muted)]">OpenAI</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid w-full max-w-xs grid-cols-2 gap-2 pt-2">
                  {[
                    { label: "Tokens tracked", val: "↑ 2.4M" },
                    { label: "Cost saved", val: "$48.20" },
                    { label: "Users live", val: "312" },
                    { label: "Latency added", val: "<10ms" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2">
                      <p className="text-[10px] text-[var(--fg-muted)]">{s.label}</p>
                      <p className="text-sm font-semibold text-[var(--accent-dim)]">{s.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Text content — right column */}
          <div className="order-1 lg:order-2">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
              A thin proxy layer between your clients and AI providers
            </h2>
            <p className="mt-4 text-lg text-[var(--fg-muted)]">
              Tokenist acts as a WebSocket (and WebRTC) proxy between your
              application and AI realtime APIs. It supports different AI
              service providers and is designed for minimal (sub-10ms) added
              latency. Traffic is relayed bidirectionally with lightweight
              interception for token counting and policy checks—end-users get
              the same low-latency experience as calling the provider directly.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                {
                  title: "Per-user accounting",
                  desc: "Token and cost tracking by user and optional organization.",
                },
                {
                  title: "Enforcement guardrails",
                  desc: "Cost and token limits with immediate connection closure when exceeded.",
                },
                {
                  title: "Blocklist",
                  desc: "Block users by ID with optional reason and expiry.",
                },
                {
                  title: "Admin API & dashboard",
                  desc: "Query usage, set limits, and manage users without touching application code.",
                },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-light)]">
                    <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                  </span>
                  <span>
                    <strong className="text-[var(--fg)]">{item.title}</strong>
                    {" — "}
                    <span className="text-[var(--fg-muted)]">{item.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
