import React from "react";

const TRUST_ITEMS = [
  { icon: "🌿", label: "صنع في المغرب" },
  { icon: "☀️", label: "حماية SPF 50" },
  { icon: "💧", label: "ترطيب عميق" },
  { icon: "✓", label: "طبيعي 100%" },
];

export function TrustAuthoritySection() {
  return (
    <section className="border-t border-[#5C2D3E]/12 bg-[#F5F0EA] py-6" dir="rtl" aria-label="ثقة نورا سكين">
      <div className="container-wide">
        <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4 md:gap-8">
          {TRUST_ITEMS.map((item) => (
            <div key={item.label} className="flex items-center justify-center gap-2 text-sm font-medium text-[#8C6E73]">
              <span className="text-lg" aria-hidden>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
