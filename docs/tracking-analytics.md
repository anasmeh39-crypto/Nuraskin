# Nura Skin — Tracking & Analytics

## Architecture Overview

### Dual-Track Approach
All key events are tracked:
1. **Client-side** (browser pixels) — immediate, user-visible
2. **Server-side** (CAPI/Events API) — reliable, privacy-compliant, deduplication

### Deduplication
- Every event generates a unique `event_id` (UUID v4)
- Same `event_id` sent both client-side and server-side
- Platform deduplication APIs handle the rest
- Stored in order model for post-purchase events

---

## Pixel Configuration

### Meta Pixel
```html
<!-- Deferred load after page interaction -->
<script>
  !function(f,b,e,v,n,t,s){...}(window, document, 'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', process.env.NEXT_PUBLIC_META_PIXEL_ID);
  fbq('track', 'PageView');
</script>
```

### TikTok Pixel
```html
<script>
  !function (w, d, t) {
    w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
    ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
    // ... standard TikTok snippet
  }(window, document, 'ttq');
  ttq.load(process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID);
  ttq.page();
</script>
```

### Snapchat Pixel
```html
<script>
  (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){
  a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
  a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
  r.src=n;var u=t.getElementsByTagName(s)[0];
  u.parentNode.insertBefore(r,u);
  })(window,document,'https://sc-static.net/scevent.min.js');
  snaptr('init', process.env.NEXT_PUBLIC_SNAP_PIXEL_ID, {'user_email': ''});
  snaptr('track', 'PAGE_VIEW');
</script>
```

---

## Event Matrix

| Event | Client | Server | Trigger |
|---|---|---|---|
| PageView | ✓ | — | Every page load |
| ViewContent | ✓ | ✓ | Product page view |
| AddToCart | ✓ | ✓ | Add to cart click |
| InitiateCheckout | ✓ | ✓ | Checkout popup opens |
| Lead / PlaceOrder | ✓ | ✓ | Order submitted |
| Purchase / CODOrderCreated | — | ✓ | Order confirmed in backend |
| UpsellViewed | ✓ | — | Upsell screen shown |
| UpsellAccepted | ✓ | ✓ | Upsell accepted |
| ThankYouViewed | ✓ | — | Thank-you page load |

---

## Client-Side Event Implementations

### ViewContent
```typescript
// tracking/client.ts
export function trackViewContent(product: Product, eventId: string) {
  const payload = {
    content_ids: [product.slug],
    content_name: product.name_ar,
    content_type: 'product',
    value: product.price,
    currency: 'MAD',
  };
  
  // Meta
  fbq('track', 'ViewContent', payload, { eventID: eventId });
  
  // TikTok
  ttq.track('ViewContent', {
    content_id: product.slug,
    content_name: product.name_ar,
    content_type: 'product',
    value: product.price,
    currency: 'MAD',
  }, { event_id: eventId });
  
  // Snapchat
  snaptr('track', 'VIEW_CONTENT', {
    item_ids: [product.slug],
    price: product.price,
    currency: 'MAD',
    event_id: eventId,
  });
}
```

### AddToCart
```typescript
export function trackAddToCart(items: CartItem[], total: number, eventId: string) {
  const contentIds = items.map(i => i.slug);
  
  fbq('track', 'AddToCart', {
    content_ids: contentIds,
    content_type: 'product',
    value: total,
    currency: 'MAD',
  }, { eventID: eventId });
  
  ttq.track('AddToCart', {
    content_id: contentIds[0],
    value: total,
    currency: 'MAD',
  }, { event_id: eventId });
  
  snaptr('track', 'ADD_CART', {
    item_ids: contentIds,
    price: total,
    currency: 'MAD',
    event_id: eventId,
  });
}
```

### InitiateCheckout
```typescript
export function trackInitiateCheckout(total: number, eventId: string) {
  fbq('track', 'InitiateCheckout', {
    value: total,
    currency: 'MAD',
    num_items: cartItemCount,
  }, { eventID: eventId });
  
  ttq.track('InitiateCheckout', {
    value: total,
    currency: 'MAD',
  }, { event_id: eventId });
  
  snaptr('track', 'START_CHECKOUT', {
    price: total,
    currency: 'MAD',
    event_id: eventId,
  });
}
```

---

## Server-Side Event Implementations

### POST /tracking/event

**Request Schema:**
```json
{
  "event_name": "Purchase",
  "event_id": "uuid-v4",
  "event_time": 1716000000,
  "user_data": {
    "phone": "0612345678",
    "client_ip_address": "1.2.3.4",
    "client_user_agent": "Mozilla/..."
  },
  "custom_data": {
    "value": 229.0,
    "currency": "MAD",
    "order_id": "ORD-001",
    "content_ids": ["nura-balance"]
  },
  "channels": ["meta", "tiktok"]
}
```

### PII Hashing (Server-Side)
```python
import hashlib

def hash_pii(value: str) -> str:
    """SHA-256 hash of normalized PII for CAPI compliance."""
    normalized = value.strip().lower()
    return hashlib.sha256(normalized.encode()).hexdigest()

# Phone: normalize to international format before hashing
def normalize_phone(phone: str) -> str:
    # 0612345678 → +212612345678
    if phone.startswith('0'):
        return '+212' + phone[1:]
    return phone
```

### Meta CAPI Payload
```python
{
    "data": [{
        "event_name": event_name,
        "event_time": event_time,
        "event_id": event_id,
        "action_source": "website",
        "user_data": {
            "ph": [hash_pii(normalize_phone(phone))],
            "client_ip_address": client_ip,
            "client_user_agent": user_agent,
            "country": ["ma"],
        },
        "custom_data": {
            "value": value,
            "currency": "MAD",
            "content_ids": content_ids,
            "content_type": "product",
        }
    }],
    "access_token": META_ACCESS_TOKEN,
    "test_event_code": TEST_EVENT_CODE  # Only in staging
}
```

### TikTok Events API Payload
```python
{
    "pixel_code": TIKTOK_PIXEL_ID,
    "event": event_name,
    "event_id": event_id,
    "timestamp": iso_timestamp,
    "context": {
        "user": {
            "phone_number": hash_pii(normalize_phone(phone)),
            "ip": client_ip,
            "user_agent": user_agent,
        },
        "page": {
            "url": page_url,
        }
    },
    "properties": {
        "value": value,
        "currency": "MAD",
        "content_id": content_ids[0],
        "content_type": "product",
    }
}
```

---

## Consent Framework

- No cookie banner required for COD-only (no user accounts, minimal PII)
- However, pixel loading is deferred until after first interaction (performance + soft consent signal)
- Tracking scripts added with `strategy="afterInteractive"` in Next.js Script component
- PII never stored in cookies — only server-side in hashed form

---

## Testing & Validation

### Meta
- Use Facebook Test Events tool during development
- Set `test_event_code` in backend `.env`
- Verify deduplication in Events Manager

### TikTok
- Use TikTok Events Manager "Test Events" feature
- Check event_id appears correctly

### Snapchat
- Use Snap Pixel Helper browser extension

---

## Event ID Generation
```typescript
// Shared utility
export function generateEventId(): string {
  return crypto.randomUUID();
}
```

Store `event_id` per user session (sessionStorage) for page-level deduplication.
