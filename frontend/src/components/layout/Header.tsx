"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { BRAND_ASSETS } from "@/config/brand";

const NAV_LINKS = [
  { href: "/products", label: "المنتجات" },
  { href: "/about", label: "عن نورا سكين" },
  { href: "/contact", label: "تواصلي معنا" },
];

export function Header() {
  const { getItemCount, openDrawer } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const count = mounted ? getItemCount() : 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-nura-border/70 bg-nura-cream/88 backdrop-blur-2xl supports-[backdrop-filter]:bg-nura-cream/72">
        <div className="container-wide">
          <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-2 md:h-[4.25rem] md:gap-4">
            {/* RTL: end column = cart */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={openDrawer}
                className="relative flex items-center justify-center rounded-full border border-nura-border/90 bg-white p-2.5 text-nura-plum shadow-ivory-sm transition-all hover:border-nura-champagne/50 hover:shadow-rose-sm active:scale-[0.97]"
                aria-label="السلة"
              >
                <ShoppingBag className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.35} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -end-0.5 flex h-[18px] min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-nura-rose-deep px-1 text-[10px] font-bold text-white">
                    {count}
                  </span>
                )}
              </button>
            </div>

            {/* Official horizontal lockup — LTR artwork */}
            <Link
              href="/"
              className="relative flex min-w-0 justify-center px-1 dir-ltr"
              dir="ltr"
              aria-label="NURA SKIN نورا سكين — الصفحة الرئيسية"
            >
              <img
                src={BRAND_ASSETS.horizontal}
                alt="NURA SKIN نورا سكين"
                width={1420}
                height={420}
                fetchPriority="high"
                className="h-8 w-auto max-w-[min(58vw,238px)] object-contain mix-blend-multiply md:h-9 lg:h-10"
              />
            </Link>

            <div className="flex items-center justify-start gap-5">
              <nav className="hidden items-center gap-8 md:flex" aria-label="التنقل الرئيسي">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-nura-muted transition-colors hover:text-nura-plum"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <button
                type="button"
                className="flex items-center justify-center rounded-full border border-nura-border/90 bg-white p-2.5 text-nura-plum shadow-ivory-sm transition-all hover:border-nura-champagne/45 hover:shadow-rose-sm md:hidden active:scale-[0.97]"
                aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.35} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="إغلاق"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-nura-plum/25 backdrop-blur-[2px]"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="قائمة التنقل"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 28 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed inset-y-0 start-0 z-[61] flex w-[min(100%,380px)] flex-col bg-nura-cream shadow-luxury border-e border-nura-border"
            >
              <div className="flex items-center justify-between gap-3 border-b border-nura-border px-5 py-4">
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-nura-border bg-white text-nura-plum transition-colors hover:bg-nura-blush"
                  aria-label="إغلاق القائمة"
                >
                  <X className="h-5 w-5" strokeWidth={1.35} />
                </button>
                <div className="dir-ltr min-w-0 flex-1 flex justify-center px-2">
                  <img
                    src={BRAND_ASSETS.horizontal}
                    alt=""
                    width={1420}
                    height={420}
                    className="h-11 w-auto max-w-[220px] object-contain mix-blend-multiply"
                  />
                </div>
                <span className="w-10 shrink-0" aria-hidden />
              </div>

              <nav className="flex flex-1 flex-col gap-1 px-4 py-8" aria-label="روابط الموقع">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-2xl px-5 py-4 text-lg font-semibold text-nura-plum transition-colors hover:bg-white hover:shadow-ivory-sm"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="border-t border-nura-border px-6 py-5">
                <p className="text-center text-xs leading-relaxed text-nura-muted">
                  عناية بشرة بلمسة ناعمة — ثقة وهدوء في كل تفصيلة.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
