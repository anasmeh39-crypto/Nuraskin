"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart";

export function Header() {
  const { getItemCount, openDrawer } = useCartStore();
  const count = getItemCount();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="container-wide flex items-center justify-between h-16 md:h-18">
        {/* Cart button (right in RTL = visual left) */}
        <button
          onClick={openDrawer}
          className="relative p-2 text-brand-deep hover:text-brand-mid transition-colors"
          aria-label="السلة"
        >
          <ShoppingBagIcon className="w-6 h-6" />
          {count > 0 && (
            <span className="absolute -top-0.5 -end-0.5 bg-gold text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center min-w-[18px] min-h-[18px] px-1">
              {count}
            </span>
          )}
        </button>

        {/* Logo — center */}
        <Link href="/" className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-2">
            {/* N circle icon */}
            <div className="w-8 h-8 rounded-full border-2 border-brand-deep flex items-center justify-center">
              <span className="text-brand-deep font-bold text-base leading-none font-sans">
                N
              </span>
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-brand-deep font-bold text-lg tracking-tight font-arabic">
                نيورا سكين
              </span>
              <span className="text-gold text-[10px] font-medium font-sans tracking-widest">
                NAMA BEAUTY
              </span>
            </div>
          </div>
        </Link>

        {/* Nav (desktop) / menu icon (mobile) */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/products"
            className="text-sm text-gray-600 hover:text-brand-deep transition-colors font-medium"
          >
            المنتجات
          </Link>
          <Link
            href="/about"
            className="text-sm text-gray-600 hover:text-brand-deep transition-colors font-medium"
          >
            عن نيورا
          </Link>
          <Link
            href="/contact"
            className="text-sm text-gray-600 hover:text-brand-deep transition-colors font-medium"
          >
            تواصلي معنا
          </Link>
        </nav>

        {/* Mobile: empty spacer to balance cart icon */}
        <div className="md:hidden w-10" />
      </div>
    </header>
  );
}
