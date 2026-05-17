import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-brand-deep text-white mt-24">
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center">
                <span className="text-white font-bold text-lg font-sans">N</span>
              </div>
              <div>
                <div className="text-white font-bold text-lg font-arabic">نيورا سكين</div>
                <div className="text-gold/80 text-xs tracking-widest font-sans">NAMA BEAUTY</div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              عناية بشرة مدروسة علمياً، مصنوعة للمرأة المغربية.
              <br />
              بشرتك تستاهل عناية تفهمها.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-white/70 hover:text-white text-sm transition-colors">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-white text-sm transition-colors">
                  عن نيورا
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-white text-sm transition-colors">
                  تواصلي معنا
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="text-white/70 hover:text-white text-sm transition-colors">
                  سياسة الإرجاع
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="text-white/70 hover:text-white text-sm transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
            </ul>
          </div>

          {/* COD & Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">الطلب والتوصيل</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-gold mt-0.5 text-lg">✓</span>
                <div className="text-sm text-white/80">
                  <div className="font-medium text-white">الدفع عند الاستلام</div>
                  <div className="text-white/60">ما تدفعي حتى يوصلك الطلب</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold mt-0.5 text-lg">✓</span>
                <div className="text-sm text-white/80">
                  <div className="font-medium text-white">توصيل سريع</div>
                  <div className="text-white/60">2–4 أيام عمل في جميع أنحاء المغرب</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold mt-0.5 text-lg">✓</span>
                <div className="text-sm text-white/80">
                  <div className="font-medium text-white">إرجاع مجاني</div>
                  <div className="text-white/60">سهل وبدون تعقيد</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Nura Skin — Nama Beauty. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-4">
            <Link href="/policies/terms" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              شروط الاستخدام
            </Link>
            <Link href="/policies/privacy" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              الخصوصية
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
