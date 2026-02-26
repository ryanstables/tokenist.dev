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

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-[var(--fg)] px-5 py-4 text-sm leading-relaxed text-[var(--accent-light)]">
      <code>{children.trim()}</code>
    </pre>
  );
}

function EndpointHeading({ method, path }: { method: string; path: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="rounded-lg bg-[var(--accent)] px-2.5 py-1 text-xs font-semibold text-white">
        {method}
      </span>
      <code className="text-lg font-semibold text-[var(--fg)]">{path}</code>
    </div>
  );
}

function ParamTable({
  params,
  label,
}: {
  params: {
    name: string;
    type: string;
    required: boolean;
    desc: string;
  }[];
  label?: string;
}) {
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-[var(--border)]">
      <table aria-label={label} className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] bg-[var(--bg-elevated)]">
            <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]/60">
              Field
            </th>
            <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]/60">
              Type
            </th>
            <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]/60">
              Required
            </th>
            <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]/60">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {params.map((p, i) => (
            <tr
              key={p.name}
              className={
                i < params.length - 1 ? "border-b border-[var(--border)]" : ""
              }
            >
              <td className="px-4 py-3 font-mono text-[var(--accent)]">
                {p.name}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-[var(--fg-muted)]">
                {p.type}
              </td>
              <td className="px-4 py-3">
                {p.required ? (
                  <span className="rounded-full bg-[var(--accent-light)] px-2 py-0.5 text-xs font-medium text-[var(--accent)]">
                    required
                  </span>
                ) : (
                  <span className="text-xs text-[var(--fg-muted)]/50">
                    optional
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-[var(--fg-muted)]">{p.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
                  <CodeBlock>{`npm install tokenist-js`}</CodeBlock>
                  <p className="mt-3 text-[var(--fg-muted)]">
                    Or use the HTTP API directly — all endpoints accept standard JSON
                    over HTTPS. No SDK required.
                  </p>
                </Step>
              </div>
            </section>
            {/* ── HTTP API REFERENCE ──────────────────────────────────────── */}
            <section id="http-api" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-[var(--fg)]">SDK Reference</h2>
              <div className="mt-4 h-px bg-[var(--border)]" />
              <p className="mt-4 text-[var(--fg-muted)] leading-relaxed">
                All endpoints are authenticated with your API key as a Bearer token.
                Base URL: <InlineCode>https://api.tokenist.dev</InlineCode> (or your
                self-hosted instance).
              </p>

              {/* /sdk/check */}
              <div id="endpoint-check" className="mt-12 scroll-mt-24">
                <EndpointHeading method="POST" path="/sdk/check" />
                <p className="mt-2 text-[var(--fg-muted)]">
                  Pre-flight check before forwarding a request to OpenAI. Returns whether
                  the user is allowed to proceed based on their current usage and any
                  active limits.
                </p>

                <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-[var(--fg-muted)]/60">
                  Request
                </h4>
                <ParamTable
                  label="Request parameters"
                  params={[
                    { name: "userId", type: "string", required: true, desc: "Your application's identifier for the end user." },
                    { name: "model", type: "string", required: true, desc: 'OpenAI model ID, e.g. "gpt-4o" or "gpt-4o-realtime-preview".' },
                    { name: "requestType", type: '"chat" | "realtime" | "embeddings"', required: true, desc: "Type of OpenAI request being made." },
                    { name: "estimatedTokens", type: "number", required: false, desc: "Token estimate for threshold pre-checking. Used to detect near-limit users before the request completes." },
                    { name: "feature", type: "string", required: false, desc: "Optional feature tag for grouping usage in the dashboard." },
                  ]}
                />

                <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-[var(--fg-muted)]/60">
                  Response
                </h4>
                <ParamTable
                  label="Response parameters"
                  params={[
                    { name: "allowed", type: "boolean", required: true, desc: "Whether the user may proceed with their request." },
                    { name: "reason", type: "string", required: false, desc: 'Present when allowed is false. E.g. "User is blocked: Exceeded fair usage".' },
                    { name: "usage.tokens", type: "number", required: false, desc: "Total tokens consumed by this user in the current period." },
                    { name: "usage.costUsd", type: "number", required: false, desc: "Total cost in USD consumed in the current period." },
                    { name: "remaining.tokens", type: "number", required: false, desc: "Remaining token budget (omitted if no limit set)." },
                    { name: "remaining.costUsd", type: "number", required: false, desc: "Remaining cost budget in USD (omitted if no limit set)." },
                  ]}
                />

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--fg-muted)]/60">Request</p>
                    <CodeBlock>{`{
  "userId": "user_alice",
  "model": "gpt-4o",
  "requestType": "chat",
  "estimatedTokens": 500,
  "feature": "customer-support"
}`}</CodeBlock>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--fg-muted)]/60">Response (allowed)</p>
                    <CodeBlock>{`{
  "allowed": true,
  "usage": { "tokens": 1200, "costUsd": 0.08 },
  "remaining": { "tokens": 8800, "costUsd": 9.92 }
}`}</CodeBlock>
                  </div>
                </div>
              </div>

              {/* /sdk/record */}
              <div id="endpoint-record" className="mt-14 scroll-mt-24">
                <EndpointHeading method="POST" path="/sdk/record" />
                <p className="mt-2 text-[var(--fg-muted)]">
                  Record actual token usage after an OpenAI request completes. Updates
                  the user&apos;s running totals and re-evaluates their block status against
                  any configured limits.
                </p>

                <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-[var(--fg-muted)]/60">
                  Request
                </h4>
                <ParamTable
                  label="Request parameters"
                  params={[
                    { name: "userId", type: "string", required: true, desc: "End user identifier." },
                    { name: "model", type: "string", required: true, desc: "OpenAI model that processed the request." },
                    { name: "requestType", type: '"chat" | "realtime" | "embeddings"', required: true, desc: "Type of request." },
                    { name: "inputTokens", type: "number", required: true, desc: "Actual input tokens consumed." },
                    { name: "outputTokens", type: "number", required: true, desc: "Actual output tokens consumed." },
                    { name: "latencyMs", type: "number", required: false, desc: "Round-trip latency in milliseconds." },
                    { name: "success", type: "boolean", required: false, desc: "Whether the OpenAI request succeeded. Defaults to true." },
                    { name: "feature", type: "string", required: false, desc: "Feature tag, should match the value used in /sdk/check." },
                  ]}
                />

                <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-[var(--fg-muted)]/60">
                  Response
                </h4>
                <ParamTable
                  label="Response parameters"
                  params={[
                    { name: "recorded", type: "boolean", required: true, desc: "Always true on success." },
                    { name: "usage.tokens", type: "number", required: false, desc: "Updated total tokens for this user." },
                    { name: "usage.costUsd", type: "number", required: false, desc: "Updated total cost in USD." },
                    { name: "blocked", type: "boolean", required: true, desc: "Whether this usage pushed the user over a limit and triggered a block." },
                  ]}
                />

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--fg-muted)]/60">Request</p>
                    <CodeBlock>{`{
  "userId": "user_alice",
  "model": "gpt-4o",
  "requestType": "chat",
  "inputTokens": 412,
  "outputTokens": 318,
  "latencyMs": 1240,
  "success": true,
  "feature": "customer-support"
}`}</CodeBlock>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--fg-muted)]/60">Response</p>
                    <CodeBlock>{`{
  "recorded": true,
  "usage": { "tokens": 1930, "costUsd": 0.11 },
  "blocked": false
}`}</CodeBlock>
                  </div>
                </div>
              </div>

              {/* /sdk/log */}
              <div id="endpoint-log" className="mt-14 scroll-mt-24">
                <EndpointHeading method="POST" path="/sdk/log" />
                <p className="mt-2 text-[var(--fg-muted)]">
                  Store the full request and response payload for a completed OpenAI
                  call. Enables conversation history, cost breakdowns per request, and
                  sentiment analysis in the dashboard.
                </p>

                <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-[var(--fg-muted)]/60">
                  Request
                </h4>
                <ParamTable
                  label="Request parameters"
                  params={[
                    { name: "model", type: "string", required: true, desc: "OpenAI model used." },
                    { name: "request", type: "object", required: true, desc: "The original request body sent to OpenAI." },
                    { name: "response", type: "object", required: false, desc: "The response body received from OpenAI." },
                    { name: "userId", type: "string", required: false, desc: "End user identifier for attribution." },
                    { name: "userEmail", type: "string", required: false, desc: "User email for display in the dashboard." },
                    { name: "userName", type: "string", required: false, desc: "User display name." },
                    { name: "conversationId", type: "string", required: false, desc: "Groups multiple log entries into a single conversation thread." },
                    { name: "feature", type: "string", required: false, desc: "Feature tag." },
                    { name: "latencyMs", type: "number", required: false, desc: "Total request latency in milliseconds." },
                    { name: "status", type: '"success" | "error"', required: false, desc: "Whether the call succeeded. Defaults to success." },
                  ]}
                />

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--fg-muted)]/60">Request</p>
                    <CodeBlock>{`{
  "model": "gpt-4o",
  "request": {
    "messages": [
      { "role": "user", "content": "Summarise my order history" }
    ]
  },
  "response": {
    "choices": [
      { "message": { "role": "assistant", "content": "You have placed 3 orders..." } }
    ],
    "usage": { "prompt_tokens": 18, "completion_tokens": 42 }
  },
  "userId": "user_alice",
  "conversationId": "conv_abc123",
  "feature": "order-assistant",
  "latencyMs": 980
}`}</CodeBlock>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--fg-muted)]/60">Response</p>
                    <CodeBlock>{`{
  "logged": true,
  "logId": "log_01jq3..."
}`}</CodeBlock>
                  </div>
                </div>
              </div>
            </section>

            {/* TypeScript SDK section will be added next */}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
