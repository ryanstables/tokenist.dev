import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-0">
      {/* Green gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_70%_50%,rgba(22,163,74,0.08),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 py-20 sm:py-24 lg:py-28">
          {/* Text content */}
          <div>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--accent-light)] px-4 py-1.5 text-sm font-medium text-[var(--accent-dim)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              Guardrails as a Service
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight text-[var(--fg)] sm:text-5xl lg:text-6xl">
              Per-user limits and visibility for realtime AI APIs
            </h1>
            <p className="mt-6 text-lg text-[var(--fg-muted)] sm:text-xl">
              A realtime AI API proxy that adds token and cost tracking, usage
              limits, and enforcement guardrails without changing how you build.
              Point your client at the proxy, send identity headers, and
              guardrails apply automatically.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-6 py-3 font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                Get started free
              </Link>
              <Link
                href="#code"
                className="inline-flex items-center justify-center rounded-lg border border-[var(--border)] px-6 py-3 font-medium text-[var(--fg)] transition-colors hover:bg-[var(--bg-elevated)]"
              >
                View code example
              </Link>
            </div>
            <p className="mt-4 text-sm text-[var(--fg-muted)]">
              Free tier: up to 10M tokens monitored. No credit card required.
            </p>
          </div>

          {/* Hero image placeholder */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-[var(--accent)]/5" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] shadow-xl">
              {/* Placeholder dashboard mockup */}
              <div className="absolute inset-0 flex flex-col">
                {/* Mock titlebar */}
                <div className="flex items-center gap-2 border-b border-[var(--border)] bg-white px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-red-300" />
                  <span className="h-3 w-3 rounded-full bg-yellow-300" />
                  <span className="h-3 w-3 rounded-full bg-[var(--success)]" />
                  <span className="ml-3 h-4 w-32 rounded bg-[var(--border)]" />
                </div>
                {/* Mock content */}
                <div className="flex flex-1 gap-4 p-4">
                  {/* Sidebar */}
                  <div className="flex w-20 flex-col gap-2">
                    <div className="h-4 rounded bg-[var(--accent)]/30" />
                    <div className="h-4 rounded bg-[var(--border)]" />
                    <div className="h-4 rounded bg-[var(--border)]" />
                    <div className="h-4 rounded bg-[var(--border)]" />
                  </div>
                  {/* Main area */}
                  <div className="flex flex-1 flex-col gap-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-lg border border-[var(--border)] bg-white p-2">
                        <div className="mb-1 h-2 w-12 rounded bg-[var(--border)]" />
                        <div className="h-5 w-16 rounded bg-[var(--accent)]/40" />
                      </div>
                      <div className="rounded-lg border border-[var(--border)] bg-white p-2">
                        <div className="mb-1 h-2 w-12 rounded bg-[var(--border)]" />
                        <div className="h-5 w-16 rounded bg-[var(--border)]" />
                      </div>
                      <div className="rounded-lg border border-[var(--border)] bg-white p-2">
                        <div className="mb-1 h-2 w-12 rounded bg-[var(--border)]" />
                        <div className="h-5 w-16 rounded bg-[var(--border)]" />
                      </div>
                    </div>
                    <div className="flex-1 rounded-lg border border-[var(--border)] bg-white p-3">
                      <div className="mb-3 h-2 w-24 rounded bg-[var(--border)]" />
                      <div className="space-y-2">
                        {[80, 60, 90, 40, 70].map((w, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="h-2 w-12 rounded bg-[var(--border)]" />
                            <div
                              className="h-2 rounded bg-[var(--accent)]/50"
                              style={{ width: `${w}%` }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave separator */}
      <div className="h-8 bg-[var(--bg-elevated)]" style={{
        clipPath: "polygon(0 100%, 100% 100%, 100% 0)"
      }} />
    </section>
  );
}
