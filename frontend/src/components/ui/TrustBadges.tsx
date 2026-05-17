import React from "react";

const badges = [
  {
    icon: "🚚",
    label: "الدفع عند الاستلام",
    sublabel: "ما تدفعي حتى يوصلك الطلب",
  },
  {
    icon: "🔄",
    label: "إرجاع مجاني",
    sublabel: "سهل وبدون أسئلة",
  },
  {
    icon: "⚡",
    label: "توصيل سريع",
    sublabel: "2–4 أيام عمل",
  },
  {
    icon: "🔒",
    label: "طلب آمن",
    sublabel: "معلوماتك محفوظة",
  },
];

interface TrustBadgesProps {
  compact?: boolean;
  className?: string;
}

export function TrustBadges({ compact = false, className = "" }: TrustBadgesProps) {
  if (compact) {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {badges.slice(0, 3).map((b) => (
          <span
            key={b.label}
            className="inline-flex items-center gap-1.5 bg-brand-light text-brand-deep text-xs font-medium px-3 py-1.5 rounded-full"
          >
            <span>{b.icon}</span>
            <span>{b.label}</span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {badges.map((b) => (
        <div
          key={b.label}
          className="flex flex-col items-center gap-2 text-center p-4 bg-white border border-border rounded-2xl"
        >
          <span className="text-2xl">{b.icon}</span>
          <div>
            <div className="font-semibold text-brand-deep text-sm">{b.label}</div>
            <div className="text-xs text-gray-500 mt-0.5">{b.sublabel}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
