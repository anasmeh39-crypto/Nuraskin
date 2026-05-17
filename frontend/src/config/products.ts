import { Product, Bundle } from "@/types";

export const PRODUCTS: Product[] = [
  {
    slug: "nura-balance",
    name_ar: "مركّز نيورا بالانس",
    name_en: "Nura Balance",
    tagline_ar: "لتوازن البشرة والمسام",
    description_ar:
      "مركّز يساعد على توحيد مظهر البشرة وتخفيف اللمعان وتضييق مظهر المسام — بفضل الناياسيناميد 10%.",
    price: 189,
    formattedPrice: "189 درهم",
    image: "/images/nura-balance.jpg",
    heroIngredient: "ناياسيناميد 10%",
    format: "مركّز / سيروم",
    volume: "30ml",
    benefits: [
      "يساعد على تخفيف مظهر اللمعان",
      "يساعد على توحيد مظهر البشرة",
      "يساعد على تضييق مظهر المسام",
      "ترطيب خفيف غير دهني",
    ],
    concerns: ["البشرة الدهنية", "المسام الواسعة", "عدم التوحيد", "اللمعان الزائد"],
    ingredients: [
      {
        name_ar: "الناياسيناميد",
        name_en: "Niacinamide 10%",
        description_ar: "فيتامين B3 الفعّال — يساعد على توحيد مظهر البشرة وتخفيف اللمعان.",
      },
      {
        name_ar: "زنك PCA",
        name_en: "Zinc PCA",
        description_ar: "يساعد على التحكم في إفراز الزهم ومظهر المسام.",
      },
      {
        name_ar: "حمض الهيالورونيك",
        name_en: "Hyaluronic Acid",
        description_ar: "ترطيب خفيف، يمنح البشرة نضارة دون دهنية.",
      },
    ],
    crossSells: ["nura-night-renewal", "nura-eye-revive"],
    reviews: [
      {
        name: "مريم ب.",
        city: "الدار البيضاء",
        rating: 5,
        text: "بشرتي ولات أكثر نعومة وأقل لمعاناً بعد أسبوعين — ما كنت نتوقع النتيجة بهاد السرعة!",
        date: "منذ 3 أسابيع",
      },
      {
        name: "سناء م.",
        city: "الرباط",
        rating: 5,
        text: "أخيراً منتج يفهم بشرتي المختلطة — المسام بانت أصغر والإشراقة رجعات.",
        date: "منذ شهر",
      },
      {
        name: "إيمان ح.",
        city: "مراكش",
        rating: 4,
        text: "تركيبة خفيفة ومريحة جداً، ما حساش بأي ثقل أو دهنية.",
        date: "منذ 3 أسابيع",
      },
    ],
    metaDescription:
      "مركّز ناياسيناميد 10% للمسام واللمعان — نيورا بالانس 189 درهم الدفع عند الاستلام",
  },
  {
    slug: "nura-night-renewal",
    name_ar: "كريم نيورا رينيو الليلي",
    name_en: "Nura Night Renewal",
    tagline_ar: "لتجديد النعومة والإشراقة",
    description_ar:
      "كريم ليلي يساعد على تجديد مظهر البشرة أثناء النوم — لتستيقظي على نعومة وإشراقة.",
    price: 229,
    formattedPrice: "229 درهم",
    image: "/images/nura-night-renewal.jpg",
    heroIngredient: "باكوتشيول + ببتيدات",
    format: "كريم ليلي",
    volume: "50ml",
    benefits: [
      "يساعد على تجديد مظهر البشرة أثناء النوم",
      "يساعد على تنعيم مظهر البشرة",
      "ترطيب عميق غير انسدادي",
      "يساعد على منح البشرة إشراقة",
    ],
    concerns: ["البشرة المتعبة", "فقدان النعومة", "الإجهاد", "بشرة الليل الجافة"],
    ingredients: [
      {
        name_ar: "باكوتشيول",
        name_en: "Bakuchiol",
        description_ar: "البديل النباتي لـ Retinol — يساعد على مظهر بشرة أكثر تجديداً.",
      },
      {
        name_ar: "زبدة الشيا",
        name_en: "Shea Butter",
        description_ar: "ترطيب عميق وغني يغذي البشرة أثناء الليل.",
      },
      {
        name_ar: "سكوالان",
        name_en: "Squalane",
        description_ar: "زيت نباتي خفيف غير انسدادي يحافظ على نضارة البشرة.",
      },
      {
        name_ar: "ببتيدات",
        name_en: "Peptides",
        description_ar: "يساعد على مظهر بشرة أكثر نعومة وانتعاشاً.",
      },
    ],
    crossSells: ["nura-balance", "nura-eye-revive"],
    reviews: [
      {
        name: "خديجة أ.",
        city: "فاس",
        rating: 5,
        text: "كريم الليل هدا غير من روتيني كلياً — بشرتي في الصباح أنعم وأكثر إشراقاً.",
        date: "منذ شهرين",
      },
      {
        name: "هدى ر.",
        city: "أكادير",
        rating: 5,
        text: "الرائحة رائعة والملمس غني دون ثقل — استيقظت بفرق واضح في النعومة.",
        date: "منذ 5 أسابيع",
      },
      {
        name: "نبيهة ف.",
        city: "الدار البيضاء",
        rating: 4,
        text: "أفضل كريم ليلي جربته في المغرب — يمتص بسرعة وما يخليش أثر دهني.",
        date: "منذ شهر",
      },
    ],
    metaDescription:
      "كريم ليلي مغربي للتجديد والنعومة بالباكوتشيول — نيورا رينيو 229 درهم الدفع عند الاستلام",
  },
  {
    slug: "nura-eye-revive",
    name_ar: "سيروم نيورا آي ريفايف",
    name_en: "Nura Eye Revive",
    tagline_ar: "للهالات وآثار التعب",
    description_ar:
      "سيروم يساعد على تخفيف مظهر الهالات والانتفاخات تحت العين — لعيون أكثر إشراقاً وانتعاشاً.",
    price: 199,
    formattedPrice: "199 درهم",
    image: "/images/nura-eye-revive.jpg",
    heroIngredient: "كافيين + ببتيدات",
    format: "سيروم العين",
    volume: "15ml",
    benefits: [
      "يساعد على تخفيف مظهر الهالات",
      "يساعد على تخفيف مظهر الانتفاخ الصباحي",
      "يساعد على منح منطقة العين إشراقة",
      "ملمس خفيف يمتص بسرعة",
    ],
    concerns: ["الهالات الداكنة", "انتفاخات العين", "آثار التعب", "منطقة العين الكثيفة"],
    ingredients: [
      {
        name_ar: "الكافيين",
        name_en: "Caffeine",
        description_ar: "يساعد على تخفيف مظهر الانتفاخ والإرهاق تحت العين.",
      },
      {
        name_ar: "فيتامين K2",
        name_en: "Vitamin K2",
        description_ar: "يساعد على مظهر منطقة العين أكثر إشراقاً وتوحيداً.",
      },
      {
        name_ar: "ببتيدات",
        name_en: "Peptides",
        description_ar: "يساعد على مظهر منطقة العين أكثر انتعاشاً.",
      },
      {
        name_ar: "ناياسيناميد 5%",
        name_en: "Niacinamide 5%",
        description_ar: "يساعد على توحيد مظهر منطقة العين والإشراقة.",
      },
    ],
    crossSells: ["nura-balance", "nura-night-renewal"],
    reviews: [
      {
        name: "أسماء ق.",
        city: "الرباط",
        rating: 5,
        text: "الهالات بانت أفتح وعيوني ولات تبان أكثر حياة — ما توقعتش هذا من سيروم محلي.",
        date: "منذ شهر",
      },
      {
        name: "ليلى ن.",
        city: "طنجة",
        rating: 5,
        text: "الانتفاخ الصباحي نقص بشكل ملحوظ — بشرة حول عيني ولات أنضر وأكثر إشراقاً.",
        date: "منذ 3 أسابيع",
      },
      {
        name: "فاطمة ز.",
        city: "مكناس",
        rating: 4,
        text: "سيروم رائع بقدر صغير — يكفي لكلا العينين، وامتصاصه سريع جداً.",
        date: "منذ 6 أسابيع",
      },
    ],
    metaDescription:
      "سيروم العين للهالات والانتفاخ بالكافيين والببتيدات — نيورا آي ريفايف 199 درهم الدفع عند الاستلام",
  },
];

export const PRODUCTS_MAP: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((p) => [p.slug, p])
);

export const BUNDLES: Bundle[] = [
  {
    id: "golden-ritual",
    name_ar: "الروتين الذهبي — الطقم الكامل",
    products: ["nura-balance", "nura-night-renewal", "nura-eye-revive"],
    price: 549,
    saving: 68,
    tag: "الأكثر مبيعاً",
  },
  {
    id: "morning-ritual",
    name_ar: "روتين الصباح",
    products: ["nura-balance", "nura-eye-revive"],
    price: 349,
    saving: 39,
  },
  {
    id: "night-ritual",
    name_ar: "روتين الليل",
    products: ["nura-night-renewal", "nura-eye-revive"],
    price: 389,
    saving: 39,
  },
];

export const SHIPPING_THRESHOLD = 300;
export const SHIPPING_COST = 30;

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS_MAP[slug];
}

export function formatPrice(price: number): string {
  return `${price} درهم`;
}

export function calculateShipping(total: number): number {
  return total >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}
