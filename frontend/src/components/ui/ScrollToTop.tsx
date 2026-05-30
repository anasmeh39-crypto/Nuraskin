"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Forces the page to start at scroll position 0 on every route change.
 * Must be rendered inside a client boundary (already "use client" here).
 * Uses "instant" behavior so it overrides any smooth-scroll CSS.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Defer by one tick so Next.js finishes painting the new page first
    const raf = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
