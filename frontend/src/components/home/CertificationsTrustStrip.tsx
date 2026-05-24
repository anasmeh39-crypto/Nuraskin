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
    <div className="flex h-20 min-w-[180px] flex-col items-center justify-center text-center">
      <Image
        src={certification.src}
        alt={certification.alt}
        width={160}
        height={40}
        className="max-h-10 w-auto object-contain saturate-[0.7] transition duration-[250ms] hover:saturate-100"
      />
      <p className="mt-2 max-w-[140px] text-[10px] font-medium leading-4 text-brand-deep/65">{certification.label}</p>
    </div>
  );
}

export function CertificationsTrustStrip() {
  return (
    <section
      role="region"
      aria-label="شهادات الجودة"
      dir="rtl"
      className="border-y-[0.5px] border-brand-deep/10 bg-ivory py-8"
    >
      <div className="mb-5 text-center text-[13px] font-medium tracking-[0.15em] text-brand-deep/65">
        <p>{CERTIFICATION_HEADING_AR}</p>
        <p className="mt-1 text-[11px] uppercase">{CERTIFICATION_HEADING_FR}</p>
      </div>

      <div className="nura-marquee-viewport" role="region" aria-label="شعارات الشهادات وإشارات الثقة">
        <div className="nura-marquee-track nura-marquee-track--certifications">
          {[0, 1].map((setIndex) => (
            <div
              key={setIndex}
              className={`nura-marquee-set gap-12 ${setIndex === 1 ? "nura-marquee-set--duplicate" : ""}`}
              aria-hidden={setIndex === 1}
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
