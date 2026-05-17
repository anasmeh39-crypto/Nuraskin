# Nura Skin — Design System

## Design Principles

1. **Premium restraint**: Less is more. White space is expensive.
2. **Mobile-first always**: Every decision starts at 375px wide
3. **RTL by default**: Arabic layout, left-to-right elements only where necessary
4. **Emotional hierarchy**: The most important thing on every screen should be immediately obvious
5. **Moroccan soul**: Subtle texture references, warm palette, not cold Scandinavian

---

## Color Tokens

```css
/* Primary Brand */
--color-brand-deep: #1A3A2A;      /* Deep Forest Green */
--color-brand-mid: #2C5F45;       /* Mid Green (hover states) */
--color-brand-light: #E8F0EB;     /* Light green tint */

/* Accent */
--color-gold: #C9A84C;            /* Warm Gold */
--color-gold-light: #F5EDD4;      /* Gold tint */

/* Neutrals */
--color-cream: #FAF8F3;           /* Page background */
--color-white: #FFFFFF;           /* Cards, surfaces */
--color-border: #E8E0D5;          /* Subtle borders */
--color-text-primary: #1C1C1E;    /* Near black */
--color-text-secondary: #6B6B6B;  /* Muted text */
--color-text-tertiary: #9B9B9B;   /* Very muted */

/* Semantic */
--color-success: #2D6A4F;
--color-error: #C0392B;
--color-warning: #E67E22;
```

---

## Typography

### Font Stack
```css
/* Arabic (primary) */
font-family: 'Cairo', 'Noto Naskh Arabic', sans-serif;

/* Latin (brand names, INCI, secondary) */
font-family: 'Inter', sans-serif;

/* Logo / Display accents */
font-family: 'Playfair Display', serif;
```

### Type Scale
| Name | Size | Weight | Use |
|---|---|---|---|
| display-xl | 48px | 700 | Hero headlines (mobile: 36px) |
| display-lg | 36px | 700 | Section headlines (mobile: 28px) |
| display-md | 28px | 600 | Product name (mobile: 24px) |
| heading | 22px | 600 | Card headers, H3 |
| body-lg | 18px | 400 | Lead paragraph |
| body | 16px | 400 | Default body |
| body-sm | 14px | 400 | Captions, badges |
| label | 12px | 500 | Labels, tags |

### Arabic Typography Rules
- Line height: 1.8x for Arabic (more than Latin)
- Letter spacing: 0 (Arabic doesn't benefit from tracking)
- Text align: right (RTL)
- Avoid all-caps in Arabic

---

## Spacing Scale

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

---

## Border Radius

```css
--radius-sm: 6px;     /* Badges, tags */
--radius-md: 12px;    /* Cards */
--radius-lg: 20px;    /* Modals, drawers */
--radius-xl: 28px;    /* Hero image containers */
--radius-full: 9999px; /* Pills, buttons */
```

---

## Components

### Button
**Primary:**
- Background: `--color-brand-deep`
- Text: white
- Radius: `--radius-full`
- Height: 52px (mobile), 56px (desktop)
- Padding: 0 32px
- Font: Cairo 600, 16px

**Secondary:**
- Background: transparent
- Border: 1.5px solid `--color-brand-deep`
- Text: `--color-brand-deep`

**Ghost:**
- No border, no background
- Text: `--color-text-secondary`
- Underline on hover

### Badge
- Height: 28px
- Radius: `--radius-full`
- Padding: 0 12px
- Font: 12px, 500 weight
- Variants: green (COD), gold (premium), gray (info)

### Card
- Background: white
- Border: 1px solid `--color-border`
- Border-radius: `--radius-md`
- Padding: 24px (mobile: 16px)
- No shadows (flat design principle)

### Input
- Height: 52px
- Border: 1.5px solid `--color-border`
- Border-radius: 10px
- Focus: border `--color-brand-deep`
- Font: Cairo 16px, RTL
- Placeholder: `--color-text-tertiary`

---

## Motion / Animation

- **Transitions**: 200ms ease-out (most)
- **Cart drawer**: slide from right (LTR) / left (RTL), 300ms
- **Checkout popup**: fade + scale from center, 250ms
- **Upsell modal**: fade in, 200ms
- **Loading states**: skeleton shimmer (no spinners)
- **Page transitions**: Next.js default (fade via CSS)

---

## Image Slots System

All images use a consistent placeholder system:

```tsx
// Placeholder image dimensions
Hero product: 600x600px (1:1 ratio)
Collection card: 400x400px (1:1 ratio)  
Lifestyle/hero banner: 1200x800px (3:2 ratio, mobile: 800x1000)
Ingredient illustration: 200x200px (1:1)
Brand story: 800x600px (4:3)
```

Placeholder component uses Next.js Image with:
- `bg-[#E8E0D5]` base color
- Brand initials or product name overlay
- Easily replaced with real assets

---

## Iconography

- Use Heroicons (React, outline style)
- Size: 20px default, 24px for navigation
- Color: inherits from text color
- Never use emoji as icons

---

## RTL Implementation

```css
/* Global RTL */
html[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

/* Flip icons/arrows in RTL */
html[dir="rtl"] .flip-rtl {
  transform: scaleX(-1);
}
```

In Next.js:
- `<html lang="ar" dir="rtl">` in root layout
- Tailwind RTL variants: `rtl:ml-0 rtl:mr-4`
- Flexbox direction is respected by RTL automatically

---

## Mobile Breakpoints

```css
/* Tailwind custom screens */
sm: 640px   /* Large phones */
md: 768px   /* Tablets */
lg: 1024px  /* Small desktop */
xl: 1280px  /* Desktop */
```

Design at 375px first. Tablet/desktop are enhancement, not primary.

---

## Dark Mode

Not implemented in Phase 1. Brand palette is inherently warm/light.  
Reserve dark mode consideration for Phase 2.
