export function ProductOverview() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-[var(--bg-elevated)] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
          {/* Visual */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-lg p-6">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                    Tokenist SDK flow
                  </p>
                  <ol className="mt-4 space-y-4 text-sm text-[var(--fg-muted)]">
                    {[
                      "Import the @tokenist/guardrails Node module or call the REST endpoints from any backend.",
                      "Attach user identity (userId, orgId, feature) before you send a request to your LLM provider.",
                      "Call tokenist.check() to see if the user is allowed, then tokenist.record() after you get a response.",
                      "Use intent labels (frustration, jailbreak, ToS breach, etc.) to trigger automatic blocks or throttle logic.",
                    ].map((step, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="font-semibold text-[var(--fg)]">{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="rounded-xl border border-dashed border-[var(--accent)]/60 bg-[var(--accent-light)] px-4 py-3 text-xs text-[var(--accent-dim)]">
                  Works with Chat Completions, Responses, Realtime, embeddings — wherever you make LLM calls.
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <span className="mb-4 inline-block rounded-full border border-[var(--border)] bg-[var(--accent-light)] px-4 py-1 text-sm font-medium text-[var(--accent-dim)]">
              How it works
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
              Drop-in SDK + REST guardrails for your LLM stack
            </h2>
            <p className="mt-4 text-lg text-[var(--fg-muted)]">
              Tokenist plugs into your server-side code. You keep calling OpenAI (or any other provider) exactly as you do today — we just wrap each request with usage tracking, policy checks, and intent detection.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                {
                  title: "Node-first, API everywhere",
                  desc: "Use the TypeScript client when you're on Node, or hit the REST endpoints from any language/runtime.",
                },
                {
                  title: "Per-user accounting",
                  desc: "Usage, cost, and rules scoped to userId, orgId, or feature. Perfect for tiered plans and chargebacks.",
                },
                {
                  title: "Intent-aware guardrails",
                  desc: "Tokenist uses GPT-4o-mini to label every conversation — jailbreak attempt, ToS breach, frustration, win. Hook those signals into blocklists or custom automation.",
                },
                {
                  title: "One rules engine",
                  desc: "Set limits, send alerts, or block users from a single dashboard. No more scattered scripts or cron jobs.",
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
