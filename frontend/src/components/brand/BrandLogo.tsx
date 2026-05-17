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
        ? { width: 120, height: 150, className: "h-28 w-auto md:h-32" }
        : { width: 160, height: 200, className: "h-36 w-auto md:h-40" }
      : size === "compact"
        ? { width: 240, height: 44, className: "h-8 w-auto md:h-9" }
        : { width: 280, height: 52, className: "h-9 w-auto md:h-11" };

  const inner = (
    <span className={`inline-flex dir-ltr ${className}`} dir="ltr">
      <img
        src={src}
        alt="NURA SKIN نورا سكين"
        width={dims.width}
        height={dims.height}
        className={dims.className}
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
