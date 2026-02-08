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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="#"
          className="font-display text-xl font-bold tracking-tight text-[var(--fg)]"
        >
          Tokenist
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
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

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="#pricing"
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--fg)] transition-colors hover:border-[var(--accent-dim)] hover:bg-[var(--bg-elevated)]"
          >
            Pricing
          </Link>
          {isLoggedIn ? (
            <>
              <a
                href={`${dashboardUrl}?token=${encodeURIComponent(getToken() || '')}`}
                className="px-4 py-2 text-blue-600 hover:text-blue-700"
              >
                Dashboard
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--bg)] transition-opacity hover:opacity-90"
            >
              Login / Register
            </button>
          )}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block h-0.5 w-5 bg-[var(--fg)]" />
          <span className="mt-1 block h-0.5 w-5 bg-[var(--fg)]" />
          <span className="mt-1 block h-0.5 w-5 bg-[var(--fg)]" />
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--fg-muted)] hover:bg-[var(--bg-card)] hover:text-[var(--fg)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#pricing"
              className="mt-2 rounded-lg bg-[var(--accent)] px-3 py-2 text-center text-sm font-semibold text-[var(--bg)]"
              onClick={() => setOpen(false)}
            >
              Get started free
            </Link>
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