"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do I have to change how I call OpenAI?",
    a: "No. Tokenist sits in your server-side code. You keep using the OpenAI SDK (or any HTTP client) exactly as you do today. You just wrap requests with `tokenist.check()` and `tokenist.record()` (or call the REST endpoints) so we can track usage and apply guardrails.",
  },
  {
    q: "What does the AI intent detection actually do?",
    a: "We send each logged conversation through GPT-4o-mini to classify intent: jailbreak attempt, ToS breach, user frustration, lazy response, win, etc. You can see those labels in the dashboard and also use them to trigger automations — e.g., auto-block jailbreakers or throttle users who keep slamming your support bot.",
  },
  {
    q: "How do I block or rate-limit someone once a label is triggered?",
    a: "Use the blocklist API or create rules tied to the sentiment labels. Example: if `intent` includes `jailbreaking`, call `/admin/block` for that userId or drop their token quota to zero until they contact support.",
  },
  {
    q: "Where is the data stored?",
    a: "Usage metadata lives on Cloudflare's infrastructure (Workers + D1). Full payload logging is opt-in: call `/sdk/log` only when you want to retain complete transcripts for compliance or QA.",
  },
  {
    q: "Can I use Tokenist outside of Node?",
    a: "Yes. The REST API exposes the same functionality as the Node module, so you can integrate from Python, Go, Rust — whatever runs your backend.",
  },
  {
    q: "How long does setup take?",
    a: "Most teams are live in under 30 minutes. Install the npm package, add two hooks before/after your LLM call, and create your first rule in the dashboard.",
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
