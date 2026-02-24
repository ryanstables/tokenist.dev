import Image from "next/image";
import Link from "next/link";
import heroImg from "../../assets/hero2.jpg";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "calc(100vh - 4rem)" }}
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
      <div className="absolute inset-0 bg-black/30" />
      {/* Gradient overlay — darker at bottom for wordmark legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col px-8 sm:px-12 lg:px-20 py-12">
        {/* Badge */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
            Guardrails as a Service
          </span>
        </div>

        {/* Main content — vertically centered */}
        <div className="flex flex-1 items-center">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
              Be more zen with your LLM.
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-xl">
              Add per-user guardrails, gather insights in real-time, run AB tests, optimise your AI spending. 
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
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
            <p className="mt-4 text-sm text-white/50">
              Free tier: up to 10M tokens monitored. No credit card required.
            </p>
          </div>
        </div>
      </div>

      {/* Tokenist wordmark — bottom right, flush to corner */}
      <p
        className="absolute bottom-4 right-6 font-display font-bold leading-none select-none pointer-events-none"
        style={{
          fontSize: "clamp(3.5rem, 11vw, 9rem)",
          color: "rgba(255,255,255,0.13)",
        }}
        aria-hidden
      >
        Tokenist
      </p>
    </section>
  );
}
