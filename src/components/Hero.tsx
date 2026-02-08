import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg)] pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,201,0.12),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-block rounded-full border border-[var(--accent-dim)] bg-[var(--accent)]/10 px-4 py-1.5 text-sm font-medium text-[var(--accent)]">
            Guardrails as a Service
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-[var(--fg)] sm:text-5xl lg:text-6xl">
            Per-user limits and visibility for realtime AI APIs
          </h1>
          <p className="mt-6 text-lg text-[var(--fg-muted)] sm:text-xl">
            A realtime AI API proxy that adds token and cost tracking, usage
            limits, and enforcement guardrails without changing how you build.
            Point your client at the proxy, send identity headers, and
            guardrails apply automatically.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#"
              className="w-full rounded-lg bg-[var(--accent)] px-6 py-3 text-center font-semibold text-[var(--bg)] transition-opacity hover:opacity-90 sm:w-auto"
            >
              Get started free
            </Link>
            <Link
              href="#code"
              className="w-full rounded-lg border border-[var(--border)] px-6 py-3 text-center font-medium text-[var(--fg)] transition-colors hover:border-[var(--accent-dim)] hover:bg-[var(--bg-elevated)] sm:w-auto"
            >
              View code example
            </Link>
          </div>
          <p className="mt-4 text-sm text-[var(--fg-muted)]">
            Free tier: up to 10M tokens monitored. No credit card required.
          </p>
        </div>
        <div className="mt-16 flex justify-center">
          <div className="relative aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-card)] shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-card)]">
              <span className="text-sm text-[var(--fg-muted)]">
                [ Hero image placeholder: proxy flow / dashboard ]
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
