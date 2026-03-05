const features = [
  {
    title: "Per-user cost tracking",
    description:
      "See exactly what each user is spending, broken down by token type and model. Updated in real-time across 60+ OpenAI models — text, audio, cached, and reasoning tokens all counted.",
    icon: "📊",
  },
  {
    title: "Rate limits & thresholds",
    description:
      "Set per-user cost or token limits. Enforced at connection time and after every message — connections close automatically when users exceed their allowance, with clean error codes your client can handle.",
    icon: "🛡️",
  },
  {
    title: "AI quality monitoring",
    description:
      "Every conversation is automatically classified by GPT-4o-mini on an hourly schedule. Surface task failures, user frustration, jailbreak attempts, and lazy responses — without reading a single log.",
    icon: "🧠",
  },
  {
    title: "Feature-level attribution",
    description:
      "Tag requests by product area — voice-assistant, customer-support, onboarding — and see exactly which features are driving your LLM bill. Filter the dashboard by feature in one click.",
    icon: "🏷️",
  },
  {
    title: "User blocklist",
    description:
      "Block abusive or over-limit users instantly by ID. Optionally set a reason and expiry. Blocked users cannot open new connections until you lift the block via the admin API.",
    icon: "🚫",
  },
  {
    title: "Admin API & dashboard",
    description:
      "Query usage, adjust thresholds, and manage users programmatically via REST. Or use the visual dashboard for org-level cost overviews, period filters, and per-user breakdowns.",
    icon: "⚡",
  },
  {
    title: "Usage windows",
    description:
      "Configure limits on a daily, monthly, or rolling 24-hour window. Set a default for your whole org, then override per user when you need to give someone more headroom.",
    icon: "📅",
  },
  {
    title: "Transparent proxy",
    description:
      "Sub-10ms added latency. Tokenist relays WebSocket traffic bidirectionally with lightweight policy checks — your users get the same low-latency experience as calling OpenAI directly.",
    icon: "🔄",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-[var(--border)] bg-[var(--accent-light)] px-4 py-1 text-sm font-medium text-[var(--accent-dim)]">
            Features
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            Everything you need to control your LLM spend
          </h2>
          <p className="mt-4 text-lg text-[var(--fg-muted)]">
            Drop-in proxy with no SDK lock-in. Point your client at Tokenist,
            add identity headers, and you&apos;re live.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-[var(--border-subtle)] bg-white p-6 shadow-sm transition-all hover:border-[var(--border)] hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-light)] text-xl">
                {f.icon}
              </div>
              <h3 className="font-display text-base font-semibold text-[var(--fg)]">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
