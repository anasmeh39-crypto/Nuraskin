# Nura Skin — SEO Structure

## SEO Philosophy

Nura Skin's SEO is built for:
1. Arabic keyword capture (Moroccan Arabic skincare searches)
2. Local Moroccan relevance signals
3. Fast Core Web Vitals (mobile-first)
4. Structured data for rich snippets

---

## URL Structure

```
nuraskin.cc/                          → Home
nuraskin.cc/products/                 → Collection
nuraskin.cc/products/nura-balance     → Product
nuraskin.cc/products/nura-night-renewal
nuraskin.cc/products/nura-eye-revive
nuraskin.cc/about                     → About
nuraskin.cc/contact                   → Contact
nuraskin.cc/policies/returns          → Returns
nuraskin.cc/policies/privacy          → Privacy
nuraskin.cc/policies/terms            → Terms
nuraskin.cc/thank-you                 → Thank you (noindex)
nuraskin.cc/checkout/upsell           → Upsell (noindex)
```

---

## Metadata Templates

### Home Page
```typescript
export const metadata: Metadata = {
  title: 'نيورا سكين | عناية متكاملة للبشرة المغربية',
  description: 'منتجات عناية بشرة مدروسة علمياً للمرأة المغربية. نيورا بالانس، نيورا رينيو الليلي، آي ريفايف. الدفع عند الاستلام.',
  keywords: 'عناية بشرة المغرب, سيروم مغربي, كريم ليلي, هالات, مسام, ناياسيناميد',
  openGraph: {
    title: 'نيورا سكين — Nama Beauty',
    description: 'عناية بشرة مدروسة للمرأة المغربية',
    url: 'https://nuraskin.cc',
    siteName: 'Nura Skin',
    locale: 'ar_MA',
    type: 'website',
    images: [{ url: '/og-home.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'نيورا سكين | Nura Skin',
    description: 'عناية بشرة مدروسة للمرأة المغربية',
    images: ['/og-home.jpg'],
  },
  alternates: {
    canonical: 'https://nuraskin.cc',
  },
};
```

### Product Page
```typescript
export function generateProductMetadata(product: Product): Metadata {
  return {
    title: `${product.name_ar} | نيورا سكين`,
    description: product.meta_description_ar,
    openGraph: {
      title: product.name_ar,
      description: product.meta_description_ar,
      images: [{ url: product.og_image, width: 800, height: 800 }],
      type: 'website',
    },
    alternates: {
      canonical: `https://nuraskin.cc/products/${product.slug}`,
    },
  };
}
```

---

## Structured Data

### Product Schema (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "مركّز نيورا بالانس",
  "description": "مركّز لتوازن البشرة والمسام بالناياسيناميد 10%",
  "image": "https://nuraskin.cc/images/nura-balance.jpg",
  "brand": {
    "@type": "Brand",
    "name": "Nura Skin"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://nuraskin.cc/products/nura-balance",
    "priceCurrency": "MAD",
    "price": "249",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2025-12-31"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "47"
  }
}
```

### Organization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Nura Skin",
  "alternateName": "Nama Beauty",
  "url": "https://nuraskin.cc",
  "logo": "https://nuraskin.cc/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["Arabic", "French"]
  },
  "areaServed": "MA"
}
```

---

## Target Keywords

### Moroccan Arabic Keywords
| Keyword | Intent | Target Page |
|---|---|---|
| عناية بشرة المغرب | Informational | Home |
| سيروم ناياسيناميد | Transactional | Nura Balance |
| كريم ليلي مغربي | Transactional | Night Renewal |
| علاج الهالات | Informational | Eye Revive |
| مسام واسعة علاج | Informational | Nura Balance |
| روتين عناية بشرة | Informational | Collection |
| منتجات عناية مغربية | Commercial | Home, Collection |
| دفع عند الاستلام مغرب | Commercial | Home |

---

## Technical SEO

### Core Web Vitals Targets
- LCP < 2.5s (optimized images, font preloading)
- FID/INP < 200ms (minimal JS on first load)
- CLS < 0.1 (fixed image dimensions, no layout shifts)

### Implementation
```typescript
// Next.js image optimization
<Image
  src={product.image}
  alt={product.name_ar}
  width={600}
  height={600}
  priority={isAboveFold}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Sitemap
Auto-generated via `next-sitemap`:
```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://nuraskin.cc',
  generateRobotsTxt: true,
  exclude: ['/thank-you', '/checkout/*'],
  robotsTxtOptions: {
    additionalSitemaps: [],
  },
};
```

### Robots.txt
```
User-agent: *
Allow: /
Disallow: /thank-you
Disallow: /checkout/upsell

Sitemap: https://nuraskin.cc/sitemap.xml
```

---

## hreflang

Current: Arabic only  
```html
<link rel="alternate" hreflang="ar-MA" href="https://nuraskin.cc" />
```

Future: Add French variant when fr-MA pages created.
