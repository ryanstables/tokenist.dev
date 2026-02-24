"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AuthModal } from "./auth";
import { getToken, clearToken } from "@/lib/auth";

const nav = [
  { label: "Features", href: "#features" },
  { label: "Code", href: "#code" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [showAuth, setShowAuth] = useState(false);
  // Start with false to match server render and avoid hydration mismatch
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

  // Check auth state after hydration (client-side only)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('logout') === 'true') {
      // Clear the token
      clearToken();

      // Clean URL by removing logout parameter
      params.delete('logout');
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
      window.history.replaceState({}, '', newUrl);

      // User is logged out
      setIsLoggedIn(false);
      return;
    }

    // No logout param - check if user has a valid token
    setIsLoggedIn(!!getToken());
  }, []);

  const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:3001';

  const handleAuthenticated = (token?: string) => {
    setIsLoggedIn(true);
    setShowAuth(false);
    // Redirect to dashboard with token in URL for cross-origin auth
    setTimeout(() => {
      const authToken = token || getToken();
      window.location.href = authToken ? `${dashboardUrl}?token=${encodeURIComponent(authToken)}` : dashboardUrl;
    }, 0);
  };

  const handleLogout = () => {
    clearToken();
    setIsLoggedIn(false);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-white/95 backdrop-blur-md">
      {/* 3-column grid: logo/burger | nav (truly centered) | buttons */}
      <div className="grid h-16 grid-cols-3 items-center px-11 sm:px-[3.75rem] lg:px-[4.75rem]">

        {/* LEFT — logo on desktop, burger on mobile */}
        <div className="flex items-center">
          <Link
            href="#"
            className="hidden md:flex items-center text-[var(--accent)]"
            aria-label="Tokenist"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              className="h-8 w-8 flex-shrink-0"
              aria-hidden
            >
              <g transform="translate(60,65)">
                <rect fill="currentColor" height="18" width="80" y="0" x="0" />
                <rect fill="currentColor" height="18" width="56" y="38" x="12" />
                <rect fill="currentColor" height="18" width="32" y="76" x="24" />
              </g>
            </svg>
          </Link>

          <button
            type="button"
            className="flex md:hidden h-10 w-10 items-center justify-center -ml-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-[5px]">
              <span className="block h-0.5 w-5 bg-[var(--fg)]" />
              <span className="block h-0.5 w-5 bg-[var(--fg)]" />
              <span className="block h-0.5 w-5 bg-[var(--fg)]" />
            </div>
          </button>
        </div>

        {/* CENTER — nav links, desktop only */}
        <nav className="hidden md:flex items-center justify-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT — auth buttons, desktop only */}
        <div className="hidden md:flex items-center justify-end gap-3">
          {isLoggedIn ? (
            <>
              <a
                href={`${dashboardUrl}?token=${encodeURIComponent(getToken() || '')}`}
                className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--bg-elevated)]"
              >
                Dashboard
              </a>
              <button
                onClick={handleLogout}
                className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Login / Register
            </button>
          )}
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--border)] bg-white px-11 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--fg-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--fg)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-[var(--border)] pt-3">
              {isLoggedIn ? (
                <>
                  <a
                    href={`${dashboardUrl}?token=${encodeURIComponent(getToken() || '')}`}
                    className="rounded-lg border border-[var(--border)] px-3 py-2 text-center text-sm font-medium text-[var(--accent)]"
                  >
                    Dashboard
                  </a>
                  <button
                    onClick={handleLogout}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--fg-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--fg)]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setOpen(false); setShowAuth(true); }}
                  className="rounded-lg bg-[var(--accent)] px-3 py-2 text-center text-sm font-semibold text-white"
                >
                  Login / Register
                </button>
              )}
            </div>
          </nav>
        </div>
      )}

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onAuthenticated={handleAuthenticated}
      />
    </header>
  );
}
