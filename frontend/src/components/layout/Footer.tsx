import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { BRAND_ASSETS } from "@/config/brand";

export function Footer() {
  return (
    <footer className="mt-24 overflow-hidden bg-[linear-gradient(145deg,#34242A,#473139_58%,#2F2327)] text-white">
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand — official stacked inverse */}
          <div>
            <Link
              href="/"
              className="mb-6 inline-flex dir-ltr opacity-95 transition-opacity hover:opacity-100"
              dir="ltr"
            >
              <img
                src={BRAND_ASSETS.footerLogo}
                alt="NURA SKIN نورا سكين"
                width={1420}
                height={420}
                className="h-14 w-auto max-w-[250px] object-contain md:h-16 md:max-w-[310px]"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/72">
              عناية بشرة مدروسة بروتين بسيط وناعم.
              <br />
              عناية ناعمة تفهم احتياجات بشرتك اليومية.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-semibold text-white">روابط سريعة</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-sm text-white/70 transition-colors hover:text-white">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-white/70 transition-colors hover:text-white">
                  عن نورا سكين
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/70 transition-colors hover:text-white">
                  تواصلي معنا
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="text-sm text-white/70 transition-colors hover:text-white">
                  سياسة الإرجاع
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="text-sm text-white/70 transition-colors hover:text-white">
                  سياسة الخصوصية
                </Link>
              </li>
            </ul>
          </div>

          {/* COD & Contact */}
          <div>
            <h4 className="mb-4 font-semibold text-white">الطلب والتوصيل</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-nura-champagne" strokeWidth={1.6} />
                <div className="text-sm text-white/80">
                  <div className="font-medium text-white">الدفع عند الاستلام</div>
                  <div className="text-white/60">تدفعين فقط عند وصول الطلب</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-nura-champagne" strokeWidth={1.6} />
                <div className="text-sm text-white/80">
                  <div className="font-medium text-white">توصيل مجاني لجميع أنحاء المغرب</div>
                  <div className="text-white/60">توصيل واضح ومؤكد قبل الإرسال</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-nura-champagne" strokeWidth={1.6} />
                <div className="text-sm text-white/80">
                  <div className="font-medium text-white">إرجاع مجاني</div>
                  <div className="text-white/60">سهل وبدون تعقيد</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} NURA SKIN نورا سكين. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-4">
            <Link href="/policies/terms" className="text-xs text-white/40 transition-colors hover:text-white/70">
              شروط الاستخدام
            </Link>
            <Link href="/policies/privacy" className="text-xs text-white/40 transition-colors hover:text-white/70">
              الخصوصية
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
