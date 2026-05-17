import { Suspense } from "react";
import { UpsellContent } from "./UpsellContent";

export default function UpsellPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500">جاري التحميل...</p>
          </div>
        </div>
      }
    >
      <UpsellContent />
    </Suspense>
  );
}
