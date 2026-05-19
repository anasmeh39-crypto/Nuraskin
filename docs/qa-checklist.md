# Nura Skin — QA Checklist

## Pre-Launch Checklist

### Brand & Copy
- [ ] All copy is in Arabic Darija (primary)
- [ ] No formal MSA used where Darija is natural
- [ ] No medical claims (only cosmetic language)
- [ ] No fake certifications or dermatologist references
- [ ] Product names consistent across all pages
- [ ] Price correct on all product pages (Balance: 249, Eye Revive: 249, Night Renewal: 269, SPF: 279)
- [ ] Bundle prices correct (Morning: 599, Night: 429, Complete: 799)
- [ ] Shipping policy shown: free delivery across Morocco

### RTL & Arabic
- [ ] All pages render RTL correctly
- [ ] Text alignment is right-aligned throughout
- [ ] Arabic font (Cairo) loads correctly on mobile
- [ ] No text overflow or truncation in Arabic
- [ ] Icons/arrows flip correctly in RTL context
- [ ] Cart drawer opens from correct side (RTL: left)
- [ ] No mixed RTL/LTR alignment issues

### Mobile (Test at 375px, 390px, 428px)
- [ ] No horizontal scroll on any page
- [ ] Hero section is readable without scrolling
- [ ] Sticky CTA visible on product pages
- [ ] Cart drawer takes full width on mobile
- [ ] Checkout popup is full-screen on mobile
- [ ] Form inputs are large enough (min 48px touch target)
- [ ] Font sizes readable (min 16px body)
- [ ] Images load correctly and don't overflow

### Checkout Flow
- [ ] "أضيفي للسلة" adds product to cart
- [ ] Cart drawer opens automatically after adding
- [ ] Cart drawer shows correct items and total
- [ ] Free shipping progress bar works correctly
- [ ] Cross-sells in cart show correct products
- [ ] Checkout popup opens from cart drawer CTA
- [ ] Name field: required, min 2 chars
- [ ] Phone field: validates 06/07XXXXXXXX format
- [ ] Invalid phone shows Darija error: "رقم الهاتف غير صحيح"
- [ ] Order summary visible in checkout popup
- [ ] COD badge visible in checkout popup
- [ ] "أكّدي طلبك" submits order
- [ ] Loading state shown during submission
- [ ] Error state handled if API fails

### Order API
- [ ] POST /orders creates order in DB
- [ ] Order appears in Google Sheets within 5 seconds
- [ ] Valid order number generated (ORD-YYYYMMDD-XXX)
- [ ] Phone number stored correctly
- [ ] Upsell product determined correctly
- [ ] Upsell response included when eligible

### Upsell Page
- [ ] Page shows correct upsell product
- [ ] Discounted price shown correctly
- [ ] Timer counts down from 10-15 seconds
- [ ] Timer reaching 0 redirects to thank-you
- [ ] "نعم، أضيفيها" sends PATCH /orders/{id}/upsell
- [ ] "لا شكراً" redirects to thank-you directly
- [ ] UpsellViewed event fires on page load
- [ ] UpsellAccepted event fires on acceptance

### Thank-You Page
- [ ] Order number displayed
- [ ] Items ordered displayed
- [ ] Total (with or without upsell) correct
- [ ] Shipping cost displayed
- [ ] Delivery timeline shown: "خلال 2–4 أيام عمل"
- [ ] "What to expect" section visible
- [ ] Soft product recommendations shown (no discount)
- [ ] Return policy link present

### Tracking
- [ ] Meta Pixel fires PageView on all pages
- [ ] ViewContent fires on product pages
- [ ] AddToCart fires on "أضيفي للسلة"
- [ ] InitiateCheckout fires when checkout popup opens
- [ ] Lead/PlaceOrder fires on order submit
- [ ] Server-side Purchase event fires after order creation
- [ ] UpsellViewed fires on upsell page
- [ ] UpsellAccepted fires on acceptance
- [ ] ThankYouViewed fires on thank-you page
- [ ] event_id deduplication verified in Meta Events Manager
- [ ] TikTok events showing in TikTok Events Manager

### Performance
- [ ] LCP < 2.5s on 3G mobile (test in Chrome DevTools)
- [ ] No render-blocking CSS or JS
- [ ] Arabic fonts load from Google Fonts with preconnect
- [ ] Images: all have width/height, above-fold has priority
- [ ] Tracking scripts deferred (afterInteractive)
- [ ] Core Web Vitals: CLS < 0.1

### SEO
- [ ] Title tag correct on each page (Arabic)
- [ ] Meta description correct (Arabic)
- [ ] OG image specified for home and product pages
- [ ] Canonical URLs set
- [ ] Product JSON-LD structured data present
- [ ] /thank-you has noindex
- [ ] /checkout/upsell has noindex
- [ ] Sitemap generated and accessible at /sitemap.xml
- [ ] robots.txt correct

### Backend
- [ ] API health check returns 200: GET /health
- [ ] CORS only allows nuraskin.cc
- [ ] DATABASE_URL from environment (not hardcoded)
- [ ] Alembic migrations applied (alembic current = head)
- [ ] Google Sheets service account credentials valid
- [ ] Meta CAPI endpoint reachable
- [ ] All routes return proper error messages in Arabic

### Security
- [ ] No secrets in git history
- [ ] No secrets in Docker images
- [ ] Environment variables set in EasyPanel
- [ ] Rate limiting on /orders endpoint
- [ ] PII hashed before sending to tracking platforms

### Pre-Launch Final
- [ ] Test order placed end-to-end (mobile)
- [ ] Google Sheets received the test order
- [ ] Meta Events Manager shows test events
- [ ] Order flow screenshots documented for ops team
- [ ] Ops team briefed on Google Sheets order management
- [ ] Delivery partner contact documented
- [ ] Customer service WhatsApp number set up
