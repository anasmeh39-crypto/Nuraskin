import Image from "next/image";

const CERTIFICATION_HEADING_AR = "موثوقة ومعتمدة";
const CERTIFICATION_HEADING_FR = "Certifiée et approuvée";

/* Display only certifications Nuraskin actually holds.
   False certification claims violate Loi 31-08 (Moroccan
   consumer protection). Verify each logo before publishing. */
const CERTIFICATIONS = [
  { src: "/images/certifications/dmp.svg", label: "مرخص من مديرية الأدوية والصيدلة", alt: "DMP certified" },
  { src: "/images/certifications/iso-22716.svg", label: "ISO 22716", alt: "ISO 22716 cosmetic GMP" },
  { src: "/images/certifications/halal.svg", label: "شهادة حلال", alt: "Halal certification" },
  { src: "/images/certifications/made-in-morocco.svg", label: "صنع في المغرب", alt: "Made in Morocco badge" },
  {
    src: "/images/certifications/dermatologically-tested.svg",
    label: "مختبر ديرماتولوجياً",
    alt: "Dermatologically tested badge",
  },
  { src: "/images/certifications/cruelty-free.svg", label: "بدون قسوة على الحيوانات", alt: "Cruelty-free badge" },
  { src: "/images/certifications/cash-on-delivery.svg", label: "الدفع عند الاستلام", alt: "Cash on delivery available" },
  { src: "/images/certifications/free-shipping.svg", label: "توصيل مجاني داخل المغرب", alt: "Free shipping Morocco-wide" },
] as const;

function CertificationItem({ certification }: { certification: (typeof CERTIFICATIONS)[number] }) {
  return (
    <div className="nura-cert-card group flex h-[72px] min-w-[150px] flex-col items-center justify-center rounded-2xl bg-white/42 px-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] ring-1 ring-white/70 backdrop-blur-sm transition duration-300 hover:bg-white/70 hover:shadow-[0_16px_38px_rgba(61,44,50,0.055)] md:h-20 md:min-w-[180px]">
      <Image
        src={certification.src}
        alt={certification.alt}
        width={150}
        height={42}
        className="nura-cert-logo max-h-8 w-auto object-contain transition duration-300 md:max-h-10"
      />
      <p className="mt-1.5 max-w-[132px] text-[9px] font-semibold leading-3 text-brand-deep/58 md:mt-2 md:max-w-[140px] md:text-[10px] md:leading-4">
        {certification.label}
      </p>
    </div>
  );
}

export function CertificationsTrustStrip() {
  return (
    <section
      role="region"
      aria-label="شهادات الجودة"
      dir="rtl"
      className="relative overflow-hidden border-y-[0.5px] border-brand-deep/10 bg-[linear-gradient(180deg,#FFF9F6_0%,#FAF7F4_100%)] py-7 md:py-8"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#FAF7F4] to-transparent md:w-24" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#FAF7F4] to-transparent md:w-24" aria-hidden />

      <div className="relative z-20 mb-5 text-center text-[13px] font-medium tracking-[0.15em] text-brand-deep/65">
        <p>{CERTIFICATION_HEADING_AR}</p>
        <p className="mt-1 text-[11px] uppercase">{CERTIFICATION_HEADING_FR}</p>
      </div>

      <div className="nura-marquee-viewport nura-certifications-viewport" role="region" aria-label="شعارات الشهادات وإشارات الثقة">
        <div className="nura-marquee-track nura-marquee-track--certifications">
          {[0, 1, 2].map((setIndex) => (
            <div
              key={setIndex}
              className={`nura-marquee-set gap-4 px-2 md:gap-7 md:px-3 ${setIndex > 0 ? "nura-marquee-set--duplicate" : ""}`}
              aria-hidden={setIndex > 0}
            >
              {CERTIFICATIONS.map((certification) => (
                <CertificationItem key={`${setIndex}-${certification.src}`} certification={certification} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
