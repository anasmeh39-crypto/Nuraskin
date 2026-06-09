import React from 'react';

export default function EyeRevivePage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-stone-50 pb-24">
      {/* Mobile-first Hero Section */}
      <section className="w-full max-w-md mx-auto px-4 pt-8 pb-12 bg-white shadow-sm" dir="rtl">
        <div className="mb-6 bg-stone-200 aspect-square rounded-xl flex items-center justify-center">
          {/* Placeholder for Product Image */}
          <span className="text-stone-500">صورة سيروم محيط العين</span>
        </div>
        
        <h1 className="text-2xl font-bold text-stone-900 mb-3 leading-snug">
          عويناتك كيبانو ديما عيانين؟ رجعي النضارة لمحيط العين ديالك.
        </h1>
        
        <p className="text-stone-600 mb-6 text-base leading-relaxed">
          سيروم خفيف وسريع الامتصاص، مخدوم خصيصاً للبشرة المغربية باش يخفف من الهالات السوداء ويرطب الخطوط الرقيقة. روتين بسيط، نتائج واضحة.
        </p>
        
        <div className="flex items-center gap-2 mb-6 p-3 bg-green-50 text-green-800 rounded-lg text-sm font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          الدفع عند الاستلام — ما تدفعي حتى توصلك الطلبة وتشوفيها بعينيك
        </div>
        
        <button className="w-full bg-stone-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-stone-800 transition active:scale-95">
          أضيفي للسلة — 199 درهم
        </button>
      </section>

      {/* Problem-First Framing */}
      <section className="w-full max-w-md mx-auto px-4 py-10" dir="rtl">
        <h2 className="text-xl font-bold text-stone-900 mb-6">واش عندك هاد المشكل؟</h2>
        <ul className="space-y-4">
          <li className="flex gap-3 text-stone-700">
            <span className="text-stone-400 mt-1">✕</span>
            <span>ستريس وقلة النعاس باينين تحت عينيك ومخلينك تباني كبر من عمرك؟</span>
          </li>
          <li className="flex gap-3 text-stone-700">
            <span className="text-stone-400 mt-1">✕</span>
            <span>الكونسيلر كيبان ناشف ومكيغطيش مزيان حيت محيط العين جاف؟</span>
          </li>
          <li className="flex gap-3 text-stone-700">
            <span className="text-stone-400 mt-1">✕</span>
            <span>جربتي بزاف دالبرودويات اللي وعدوك يحيدو الهالات، وما بانتش النتيجة؟</span>
          </li>
        </ul>
        <div className="mt-8 p-5 bg-white rounded-xl border border-stone-200">
          <p className="text-stone-800 font-medium leading-relaxed">
            نيورا سكين صاوبات هاد السيروم باش يعاونك ترجعي النظرة المرتاحة والضو لوجهك، بتركيبة فعالة وبدون إدعاءات زائفة.
          </p>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="w-full max-w-md mx-auto px-4 py-10 bg-white shadow-sm" dir="rtl">
        <h2 className="text-xl font-bold text-stone-900 mb-6">تركيبة مدروسة، مكونات نفهمها</h2>
        <div className="space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="font-bold text-stone-900 mb-1">الكافيين (Caffeine 5%)</h3>
            <p className="text-stone-600 text-sm">بحال شي قهوة ديال الصباح لعويناتك. كيعاون ينشط الدورة الدموية وينقص من الانتفاخ (البوفينيس).</p>
          </div>
          <div className="border-b border-stone-100 pb-4">
            <h3 className="font-bold text-stone-900 mb-1">الناياسيناميد (Niacinamide)</h3>
            <p className="text-stone-600 text-sm">مكوّن مدروس علمياً كيضوي البلايص الداكنة مع الوقت وبطريقة آمنة، ويوحد لون محيط العين.</p>
          </div>
          <div>
            <h3 className="font-bold text-stone-900 mb-1">حمض الهيالورونيك (Hyaluronic Acid)</h3>
            <p className="text-stone-600 text-sm">كيرطب بعمق باش يحيد دوك الخطوط الرقيقة ديال النشوفية، ويخلي الكونسيلر ديالك يبان طبيعي.</p>
          </div>
        </div>
      </section>
    </main>
  );
}