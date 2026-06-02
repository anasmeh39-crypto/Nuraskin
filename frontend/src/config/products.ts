import { Product, Bundle } from "@/types";

export const PRODUCTS: Product[] = [
  {
    slug: "nura-balance",
    name_ar: "سيروم توازن وإشراقة البشرة بالنياسيناميد",
    name_en: "NiaBalance Daily Serum",
    tagline_ar: "باش توازني بشرتك، تصفيها، وتضيق مظهر المسام",
    description_ar:
      "سيروم خفيف كيرجع التوازن للبشرة ديالك، كينقص من اللمعان وكيحسن مظهر المسام الواسعة بفضل 10% ديال النياسيناميد النقي.",
    price: 249,
    formattedPrice: "249 درهم",
    compareAtPrice: 319,
    formattedCompareAtPrice: "319 درهم",
    image: "/images/nura-balance-gallery-1.png",
    heroIngredient: "نياسيناميد 10%",
    format: "سيروم مركّز",
    volume: "30ml",
    benefits: [
      "كيعاون ينقص من اللمعان الزايد",
      "كيوحد لون البشرة وكيصفيها",
      "كيحسن مظهر المسام الواسعة",
      "كيرطب بلا ما يخلي أثر دهني (ميدم)",
    ],
    concerns: ["البشرة اللي كتلمع بزاف", "المسام الواسعة", "لون البشرة ما موحدش", "الدهن الزايد فالوجه"],
    ingredients: [
      {
        name_ar: "النياسيناميد",
        name_en: "Niacinamide 10%",
        description_ar: "فيتامين B3 النقي، كيعاون يحسن مظهر لون البشرة ويوازن اللمعان.",
      },
      {
        name_ar: "زنك PCA",
        name_en: "Zinc PCA",
        description_ar: "كيساعد يوازن إفرازات البشرة باش تبقى نقية وصحيحة الظهور.",
      },
      {
        name_ar: "حمض الهيالورونيك",
        name_en: "Hyaluronic Acid",
        description_ar: "كيرطب البشرة من العمق بلا ما يخلي إحساس دهني.",
      },
    ],
    crossSells: ["nura-spf-50", "nura-eye-revive"],
    reviews: [
      {
        name: "مريم ب.",
        city: "الدار البيضاء",
        rating: 5,
        text: "بشرتي ولات رطبة وموحدة، وعجبني بزاف حيت خفيف وكيشربو الجلد دغيا وما كيزيتش الوجه.",
        date: "منذ 3 أسابيع",
      },
      {
        name: "سناء م.",
        city: "الرباط",
        rating: 5,
        text: "مناسب لبشرتي المختلطة وكيعطيها مظهر أكثر صفاء بلا ما يزيط الوجه—هادا اللي كنت كانقصو بزاف.",
        date: "منذ شهر",
      },
      {
        name: "إيمان ح.",
        city: "مراكش",
        rating: 4,
        text: "تركيبة خفيفة بزاف، كيشربها الجلد دغيا وما كتحس بأي إحساس ثقل. زوين للاستعمال الصباحي.",
        date: "منذ 3 أسابيع",
      },
    ],
    metaDescription:
      "سيروم النياسيناميد لتوازن البشرة وتحسين مظهر المسام واللمعان—249 درهم. الدفع عند الاستلام — ما تخلصي حتى توصلي.",
  },
  {
    slug: "nura-night-renewal",
    name_ar: "كريم التجديد الليلي للبشرة",
    name_en: "Night Renewal Face Cream",
    tagline_ar: "باش تفيقي الصباح ببشرة مرتاحة وفيها نضارة",
    description_ar:
      "كريم ليلي كيجدد البشرة ديالك فاش كتكوني ناعسة—باش تفيقي الصباح ببشرة مرتاحة، رطبة، وفيها نضارة.",
    price: 269,
    formattedPrice: "269 درهم",
    compareAtPrice: 349,
    formattedCompareAtPrice: "349 درهم",
    image: "/images/nura-night-renewal-gallery-1.png",
    heroIngredient: "باكوتشيول نباتي وببتيدات مركّزة",
    format: "كريم ليلي",
    volume: "50ml",
    benefits: [
      "كيعاون فالتجديد الطبيعي للبشرة بالليل",
      "كيخلي البشرة رطبة بحال الحرير",
      "كيرطب من الأعماق بلا ما يسد المسام",
      "كيعطي إشراقة باينة مع الصباح",
    ],
    concerns: ["البشرة العيانة", "البشرة اللي فقدات نضارتها", "آثار العيا", "الجفاف اللي كيجي بالليل"],
    ingredients: [
      {
        name_ar: "باكوتشيول",
        name_en: "Bakuchiol",
        percent: "{{PERCENT_BAKUCHIOL}}",
        description_ar: "مكوّن نباتي لطيف كيعاون يدعم مظهر التجدد والنعومة فالروتين الليلي.",
      },
      {
        name_ar: "ببتيدات",
        name_en: "Peptides",
        percent: "{{PERCENT_PEPTIDES}}",
        description_ar: "كيعاونوا على تماسك البشرة باش تظهر أكثر راحة وحيوية.",
      },
      {
        name_ar: "زبدة الشيا",
        name_en: "Shea Butter",
        percent: "{{PERCENT_SHEA}}",
        description_ar: "كترطب البشرة من العمق وكتعطيها ترطيب غني طول الليل.",
      },
      {
        name_ar: "سكوالان",
        name_en: "Squalane",
        percent: "{{PERCENT_SQUALANE}}",
        description_ar: "زيت نباتي خفيف كيحافظ على رطوبة البشرة باش تبقى نضارة.",
      },
    ],
    keyResults: [
      { icon: "smooth", text: "بشرة أنعم ومرطبة — من الأسبوع الأول", image: "/images/nura-night-renewal-gallery-4.png" },
      { icon: "glow", text: "إشراقة باينة مع الصباح في 2–3 أسابيع", image: "/images/nura-night-renewal-gallery-5.png" },
      { icon: "firm", text: "مظهر أكثر تماسكاً وحيوية مع الاستخدام المنتظم", image: "/images/nura-night-renewal-ingredients.png" },
    ],
    crossSells: ["nura-spf-50", "nura-balance"],
    reviews: [
      {
        name: "خديجة أ.",
        city: "فاس",
        rating: 5,
        text: "ولات خطوة ثابتة فالروتين الليلي ديالي، كنفيق وبشرتي ظاهرة أكثر راحة ونعومة—محسوسة الفرق من الأسبوع الأول.",
        date: "منذ شهرين",
      },
      {
        name: "هدى ر.",
        city: "أكادير",
        rating: 5,
        text: "ريحتو هادئة وكيشربو الجلد بلا ما يخلي إحساس ثقيل. بشرتي باناتلي أكثر نضارة الصباح.",
        date: "منذ 5 أسابيع",
      },
      {
        name: "نبيهة ف.",
        city: "الدار البيضاء",
        rating: 4,
        text: "من أحسن كريمات الليل اللي جربت—كيعطي راحة فورية وترطيب من العمق. ننصح بيه بزاف.",
        date: "منذ شهر",
      },
    ],
    metaDescription:
      "كريم التجديد الليلي لمظهر أكثر نعومة ونضارة مع الصباح—269 درهم. الدفع عند الاستلام — ما تخلصي حتى توصلي.",
  },
  {
    slug: "nura-eye-revive",
    name_ar: "سيروم نضارة محيط العين",
    name_en: "EyeAwake Eye Serum",
    tagline_ar: "باش تضوي محيط العين وتوقفي آثار العيا",
    description_ar:
      "سيروم خفيف مخدوم خصيصاً باش يخفف من الهالات السوداء والانتفاخ (البوفينيس)—باش ترجعي النظرة المرتاحة لعويناتك.",
    price: 249,
    formattedPrice: "249 درهم",
    compareAtPrice: 319,
    formattedCompareAtPrice: "319 درهم",
    image: "/images/nura-eye-revive-gallery-1.png",
    heroIngredient: "كافيين 5% + نياسيناميد + هيالورونيك",
    format: "سيروم محيط العين",
    volume: "15ml",
    benefits: [
      "كيضوي محيط العين وكيحيد آثار العيا",
      "كينقص من الانتفاخ (البوفينيس) ديال الصباح",
      "كيرجع الحيوية والنضارة للنظرة",
      "دغيا كيشربو الجلد وجا مزيان تحت الكونسيلر",
    ],
    concerns: ["الهالات الكحلية", "الانتفاخ (البوفينيس)", "النظرة العيانة", "آثار العيا حول العين"],
    ingredients: [
      {
        name_ar: "الكافيين",
        name_en: "Caffeine 5%",
        description_ar: "بحال شي قهوة ديال الصباح لعويناتك—كيعاون ينشط محيط العينين وينقص من مظهر الانتفاخ (البوفينيس).",
      },
      {
        name_ar: "النياسيناميد",
        name_en: "Niacinamide 5%",
        description_ar: "كيضوي البلايص الداكنة مع الوقت وبطريقة آمنة، ويوحد لون محيط العين.",
      },
      {
        name_ar: "حمض الهيالورونيك",
        name_en: "Hyaluronic Acid",
        description_ar: "كيرطب بعمق باش يحيد دوك الخطوط الرقيقة ديال النشوفية، ويخلي الكونسيلر يبان طبيعي.",
      },
    ],
    crossSells: ["nura-balance", "nura-spf-50"],
    reviews: [
      {
        name: "أسماء ق.",
        city: "الرباط",
        rating: 5,
        text: "الهالات نقصوا بشكل باين وبات وجهي أكثر حيوية—سيروم مزيان بزاف وحق يتجرب. والله ما كنت كنصدق حتى جربتو.",
        date: "منذ شهر",
      },
      {
        name: "ليلى ن.",
        city: "طنجة",
        rating: 5,
        text: "البوفينيس ديال الصباح نقص كثير، ومنطقة العين بانت أكثر إشراقاً. قطرة صغيرة كافية وكيشربها الجلد دغيا.",
        date: "منذ 3 أسابيع",
      },
      {
        name: "فاطمة ز.",
        city: "مكناس",
        rating: 4,
        text: "كنت متشككة فالبداية، ولكن بعد أسبوعين لاحظت فرق واضح. النتائج زوينة بزاف وكيجي مزيان تحت الكونسيلر.",
        date: "منذ 6 أسابيع",
      },
    ],
    metaDescription:
      "سيروم محيط العين لتخفيف الهالات والانتفاخ (البوفينيس)—249 درهم. الدفع عند الاستلام — ما تخلصي حتى توصلي.",
  },
  {
    slug: "nura-spf-50",
    name_ar: "واقي الشمس اليومي SPF 50",
    name_en: "Daily Sunscreen SPF 50",
    tagline_ar: "إيكران خفيف وما كيزيتش — حماية UVA/UVB كاملة",
    description_ar:
      "واقي شمس (Ecran) خفيف كيعطيك حماية عالية من أشعة الشمس بلا ما يخلي أثر بيض ولا ملمس دهني. كيشربو الجلد دغيا ومثالي للاستعمال اليومي.",
    price: 279,
    formattedPrice: "279 درهم",
    compareAtPrice: 359,
    formattedCompareAtPrice: "359 درهم",
    image: "/images/nura-spf-50-gallery-1.png",
    heroIngredient: "SPF 50 UVA/UVB",
    format: "كريم واقي شمس",
    volume: "50ml",
    benefits: [
      "كايحمي البشرة من أشعة الشمس UVA/UVB",
      "كيرطب وكيقوي حاجز البشرة",
      "خفيف على الوجه وما كيزيتش",
      "ما كيخليش أثر بيض (No white cast)",
      "كيعاون ينقص من مظهر البقع الداكنة مع الوقت",
      "آخر خطوة ضرورية باش يكتمل الروتين الصباحي",
    ],
    concerns: [
      "التعرض اليومي للشمس",
      "البقع الداكنة وليطاش",
      "الإحساس الدهني واللزج",
      "البشرة الحساسة أو الجافة",
      "إكمال روتين الصباح بالحماية",
    ],
    ingredients: [
      {
        name_ar: "مرشحات حماية UVA/UVB",
        name_en: "Tinosorb S + Uvinul A Plus + Uvinul T150",
        description_ar: "مزيج فلاتر شمسية كيعاون يوفر حماية واسعة من أشعة UVA وUVB.",
      },
      {
        name_ar: "الألوفيرا",
        name_en: "Aloe Vera Extract",
        description_ar: "مكوّن مهدئ ومرطب كيعاون يعطي البشرة إحساس بالراحة بعد التعرض للشمس.",
      },
      {
        name_ar: "النياسيناميد",
        name_en: "Niacinamide 4%",
        description_ar: "كيعاون يحسن مظهر لون البشرة وينقص من البقع في استعمال يومي منتظم.",
      },
      {
        name_ar: "البانثينول",
        name_en: "Panthenol 2%",
        description_ar: "بروفيتامين B5 كيهدي البشرة ويعاون يقوي حاجزها الواقي.",
      },
      {
        name_ar: "حمض الهيالورونيك",
        name_en: "Hyaluronic Acid 0.5%",
        description_ar: "كيرطب البشرة ويعطيها مظهر أكثر امتلاء وراحة.",
      },
      {
        name_ar: "فيتامين E",
        name_en: "Vitamin E 1%",
        description_ar: "مضاد أكسدة كيعاون يحمي البشرة من العوامل الخارجية اليومية.",
      },
    ],
    crossSells: ["nura-balance", "nura-eye-revive"],
    reviews: [
      {
        name: "نادية س.",
        city: "الدار البيضاء",
        rating: 5,
        text: "خفيف ومريح الصباح، وعجبني أنه ما كيثقلش الروتين قبل الخروج. أخيراً لقيت إيكران ما كيزيتش الوجه.",
        date: "منذ أسبوعين",
      },
      {
        name: "كوثر ر.",
        city: "مراكش",
        rating: 5,
        text: "ولا آخر خطوة فالروتين الصباحي ديالي، ملمسو ناعم ومزيان بزاف قبل الكونسيلر والمكياج.",
        date: "منذ شهر",
      },
      {
        name: "سلمى ع.",
        city: "طنجة",
        rating: 4,
        text: "إضافة ضرورية مع كريم الليل، خلات الروتين يبان أكثر اكتمالاً. وما كيخليش أثر بيض هادا اللي كيميزو.",
        date: "منذ 3 أسابيع",
      },
    ],
    metaDescription:
      "واقي الشمس اليومي SPF 50 بحماية UVA/UVB، خفيف وبلا أثر بيض—279 درهم. الدفع عند الاستلام — ما تخلصي حتى توصلي.",
  },
];

