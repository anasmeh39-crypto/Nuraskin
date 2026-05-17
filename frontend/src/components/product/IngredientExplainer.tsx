import React from "react";
import { Product } from "@/types";

interface Props {
  product: Product;
}

export function IngredientExplainer({ product }: Props) {
  return (
    <section className="py-12 bg-white">
      <div className="container-wide">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-brand-deep mb-2">
            شنو كاين فيه؟
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            نشرح كل مكوّن رئيسي — لأنك تستاهلي تعرفي شنو تضعي على وجهك.
          </p>

          <div className="space-y-5">
            {product.ingredients.map((ingredient, idx) => (
              <div
                key={idx}
                className="flex gap-5 p-5 bg-cream rounded-3xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center shrink-0">
                  <span className="text-brand-deep font-bold text-lg">
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-brand-deep">
                      {ingredient.name_ar}
                    </h3>
                    <span className="text-xs text-gray-400 font-sans">
                      {ingredient.name_en}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {ingredient.description_ar}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
