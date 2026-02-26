import { Header } from "@/components/Header";
import { MobileMenu } from "@/components/MobileMenu";
import { Footer } from "@/components/Footer";
import { DocsSidebar } from "@/components/docs/DocsSidebar";

export const dynamic = "force-static";

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
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex gap-12">
          <div className="hidden lg:block">
            <DocsSidebar />
          </div>
          <main className="min-w-0 flex-1 space-y-20">
            {/* Sections will be added in subsequent tasks */}
            <p className="text-[var(--fg-muted)]">Content coming soon…</p>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
