"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { PRODUCTS } from "@/config/products";

const PRODUCT_SEARCH_TERMS: Record<string, string[]> = {
  "nura-balance": [
    "serum niacinamide",
    "niacinamide",
    "pores",
    "brillance",
    "teint",
    "sebum",
    "peau grasse",
    "مسام",
    "لمعان",
    "دهون",
    "نياسيناميد",
  ],
  "nura-night-renewal": [
    "creme nuit",
    "night cream",
    "retinol",
    "bakuchiol",
    "rides",
    "hydratation",
    "تجديد",
    "كريم الليل",
    "كريم ليلي",
    "نعومة",
  ],
  "nura-eye-revive": [
    "serum anti cernes",
    "anti cernes",
    "cernes",
    "poches",
    "eye serum",
    "contour des yeux",
    "الهالات",
    "هالات",
    "انتفاخ",
    "محيط العين",
    "سيروم العين",
  ],
  "nura-spf-50": [
    "creme solaire",
    "sunscreen",
    "spf",
    "spf 50",
    "protection solaire",
    "ecran solaire",
    "واقي الشمس",
    "كريم الشمس",
    "حماية الشمس",
    "حماية",
  ],
};

function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[إأآا]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function ProductSearch() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const suggestions = useMemo(() => {
    const normalizedQuery = normalizeSearchText(query);
    if (normalizedQuery.length < 2) return [];

    return PRODUCTS.map((product) => {
      const searchText = normalizeSearchText(
        [
          product.name_ar,
          product.name_en,
          product.tagline_ar,
          product.description_ar,
          product.heroIngredient,
          product.format,
          ...product.benefits,
          ...product.concerns,
          ...product.ingredients.flatMap((ingredient) => [
            ingredient.name_ar,
            ingredient.name_en,
            ingredient.description_ar,
          ]),
          ...(PRODUCT_SEARCH_TERMS[product.slug] || []),
        ]
          .filter(Boolean)
          .join(" ")
      );

      const queryWords = normalizedQuery.split(" ");
      const score = queryWords.reduce((total, word) => {
        if (searchText === word) return total + 12;
        if (searchText.includes(` ${word} `)) return total + 8;
        if (searchText.includes(word)) return total + 4;
        return total;
      }, 0);

      return { product, score };
    })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((entry) => entry.product);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const trimmedQuery = query.trim();
  const showSuggestions = isOpen && trimmedQuery.length >= 2;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (suggestions[0]) {
      router.push(`/products/${suggestions[0].slug}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  return (
    <div ref={rootRef} className="relative w-full" dir="rtl">
      <form
        role="search"
        aria-label="البحث عن منتجات نورا سكين"
        onSubmit={handleSubmit}
        className="relative"
      >
        <Search
          className="pointer-events-none absolute end-4 top-1/2 h-4 w-4 -translate-y-1/2 text-nura-muted"
          strokeWidth={1.7}
          aria-hidden
        />
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsOpen(false);
              event.currentTarget.blur();
            }
          }}
          type="search"
          inputMode="search"
          autoComplete="off"
          placeholder="بحثي بالعربية أو الفرنسية: واقي الشمس، anti cernes..."
          className="h-11 w-full rounded-full border border-nura-border/90 bg-white ps-11 pe-11 text-sm font-medium text-nura-plum shadow-ivory-sm outline-none transition-all placeholder:text-nura-muted/70 focus:border-nura-rose-deep/45 focus:shadow-rose-sm"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute start-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-nura-muted transition hover:bg-nura-blush hover:text-nura-plum"
            aria-label="مسح البحث"
          >
            <X className="h-4 w-4" strokeWidth={1.6} />
          </button>
        )}
      </form>

      {showSuggestions && (
        <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-[70] overflow-hidden rounded-3xl border border-nura-border bg-white shadow-luxury">
          {suggestions.length > 0 ? (
            <div className="p-2">
              <p className="px-3 pb-2 pt-1 text-[11px] font-bold text-nura-muted">
                منتجات مقترحة
              </p>
              {suggestions.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className="flex flex-row-reverse items-center gap-3 rounded-2xl p-2 transition hover:bg-nura-blush/70"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-nura-blush">
                    <Image
                      src={product.image}
                      alt={product.name_ar}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-right">
                    <p className="truncate text-sm font-bold text-nura-plum">
                      {product.name_ar}
                    </p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-nura-muted">
                      {product.tagline_ar}
                    </p>
                    <p className="mt-1 text-xs font-bold text-nura-rose-deep">
                      {product.formattedPrice}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <p className="text-sm font-bold text-nura-plum">ما لقيناش منتج بهذا الاسم</p>
              <p className="mt-1 text-xs leading-5 text-nura-muted">
                جربي تكتبي: anti cernes، crème solaire، niacinamide، أو كريم الليل.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