export const PRODUCTS_MAP: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((p) => [p.slug, p])
);

export const BUNDLES: Bundle[] = [
  {
    id: "morning-ritual",
    name_ar: "روتين الصباح",
    products: ["nura-balance", "nura-eye-revive", "nura-spf-50"],
    price: 499,
    compareAtPrice: 777,
    saving: 278,
    tag: "توازن مثالي",
  },
  {
    id: "night-renewal-ritual",
    name_ar: "روتين الليل",
    products: ["nura-night-renewal", "nura-eye-revive"],
    price: 379,
    compareAtPrice: 518,
    saving: 139,
    tag: "روتين أساسي",
  },
  {
    id: "nura-complete-ritual",
    name_ar: "روتين نيورا الكامل",
    products: ["nura-balance", "nura-night-renewal", "nura-eye-revive", "nura-spf-50"],
    price: 649,
    compareAtPrice: 1046,
    saving: 397,
    tag: "أكبر توفير",
  },
];

type ProductPageOfferTier = "single" | "duo" | "trio" | "complete";

interface ProductPageOfferRule {
  id: string;
  tier: ProductPageOfferTier;
  label: string;
  sublabel: string;
  products: string[];
  price: number;
  badge: string;
  bundleName?: string;
}

export interface ProductPageOffer {
  id: string;
  tier: ProductPageOfferTier;
  label: string;
  sublabel: string;
  products: Product[];
  price: number;
  originalPrice?: number;
  saving?: number;
  badge: string;
  perUnit: number;
  bundleName?: string;
  recommended: boolean;
}

