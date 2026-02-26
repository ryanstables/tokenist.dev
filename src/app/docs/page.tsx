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

            {/* ── TYPESCRIPT SDK ──────────────────────────────────────────── */}
            <section id="typescript-sdk" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-[var(--fg)]">
                TypeScript SDK
              </h2>
              <div className="mt-4 h-px bg-[var(--border)]" />
              <p className="mt-4 text-[var(--fg-muted)] leading-relaxed">
                <InlineCode>tokenist-js</InlineCode> is a typed Node.js client for the
                Tokenist API. It wraps the three SDK endpoints and provides full
                TypeScript types for all request and response shapes.
              </p>

              {/* Installation */}
              <div id="sdk-install" className="mt-10 scroll-mt-24">
                <h3 className="text-lg font-semibold text-[var(--fg)]">Installation</h3>
                <div className="mt-4 space-y-4">
                  <CodeBlock>{`npm install tokenist-js`}</CodeBlock>
                  <CodeBlock>{`import { TokenistClient } from "tokenist-js";

const tokenist = new TokenistClient({
  apiKey: process.env.TOKENIST_API_KEY!, // ug_...
  baseUrl: "https://api.tokenist.dev",   // or your self-hosted URL
});`}</CodeBlock>
                </div>
              </div>

              {/* client.sdk.check() */}
              <div id="sdk-check" className="mt-12 scroll-mt-24">
                <h3 className="text-lg font-semibold text-[var(--fg)]">
                  client.sdk.check()
                </h3>
                <p className="mt-2 text-[var(--fg-muted)]">
                  Check whether a user is allowed to make an OpenAI request. Call this
                  before forwarding to OpenAI and abort if{" "}
                  <InlineCode>allowed</InlineCode> is <InlineCode>false</InlineCode>.
                </p>
                <div className="mt-4 space-y-4">
                  <CodeBlock>{`const result = await tokenist.sdk.check({
  userId: "user_alice",
  model: "gpt-4o",
  requestType: "chat",
  estimatedTokens: 500,    // optional
  feature: "support-chat", // optional
});

if (!result.allowed) {
  throw new Error(\`Request blocked: \${result.reason}\`);
}`}</CodeBlock>
                </div>

                <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-[var(--fg-muted)]/60">
                  Type signatures
                </h4>
                <CodeBlock>{`interface SdkCheckRequest {
  userId: string;
  model: string;
  requestType: "chat" | "realtime" | "embeddings";
  estimatedTokens?: number;
  feature?: string;
}

interface SdkCheckResponse {
  allowed: boolean;
  reason?: string;
  usage: { tokens: number; costUsd: number };
  remaining?: { tokens: number; costUsd: number };
}`}</CodeBlock>
              </div>

              {/* client.sdk.record() */}
              <div id="sdk-record" className="mt-12 scroll-mt-24">
                <h3 className="text-lg font-semibold text-[var(--fg)]">
                  client.sdk.record()
                </h3>
                <p className="mt-2 text-[var(--fg-muted)]">
                  Record actual token usage after a completed OpenAI call. Returns the
                  user&apos;s updated totals and whether they were automatically blocked.
                </p>
                <div className="mt-4 space-y-4">
                  <CodeBlock>{`await tokenist.sdk.record({
  userId: "user_alice",
  model: "gpt-4o",
  requestType: "chat",
  inputTokens: openAiResponse.usage.prompt_tokens,
  outputTokens: openAiResponse.usage.completion_tokens,
  latencyMs: Date.now() - startTime,
  success: true,
  feature: "support-chat",
});`}</CodeBlock>
                </div>

                <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-[var(--fg-muted)]/60">
                  Type signatures
                </h4>
                <CodeBlock>{`interface SdkRecordRequest {
  userId: string;
  model: string;
  requestType: "chat" | "realtime" | "embeddings";
  inputTokens: number;
  outputTokens: number;
  latencyMs: number;
  success: boolean;
  feature?: string;
}`}</CodeBlock>
              </div>

              {/* client.sdk.log() */}
              <div id="sdk-log" className="mt-12 scroll-mt-24">
                <h3 className="text-lg font-semibold text-[var(--fg)]">
                  client.sdk.log()
                </h3>
                <p className="mt-2 text-[var(--fg-muted)]">
                  Persist the full request/response payload. Required to see conversation
                  history and enable sentiment analysis in the dashboard.
                </p>
                <div className="mt-4 space-y-4">
                  <CodeBlock>{`await tokenist.sdk.log({
  model: "gpt-4o",
  request: { messages },        // the body sent to OpenAI
  response: openAiResponse,     // the full response object
  userId: "user_alice",
  userEmail: "alice@example.com",
  userName: "Alice",
  conversationId: sessionId,
  feature: "support-chat",
  latencyMs: Date.now() - startTime,
  status: "success",
});`}</CodeBlock>
                </div>

                <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-[var(--fg-muted)]/60">
                  Type signatures
                </h4>
                <CodeBlock>{`interface SdkLogRequest {
  model: string;
  request: Record<string, unknown>;
  response?: Record<string, unknown>;
  userId?: string;
  userEmail?: string;
  userName?: string;
  conversationId?: string;
  feature?: string;
  latencyMs?: number;
  status?: "success" | "error";
}`}</CodeBlock>
              </div>

              {/* Putting it all together */}
              <div className="mt-14 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
                <h3 className="font-semibold text-[var(--fg)]">Putting it together</h3>
                <p className="mt-2 text-sm text-[var(--fg-muted)]">
                  A typical server-side middleware pattern using all three methods:
                </p>
                <div className="mt-4">
                  <CodeBlock>{`async function openAiWithGuardrails(
  userId: string,
  messages: ChatMessage[],
) {
  // 1. Check before the request
  const check = await tokenist.sdk.check({
    userId,
    model: "gpt-4o",
    requestType: "chat",
    feature: "support-chat",
  });
  if (!check.allowed) throw new Error(check.reason);

  // 2. Call OpenAI
  const start = Date.now();
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
  });
  const latencyMs = Date.now() - start;

  // 3. Record usage
  await tokenist.sdk.record({
    userId,
    model: "gpt-4o",
    requestType: "chat",
    inputTokens: response.usage!.prompt_tokens,
    outputTokens: response.usage!.completion_tokens,
    latencyMs,
    success: true,
  });

  // 4. Log full payload
  await tokenist.sdk.log({
    model: "gpt-4o",
    request: { messages },
    response,
    userId,
    latencyMs,
  });

  return response;
}`}</CodeBlock>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
