import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────
   HERO SECTION — Editorial redesign
   Layout: 60% image (visual LEFT) / 40% text (visual RIGHT) on
   desktop ≥1024px, RTL. Stacks image-on-top on mobile.
   Copy is verbatim — do not edit text nodes in this file.
───────────────────────────────────────────────────────────────── */

export function HeroSection() {
  return (
    <section className="hero-section" aria-label="نورا سكين — روتين العناية بالبشرة">
      {/* dir="ltr" gives us physical left→right column control.
          The text panel overrides with direction:rtl for Arabic text. */}
      <div className="hero-container" dir="ltr">

        {/* ── IMAGE PANEL ─────────────────────────────────────────
            DOM-first → appears on TOP on mobile, LEFT on desktop.
            grid-column: 2 places it in the 60% column which in RTL
            renders as the visual left side of the viewport. */}
        <div className="hero-image-panel hero-animate-img">
          <div className="hero-image-frame">
            <Image
              src="/images/nura-hero-lifestyle.png"
              alt="روتين نورا سكين الكامل للعناية بالبشرة — مجموعة نورا سكين في مراكش"
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 92vw"
              className="hero-image"
            />
            {/* Editorial caption — replaces the floating card overlay */}
            <div className="hero-image-caption" aria-hidden="true">
              <p className="hero-image-caption-title">روتين متكامل</p>
              <p className="hero-image-caption-sub">إشراقة، تجديد، عين، وحماية</p>
            </div>
          </div>
        </div>

        {/* ── TEXT PANEL ──────────────────────────────────────────
            DOM-second → appears on BOTTOM on mobile, RIGHT on desktop.
            grid-column: 1 → 40% column → visual RIGHT in RTL. */}
        <div className="hero-text-panel">

          {/* Eyebrow — Playfair Display italic for editorial refinement */}
          <p
            className="hero-eyebrow hero-animate hero-animate-sm"
            style={{ animationDelay: "100ms" }}
          >
            RITUEL DE SOIN QUOTIDIEN
          </p>

          {/* Headline — Arabic copy verbatim, weight 400 for quiet luxury */}
          <h1
            className="hero-headline hero-animate"
            style={{ animationDelay: "200ms" }}
          >
            روتين عناية ناعم لبشرة أكثر توازنًا وإشراقًا
          </h1>

          {/* Body paragraph */}
          <p
            className="hero-body hero-animate hero-animate-sm"
            style={{ animationDelay: "350ms" }}
          >
            أربع تركيبات مدروسة تدعم إشراقة البشرة، توازنها، تجديدها الليلي،
            وحمايتها الصباحية — روتين واضح يعطي نتائج ملموسة.
          </p>

          {/* CTA pair — primary pill + COD trust note */}
          <div
            className="hero-ctas hero-animate hero-animate-xs"
            style={{ animationDelay: "500ms" }}
          >
            <Link href="/packs" className="hero-cta-primary">
              اطلبي الآن
            </Link>
            <span className="hero-cod-note">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                <rect x="1" y="4" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
                <circle cx="8" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.25" />
                <line x1="3" y1="8.5" x2="4.5" y2="8.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                <line x1="11.5" y1="8.5" x2="13" y2="8.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
              الدفع عند الاستلام — ما تخلصي حتى توصلي
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
