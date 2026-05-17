# Nura Skin — Component Library

## Component Inventory

### Layout Components
| Component | File | Description |
|---|---|---|
| Header | `components/layout/Header.tsx` | Nav, logo, cart icon |
| Footer | `components/layout/Footer.tsx` | Links, brand info |
| CartDrawer | `components/layout/CartDrawer.tsx` | Slide-in cart |
| PageWrapper | `components/layout/PageWrapper.tsx` | RTL, padding |

### Home Page Components
| Component | File | Description |
|---|---|---|
| Hero | `components/home/Hero.tsx` | Full-bleed hero |
| AuthoritySection | `components/home/AuthoritySection.tsx` | Why Nura |
| ProductCollection | `components/home/ProductCollection.tsx` | 3-product grid |
| MoroccanSkinSection | `components/home/MoroccanSkinSection.tsx` | Problem awareness |
| IngredientsSection | `components/home/IngredientsSection.tsx` | Ingredient education |
| TestimonialsSection | `components/home/TestimonialsSection.tsx` | Social proof |
| BundleSection | `components/home/BundleSection.tsx` | Bundle offers |
| FAQSection | `components/home/FAQSection.tsx` | FAQ accordion |

### Product Components
| Component | File | Description |
|---|---|---|
| ProductHero | `components/product/ProductHero.tsx` | Image + buy section |
| IngredientExplainer | `components/product/IngredientExplainer.tsx` | Key ingredients |
| ProblemFraming | `components/product/ProblemFraming.tsx` | Problem awareness |
| BeforeAfterSection | `components/product/BeforeAfterSection.tsx` | Perception section |
| ProductTestimonials | `components/product/ProductTestimonials.tsx` | Product reviews |
| TrustBadges | `components/product/TrustBadges.tsx` | COD, return, etc. |
| CrossSells | `components/product/CrossSells.tsx` | Complementary products |
| OfferBlock | `components/product/OfferBlock.tsx` | Pricing + CTA |
| StickyMobileCTA | `components/product/StickyMobileCTA.tsx` | Floating CTA |

### Checkout Components
| Component | File | Description |
|---|---|---|
| CheckoutPopup | `components/checkout/CheckoutPopup.tsx` | Full checkout modal |
| PostCheckoutUpsell | `components/checkout/PostCheckoutUpsell.tsx` | Upsell page |
| OrderSummary | `components/checkout/OrderSummary.tsx` | Order breakdown |

### UI Primitives
| Component | File | Description |
|---|---|---|
| Button | `components/ui/Button.tsx` | All button variants |
| Badge | `components/ui/Badge.tsx` | Tags, labels |
| Input | `components/ui/Input.tsx` | Form input |
| ProductCard | `components/ui/ProductCard.tsx` | Collection card |
| PlaceholderImage | `components/ui/PlaceholderImage.tsx` | Image placeholder |
| TrustBadge | `components/ui/TrustBadge.tsx` | Single badge |
| StarRating | `components/ui/StarRating.tsx` | Review stars |
| Accordion | `components/ui/Accordion.tsx` | FAQ expandable |

---

## Key Component Specs

### Header
```
Height: 64px (mobile), 72px (desktop)
Position: sticky top-0
Background: white with border-bottom
Left: Logo (N icon + brand name)
Right: Cart icon with item count badge
z-index: 50
```

### CartDrawer
```
Width: 100% (mobile), 420px (desktop)
Position: fixed right (RTL: left)
Animation: slide from edge, 300ms
Overlay: black 40% opacity
Contents:
  - Header: "سلتي" + close button
  - Item list with qty controls
  - Free shipping progress bar
  - Cross-sell section
  - Total + Checkout CTA
```

### CheckoutPopup
```
Mobile: Full screen (100vw, 100vh)
Desktop: Centered modal, max-width 480px
Animation: fade + scale, 250ms
Contents:
  - Close button
  - Order summary (collapsed)
  - Name input
  - Phone input (with MA flag)
  - COD badge + trust text
  - Scarcity text
  - Submit CTA: "أكّدي طلبك"
  - Return policy link
```

### ProductCard
```
Aspect: 1:1 image top
Image: PlaceholderImage or real Next.js Image
Below: Product name (Arabic)
Price: MAD
Short description (1 line)
CTA: "أضيفي للسلة" or "اكتشفي"
```

### StickyMobileCTA
```
Position: fixed bottom-0 (mobile only, lg:hidden)
Height: 72px
Background: brand-deep
Content: Price + "أضيفي للسلة"
z-index: 40
Hidden when cart drawer is open
```