const COMPLETE_ROUTINE_PRODUCTS = [
  "nura-balance",
  "nura-night-renewal",
  "nura-eye-revive",
  "nura-spf-50",
];

const PRODUCT_PAGE_OFFER_RULES: Record<string, ProductPageOfferRule[]> = {
  "nura-balance": [
    {
      id: "nura-balance-single",
      tier: "single",
      label: "سيروم النياسيناميد",
      sublabel: "جربي برودوي واحد قبل الروتين",
      products: ["nura-balance"],
      price: 249,
      badge: "للتجربة فقط",
    },
    {
      id: "nura-balance-retinol-duo",
      tier: "duo",
      label: "روتين أساسي",
      sublabel: "إشراقة نهارية + تجديد ليلي",
      products: ["nura-balance", "nura-night-renewal"],
      price: 379,
      badge: "روتين يومي",
      bundleName: "روتين النياسيناميد والريتينول",
    },
    {
      id: "nura-balance-retinol-eye-trio",
      tier: "trio",
      label: "روتين الصباح الكامل",
      sublabel: "روتين مكمول بـ 3 خطوات",
      products: ["nura-balance", "nura-eye-revive", "nura-spf-50"],
      price: 499,
      badge: "مطلوب بزاف",
      bundleName: "روتين الصباح الكامل",
    },
    {
      id: "nura-complete-ritual",
      tier: "complete",
      label: "روتين نيورا الكامل",
      sublabel: "روتين الصباح والليل مجموعين فبوكس واحد",
      products: COMPLETE_ROUTINE_PRODUCTS,
      price: 649,
      badge: "أكبر توفير",
      bundleName: "روتين نيورا الكامل",
    },
  ],
  "nura-eye-revive": [
    {
      id: "nura-eye-revive-single",
      tier: "single",
      label: "سيروم محيط العين",
      sublabel: "جربي برودوي واحد قبل الروتين",
      products: ["nura-eye-revive"],
      price: 249,
      badge: "للتجربة فقط",
    },
    {
      id: "nura-eye-retinol-duo",
      tier: "duo",
      label: "روتين أساسي",
      sublabel: "عناية عيون + تجديد ليلي عميق",
      products: ["nura-eye-revive", "nura-night-renewal"],
      price: 379,
      badge: "روتين يومي",
      bundleName: "روتين العين والتجديد الليلي",
    },
    {
      id: "nura-eye-balance-spf-trio",
      tier: "trio",
      label: "روتين الإشراقة اليومية",
      sublabel: "روتين صباحي كامل للإشراقة والحماية",
      products: ["nura-eye-revive", "nura-balance", "nura-spf-50"],
      price: 499,
      badge: "مطلوب بزاف",
      bundleName: "روتين الإشراقة اليومية",
    },
    {
      id: "nura-complete-ritual",
      tier: "complete",
      label: "روتين نيورا الكامل",
      sublabel: "روتين الصباح والليل مجموعين فبوكس واحد",
      products: ["nura-eye-revive", "nura-balance", "nura-night-renewal", "nura-spf-50"],
      price: 649,
      badge: "أكبر توفير",
      bundleName: "روتين نيورا الكامل",
    },
  ],
  "nura-night-renewal": [
    {
      id: "nura-night-renewal-single",
      tier: "single",
      label: "كريم الريتينول الليلي",
      sublabel: "جربي برودوي واحد قبل الروتين",
      products: ["nura-night-renewal"],
      price: 269,
      badge: "للتجربة فقط",
    },
    {
      id: "nura-retinol-eye-duo",
      tier: "duo",
      label: "روتين أساسي",
      sublabel: "تجديد ليلي + عناية عيون مكثفة",
      products: ["nura-night-renewal", "nura-eye-revive"],
      price: 379,
      badge: "روتين يومي",
      bundleName: "روتين التجديد الليلي",
    },
    {
      id: "nura-retinol-balance-spf-trio",
      tier: "trio",
      label: "روتين التجديد والحماية",
      sublabel: "تجديد ليلي + حماية نهارية كاملة",
      products: ["nura-night-renewal", "nura-balance", "nura-spf-50"],
      price: 499,
      badge: "مطلوب بزاف",
      bundleName: "روتين التجديد والحماية",
    },
    {
      id: "nura-complete-ritual",
      tier: "complete",
      label: "روتين نيورا الكامل",
      sublabel: "روتين الصباح والليل مجموعين فبوكس واحد",
      products: ["nura-night-renewal", "nura-balance", "nura-eye-revive", "nura-spf-50"],
      price: 649,
      badge: "أكبر توفير",
      bundleName: "روتين نيورا الكامل",
    },
  ],
  "nura-spf-50": [
    {
      id: "nura-spf-50-single",
      tier: "single",
      label: "واقي الشمس SPF50",
      sublabel: "جربي برودوي واحد قبل الروتين",
      products: ["nura-spf-50"],
      price: 279,
      badge: "للتجربة فقط",
    },
    {
      id: "nura-retinol-balance-spf-trio",
      tier: "trio",
      label: "روتين الحماية والإشراقة",
      sublabel: "حماية نهارية + تجديد ليلي + إشراقة",
      products: ["nura-night-renewal", "nura-balance", "nura-spf-50"],
      price: 499,
      badge: "مطلوب بزاف",
      bundleName: "روتين الحماية والإشراقة",
    },
    {
      id: "nura-complete-ritual",
      tier: "complete",
      label: "روتين نيورا الكامل",
      sublabel: "روتين الصباح والليل مجموعين فبوكس واحد",
      products: ["nura-night-renewal", "nura-balance", "nura-eye-revive", "nura-spf-50"],
      price: 649,
      badge: "أكبر توفير",
      bundleName: "روتين نيورا الكامل",
    },
  ],
};

