const features = [
  {
    title: "Node SDK + REST",
    description:
      "Call `tokenist.check()` before your LLM request and `tokenist.record()` afterward. Works in Node via the TypeScript client or any stack via REST.",
    icon: "🧩",
  },
  {
    title: "Per-user cost tracking",
    description:
      "Get live token + cost data per user, org, and feature across every OpenAI model you use. Perfect for tiered plans, internal chargebacks, and budgeting.",
    icon: "📊",
  },
  {
    title: "Intent-aware guardrails",
    description:
      "GPT-4o-mini labels every conversation (jailbreak, ToS breach, frustration, win). Use those signals to trigger automatic blocks, extra auth, or throttling.",
    icon: "🧠",
  },
  {
    title: "Limits & automation",
    description:
      "Create cost or token rules per user/tier, send Slack/webhook alerts, or auto-upgrade plans when someone hits a threshold.",
    icon: "⚙️",
  },
  {
    title: "Feature-level attribution",
    description:
      "Tag each request with `feature` and see which product surfaces burn budget. Route expensive workflows to cheaper models before the bill arrives.",
    icon: "🏷️",
  },
  {
    title: "Block & throttle users",
    description:
      "Add anyone to the blocklist (with optional expiry) or impose rolling 24h limits. Perfect for dealing with policy violators without killing the whole app.",
    icon: "🚫",
  },
  {
    title: "Dashboards + API parity",
    description:
      "Everything you can do in the dashboard (usage, limits, alerts) is available through the API. Automate whatever you don’t want to click through manually.",
    icon: "📈",
  },
  {
    title: "Audit-ready logs",
    description:
      "Store request/response metadata for compliance and debugging. Opt-in to full payload logging when you need it, keep it lean when you don’t.",
    icon: "🗃️",
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
            The guardrails layer for every AI product
          </h2>
          <p className="mt-4 text-lg text-[var(--fg-muted)]">
            No proxies, no infra surgery. Just import the SDK (or call the REST
            API) and start tracking.
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
