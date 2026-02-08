import Link from "next/link";

const tiers = [
  {
    name: "Free",
    tagline: "Startups, small projects, early testing",
    price: "$0",
    period: "/mo",
    quota: "Up to 10M tokens monitored",
    overage: "10¢ per 1M extra tokens",
    features: [
      "Full core enforcement",
      "Basic dashboards + raw log export",
      "Community/email support",
    ],
    cta: "Get started free",
    href: "#",
    highlighted: false,
  },
  {
    name: "Starter",
    tagline: "Early commercial apps testing guardrails",
    price: "$29",
    period: "/mo",
    quota: "50M tokens monitored",
    overage: "8¢ per 1M tokens",
    features: [
      "Basic analytics",
      "Threshold alert emails",
      "Per-org dashboarding",
    ],
    annual: "$290/yr (~2 months free)",
    cta: "Start trial",
    href: "#",
    highlighted: true,
  },
  {
    name: "Growth",
    tagline: "Growing products with more users and activity",
    price: "$199",
    period: "/mo",
    quota: "200M tokens monitored",
    overage: "6¢ per 1M tokens",
    features: [
      "Rich dashboards + cohort token usage segmentation",
      "Slack alerts & webhook integrations",
      "Longer data retention (e.g. 90 days)",
    ],
    annual: "$1,990/yr (~2 months free)",
    cta: "Contact sales",
    href: "#",
    highlighted: false,
  },
  {
    name: "Pro",
    tagline: "Serious usage and enterprise needs",
    price: "$799",
    period: "/mo",
    quota: "1B tokens monitored",
    overage: "4¢ per 1M tokens",
    features: [
      "Priority support",
      "SLA guarantees",
      "Advanced alerting (anomalies, model impact)",
      "Export to external data stores",
      "Unlimited dashboards",
    ],
    annual: "$7,990/yr",
    cta: "Contact sales",
    href: "#",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 border-b border-[var(--border)] bg-[var(--bg)] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            Simple, usage-based pricing
          </h2>
          <p className="mt-4 text-lg text-[var(--fg-muted)]">
            Pay for tokens monitored. Generous free tier; scale as you grow.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-xl border p-6 ${
                tier.highlighted
                  ? "border-[var(--accent)] bg-[var(--accent)]/5"
                  : "border-[var(--border)] bg-[var(--bg-card)]"
              }`}
            >
              {tier.highlighted && (
                <span className="mb-4 inline-block w-fit rounded-full bg-[var(--accent)]/20 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                  Popular
                </span>
              )}
              <h3 className="font-display text-lg font-semibold text-[var(--fg)]">
                {tier.name}
              </h3>
              <p className="mt-1 text-sm text-[var(--fg-muted)]">{tier.tagline}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-3xl font-bold text-[var(--fg)]">
                  {tier.price}
                </span>
                <span className="text-[var(--fg-muted)]">{tier.period}</span>
              </div>
              {tier.annual && (
                <p className="mt-1 text-sm text-[var(--fg-muted)]">
                  {tier.annual}
                </p>
              )}
              <p className="mt-2 text-sm font-medium text-[var(--fg)]">
                {tier.quota}
              </p>
              <p className="text-xs text-[var(--fg-muted)]">Overage: {tier.overage}</p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-[var(--fg-muted)]">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.href}
                className={`mt-6 block rounded-lg py-2.5 text-center text-sm font-semibold transition-opacity hover:opacity-90 ${
                  tier.highlighted
                    ? "bg-[var(--accent)] text-[var(--bg)]"
                    : "border border-[var(--border)] text-[var(--fg)] hover:border-[var(--accent-dim)]"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-center">
          <h3 className="font-display text-lg font-semibold text-[var(--fg)]">
            Enterprise
          </h3>
          <p className="mt-2 text-sm text-[var(--fg-muted)]">
            Custom quota (1B+), dedicated support, SLA, onboarding. Custom
            limits for telemetry retention and org governance.
          </p>
          <p className="mt-2 text-sm font-medium text-[var(--fg)]">
            Typically $20,000+/yr — custom quotes based on volume and needs.
          </p>
          <Link
            href="#"
            className="mt-4 inline-block rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--fg)] hover:border-[var(--accent-dim)]"
          >
            Contact sales
          </Link>
        </div>
        <p className="mt-8 text-center text-sm text-[var(--fg-muted)]">
          Optional add-ons: Premium Alerts & Automation +$49/mo, Dedicated
          Support/CSM +$150/mo, Longer Data Retention (360 days) +$100/mo.
        </p>
      </div>
    </section>
  );
}
