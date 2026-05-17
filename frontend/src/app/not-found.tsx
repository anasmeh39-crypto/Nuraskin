import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
      <div>
        <div className="text-6xl mb-6">🌿</div>
        <h1 className="text-3xl font-bold text-brand-deep mb-3">
          الصفحة غير موجودة
        </h1>
        <p className="text-gray-600 mb-8">
          يبدو أن هذه الصفحة انتقلت أو لم تعد موجودة.
        </p>
        <Link href="/" className="btn-primary inline-flex">
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