function sumProductPrices(slugs: string[]): number {
  return slugs.reduce((total, slug) => total + (PRODUCTS_MAP[slug]?.price ?? 0), 0);
}

export function getProductPageOffers(productSlug: string): ProductPageOffer[] {
  const product = PRODUCTS_MAP[productSlug];
  const rules = PRODUCT_PAGE_OFFER_RULES[productSlug];

  if (!product || !rules) {
    return [];
  }

  return rules.map((rule) => {
    const products = rule.products.map((slug) => PRODUCTS_MAP[slug]).filter(Boolean);
    const originalPrice = rule.tier === "single" ? undefined : sumProductPrices(rule.products);
    const saving = originalPrice ? Math.max(originalPrice - rule.price, 0) : undefined;

    return {
      id: rule.id,
      tier: rule.tier,
      label: rule.label,
      sublabel: rule.sublabel,
      products,
      price: rule.price,
      originalPrice,
      saving,
      badge: rule.badge,
      perUnit: Math.round(rule.price / products.length),
      bundleName: rule.bundleName,
      recommended: rule.tier === "trio",
    };
  });
}

export const SHIPPING_THRESHOLD = 0;
export const SHIPPING_COST = 0;

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS_MAP[slug];
}

export function formatPrice(price: number): string {
  return `${price} درهم`;
}

export function calculateShipping(total: number): number {
  return total >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}
