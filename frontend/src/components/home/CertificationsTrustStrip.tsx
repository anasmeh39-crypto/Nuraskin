import React from "react";

/* ─────────────────────────────────────────────────────────────────
   CERTIFICATIONS TRUST STRIP
   Display only certifications Nuraskin actually holds.
   False certification claims violate Loi 31-08 (Moroccan consumer
   protection). Verify each badge with legal counsel before publishing.
───────────────────────────────────────────────────────────────── */

const SECTION_EYEBROW = "CERTIFIÉE ET APPROUVÉE";
const SECTION_HEADLINE = "موثوقة ومعتمدة";

/* ─── Brand color tokens (mirror CSS vars in globals.css) ───────── */
const C = {
  brown:  "#3D2C32",   /* --nura-plum         */
  accent: "#8E5A68",   /* --nura-rose-deep     */
  cream:  "#FFF9F6",   /* --nura-cream         */
  gold:   "#D4BC9B",   /* --nura-champagne     */
  muted:  "#6B4E56",   /* --nura-plum-mid      */
} as const;

/* ─── Shared 52×52 medallion wrapper ────────────────────────────── */
function Medallion({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="26" cy="26" r="24"
        stroke={C.accent} strokeWidth="1.5"
        fill={C.cream} fillOpacity="0.5"
      />
      {children}
    </svg>
  );
}

/* ─── 1. DMP — Direction du Médicament et de la Pharmacie ─────────
   Placeholder medallion. Replace icon content when client provides
   /public/images/certifications/dmp-official.svg
────────────────────────────────────────────────────────────────── */
function DmpIcon() {
  return (
    <Medallion>
      {/* Capsule divided by a center line — pharmaceutical authority */}
      <rect x="12" y="20" width="28" height="12" rx="6"
        stroke={C.accent} strokeWidth="1.5" fill={C.accent} fillOpacity="0.1" />
      <line x1="26" y1="20" x2="26" y2="32"
        stroke={C.accent} strokeWidth="1.2" />
      {/* Top dot — Rx symbol reference */}
      <circle cx="26" cy="14.5" r="2.5" fill={C.accent} />
    </Medallion>
  );
}

/* ─── 2. ONSSA ────────────────────────────────────────────────────
   NOTE: ONSSA primarily regulates food products. Only display if
   Nuraskin holds a confirmed ONSSA certification.
   Placeholder medallion — replace with dmp-official logic when
   /public/images/certifications/onssa-official.svg is provided.
────────────────────────────────────────────────────────────────── */
function OnssaIcon() {
  return (
    <Medallion>
      {/* Stylised leaf — quality / organic authority mark */}
      <path
        d="M26 13C26 13 35 20 35 29C35 34 31 38.5 26 38.5C21 38.5 17 34 17 29C17 20 26 13 26 13Z"
        stroke={C.accent} strokeWidth="1.4"
        fill={C.accent} fillOpacity="0.12"
      />
      {/* Quality checkmark inside leaf */}
      <path
        d="M21.5 28.5L24.5 31.5L31.5 24"
        stroke={C.brown} strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </Medallion>
  );
}

/* ─── 3. ISO 22716 — Cosmetic GMP ─────────────────────────────── */
function IsoIcon() {
  return (
    <Medallion>
      {/* Shield — quality / standards seal */}
      <path
        d="M26 13L35 16.5L35 26C35 31.5 31 35.5 26 38C21 35.5 17 31.5 17 26L17 16.5Z"
        stroke={C.accent} strokeWidth="1.4"
        fill={C.accent} fillOpacity="0.1"
      />
      <path
        d="M21 26.5L24.5 30L32 22"
        stroke={C.brown} strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </Medallion>
  );
}

/* ─── 4. Halal Certified ───────────────────────────────────────── */
function HalalIcon() {
  return (
    <Medallion>
      {/* 8-pointed geometric star — Arabic/Islamic art reference
          NOT a crescent (religious symbol). A purely geometric form. */}
      <polygon
        points="26,14 28.3,20.5 34.5,17.5 31.5,23.7 38,26 31.5,28.3 34.5,34.5 28.3,31.5 26,38 23.7,31.5 17.5,34.5 20.5,28.3 14,26 20.5,23.7 17.5,17.5 23.7,20.5"
        stroke={C.accent} strokeWidth="1.3"
        fill={C.accent} fillOpacity="0.14"
      />
    </Medallion>
  );
}

/* ─── 5. Made in Morocco ──────────────────────────────────────── */
function MoroccoIcon() {
  return (
    <Medallion>
      {/* Stylised 5-pointed star — Moroccan flag reference */}
      <polygon
        points="26,15 28.4,22.8 36.5,22.8 30.1,27.4 32.5,35.2 26,30.6 19.5,35.2 21.9,27.4 15.5,22.8 23.6,22.8"
        stroke={C.brown} strokeWidth="1.4"
        fill={C.accent} fillOpacity="0.18"
      />
      {/* Gold accent line beneath — premium underline */}
      <line x1="19" y1="38" x2="33" y2="38"
        stroke={C.gold} strokeWidth="1.2" />
    </Medallion>
  );
}

