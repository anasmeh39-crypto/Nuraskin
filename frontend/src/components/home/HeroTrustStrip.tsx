/* ─────────────────────────────────────────────────────────────────
   HERO TRUST STRIP
   Thin understated strip immediately below the hero section.
   Three trust signals as icon + text — no pills, no borders on
   individual items. Full-width, centered, stacks on mobile.
   Icons are minimal stroke-only SVGs in brand-brown.
───────────────────────────────────────────────────────────────── */

function CodIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {/* Banknote outline */}
      <rect x="1" y="4" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      {/* Center circle */}
      <circle cx="8" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.25" />
      {/* Left mark */}
      <line x1="3" y1="8.5" x2="4.5" y2="8.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      {/* Right mark */}
      <line x1="11.5" y1="8.5" x2="13" y2="8.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {/* Cargo box */}
      <rect x="1" y="4" width="9" height="7" rx="1" stroke="currentColor" strokeWidth="1.25" />
      {/* Cab */}
      <path d="M10 6H13L15 9V11H10V6Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      {/* Left wheel */}
      <circle cx="3.5" cy="11.5" r="1.25" stroke="currentColor" strokeWidth="1.25" />
      {/* Right wheel */}
      <circle cx="12.5" cy="11.5" r="1.25" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function FlaskIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {/* Flask body */}
      <path
        d="M5.5 2H10.5V7L13.5 13H2.5L5.5 7V2Z"
        stroke="currentColor" strokeWidth="1.25"
        strokeLinejoin="round"
      />
      {/* Flask neck top */}
      <line x1="5" y1="2" x2="11" y2="2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      {/* Liquid fill hint */}
      <path d="M4.5 11H11.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
    </svg>
  );
}

const TRUST_ITEMS = [
  { Icon: CodIcon,   text: "الدفع عند الاستلام" },
  { Icon: TruckIcon, text: "توصيل مجاني لجميع أنحاء المغرب" },
  { Icon: FlaskIcon, text: "تركيبات مختارة بعناية" },
] as const;

export function HeroTrustStrip() {
  return (
    <div className="hero-trust-strip" role="list" aria-label="مزايا التسوق">
      {TRUST_ITEMS.map(({ Icon, text }) => (
        <div key={text} className="hero-trust-item" role="listitem">
          <Icon />
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}
