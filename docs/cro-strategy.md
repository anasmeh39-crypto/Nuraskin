# Nura Skin — CRO Strategy

## Conversion Rate Optimization Philosophy

CRO for Moroccan COD is fundamentally different from Western ecommerce:
- The goal is not just clicks → orders
- The goal is clicks → orders → **confirmed deliveries**
- Every friction point and trust signal must be tuned for this dual objective

---

## CRO Funnel Stages

### Stage 1: Landing (Home / Product Page)
**Goal:** Create desire and trust within 3 seconds
**KPIs:** Time on page, scroll depth, CTA click rate

**Optimization levers:**
- Mobile-first hero with product + benefit headline (not brand name)
- Arabic Darija copy that sounds like a knowledgeable friend
- Above-fold social proof signal (review count or "اختارها X شخص هاد الأسبوع")
- Clear CTA: "أضيفي للسلة" — not "Shop Now" or "Buy"

### Stage 2: Product Engagement
**Goal:** Resolve objections before they're asked
**KPIs:** Ingredient section scroll, review scroll, CTA clicks

**Optimization levers:**
- Ingredient education section (proactively explains)
- Problem-first framing ("واش عندك هاد المشكل؟")
- Before/after perception section (claim-safe, placeholder-based)
- Trust badges: COD, Free Returns, Moroccan brand, Secure order
- FAQ answering top objections inline
- Sticky mobile CTA (always visible)

### Stage 3: Add to Cart
**Goal:** Smooth, fast cart action with AOV lift
**KPIs:** Add-to-cart rate, cart abandonment, cart value

**Optimization levers:**
- Cart drawer opens immediately on add (no page navigation)
- Cart drawer shows cross-sell ("أكملي روتينك")
- Bundle offer in cart drawer ("وفري مع الطقم الكامل")
- Free shipping progress bar ("بقا غير X درهم للشحن مجاناً")
- Total visible before checkout

### Stage 4: Checkout
**Goal:** Complete purchase with correct phone number
**KPIs:** Checkout start rate, form completion rate, order placement rate

**Optimization levers:**
- Minimal fields: Name + Phone only
- Morocco phone validation (no invalid numbers reaching ops)
- Order summary visible in popup (what they're buying + price)
- COD reassurance: "ما تدفعي حتى يوصلك الطلب"
- Trust badges inside checkout popup
- Scarcity text (real, not fake): "الكمية محدودة"
- CTA: "أكّدي طلبك" (not "Pay" or "Submit")

### Stage 5: Post-Checkout Upsell
**Goal:** Increase AOV with one-time offer
**KPIs:** Upsell acceptance rate, AOV lift, cancellation rate

**Optimization levers:**
- No countdown and no fake urgency
- Discount: 20% off companion product (only here)
- Framing: "أكملي روتينك بخطوة الحماية اليومية"
- "أضيفيه لروتيني الآن" / "إكمال الطلب فقط" — both options visible, no manipulation
- If accepted: order updated seamlessly, redirected to thank-you

### Stage 6: Thank-You Page
**Goal:** Reduce cancellation, build confidence, plant re-order seed
**KPIs:** Cancellation rate, repeat order rate

**Optimization levers:**
- Confirm order details (they see what they ordered)
- Delivery timeline: "غادي يوصلك خلال 2–4 أيام عمل"
- What to expect: "غادي يتصل بيك ديليفري لتأكيد التوصيل"
- "Good decision" reinforcement: social proof, brand values
- Soft product recommendation (no upsell, just discovery)
- Return policy visible (reduces fear of commitment)

---

## Mobile CRO Priorities

All CRO decisions are made mobile-first. Desktop is secondary.

### Sticky CTA
- Always visible on product pages
- Floats above fold as user scrolls
- Shows price + "أضيفي للسلة"
- Collapses when cart drawer opens

### Thumb Zone Optimization
- Primary CTAs in lower 60% of screen
- Form inputs positioned for keyboard comfort
- Cart drawer opens from bottom (sheet style)
- Checkout popup is full-screen on mobile

### Speed
- Core Web Vitals optimized (LCP < 2.5s)
- Images: Next.js Image component with priority on above-fold
- Fonts: preloaded, subset Arabic fonts
- JS deferred where possible (tracking pixels)

---

## A/B Test Roadmap

| Test | Variable | Hypothesis |
|---|---|---|
| Hero CTA | "أضيفي للسلة" vs "اطلبي الآن" | More transactional = higher CTR |
| Price display | 189 MAD vs 189.00 MAD | Round numbers feel more premium |
| Upsell timer | 10s vs 15s | More time = higher acceptance |
| Checkout copy | "أكّدي طلبك" vs "احجزي الآن" | "Reserve" framing reduces commitment anxiety |
| Free shipping threshold | 300 MAD vs 250 MAD | Lower threshold = higher bundle rate |

---

## Trust Badge System

| Badge | Arabic Label | Placement |
|---|---|---|
| COD | الدفع عند الاستلام | Hero, Checkout, Cart |
| Free Returns | إرجاع مجاني | Product, Checkout |
| Secure Order | طلب آمن | Checkout |
| Fast Delivery | توصيل سريع | Product, Cart |
| Moroccan Brand | صنعناها بالمغرب | About, Footer |
| No Upfront Payment | بدون دفع مسبق | Hero, Cart |

---

## Copy CRO Principles

1. **Lead with the problem, not the product**: "بشرتك تلمع بزاف؟" before "نيورا بالانس"
2. **Speak Darija**: "واش" not "هل", "بزاف" not "كثيراً"
3. **Show the mechanism**: "الناياسيناميد يساعد على..." (explain why it works)
4. **Use social proof as reassurance**: "X شخص اختارها هاد الشهر"
5. **Never rush the customer**: calm confidence, not urgency panic
6. **Price last, value first**: show what they get before what it costs
7. **COD everywhere**: it's the #1 trust signal — repeat it, don't bury it
