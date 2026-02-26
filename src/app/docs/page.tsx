import { Header } from "@/components/Header";
import { MobileMenu } from "@/components/MobileMenu";
import { Footer } from "@/components/Footer";
import { DocsSidebar } from "@/components/docs/DocsSidebar";

export const dynamic = "force-static";

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-[var(--accent-light)] px-1.5 py-0.5 text-sm text-[var(--accent)]">
      {children}
    </code>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-white">
        {n}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-[var(--fg)]">{title}</p>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}

function CodeBlock({ children, lang = "json" }: { children: string; lang?: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-[var(--fg)] px-5 py-4 text-sm leading-relaxed text-[var(--accent-light)]">
      <code>{children.trim()}</code>
    </pre>
  );
}

export const metadata = {
  title: "Documentation — Tokenist",
  description:
    "Tokenist SDK reference: HTTP endpoints and TypeScript client for adding per-user guardrails to OpenAI API integrations.",
};

export default function DocsPage() {
  return (
    <>
      <Header />
      <MobileMenu />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex gap-12">
          <div className="hidden lg:block">
            <DocsSidebar />
          </div>
          <div className="min-w-0 flex-1 space-y-20">
            {/* ── GETTING STARTED ─────────────────────────────────────────── */}
            <section id="getting-started" className="scroll-mt-24">
              <h1 className="text-2xl font-semibold text-[var(--fg)]">
                Getting Started
              </h1>
              <div className="mt-4 h-px bg-[var(--border)]" />

              <p className="mt-6 text-[var(--fg-muted)] leading-relaxed">
                Tokenist is a guardrails layer for OpenAI API integrations. It tracks
                per-user token consumption and costs, lets you set spending limits, and
                automatically blocks users who exceed them — without changing your
                existing OpenAI code.
              </p>
              <p className="mt-3 text-[var(--fg-muted)] leading-relaxed">
                The SDK is designed for server-side use: call{" "}
                <InlineCode>/sdk/check</InlineCode> before forwarding a request to
                OpenAI, then <InlineCode>/sdk/record</InlineCode> once you have a
                response. Use <InlineCode>/sdk/log</InlineCode> to store the full
                request/response payload for auditing and sentiment analysis.
              </p>

              <div className="mt-8 space-y-6">
                <Step n={1} title="Get an API key">
                  <p className="text-[var(--fg-muted)]">
                    Log in to the{" "}
                    <a
                      href={process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001"}
                      className="text-[var(--accent)] hover:underline"
                    >
                      Tokenist dashboard
                    </a>{" "}
                    and create an API key under{" "}
                    <strong className="text-[var(--fg)]">Settings → API Keys</strong>.
                    Keys are prefixed <InlineCode>ug_</InlineCode> and used as Bearer
                    tokens on all SDK requests.
                  </p>
                </Step>

                <Step n={2} title="Install the TypeScript SDK">
                  <CodeBlock lang="bash">{`npm install tokenist-js`}</CodeBlock>
                  <p className="mt-3 text-[var(--fg-muted)]">
                    Or use the HTTP API directly — all endpoints accept standard JSON
                    over HTTPS.
                  </p>
                </Step>
              </div>
            </section>
            {/* HTTP API and TypeScript SDK sections will be added next */}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
