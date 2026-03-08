'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const dashboardUrl =
  typeof process !== 'undefined'
    ? process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:3001'
    : 'http://localhost:3001';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('stripe_session_id');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown <= 0) {
      window.location.href = dashboardUrl;
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg-elevated)] px-4 text-center">
      {/* Checkmark */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--success)]/15">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-10 w-10 text-[var(--success)]"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h1 className="font-display text-2xl font-bold text-[var(--fg)] sm:text-3xl">
        Payment successful!
      </h1>
      <p className="mt-3 max-w-sm text-[var(--fg-muted)]">
        Setting up your account… Redirecting to the dashboard in{' '}
        <span className="font-semibold text-[var(--fg)]">{countdown}</span>s.
      </p>

      {sessionId && (
        <p className="mt-2 text-xs text-[var(--fg-muted)]">
          Session: {sessionId}
        </p>
      )}

      <a
        href={dashboardUrl}
        className="mt-8 rounded-xl bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Go to dashboard now
      </a>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[var(--bg-elevated)]">
          <p className="text-[var(--fg-muted)]">Loading…</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
