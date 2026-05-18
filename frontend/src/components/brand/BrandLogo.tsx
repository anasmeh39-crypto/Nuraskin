import React from "react";
import Link from "next/link";
import { BRAND_ASSETS } from "@/config/brand";

/** Back-compat wrapper — uses native img for SVG official marks. */
type BrandLogoProps = {
  variant?: "light" | "dark";
  size?: "default" | "compact";
  href?: string;
  className?: string;
};

export function BrandLogo({
  variant = "light",
  size = "default",
  href,
  className = "",
}: BrandLogoProps) {
  const src =
    variant === "dark"
      ? BRAND_ASSETS.stackedInverse
      : BRAND_ASSETS.horizontal;

  const dims =
    variant === "dark"
      ? size === "compact"
        ? { width: 710, height: 210, className: "h-14 w-auto md:h-16" }
        : { width: 1420, height: 420, className: "h-16 w-auto md:h-20" }
      : size === "compact"
        ? { width: 710, height: 210, className: "h-8 w-auto md:h-9" }
        : { width: 1420, height: 420, className: "h-9 w-auto md:h-11" };

  const inner = (
    <span className={`inline-flex dir-ltr ${className}`} dir="ltr">
      <img
        src={src}
        alt="NURA SKIN نورا سكين"
        width={dims.width}
        height={dims.height}
        className={`${dims.className} object-contain mix-blend-multiply`}
      />
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="outline-none focus-visible:ring-2 focus-visible:ring-nura-champagne/40 rounded-xl">
        {inner}
      </Link>
    );
  }

  return inner;
}
