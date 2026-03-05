"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How long does integration actually take?",
    a: "Most teams are live in under 30 minutes. You point your WebSocket client at Tokenist instead of OpenAI, add two headers (x-user-id and optionally x-org-id), and guardrails apply automatically. No SDK to install, no application logic to restructure.",
  },
  {
    q: "What happens to my users when they hit a limit?",
    a: "If a user is already over limit at connection time, the connection is rejected before it opens. During an active session, connections are closed immediately when a user exceeds their threshold. Tokenist returns a defined close code (4004 for threshold exceeded, 4003 for blocked) so your client can handle it — show an upgrade prompt, a friendly message, or gracefully degrade.",
  },
  {
    q: "Is my LLM traffic stored on your servers?",
    a: "Tokenist logs request and response metadata (token counts, model, latency, user ID) for tracking and analysis. Full request/response payloads are only stored if you explicitly use the /sdk/log endpoint. You control what gets logged. Data is stored on Cloudflare's infrastructure.",
  },
  {
    q: "What if Tokenist goes down — does it take my app with it?",
    a: "Tokenist runs on Cloudflare Workers, which has 99.99%+ uptime and runs at the edge globally. That said, as a proxy it sits in your request path — we recommend implementing a fallback or circuit breaker in production that bypasses Tokenist and calls OpenAI directly if the proxy becomes unreachable.",
  },
  {
    q: "Can I use this with models other than OpenAI?",
    a: "The current implementation targets the OpenAI Realtime and Chat Completions APIs. The architecture is provider-agnostic — the proxy can be configured to point at any compatible endpoint — but Tokenist's built-in pricing and model support today covers OpenAI's model catalogue.",
  },
  {
    q: "How is the AI quality monitoring implemented?",
    a: "Every request logged via /sdk/log is queued for classification by GPT-4o-mini, which runs on a cron schedule (top of every hour). It labels conversations with outcomes like task_failure, user_frustration, jailbreaking, and win. Labels appear as pills in the dashboard Logs view and are aggregated on the Insights page. No configuration required — it runs automatically on all logged requests.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="mb-4 inline-block rounded-full border border-[var(--border)] bg-[var(--accent-light)] px-4 py-1 text-sm font-medium text-[var(--accent-dim)]">
            FAQ
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            Common questions
          </h2>
          <p className="mt-4 text-lg text-[var(--fg-muted)]">
            Everything you need to know before getting started.
          </p>
        </div>
        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] shadow-sm"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-[var(--fg)] transition-colors hover:bg-[var(--bg-elevated)]"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <span
                  className={`ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg-muted)] transition-transform ${
                    open === i ? "rotate-180 border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]" : ""
                  }`}
                >
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              {open === i && (
                <div className="border-t border-[var(--border-subtle)] px-5 py-4 text-sm leading-relaxed text-[var(--fg-muted)]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
