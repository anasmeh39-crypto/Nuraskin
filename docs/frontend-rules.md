# Nura Skin — Frontend Rules

## Non-Negotiable Rules

### 1. RTL First
- All pages rendered with `dir="rtl"` and `lang="ar"`
- Arabic text in all user-facing copy
- Flexbox/grid layouts respect RTL automatically
- Use `rtl:` Tailwind variants when overriding direction-specific styles

### 2. Mobile First
- Write CSS starting at mobile breakpoint
- Use `md:` and `lg:` as progressive enhancement
- Test at 375px, 390px, and 428px (iPhone SE, 14, 14 Plus)
- No horizontal scroll on any page

### 3. No Hardcoded Colors
- Use design token CSS variables only
- Never use arbitrary Tailwind values for colors (`bg-[#1A3A2A]` in class → move to token)

### 4. TypeScript Strict
- All props typed with interfaces
- No `any` types
- All API responses typed

### 5. Image Optimization
- Always use `next/image` (`Image` component)
- Always specify `width` and `height`
- Above-fold images: `priority={true}`
- All images have descriptive Arabic `alt` text

### 6. Arabic Copy Only in Components
- No hardcoded strings buried in component logic
- Extract all strings to a `config/copy.ts` file
- Makes future translation and A/B testing easier

### 7. Tracking Calls Are Non-Blocking
- Never `await` tracking calls in user action handlers
- Use fire-and-forget pattern
- Tracking failure must not affect checkout flow

### 8. Cart State is Source of Truth
- Cart lives in Zustand store with localStorage persistence
- Never derive cart state from URL or server
- Cart must survive page refresh

### 9. Form Validation
- Morocco phone: `/^0[67]\d{8}$/`
- Show errors in Darija
- Never show English error messages to users
- Use controlled inputs for all form fields

### 10. Performance Budget
- Bundle size: < 250KB JS (gzipped, initial load)
- LCP: < 2.5s on 3G mobile
- No render-blocking resources
- Tracking scripts: `strategy="afterInteractive"` only

---

## File Naming Conventions
- Components: PascalCase (`ProductCard.tsx`)
- Utilities: camelCase (`formatPrice.ts`)
- Pages: kebab-case directories (`about/page.tsx`)
- Hooks: camelCase with `use` prefix (`useCart.ts`)
- Types: PascalCase interfaces (`Product`, `Order`, `CartItem`)

## Import Order
```typescript
// 1. React
import React from 'react'
// 2. Next.js
import Image from 'next/image'
import Link from 'next/link'
// 3. Third-party
import { useAtom } from 'jotai'
// 4. Internal absolute
import { Button } from '@/components/ui/Button'
import { Product } from '@/types'
// 5. Relative
import styles from './Component.module.css'
```

## Component Structure
```typescript
// Types at top
interface Props {
  product: Product
  onAddToCart: () => void
}

// Component
export function ProductCard({ product, onAddToCart }: Props) {
  // Hooks first
  const { addToCart } = useCart()
  
  // Derived values
  const formattedPrice = formatPrice(product.price)
  
  // Handlers
  const handleAdd = () => {
    addToCart(product)
    onAddToCart()
  }
  
  // Render
  return (...)
}
```

## Forbidden Patterns
- No `useEffect` for data that should be server-fetched
- No API calls from client components that are SSR-able
- No inline styles (use Tailwind classes)
- No `!important` in CSS
- No jQuery or non-React DOM manipulation
- No console.log in production (use development guards)
