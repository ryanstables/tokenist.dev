import Image from "next/image";
import Link from "next/link";
import heroImg from "../../assets/hero2.jpg";

export function Hero() {
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

          {/* TOP — on narrow: badge aligned with hamburger (top-6 + h-10 = 4rem); on md+: badge + description */}
          <div className="flex h-16 shrink-0 items-center md:h-auto md:max-w-2xl md:block">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white/90">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
              <span className="md:hidden">Tokenist.</span>
              <span className="hidden md:inline">Guardrails as a Service</span>
            </span>
          </div>

          <div className="max-w-2xl">
            <p className="mt-4 text-base text-white max-w-lg sm:text-lg">
              Add per-user guardrails, gather insights in real-time, run AB
              tests, track errors, optimize your AI spending.
            </p>
          </div>

          {/* SPACER */}
          <div className="flex-1" />

          {/* BOTTOM — buttons + disclaimer */}
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-6 py-3 font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
                >
                  Get started free
                </Link>
                <Link
                  href="#code"
                  className="inline-flex items-center justify-center rounded-lg border border-white/40 bg-white/10 backdrop-blur-sm px-6 py-3 font-medium text-white transition-colors hover:bg-white/20"
                >
                  View code example
                </Link>
              </div>
              <p className="mt-3 text-sm text-white/50">
                Free tier: up to 10M tokens monitored. No credit card required.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
