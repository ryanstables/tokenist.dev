"use client";

import { useState } from "react";
import { useAuthModal } from "@/components/auth/AuthModalContext";
import { getToken } from "@/lib/auth";
import { createCheckoutSession } from "@/lib/stripe";

const tiers = [
  {
    name: "Free",
    tagline: "Side projects and early evaluation",
    monthly: 0,
    quota: "25,000 requests / mo",
    overage: null,
    features: [
      "Full enforcement — rate limits & blocklist",
      "AI intent labels (jailbreak, ToS breach)",
      "Basic dashboard + CSV export",
      "Community support",
      "No credit card required",
    ],
    cta: "Get started free",
    ctaAction: "register" as const,
    plan: null,
    highlighted: false,
  },
  {
    name: "Starter",
    tagline: "Early commercial apps going to market",
    monthly: 49,
    annual: 490,
    quota: "150,000 requests / mo",
    overage: "$0.50 per 1,000 extra requests",
    features: [
      "Everything in Free",
      "Email & Slack threshold alerts",
      "Per-feature cost attribution",
      "30-day log retention",
      "Email support",
    ],
    cta: "Start free trial",
    ctaAction: "checkout" as const,
    plan: "starter" as const,
    highlighted: true,
  },
  {
    name: "Growth",
    tagline: "Growing products with real traffic",
    monthly: 199,
    annual: 1990,
    quota: "750,000 requests / mo",
    overage: "$0.30 per 1,000 extra requests",
    features: [
      "Everything in Starter",
      "Webhook automations (e.g. auto-block on intent label)",
      "Cohort analysis + user segmentation",
      "90-day log retention",
      "Priority support",
    ],
    cta: "Start free trial",
    ctaAction: "checkout" as const,
    plan: "growth" as const,
    highlighted: false,
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [errorTier, setErrorTier] = useState<{ name: string; message: string } | null>(null);
  const { openRegister } = useAuthModal();

  const handleTierClick = async (tier: typeof tiers[number]) => {
    setErrorTier(null);

    if (tier.ctaAction === "register" || tier.plan === null) {
      openRegister();
      return;
    }

    const token = getToken();

    if (!token) {
      // Not logged in — open register modal, then redirect to checkout after auth
      openRegister(() => {
        const freshToken = getToken();
        if (freshToken && tier.plan) {
          setLoadingTier(tier.name);
          const billing = annual ? "annual" : "monthly";
          createCheckoutSession(tier.plan, billing, freshToken).catch((err: Error) => {
            setLoadingTier(null);
            setErrorTier({ name: tier.name, message: err.message });
          });
        }
      });
      return;
    }

    setLoadingTier(tier.name);
    try {
      const billing = annual ? "annual" : "monthly";
      await createCheckoutSession(tier.plan, billing, token);
    } catch (err) {
      setLoadingTier(null);
      setErrorTier({
        name: tier.name,
        message: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  };

  return (
    <section id="pricing" className="scroll-mt-20 bg-[var(--bg-elevated)] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-[var(--border)] bg-[var(--accent-light)] px-4 py-1 text-sm font-medium text-[var(--accent-dim)]">
            Pricing
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            Simple pricing, based on requests
          </h2>
          <p className="mt-4 text-lg text-[var(--fg-muted)]">
            Pay for requests tracked. Start free, no credit card needed. We&apos;ll
            alert you before you hit your limit.
          </p>
          {/* Annual toggle */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-white px-4 py-2">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                !annual
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                annual
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
              }`}
            >
              Annual
              <span className="ml-1.5 rounded-full bg-[var(--success)]/20 px-1.5 py-0.5 text-xs font-semibold text-[var(--success)]">
                2 months free
              </span>
            </button>
          </div>
        </div>

        {/* Tier cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {tiers.map((tier) => {
            const isLoading = loadingTier === tier.name;
            const tierError = errorTier?.name === tier.name ? errorTier.message : null;

            return (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border p-6 transition-shadow hover:shadow-md ${
                  tier.highlighted
                    ? "border-[var(--accent)] bg-white shadow-md"
                    : "border-[var(--border-subtle)] bg-white"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold text-[var(--fg)]">
                  {tier.name}
                </h3>
                <p className="mt-1 text-xs text-[var(--fg-muted)]">{tier.tagline}</p>

                {/* Price */}
                <div className="mt-5 flex items-baseline gap-1">
                  {tier.monthly === 0 ? (
                    <span className="font-display text-3xl font-bold text-[var(--fg)]">$0</span>
                  ) : annual && tier.annual ? (
                    <>
                      <span className="font-display text-3xl font-bold text-[var(--fg)]">
                        ${Math.round(tier.annual / 12)}
                      </span>
                      <span className="text-[var(--fg-muted)]">/mo</span>
                    </>
                  ) : (
                    <>
                      <span className="font-display text-3xl font-bold text-[var(--fg)]">
                        ${tier.monthly}
                      </span>
                      <span className="text-[var(--fg-muted)]">/mo</span>
                    </>
                  )}
                </div>
                {annual && tier.annual && (
                  <p className="mt-0.5 text-xs text-[var(--fg-muted)]">
                    ${tier.annual}/yr — billed annually
                  </p>
                )}

                {/* Quota */}
                <div className="mt-4 rounded-lg bg-[var(--bg-elevated)] px-3 py-2.5">
                  <p className="text-sm font-semibold text-[var(--fg)]">{tier.quota}</p>
                  {tier.overage ? (
                    <p className="text-xs text-[var(--fg-muted)]">Then: {tier.overage}</p>
                  ) : (
                    <p className="text-xs text-[var(--fg-muted)]">No credit card required</p>
                  )}
                </div>

                {/* Features */}
                <ul className="mt-5 flex-1 space-y-2.5 text-sm text-[var(--fg-muted)]">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleTierClick(tier)}
                  className={`mt-6 flex w-full items-center justify-center rounded-xl py-2.5 text-center text-sm font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-60 hover:opacity-90 ${
                    tier.highlighted
                      ? "bg-[var(--accent)] text-white shadow-sm"
                      : "border border-[var(--border)] text-[var(--fg)] hover:border-[var(--accent)]"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="mr-2 h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Redirecting…
                    </>
                  ) : (
                    tier.cta
                  )}
                </button>

                {/* Per-tier error */}
                {tierError && (
                  <p className="mt-2 text-center text-xs text-red-600">{tierError}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Enterprise */}
        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8">
          <div className="sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-semibold text-[var(--fg)]">
                  Enterprise
                </h3>
                <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--fg-muted)]">
                  1M+ requests / mo
                </span>
              </div>
              <p className="mt-1 text-sm text-[var(--fg-muted)]">
                Custom request volume, extended data retention, SSO + RBAC,
                dedicated SLA, and custom integrations — including on-prem options.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["SSO + RBAC", "Dedicated SLA", "Custom retention", "On-prem option", "Dedicated Slack channel"].map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-2.5 py-0.5 text-xs text-[var(--fg-muted)]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <a
              href="mailto:hello@tokenist.dev"
              className="mt-4 inline-block shrink-0 rounded-xl border border-[var(--border)] px-6 py-2.5 text-sm font-semibold text-[var(--fg)] transition-colors hover:border-[var(--accent)] sm:mt-0"
            >
              Contact us
            </a>
          </div>
        </div>

        {/* Footnote */}
        <p className="mt-5 text-center text-sm text-[var(--fg-muted)]">
          All paid plans include a 14-day free trial · Cancel any time · No credit card required to start
        </p>
      </div>
    </section>
  );
}
