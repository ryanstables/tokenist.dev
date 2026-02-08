"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is Tokenist?",
    a: "Tokenist is a Guardrails as a Service product: a realtime AI API proxy that adds per-user token and cost tracking, usage limits, and enforcement guardrails. You point your client at the proxy URL, send identity headers (x-user-id, optional x-org-id), and guardrails apply automatically—no SDK lock-in.",
  },
  {
    q: "How much latency does the proxy add?",
    a: "The proxy is designed for minimal (sub-10ms) added latency on realtime API calls. Traffic is relayed bidirectionally with only lightweight parsing and policy checks, so end-users get essentially the same experience as calling the provider directly.",
  },
  {
    q: "What identity do I need to send?",
    a: "Clients must send x-user-id on the WebSocket handshake (required). Optionally send x-org-id for organization-level tracking. In MongoDB mode, clients authenticate with a proxy API key (e.g. ug_...); the server looks up the user and uses the server's provider key for upstream calls.",
  },
  {
    q: "What happens when a user exceeds their limit?",
    a: "If a user is already over limit at connect time, the connection is rejected. During a session, after each message the proxy updates usage and checks limits; if over limit, the connection is closed with close code 4004 (Threshold exceeded). Your client can handle this and show a message or prompt to upgrade.",
  },
  {
    q: "What AI providers are supported?",
    a: "The architecture is a generic proxy: client → Tokenist → upstream provider. The current implementation targets the OpenAI Realtime API; pricing and model names are configurable. Additional providers can be supported via configuration and adapter logic.",
  },
  {
    q: "How is usage stored?",
    a: "You can run in-memory (LRU) for a single instance—fast, no persistence. For persistence and multi-instance, use MongoDB. Optional Redis can be used for a shared store across instances. Usage windows (daily, monthly, rolling_24h) are supported when MongoDB is enabled.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 border-b border-[var(--border)] bg-[var(--bg-elevated)] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-[var(--fg-muted)]">
            Common questions about Tokenist and realtime AI guardrails.
          </p>
        </div>
        <div className="mt-12 space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-[var(--fg)] hover:bg-[var(--bg-elevated)]/50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                {faq.q}
                <span
                  className={`ml-2 shrink-0 text-[var(--fg-muted)] transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              {open === i && (
                <div className="border-t border-[var(--border)] px-5 py-4 text-sm text-[var(--fg-muted)]">
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
