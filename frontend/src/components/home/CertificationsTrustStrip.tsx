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

/* ─── Shared 52×52 medallion shell ─────────────────────────────── */
function Medallion({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="52" height="52" viewBox="0 0 52 52"
      fill="none" aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="26" cy="26" r="24"
        stroke={C.accent} strokeWidth="1.5"
        fill={C.cream} fillOpacity="0.5"
      />
      {children}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ICON 1 — DMP (Direction des Médicaments et de la Pharmacie)
   Visual reference: the DMP "d" letterform — a bold geometric
   stroke with an upward ascender + oval bowl on the left,
   and the characteristic horizontal pill accent inside the bowl.
   Colors: DMP's navy → brand-brown | teal pill → rose-burgundy.
═══════════════════════════════════════════════════════════════ */
function DmpIcon() {
  return (
    <Medallion>
      {/* Ascender + baseline stem — right-side vertical of the "d" */}
      <line x1="33" y1="11" x2="33" y2="41"
        stroke={C.brown} strokeWidth="5.5" strokeLinecap="round" />
      {/* Bowl — curves left from stem top to stem bottom */}
      <path
        d="M33 20 C33 13 12 13 12 26 C12 39 33 39 33 39"
        stroke={C.brown} strokeWidth="5.5"
        fill="none" strokeLinecap="round"
      />
      {/* Horizontal pill — DMP's teal bar, recolored to rose-burgundy */}
      <rect x="13.5" y="23.5" width="17" height="5.5" rx="2.75" fill={C.accent} />
    </Medallion>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ICON 2 — ONSSA
   Visual reference: ONSSA's three-arc swoosh motif (blue/green/
   yellow) + 5-pointed star apex (red). Recolored: outer arc →
   gold, middle → rose-burgundy, inner → muted brown, star →
   brand-brown. Retains the energy of the original mark.
═══════════════════════════════════════════════════════════════ */
function OnssaIcon() {
  return (
    <Medallion>
      {/* Outer arc — gold (was yellow/gold in original) */}
      <path d="M14 40 C17 29 22 18 32 13"
        stroke={C.gold} strokeWidth="3.2"
        fill="none" strokeLinecap="round" />
      {/* Middle arc — rose-burgundy (was blue in original) */}
      <path d="M18 41 C22 30 27 20 37 15"
        stroke={C.accent} strokeWidth="3.2"
        fill="none" strokeLinecap="round" />
      {/* Inner arc — muted brown (was green in original) */}
      <path d="M23 42 C27 31 32 22 40 19"
        stroke={C.muted} strokeWidth="3.2"
        fill="none" strokeLinecap="round" />
      {/* 5-pointed star at arc apex — brand-brown (was red in original)
          Center (32.5, 11), outer r=4.2, inner r=1.7 */}
      <polygon
        points="32.5,6.8 33.7,10.3 37.4,10.3 34.5,12.4 35.6,15.9 32.5,13.8 29.4,15.9 30.5,12.4 27.6,10.3 31.3,10.3"
        fill={C.brown}
      />
    </Medallion>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ICON 3 — ISO 22716 (Cosmetic GMP)
   A quality shield with a bold checkmark — universally understood
   as a standards / certification seal.
═══════════════════════════════════════════════════════════════ */
function IsoIcon() {
  return (
    <Medallion>
      {/* Shield */}
      <path
        d="M26 12 L35.5 16 L35.5 26.5 C35.5 32.5 31.2 37 26 39.5 C20.8 37 16.5 32.5 16.5 26.5 L16.5 16 Z"
        stroke={C.accent} strokeWidth="1.5"
        fill={C.accent} fillOpacity="0.1"
      />
      {/* Checkmark */}
      <path d="M20.5 26.5 L24.5 30.5 L32.5 21.5"
        stroke={C.brown} strokeWidth="2.1"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </Medallion>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ICON 4 — Halal Certified
   A precise 8-pointed geometric star — drawn from Arabic/Islamic
   geometric art tradition. NOT a crescent (religious symbol).
   A purely abstract, decorative geometric form.
═══════════════════════════════════════════════════════════════ */
function HalalIcon() {
  return (
    <Medallion>
      {/* 8-pointed star: 8 outer + 8 inner alternating points
          Outer r=11, inner r=4.5, center (26,26) */}
      <polygon
        points="26,15 28.3,21.4 34.8,18.5 31.8,24.7 38.8,26 31.8,27.3 34.8,33.5 28.3,30.6 26,37 23.7,30.6 17.2,33.5 20.2,27.3 13.2,26 20.2,24.7 17.2,18.5 23.7,21.4"
        stroke={C.accent} strokeWidth="1.3"
        fill={C.accent} fillOpacity="0.15"
      />
      {/* Small circle at center — jewel */}
      <circle cx="26" cy="26" r="2.5" fill={C.accent} fillOpacity="0.5" />
    </Medallion>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ICON 5 — Made in Morocco
   A bold 5-pointed star (Moroccan flag reference) with a thin
   gold horizontal rule beneath — understated national pride.
═══════════════════════════════════════════════════════════════ */
function MoroccoIcon() {
  return (
    <Medallion>
      {/* Moroccan 5-pointed star
          Center (26,24.5), outer r=10, inner r=4
          Starting at top (-90°) */}
      <polygon
        points="26,14.5 28.4,22.3 36.5,22.3 30.0,27.1 32.5,34.8 26,30.0 19.5,34.8 22.0,27.1 15.5,22.3 23.6,22.3"
        stroke={C.brown} strokeWidth="1.5"
        fill={C.accent} fillOpacity="0.22"
      />
      {/* Gold rule — premium underline */}
      <line x1="18" y1="39" x2="34" y2="39"
        stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" />
    </Medallion>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ICON 6 — Dermatologist Recommended
   A clean stethoscope — the universal symbol of medical authority.
   Two symmetric tube arms + chest piece at base.
═══════════════════════════════════════════════════════════════ */
function DermaIcon() {
  return (
    <Medallion>
      {/* Left earpiece bar */}
      <line x1="17" y1="17" x2="21.5" y2="17"
        stroke={C.brown} strokeWidth="1.6" strokeLinecap="round" />
      {/* Right earpiece bar */}
      <line x1="30.5" y1="17" x2="35" y2="17"
        stroke={C.brown} strokeWidth="1.6" strokeLinecap="round" />
      {/* Left tube — down then curves to chest piece */}
      <path d="M19.5 17 L19.5 30 C19.5 34 22.5 36.5 26 36.5"
        stroke={C.brown} strokeWidth="1.6"
        fill="none" strokeLinecap="round"
      />
      {/* Right tube — mirror */}
      <path d="M32.5 17 L32.5 30 C32.5 34 29.5 36.5 26 36.5"
        stroke={C.brown} strokeWidth="1.6"
        fill="none" strokeLinecap="round"
      />
      {/* Chest piece — disc with rose tint */}
      <circle cx="26" cy="36.5" r="4"
        stroke={C.accent} strokeWidth="1.5"
        fill={C.accent} fillOpacity="0.2"
      />
    </Medallion>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ICON 7 — Available in Pharmacies
   The pharmacy cross (+) — universally recognised, recolored
   from the standard green to brand rose-burgundy.
═══════════════════════════════════════════════════════════════ */
function PharmacyIcon() {
  return (
    <Medallion>
      {/* Vertical bar of the cross */}
      <rect x="22.5" y="13" width="7" height="26" rx="3"
        stroke={C.accent} strokeWidth="1.4"
        fill={C.accent} fillOpacity="0.18"
      />
      {/* Horizontal bar */}
      <rect x="13" y="22.5" width="26" height="7" rx="3"
        stroke={C.accent} strokeWidth="1.4"
        fill={C.accent} fillOpacity="0.18"
      />
    </Medallion>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ICON 8 — Cruelty-Free
   A heart silhouette with a small leaf flourish at the base —
   signifying compassion for animals without using a literal
   rabbit icon.
═══════════════════════════════════════════════════════════════ */
function CrueltyFreeIcon() {
  return (
    <Medallion>
      {/* Heart form */}
      <path
        d="M26 36 C26 36 12.5 27.5 12.5 18.5 C12.5 14.5 15.5 12 19 12 C22 12 24.2 14 26 17 C27.8 14 30 12 33 12 C36.5 12 39.5 14.5 39.5 18.5 C39.5 27.5 26 36 26 36 Z"
        stroke={C.accent} strokeWidth="1.5"
        fill={C.accent} fillOpacity="0.16"
      />
      {/* Leaf at base — compassion / nature signal */}
      <path d="M26 36 C26 36 23 38.5 26 40 C29 38.5 26 36 26 36 Z"
        fill={C.muted} fillOpacity="0.55"
      />
    </Medallion>
  );
}

/* ─── Badge data ─────────────────────────────────────────────────
   All Arabic / French text lives here in JS strings — never inside
   SVG <text> elements — eliminating the font-encoding errors that
   caused "5F9 AJ 'DE:1(" and "-D'D" in prior iterations.
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
      {/* Gold gradient rule between medallion and title */}
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
      {/* Heading group */}
      <div className="trust-strip-header">
        <p className="trust-strip-eyebrow">{SECTION_EYEBROW}</p>
        <p className="trust-strip-headline" aria-level={2} role="heading">
          {SECTION_HEADLINE}
        </p>
      </div>

      {/* Marquee — 3 identical sets for seamless infinite loop.
          translateX(-33.33%) moves exactly one set width. */}
      <div className="trust-strip" role="region" aria-label="شعارات الشهادات">
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
