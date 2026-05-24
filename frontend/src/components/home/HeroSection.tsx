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
      <div className="hero-container">

        {/* ── IMAGE PANEL ─────────────────────────────────────────
            DOM-first → appears on TOP on mobile, LEFT on desktop.
            grid-column: 2 places it in the 60% column which in RTL
            renders as the visual left side of the viewport. */}
        <div className="hero-image-panel hero-animate-img">
          <div className="hero-image-frame">
            <Image
              src="/images/nura-complete-routine-hero.png"
              alt="روتين نورا سكين الكامل للعناية بالبشرة"
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

          {/* Body paragraph — Arabic copy verbatim */}
          <p
            className="hero-body hero-animate hero-animate-sm"
            style={{ animationDelay: "350ms" }}
          >
            أربع تركيبات أساسية مختارة بعناية لتدعم احتياجات البشرة اليومية،
            من الإشراقة إلى الحماية الصباحية، دون تعقيد أو وعود مبالغ فيها.
          </p>

          {/* CTA pair — primary pill + secondary text link */}
          <div
            className="hero-ctas hero-animate hero-animate-xs"
            style={{ animationDelay: "500ms" }}
          >
            <Link href="/products" className="hero-cta-primary">
              اكتشفي المجموعة
            </Link>
            {/* Secondary: no button shell, text link only with RTL arrow */}
            <Link href="/about" className="hero-cta-secondary">
              لماذا نورا؟ ←
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
