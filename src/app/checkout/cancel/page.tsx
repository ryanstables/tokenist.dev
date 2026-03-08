'use client';

import Link from 'next/link';

export default function CheckoutCancelPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg-elevated)] px-4 text-center">
      {/* X icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--fg-muted)]/10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-10 w-10 text-[var(--fg-muted)]"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>

      <h1 className="font-display text-2xl font-bold text-[var(--fg)] sm:text-3xl">
        Payment cancelled
      </h1>
      <p className="mt-3 max-w-sm text-[var(--fg-muted)]">
        No worries — your account has not been charged. You can start a plan
        whenever you&apos;re ready.
      </p>

      <Link
        href="/#pricing"
        className="mt-8 inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] px-6 py-2.5 text-sm font-semibold text-[var(--fg)] transition-colors hover:border-[var(--accent)]"
      >
        Back to pricing
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
    </div>
  );
}