/* ─── 6. Dermatologist Recommended ───────────────────────────── */
function DermaIcon() {
  return (
    <Medallion>
      {/* Stethoscope — clean stroke outline */}
      {/* Chest piece — circular disc at bottom */}
      <circle cx="26" cy="35" r="4"
        stroke={C.accent} strokeWidth="1.5"
        fill={C.accent} fillOpacity="0.15"
      />
      {/* Tube left arm */}
      <path
        d="M26 31C26 28 21 26 19 23L19 18"
        stroke={C.brown} strokeWidth="1.5"
        fill="none" strokeLinecap="round"
      />
      {/* Tube right arm */}
      <path
        d="M26 31C26 28 31 26 33 23L33 18"
        stroke={C.brown} strokeWidth="1.5"
        fill="none" strokeLinecap="round"
      />
      {/* Earpieces */}
      <path d="M17 18L17 15.5M21 18L21 15.5"
        stroke={C.brown} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M31 18L31 15.5M35 18L35 15.5"
        stroke={C.brown} strokeWidth="1.5" strokeLinecap="round" />
    </Medallion>
  );
}

/* ─── 7. Available in Pharmacies ─────────────────────────────── */
function PharmacyIcon() {
  return (
    <Medallion>
      {/* Pharmacy cross — brand-brown/rose, NOT green */}
      <rect x="22" y="14" width="8" height="24" rx="3"
        stroke={C.accent} strokeWidth="1.4"
        fill={C.accent} fillOpacity="0.18"
      />
      <rect x="14" y="22" width="24" height="8" rx="3"
        stroke={C.accent} strokeWidth="1.4"
        fill={C.accent} fillOpacity="0.18"
      />
    </Medallion>
  );
}

/* ─── 8. Cruelty-Free ─────────────────────────────────────────── */
function CrueltyFreeIcon() {
  return (
    <Medallion>
      {/* Abstract heart — minimal, non-literal */}
      <path
        d="M26 35C26 35 13 27 13 19C13 15.5 15.8 13 19 13C21.8 13 24 15 26 18C28 15 30.2 13 33 13C36.2 13 39 15.5 39 19C39 27 26 35 26 35Z"
        stroke={C.accent} strokeWidth="1.4"
        fill={C.accent} fillOpacity="0.14"
      />
    </Medallion>
  );
}

/* ─── Badge data ─────────────────────────────────────────────────
   Edit title/subtitle here without touching JSX.
   All text lives in HTML — no Arabic in SVG elements, which
   prevents the font-encoding errors seen in previous iterations.
────────────────────────────────────────────────────────────────── */
const BADGES = [
  {
    id: "dmp",
    Icon: DmpIcon,
    title: "DMP",
    subtitle: "مرخص رسمياً",
    ariaLabel: "مرخص من مديرية الأدوية والصيدلة",
  },
  {
    id: "onssa",
    Icon: OnssaIcon,
    title: "ONSSA",
    subtitle: "جودة معتمدة",
    ariaLabel: "شهادة جودة ONSSA",
  },
  {
    id: "iso",
    Icon: IsoIcon,
    title: "ISO 22716",
    subtitle: "معايير التصنيع",
    ariaLabel: "شهادة ISO 22716 لتصنيع مستحضرات التجميل",
  },
  {
    id: "halal",
    Icon: HalalIcon,
    title: "حلال",
    subtitle: "Halal certifié",
    ariaLabel: "منتج حلال معتمد",
  },
  {
    id: "morocco",
    Icon: MoroccoIcon,
    title: "صنع في المغرب",
    subtitle: "Made in Morocco",
    ariaLabel: "صنع في المغرب",
  },
  {
    id: "derma",
    Icon: DermaIcon,
    title: "موصى به من الأطباء",
    subtitle: "Recommandé par les dermatologues",
    ariaLabel: "موصى به من الأطباء والصيادلة",
  },
  {
    id: "pharmacy",
    Icon: PharmacyIcon,
    title: "متوفر في الصيدليات",
    subtitle: "Disponible en pharmacie",
    ariaLabel: "متوفر في الصيدليات المغربية",
  },
  {
    id: "cruelty",
    Icon: CrueltyFreeIcon,
    title: "خالٍ من القسوة",
    subtitle: "Cruelty-free",
    ariaLabel: "منتج خالٍ من القسوة على الحيوانات",
  },
] as const;

/* ─── Single badge ───────────────────────────────────────────── */
function TrustBadge({
  badge,
  isAriaHidden,
}: {
  badge: (typeof BADGES)[number];
  isAriaHidden: boolean;
}) {
  return (
    <div
      className="trust-badge"
      role={isAriaHidden ? undefined : "img"}
      aria-label={isAriaHidden ? undefined : badge.ariaLabel}
      aria-hidden={isAriaHidden || undefined}
    >
      <div className="trust-badge-icon">
        <badge.Icon />
      </div>
      {/* Gold rule between icon and text */}
      <div className="trust-badge-rule" aria-hidden="true" />
      <p className="trust-badge-title">{badge.title}</p>
      <p className="trust-badge-subtitle">{badge.subtitle}</p>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────── */
export function CertificationsTrustStrip() {
  return (
    <section
      role="region"
      aria-label="شهادات الجودة والاعتماد"
      className="trust-strip-section"
    >
      {/* Heading */}
      <div className="trust-strip-header">
        <p className="trust-strip-eyebrow">{SECTION_EYEBROW}</p>
        <p className="trust-strip-headline" aria-level={2} role="heading">
          {SECTION_HEADLINE}
        </p>
      </div>

      {/* Marquee — 3 identical sets for seamless infinite loop.
          translateX(-33.33%) moves by exactly one set width. */}
      <div
        className="trust-strip"
        aria-label="شعارات الشهادات"
        role="region"
      >
        <div className="trust-strip-track" aria-live="off">
          {[0, 1, 2].map((setIndex) => (
            <div
              key={setIndex}
              className="trust-strip-set"
              aria-hidden={setIndex > 0 ? true : undefined}
            >
              {BADGES.map((badge) => (
                <TrustBadge
                  key={`${setIndex}-${badge.id}`}
                  badge={badge}
                  isAriaHidden={setIndex > 0}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
