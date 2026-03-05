"use client";

import Image from "next/image";
import Link from "next/link";
import heroImg from "../../assets/hero2.jpg";
import { useAuthModal } from "./auth";

export function Hero() {
  const { openRegister } = useAuthModal();

  return (
    <section className="bg-[var(--bg)]" style={{ padding: "0.75rem" }}>
      {/* Inner container — inset from section edges to show the gutter */}
      <div
        className="relative overflow-hidden rounded-2xl h-[calc(100vh-1.5rem)] min-h-[560px] md:h-[calc(100vh-4rem-1.5rem)]"
      >
        {/* Background image */}
        <Image
          src={heroImg}
          alt=""
          fill
          className="object-cover object-center"
          priority
        />

        {/* Base overlay */}
        <div className="absolute inset-0 bg-black/25" />
        {/* Bottom-weighted gradient for bottom-row contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

        {/* Three-zone layout: top copy / spacer / bottom actions */}
        <div className="absolute inset-0 flex flex-col px-8 sm:px-12 lg:px-16 pt-0 pb-8 md:pt-10">

          {/* TOP — badge */}
          <div className="flex h-16 shrink-0 items-center md:h-auto md:max-w-2xl md:block">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white/90">
              <span className="hidden md:block h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
                className="h-5 w-5 flex-shrink-0 text-white md:hidden"
                aria-hidden
              >
                <g transform="translate(60,65)">
                  <rect fill="currentColor" height="18" width="80" y="0" x="0" />
                  <rect fill="currentColor" height="18" width="56" y="38" x="12" />
                  <rect fill="currentColor" height="18" width="32" y="76" x="24" />
                </g>
              </svg>
              <span className="md:hidden">Tokenist.</span>
              <span className="hidden md:inline">LLM Usage Management</span>
            </span>
          </div>

          {/* Headline + subheading */}
          <div className="max-w-2xl mt-4">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
              Track every LLM user. Enforce limits directly in your code.
            </h1>
            <p className="mt-5 text-base text-white/80 max-w-2xl sm:text-lg leading-relaxed">
              Tokenist is a Node.js module + REST API that gives you per-user
              metering, guardrails, and AI-based intent detection. Spot ToS
              breaches or jailbreak attempts, then block or rate-limit in the
              same workflow.
            </p>
          </div>

          {/* SPACER */}
          <div className="flex-1" />

          {/* BOTTOM — buttons + trust note */}
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-6 py-3 font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
                  onClick={openRegister}
                >
                  Get your API key
                </button>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-lg border border-white/40 bg-white/10 backdrop-blur-sm px-6 py-3 font-medium text-white transition-colors hover:bg-white/20"
                >
                  See how it works
                </Link>
              </div>
              <p className="mt-3 text-sm text-white/60">
                Free up to 10M tokens/month · No credit card required
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
