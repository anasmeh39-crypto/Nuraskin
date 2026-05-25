import Image from "next/image";
import { resolveProductImage } from "@/lib/product-image";

export type FlowImageSize =
  | "cart"          /* 80px desktop / 64px mobile */
  | "cart-sm"       /* 72px upsell row */
  | "checkout"      /* 60px order summary */
  | "confirmation"  /* 72px thank-you */
  | "cross-sell";   /* square fill container */

interface FlowProductImageProps {
  src?: string | null;
  slug?: string;
  alt: string;
  size?: FlowImageSize;
  priority?: boolean;
  className?: string;
}

const SIZE_CLASS: Record<FlowImageSize, string> = {
  cart: "flow-img flow-img-cart",
  "cart-sm": "flow-img flow-img-cart-sm",
  checkout: "flow-img flow-img-checkout",
  confirmation: "flow-img flow-img-confirmation",
  "cross-sell": "flow-img flow-img-cross-sell",
};

export function FlowProductImage({
  src,
  slug,
  alt,
  size = "cart",
  priority = false,
  className = "",
}: FlowProductImageProps) {
  const resolved = resolveProductImage(src, slug);

  return (
    <div className={`${SIZE_CLASS[size]} ${className}`.trim()}>
      <Image
        src={resolved}
        alt={alt}
        fill
        sizes={
          size === "cross-sell"
            ? "(min-width:640px) 180px, 140px"
            : size === "cart" || size === "cart-sm"
              ? "80px"
              : "72px"
        }
        className="flow-img-photo"
        priority={priority}
        loading={priority ? undefined : "lazy"}
      />
    </div>
  );
}
