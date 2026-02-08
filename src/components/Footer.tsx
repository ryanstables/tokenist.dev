import Link from "next/link";

const product = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Documentation", href: "#" },
  { label: "API", href: "#code" },
];

const company = [
  { label: "About", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Contact", href: "#" },
];

const legal = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              href="#"
              className="font-display text-xl font-bold tracking-tight text-[var(--fg)]"
            >
              Tokenist
            </Link>
            <p className="mt-3 max-w-xs text-sm text-[var(--fg-muted)]">
              Guardrails as a Service — per-user limits and visibility for
              realtime AI APIs. Minimal config, sub-10ms latency.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--fg-muted)]">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              {product.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--fg-muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--fg-muted)]">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--fg-muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--fg-muted)]">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {legal.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--fg-muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 sm:flex-row">
          <p className="text-sm text-[var(--fg-muted)]">
            © {new Date().getFullYear()} Tokenist. All rights reserved.
          </p>
          <div className="flex gap-6">
            {legal.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
