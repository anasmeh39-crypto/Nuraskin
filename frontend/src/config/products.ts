import { Product, Bundle } from "@/types";

export const PRODUCTS: Product[] = [
  {
    slug: "nura-balance",
    name_ar: "سيروم توازن وإشراقة البشرة بالنياسيناميد",
    name_en: "NiaBalance Daily Serum",
    tagline_ar: "لتوازن البشرة، الإشراقة، ومظهر المسام",
    description_ar:
      "مركّز متطور يعمل على استعادة توازن البشرة، تلطيف لمعانها، وتحسين مظهر المسام—بفضل تركيز 10% من النياسيناميد النقي.",
    price: 249,
    formattedPrice: "249 درهم",
    compareAtPrice: 319,
    formattedCompareAtPrice: "319 درهم",
    image: "/images/nura-balance-gallery-1.png",
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
    crossSells: ["nura-spf-50", "nura-eye-revive"],
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
      "سيروم توازن وإشراقة البشرة بالنياسيناميد لتحسين مظهر المسام واللمعان—249 درهم، الدفع عند الاستلام.",
  },
  {
    slug: "nura-night-renewal",
    name_ar: "كريم التجديد الليلي للبشرة",
    name_en: "Night Renewal Face Cream",
    tagline_ar: "لتجديد مظهر البشرة ونعومة الصباح",
    description_ar:
      "كريم ليلي فاخر يساعد على تجديد مظهر البشرة أثناء نومكِ—لتستيقظي على بشرة تنبض بالنعومة والحيوية.",
    price: 269,
    formattedPrice: "269 درهم",
    compareAtPrice: 349,
    formattedCompareAtPrice: "349 درهم",
    image: "/images/nura-night-renewal-gallery-1.png",
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
        description_ar: "مكوّن نباتي لطيف يدعم مظهر التجدد والنعومة في الروتين الليلي.",
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
    crossSells: ["nura-spf-50", "nura-balance"],
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
      "كريم التجديد الليلي للبشرة لمظهر أكثر نعومة ونضارة صباحية—269 درهم، الدفع عند الاستلام.",
  },
  {
    slug: "nura-eye-revive",
    name_ar: "سيروم نضارة محيط العين",
    name_en: "EyeAwake Eye Serum",
    tagline_ar: "لإشراقة محيط العين ومظهر التعب",
    description_ar:
      "سيروم لطيف وفعّال صُمم خصيصاً ليخفف من مظهر الهالات والانتفاخات—لتنعمي بنظرة أكثر انتعاشاً وحيوية.",
    price: 249,
    formattedPrice: "249 درهم",
    compareAtPrice: 319,
    formattedCompareAtPrice: "319 درهم",
    image: "/images/nura-eye-revive-gallery-1.png",
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
    crossSells: ["nura-balance", "nura-spf-50"],
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
      "سيروم نضارة محيط العين بمكونات لطيفة لمظهر التعب والانتفاخ—249 درهم، الدفع عند الاستلام.",
  },
  {
    slug: "nura-spf-50",
    name_ar: "واقي الشمس اليومي SPF 50",
    name_en: "Daily Sunscreen SPF 50",
    tagline_ar: "حماية UVA/UVB خفيفة بلمسة غير دهنية",
    description_ar:
      "واقي شمسي مبتكر يوفر حماية عالية من أشعة الشمس الضارة مع الحفاظ على نعومة البشرة وراحتها. تركيبته خفيفة ومدعّمة بمكونات مرطبة ومضادة للأكسدة، تمتص بسرعة وتترك لمسة غير دهنية مثالية للاستخدام اليومي.",
    price: 279,
    formattedPrice: "279 درهم",
    compareAtPrice: 359,
    formattedCompareAtPrice: "359 درهم",
    image: "/images/nura-spf-50-gallery-1.png",
    heroIngredient: "SPF 50 UVA/UVB",
    format: "كريم واقي شمس",
    volume: "50ml",
    benefits: [
      "يساعد على حماية البشرة من أشعة UVA/UVB",
      "يرطّب البشرة ويعزز حاجزها الواقي",
      "يمنح لمسة خفيفة غير دهنية مناسبة للاستخدام اليومي",
      "يساعد على تهدئة مظهر الاحمرار والجفاف الناتج عن الشمس",
      "يدعم مظهر لون بشرة أكثر توحّدًا ونعومة",
      "خطوة أساسية مع روتين التجديد الليلي",
    ],
    concerns: [
      "التعرض اليومي للشمس",
      "مظهر البقع الداكنة",
      "الإحساس بالدهنية أو اللزوجة",
      "البشرة الحساسة أو الجافة",
      "حماية الروتين الصباحي",
    ],
    ingredients: [
      {
        name_ar: "مرشحات حماية UVA/UVB",
        name_en: "Tinosorb S + Uvinul A Plus + Uvinul T150",
        description_ar: "مزيج فلاتر شمسية يساعد على توفير حماية واسعة من أشعة UVA وUVB.",
      },
      {
        name_ar: "الألوفيرا",
        name_en: "Aloe Vera Extract",
        description_ar: "مكوّن مهدئ ومرطب يساعد على منح البشرة إحساسًا بالراحة بعد التعرض للشمس.",
      },
      {
        name_ar: "النياسيناميد",
        name_en: "Niacinamide 4%",
        description_ar: "يساعد على دعم مظهر لون البشرة وتقليل مظهر البقع ضمن روتين يومي منتظم.",
      },
      {
        name_ar: "البانثينول",
        name_en: "Panthenol 2%",
        description_ar: "بروفيتامين B5 معروف بدوره في تهدئة البشرة ودعم مظهر الحاجز الواقي.",
      },
      {
        name_ar: "حمض الهيالورونيك",
        name_en: "Hyaluronic Acid 0.5%",
        description_ar: "يساعد على ترطيب البشرة ومنحها مظهرًا أكثر امتلاءً وراحة.",
      },
      {
        name_ar: "فيتامين E",
        name_en: "Vitamin E 1%",
        description_ar: "مضاد أكسدة يساعد على دعم البشرة أمام العوامل الخارجية اليومية.",
      },
    ],
    crossSells: ["nura-balance", "nura-eye-revive"],
    reviews: [
      {
        name: "نادية س.",
        city: "الدار البيضاء",
        rating: 5,
        text: "خفيف ومريح صباحًا، وأحببت أنه لا يجعل روتيني ثقيلاً قبل الخروج.",
        date: "منذ أسبوعين",
      },
      {
        name: "كوثر ر.",
        city: "مراكش",
        rating: 5,
        text: "أصبح آخر خطوة في روتيني الصباحي، ملمسه ناعم ومناسب قبل المكياج.",
        date: "منذ شهر",
      },
      {
        name: "سلمى ع.",
        city: "طنجة",
        rating: 4,
        text: "إضافة ضرورية مع كريم الليل، جعلت الروتين يبدو أكثر اكتمالًا.",
        date: "منذ 3 أسابيع",
      },
    ],
    metaDescription:
      "واقي الشمس اليومي SPF 50 بحماية UVA/UVB ولمسة خفيفة غير دهنية—279 درهم، الدفع عند الاستلام وتوصيل مجاني.",
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
    price: 599,
    compareAtPrice: 777,
    saving: 178,
    tag: "الأكثر اختيارًا للصباح",
  },
  {
    id: "night-renewal-ritual",
    name_ar: "روتين التجديد الليلي",
    products: ["nura-night-renewal", "nura-eye-revive"],
    price: 429,
    compareAtPrice: 518,
    saving: 89,
    tag: "مثالي للعناية الليلية",
  },
  {
    id: "nura-complete-ritual",
    name_ar: "روتين نورا الكامل",
    products: ["nura-balance", "nura-night-renewal", "nura-eye-revive", "nura-spf-50"],
    price: 799,
    compareAtPrice: 1046,
    saving: 247,
    tag: "أفضل قيمة",
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
