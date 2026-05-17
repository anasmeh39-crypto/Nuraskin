import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { AuthoritySection } from "@/components/home/AuthoritySection";
import { ProductCollectionSection } from "@/components/home/ProductCollectionSection";
import { MoroccanSkinSection } from "@/components/home/MoroccanSkinSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { BundleSection } from "@/components/home/BundleSection";
import { FAQSection } from "@/components/home/FAQSection";
import { TrustBadges } from "@/components/ui/TrustBadges";

export const metadata: Metadata = {
  title: "نيورا سكين | عناية متكاملة للبشرة المغربية",
  description:
    "منتجات عناية بشرة مدروسة علمياً للمرأة المغربية. نيورا بالانس، نيورا رينيو الليلي، آي ريفايف. الدفع عند الاستلام.",
  openGraph: {
    title: "نيورا سكين — Nama Beauty",
    description: "عناية بشرة مدروسة للمرأة المغربية",
    url: "https://nuraskin.cc",
    images: [{ url: "/og-home.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://nuraskin.cc" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="container-wide py-10">
        <TrustBadges />
      </div>
      <AuthoritySection />
      <ProductCollectionSection />
      <MoroccanSkinSection />
      <TestimonialsSection />
      <BundleSection />
      <FAQSection />
    </>
  );
}
