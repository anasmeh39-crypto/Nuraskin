import { Product, Bundle } from "@/types";

export const PRODUCTS: Product[] = [
  {
    slug: "nura-balance",
    name_ar: "سيروم توازن وإشراقة البشرة بالنياسيناميد",
    name_en: "NiaBalance Daily Serum",
    tagline_ar: "لتوازن البشرة، الإشراقة، ومظهر المسام",
    description_ar:
      "مركّز متطور يعمل على استعادة توازن البشرة، تلطيف لمعانها، وتحسين مظهر المسام—بفضل تركيز 10% من النياسيناميد النقي.",
    price: 189,
    formattedPrice: "189 درهم",
    image: "/images/nura-balance.jpg",
    heroIngredient: "نياسيناميد 10%",
    format: "سيروم مركّز",
    volume: "30ml",
    benefits: [
      "يساعد على تلطيف مظهر اللمعان الزائد",
      "يساعد على توحيد مظهر لون البشرة",
      "يحسّن من مظهر المسام الواسعة",
      "يمنحكِ ترطيباً خفيفاً غير دهني",
    ],
    concerns: ["البشرة المعرضة للمعان", "المسام الواسعة", "عدم توحيد اللون", "الإفرازات الزائدة"],
    ingredients: [
      {
        name_ar: "النياسيناميد",
        name_en: "Niacinamide 10%",
        description_ar: "فيتامين B3 النقي، يساعد على تحسين مظهر لون البشرة وتوازن اللمعان.",
      },
      {
        name_ar: "زنك PCA",
        name_en: "Zinc PCA",
        description_ar: "يساهم في موازنة إفرازات البشرة ليمنحكِ مظهراً نقياً وصحياً.",
      },
      {
        name_ar: "حمض الهيالورونيك",
        name_en: "Hyaluronic Acid",
        description_ar: "يروي عطش البشرة بترطيب عميق يحافظ على امتلائها دون ترك ملمس دهني.",
      },
    ],
    crossSells: ["nura-night-renewal", "nura-eye-revive"],
    reviews: [
      {
        name: "مريم ب.",
        city: "الدار البيضاء",
        rating: 5,
        text: "أصبحت بشرتي أكثر نعومة وتوازنًا مع الاستخدام المنتظم، وأحببت ملمسه الخفيف.",
        date: "منذ 3 أسابيع",
      },
      {
        name: "سناء م.",
        city: "الرباط",
        rating: 5,
        text: "يناسب بشرتي المختلطة ويمنحها مظهرًا أكثر صفاءً دون إحساس دهني.",
        date: "منذ شهر",
      },
      {
        name: "إيمان ح.",
        city: "مراكش",
        rating: 4,
        text: "تركيبة فاخرة ومريحة جداً، تمتصها البشرة بسرعة دون أي شعور بالثقل.",
        date: "منذ 3 أسابيع",
      },
    ],
    metaDescription:
      "سيروم توازن وإشراقة البشرة بالنياسيناميد لتحسين مظهر المسام واللمعان—189 درهم، الدفع عند الاستلام.",
  },
  {
    slug: "nura-night-renewal",
    name_ar: "كريم التجديد الليلي للبشرة",
    name_en: "Night Renewal Face Cream",
    tagline_ar: "لتجديد مظهر البشرة ونعومة الصباح",
    description_ar:
      "كريم ليلي فاخر يساعد على تجديد مظهر البشرة أثناء نومكِ—لتستيقظي على بشرة تنبض بالنعومة والحيوية.",
    price: 229,
    formattedPrice: "229 درهم",
    image: "/images/nura-night-renewal.jpg",
    heroIngredient: "باكوتشيول نباتي وببتيدات مركّزة",
    format: "كريم ليلي",
    volume: "50ml",
    benefits: [
      "يعزز التجديد الطبيعي للبشرة أثناء النوم",
      "يمنح البشرة ملمسًا مخمليًا فائق النعومة",
      "يرطب بعمق دون سد المسام",
      "يُضفي إشراقة صباحية ملحوظة",
    ],
    concerns: ["البشرة المجهدة", "فقدان النضارة", "آثار التعب", "جفاف فترة الليل"],
    ingredients: [
      {
        name_ar: "باكوتشيول",
        name_en: "Bakuchiol",
        description_ar: "البديل النباتي اللطيف للريتينول—يساعد على تجديد مظهر البشرة بفعالية وأمان.",
      },
      {
        name_ar: "زبدة الشيا",
        name_en: "Shea Butter",
        description_ar: "تغذي البشرة بعمق وتمنحها ترطيباً غنياً طوال الليل.",
      },
      {
        name_ar: "سكوالان",
        name_en: "Squalane",
        description_ar: "زيت نباتي فاخر يحافظ على حاجز رطوبة البشرة لتبقى نضرة.",
      },
      {
        name_ar: "ببتيدات",
        name_en: "Peptides",
        description_ar: "تدعم تماسك البشرة لتمنحكِ مظهراً أكثر شباباً وانتعاشاً.",
      },
    ],
    crossSells: ["nura-balance", "nura-eye-revive"],
    reviews: [
      {
        name: "خديجة أ.",
        city: "فاس",
        rating: 5,
        text: "أصبح خطوة ثابتة في روتيني الليلي، أستيقظ وبشرتي أكثر راحة ونعومة.",
        date: "منذ شهرين",
      },
      {
        name: "هدى ر.",
        city: "أكادير",
        rating: 5,
        text: "رائحة هادئة وملمس غني لا يترك أثرًا ثقيلًا، ويمنح بشرتي مظهرًا أكثر نضارة.",
        date: "منذ 5 أسابيع",
      },
      {
        name: "نبيهة ف.",
        city: "الدار البيضاء",
        rating: 4,
        text: "من أفضل كريمات الليل التي جربتها—يمنح البشرة راحة فورية وترطيباً عميقاً.",
        date: "منذ شهر",
      },
    ],
    metaDescription:
      "كريم التجديد الليلي للبشرة لمظهر أكثر نعومة ونضارة صباحية—229 درهم، الدفع عند الاستلام.",
  },
  {
    slug: "nura-eye-revive",
    name_ar: "سيروم نضارة محيط العين",
    name_en: "EyeAwake Eye Serum",
    tagline_ar: "لإشراقة محيط العين ومظهر التعب",
    description_ar:
      "سيروم لطيف وفعّال صُمم خصيصاً ليخفف من مظهر الهالات والانتفاخات—لتنعمي بنظرة أكثر انتعاشاً وحيوية.",
    price: 199,
    formattedPrice: "199 درهم",
    image: "/images/nura-eye-revive.jpg",
    heroIngredient: "كافيين + ببتيدات",
    format: "سيروم محيط العين",
    volume: "15ml",
    benefits: [
      "يساعد على إشراق مظهر محيط العين",
      "يخفف من مظهر الانتفاخ الصباحي",
      "يعيد الحيوية والإشراقة لمحيط العينين",
      "تركيبة سريعة الامتصاص ومناسبة للمكياج",
    ],
    concerns: ["الهالات الداكنة", "الانتفاخات", "نظرة متعبة", "إرهاق محيط العين"],
    ingredients: [
      {
        name_ar: "الكافيين",
        name_en: "Caffeine",
        description_ar: "يعمل على تنشيط محيط العينين وتخفيف مظهر الانتفاخ بفعالية.",
      },
      {
        name_ar: "فيتامين K2",
        name_en: "Vitamin K2",
        description_ar: "يساهم في توحيد لون البشرة الرقيقة ليمنحها إشراقة طبيعية.",
      },
      {
        name_ar: "ببتيدات",
        name_en: "Peptides",
        description_ar: "تدعم مرونة الجلد لتمنح عينيكِ مظهراً أكثر راحة وشباباً.",
      },
      {
        name_ar: "نياسيناميد 5%",
        name_en: "Niacinamide 5%",
        description_ar: "يعزز الإشراقة ويحمي البشرة الحساسة حول العينين.",
      },
    ],
    crossSells: ["nura-balance", "nura-night-renewal"],
    reviews: [
      {
        name: "أسماء ق.",
        city: "الرباط",
        rating: 5,
        text: "خفت الهالات بشكل ملحوظ وبدت نظرتي أكثر حيوية—سيروم فعّال ويستحق التجربة.",
        date: "منذ شهر",
      },
      {
        name: "ليلى ن.",
        city: "طنجة",
        rating: 5,
        text: "الانتفاخ الصباحي تراجع كثيراً، وأصبحت منطقة محيط العين أكثر إشراقاً.",
        date: "منذ 3 أسابيع",
      },
      {
        name: "فاطمة ز.",
        city: "مكناس",
        rating: 4,
        text: "قطرة صغيرة تكفي، تمتصه البشرة بسرعة فائقة ونتائجه جميلة جداً.",
        date: "منذ 6 أسابيع",
      },
    ],
    metaDescription:
      "سيروم نضارة محيط العين بمكونات لطيفة لمظهر التعب والانتفاخ—199 درهم، الدفع عند الاستلام.",
  },
];

export const PRODUCTS_MAP: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((p) => [p.slug, p])
);

export const BUNDLES: Bundle[] = [
  {
    id: "golden-ritual",
    name_ar: "الروتين الذهبي — العناية المتكاملة",
    products: ["nura-balance", "nura-night-renewal", "nura-eye-revive"],
    price: 549,
    saving: 68,
    tag: "الخيار الأفضل",
  },
  {
    id: "morning-ritual",
    name_ar: "روتين الصباح المشرق",
    products: ["nura-balance", "nura-eye-revive"],
    price: 349,
    saving: 39,
  },
  {
    id: "night-ritual",
    name_ar: "روتين المساء المجدد",
    products: ["nura-night-renewal", "nura-eye-revive"],
    price: 389,
    saving: 39,
  },
];

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
