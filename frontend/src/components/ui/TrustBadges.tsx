import React from "react";
import { Headphones, PackageCheck, ShieldCheck, Truck } from "lucide-react";

const badges = [
  {
    icon: Truck,
    label: "الدفع عند الاستلام",
    sublabel: "لا يوجد دفع مسبق",
  },
  {
    icon: PackageCheck,
    label: "تجربة موثوقة",
    sublabel: "تغليف أنيق وتوصيل آمن",
  },
  {
    icon: ShieldCheck,
    label: "توصيل سريع",
    sublabel: "داخل المغرب خلال 2–4 أيام",
  },
  {
    icon: Headphones,
    label: "تأكيد قبل الإرسال",
    sublabel: "نتصل بكِ لتأكيد الطلب",
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
          (() => {
            const Icon = b.icon;
            return (
          <span
            key={b.label}
            className="inline-flex items-center gap-2 bg-white/75 text-brand-deep text-xs font-medium px-3 py-1.5 rounded-full border border-border"
          >
            <Icon className="h-3.5 w-3.5 text-brand-mid" strokeWidth={1.6} />
            <span>{b.label}</span>
          </span>
            );
          })()
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {badges.map((b) => (
        (() => {
          const Icon = b.icon;
          return (
        <div
          key={b.label}
          className="premium-card flex flex-col items-center gap-3 text-center rounded-3xl p-5"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-brand-mid">
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <div>
            <div className="font-semibold text-brand-deep text-sm">{b.label}</div>
            <div className="text-xs text-gray-500 mt-0.5">{b.sublabel}</div>
          </div>
        </div>
          );
        })()
      ))}
    </div>
  );
}
