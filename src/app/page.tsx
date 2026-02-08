import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ProductOverview } from "@/components/ProductOverview";
import { Features } from "@/components/Features";
import { CodeExample } from "@/components/CodeExample";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";

// Static page: no server-side data fetching; all data is static or client-fetched
export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductOverview />
        <Features />
        <CodeExample />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
