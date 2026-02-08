export function ProductOverview() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--bg-elevated)] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div>
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
            <ul className="mt-6 space-y-3 text-[var(--fg)]">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>
                  <strong>Per-user accounting</strong> — Token and cost
                  tracking by user and optional organization.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>
                  <strong>Enforcement guardrails</strong> — Cost and token
                  limits with immediate connection closure when exceeded.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>
                  <strong>Blocklist</strong> — Block users by ID with optional
                  reason and expiry.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>
                  <strong>Admin API & dashboard</strong> — Query usage, set
                  limits, and manage users without touching application code.
                </span>
              </li>
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-card)]">
              <span className="text-sm text-[var(--fg-muted)]">
                [ Image placeholder: architecture diagram — client → proxy → upstream ]
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
