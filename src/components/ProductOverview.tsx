export function ProductOverview() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-[var(--bg-elevated)] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
          {/* Architecture diagram — left column */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-lg">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-6">
                {/* Flow diagram */}
                <div className="flex w-full max-w-xs items-center justify-between gap-2">
                  <div className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--accent-light)] px-3 py-2 text-center">
                    <div className="mx-auto mb-1 h-2 w-12 rounded bg-[var(--accent)]/40" />
                    <span className="text-xs font-medium text-[var(--accent-dim)]">Your App</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5 shrink-0">
                    <div className="h-0.5 w-6 bg-[var(--accent)]/50" />
                    <span className="text-[10px] text-[var(--fg-muted)]">WS</span>
                  </div>
                  <div className="flex-1 rounded-lg border-2 border-[var(--accent)] bg-[var(--accent)]/10 px-3 py-2 text-center shadow-sm">
                    <div className="mx-auto mb-1 h-2 w-10 rounded bg-[var(--accent)]/50" />
                    <span className="text-xs font-semibold text-[var(--accent-dim)]">Tokenist</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5 shrink-0">
                    <div className="h-0.5 w-6 bg-[var(--accent)]/50" />
                    <span className="text-[10px] text-[var(--fg-muted)]">WS</span>
                  </div>
                  <div className="flex-1 rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-center">
                    <div className="mx-auto mb-1 h-2 w-12 rounded bg-[var(--border)]" />
                    <span className="text-xs font-medium text-[var(--fg-muted)]">OpenAI</span>
                  </div>
                </div>

                {/* What Tokenist does in the middle */}
                <div className="w-full max-w-xs rounded-xl border border-[var(--accent)]/20 bg-[var(--accent-light)] px-4 py-3">
                  <p className="text-center text-xs font-semibold text-[var(--accent-dim)] mb-2">Tokenist intercepts every message to:</p>
                  <ul className="space-y-1">
                    {[
                      "Track tokens + cost per user",
                      "Enforce limits in real-time",
                      "Log for audit & analysis",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[10px] text-[var(--fg-muted)]">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Latency badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                  <span className="text-xs font-medium text-[var(--fg)]">&lt;10ms added latency</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text content — right column */}
          <div className="order-1 lg:order-2">
            <span className="mb-4 inline-block rounded-full border border-[var(--border)] bg-[var(--accent-light)] px-4 py-1 text-sm font-medium text-[var(--accent-dim)]">
              How it works
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
              One URL change. Full visibility into every user.
            </h2>
            <p className="mt-4 text-lg text-[var(--fg-muted)]">
              Tokenist sits between your app and OpenAI as a transparent WebSocket
              proxy. You swap the endpoint URL and add two identity headers. Your
              users notice nothing — but you see everything.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                {
                  title: "Per-user cost accounting",
                  desc: "Token and cost tracking per user and optional organisation, across every model you use.",
                },
                {
                  title: "Limits that actually enforce",
                  desc: "Connections are rejected or closed the moment a user exceeds their threshold — not after the fact.",
                },
                {
                  title: "Built for the Realtime API",
                  desc: "Purpose-built for OpenAI's WebSocket Realtime API, with full audio token tracking and sub-10ms relay.",
                },
                {
                  title: "Runs on Cloudflare's edge",
                  desc: "Deployed globally on Cloudflare Workers. Fast everywhere, no single point of failure.",
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
