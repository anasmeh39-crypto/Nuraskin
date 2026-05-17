import React from "react";

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
      className={`${ratioClass} ${className} bg-gradient-to-br from-[#E8F0EB] to-[#D5E3DA] flex items-center justify-center overflow-hidden rounded-inherit`}
    >
      <div className="flex flex-col items-center gap-3 opacity-40 select-none">
        <div className="w-16 h-16 rounded-full border-2 border-brand-deep flex items-center justify-center">
          <span className="text-brand-deep font-bold text-2xl font-sans">N</span>
        </div>
        <span className="text-brand-deep text-sm font-medium text-center font-arabic leading-tight max-w-[120px]">
          {label}
        </span>
      </div>
    </div>
  );
}
