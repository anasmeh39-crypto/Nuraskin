import { BRAND_ASSETS } from "@/config/brand";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-nura-bg px-6">
      <div className="text-center">
        <div className="mx-auto mb-5 inline-flex dir-ltr">
          <img
            src={BRAND_ASSETS.horizontal}
            alt="NURA SKIN نورا سكين"
            width={710}
            height={210}
            className="h-12 w-auto max-w-[260px] object-contain mix-blend-multiply"
          />
        </div>
        <p className="text-sm font-medium text-nura-muted">جاري التحميل...</p>
      </div>
    </div>
  );
}
