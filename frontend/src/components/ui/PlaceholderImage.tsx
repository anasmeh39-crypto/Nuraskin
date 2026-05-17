import React from "react";
import { Sparkles } from "lucide-react";

interface PlaceholderImageProps {
  width?: number;
  height?: number;
  label?: string;
  className?: string;
  aspectRatio?: "square" | "portrait" | "landscape";
}

export function PlaceholderImage({
  label = "Nura Skin",
  className = "",
  aspectRatio = "square",
}: PlaceholderImageProps) {
  const ratioClass = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  }[aspectRatio];

  return (
    <div
      className={`${ratioClass} ${className} relative flex items-center justify-center overflow-hidden rounded-inherit bg-[radial-gradient(circle_at_30%_20%,#fffdf9_0%,#f7dde4_34%,#fffaf1_72%)]`}
    >
      <div className="absolute inset-8 rounded-[2rem] border border-white/70" />
      <div className="absolute -bottom-10 h-40 w-32 rounded-t-[3rem] border border-white/70 bg-white/40 backdrop-blur-md" />
      <div className="absolute bottom-10 h-44 w-20 rounded-[2.5rem] border border-white/80 bg-white/70 shadow-[0_24px_60px_rgba(59,36,50,0.12)]" />
      <div className="absolute top-10 right-10 h-16 w-16 rounded-full bg-white/45 blur-sm" />
      <div className="absolute bottom-16 left-12 h-12 w-12 rounded-full bg-[#fff1c9]/80 blur-sm" />
      <div className="relative z-10 flex flex-col items-center gap-3 select-none">
        <div className="w-16 h-16 rounded-full border border-brand-deep/20 bg-white/70 backdrop-blur flex items-center justify-center shadow-sm">
          <Sparkles className="h-6 w-6 text-brand-mid" strokeWidth={1.4} />
        </div>
        <span className="text-brand-deep/70 text-sm font-semibold text-center font-arabic leading-tight max-w-[150px] px-3">
          {label}
        </span>
      </div>
    </div>
  );
}
