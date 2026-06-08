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

          {/* Eyebrow — Arabic brand line */}
          <p
            className="hero-eyebrow hero-animate hero-animate-sm"
            style={{ animationDelay: "100ms" }}
          >
            روتين العناية اليومية — نورا سكين
          </p>

          {/* Headline — Moroccan Darija */}
          <h1
            className="hero-headline hero-animate"
            style={{ animationDelay: "200ms" }}
          >
            بشرتك تستاهل روتين يخدم — مو بس كريم
          </h1>

          {/* Body paragraph — Darija */}
          <p
            className="hero-body hero-animate hero-animate-sm"
            style={{ animationDelay: "350ms" }}
          >
            4 منتجات مدروسين — إشراقة، توازن، تجديد ليلي، وحماية صباحية.
            روتين واضح كتشوفي نتائجو مع الوقت.
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

          {/* Social proof + urgency */}
          <div className="mt-5 space-y-2.5 hero-animate hero-animate-xs" style={{ animationDelay: "640ms" }} dir="rtl">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} className="h-4 w-4 text-[#E8A838]" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-bold text-[#2C1810]">4.8</span>
              <span className="text-sm text-[#9B8A8A]">· +5,000 تقييم موثّق</span>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-xl bg-amber-50 border border-amber-200/60 px-3.5 py-2 md:justify-start">
              <span className="text-base leading-none">🔥</span>
              <p className="text-xs font-semibold text-amber-800">+200 زبونة طلبوا هاد الأسبوع — توصيل مجاني لجميع المدن</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
