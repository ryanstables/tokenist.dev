"use client";

import Link from "next/link";
import { useState, useEffect, startTransition } from "react";
import { useAuthModal } from "./auth";
import { getToken, clearToken } from "@/lib/auth";

const nav = [
  { label: "Features", href: "/#features" },
  { label: "Code", href: "/#code" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Docs", href: "/docs" },
];

export function MobileMenu() {
  const { openLogin } = useAuthModal();
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("logout") === "true") {
      clearToken();
      params.delete("logout");
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
      window.history.replaceState({}, "", newUrl);
      startTransition(() => { setIsLoggedIn(false); });
      return;
    }

    startTransition(() => { setIsLoggedIn(!!getToken()); });
  }, []);

  const handleLogout = () => {
    clearToken();
    setIsLoggedIn(false);
  };

  return (
    <>
      {/* Hamburger button — fixed at top-right of the hero area, mobile only */}
      <button
        type="button"
        className="fixed top-6 right-6 z-50 flex md:hidden h-10 w-10 items-center justify-center"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <div className="flex flex-col gap-[5px]">
          <span className="block h-0.5 w-5 bg-[var(--fg)]" />
          <span className="block h-0.5 w-5 bg-[var(--fg)]" />
          <span className="block h-0.5 w-5 bg-[var(--fg)]" />
        </div>
      </button>

      {/* Expanded menu — same content as the header dropdown */}
      {open && (
        <div className="fixed top-0 left-0 right-0 z-40 md:hidden bg-white border-b border-[var(--border)]">
          {/* Spacer row matching header height so content clears the hamburger button */}
          <div className="h-16" />
          <div className="border-t border-[var(--border)] px-11 py-4">
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
                      href={`${dashboardUrl}?token=${encodeURIComponent(getToken() || "")}`}
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
                    onClick={() => {
                      setOpen(false);
                      openLogin();
                    }}
                    className="rounded-lg bg-[var(--accent)] px-3 py-2 text-center text-sm font-semibold text-white"
                  >
                    Login / Register
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
