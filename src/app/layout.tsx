import type { Metadata } from "next";
import "./globals.css";

// Static export: no server-only APIs (cookies, headers, etc.), no ISR, no API routes
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Tokenist — Guardrails as a Service for Realtime AI APIs",
  description:
    "Per-user token and cost tracking, usage limits, and enforcement guardrails for OpenAI Realtime API. Minimal config, sub-10ms latency.",
  openGraph: {
    title: "Tokenist — Guardrails as a Service",
    description:
      "Per-user limits and visibility for realtime AI APIs. Point your client at the proxy, send identity headers, guardrails apply automatically.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="grain">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
