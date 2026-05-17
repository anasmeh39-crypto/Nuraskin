import React from "react";
import Link from "next/link";
import { BRAND_ASSETS } from "@/config/brand";

export function Footer() {
  return (
    <footer className="mt-24 bg-nura-plum text-white">
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand — official stacked inverse */}
          <div>
            <Link href="/" className="mb-6 inline-block dir-ltr opacity-[0.97] transition-opacity hover:opacity-100" dir="ltr">
              <img
                src={BRAND_ASSETS.stackedInverse}
                alt="NURA SKIN نورا سكين"
                width={140}
                height={176}
                className="h-36 w-auto md:h-40"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/72">
              عناية بشرة مدروسة، مصنوعة للمرأة المغربية.
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
                <span className="mt-0.5 text-nura-champagne">✓</span>
                <div className="text-sm text-white/80">
                  <div className="font-medium text-white">الدفع عند الاستلام</div>
                  <div className="text-white/60">لا يوجد دفع مسبق</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-nura-champagne">✓</span>
                <div className="text-sm text-white/80">
                  <div className="font-medium text-white">توصيل سريع</div>
                  <div className="text-white/60">2–4 أيام عمل في جميع أنحاء المغرب</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-nura-champagne">✓</span>
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
