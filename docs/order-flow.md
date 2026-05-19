# Nura Skin — Order Flow

## Complete Order Lifecycle

```
1. Customer browses → 2. Adds to cart → 3. Opens checkout popup
→ 4. Submits order → 5. Upsell shown → 6. Thank-you page
→ 7. Ops confirms → 8. Ships → 9. Delivered/Refused
```

---

## Step-by-Step Technical Flow

### 1. Add to Cart
- Client: Zustand cart store updated
- Client: Cart drawer opens
- Client: `AddToCart` event fired (client pixel)
- Server: No API call (cart is client-only until checkout)

### 2. Checkout Popup Opens
- Client: Popup appears with order summary
- Client: `InitiateCheckout` event fired

### 3. Form Validation
- Name: required, min 2 chars
- Phone: Morocco validation
  - Must start with 06 or 07
  - Exactly 10 digits
  - Regex: `/^0[67]\d{8}$/`
- Real-time validation with Darija error messages

### 4. Order Creation (POST /orders)
```json
Request:
{
  "customer_name": "Yasmine El Fassi",
  "customer_phone": "0612345678",
  "items": [
    {"product_slug": "nura-balance", "quantity": 1},
    {"product_slug": "nura-night-renewal", "quantity": 1}
  ],
  "total": 418,
  "shipping_cost": 0,
  "source_url": "https://nuraskin.cc/products/nura-balance",
  "event_id": "uuid-for-deduplication"
}

Response:
{
  "order_id": "ORD-2024-0001",
  "status": "pending",
  "upsell_eligible": true,
  "upsell_product": {
    "slug": "nura-eye-revive",
    "name_ar": "سيروم نيورا آي ريفايف",
    "price": 249,
    "discounted_price": 199,
    "discount_percent": 20
  }
}
```

### 5. Server Actions on Order Creation
- PostgreSQL: Order record created (status: `pending`)
- Google Sheets: Row appended to Orders sheet
- Server-side tracking: `Purchase`/`CODOrderCreated` event fired to Meta CAPI + TikTok Events API
- Client: Redirect to `/checkout/upsell?order_id=ORD-2024-0001`

### 6. Upsell Page
- Shows the best routine-completion upsell with no countdown or fake urgency
- Customer can accept or dismiss

### 7. Upsell Accepted (POST /orders/{id}/upsell)
```json
Request:
{
  "upsell_product_slug": "nura-eye-revive",
  "upsell_price": 199
}

Response:
{
  "order_id": "ORD-2024-0001",
  "new_total": 567,
  "status": "pending"
}
```
- DB: Order updated with upsell item
- Google Sheets: Row updated
- Tracking: `UpsellAccepted` event

### 8. Thank-You Page
- Shows order ID, items, total, delivery timeline
- `ThankYouViewed` client event
- Reduces cancellation anxiety

---

## Database Schema

### orders table
```sql
CREATE TABLE orders (
    id              SERIAL PRIMARY KEY,
    order_number    VARCHAR(20) UNIQUE NOT NULL,  -- ORD-2024-0001
    status          VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, shipped, delivered, cancelled
    customer_name   VARCHAR(100) NOT NULL,
    customer_phone  VARCHAR(15) NOT NULL,
    total           NUMERIC(10,2) NOT NULL,
    shipping_cost   NUMERIC(10,2) DEFAULT 30,
    source_url      TEXT,
    notes           TEXT,
    event_id        VARCHAR(36),  -- for tracking dedup
    upsell_accepted BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE order_items (
    id              SERIAL PRIMARY KEY,
    order_id        INTEGER REFERENCES orders(id),
    product_slug    VARCHAR(50) NOT NULL,
    product_name    VARCHAR(100) NOT NULL,
    quantity        INTEGER NOT NULL DEFAULT 1,
    unit_price      NUMERIC(10,2) NOT NULL,
    is_upsell       BOOLEAN DEFAULT FALSE
);
```

### products table
```sql
CREATE TABLE products (
    id              SERIAL PRIMARY KEY,
    slug            VARCHAR(50) UNIQUE NOT NULL,
    name_ar         VARCHAR(100) NOT NULL,
    name_en         VARCHAR(100),
    description_ar  TEXT,
    price           NUMERIC(10,2) NOT NULL,
    stock           INTEGER DEFAULT 999,
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Order Number Generation

```python
def generate_order_number(db_session) -> str:
    from datetime import date
    today = date.today()
    prefix = f"ORD-{today.strftime('%Y%m%d')}"

    # Count orders today
    count = db_session.query(Order).filter(
        Order.order_number.like(f"{prefix}%")
    ).count()

    return f"{prefix}-{str(count + 1).zfill(3)}"
```

---

## Google Sheets Integration

### Orders Sheet Columns
```
A: Order Number
B: Date
C: Customer Name
D: Phone
E: Products
F: Total (MAD)
G: Shipping
H: Status
I: Source URL
J: Upsell Accepted
K: Notes
```

### Append on Order Creation
```python
service.spreadsheets().values().append(
    spreadsheetId=GOOGLE_SHEET_ID,
    range='Orders!A:K',
    valueInputOption='RAW',
    insertDataOption='INSERT_ROWS',
    body={'values': [[
        order.order_number,
        order.created_at.isoformat(),
        order.customer_name,
        order.customer_phone,
        ', '.join([item.product_name for item in order.items]),
        str(order.total),
        str(order.shipping_cost),
        order.status,
        order.source_url or '',
        str(order.upsell_accepted),
        order.notes or '',
    ]]}
).execute()
```

---

## Error Handling

| Error | Response | UI Action |
|---|---|---|
| Invalid phone | 422 Unprocessable | Inline error in Darija |
| DB connection fail | 503 Service Unavailable | Retry CTA + WhatsApp fallback |
| Duplicate order (same phone within 1 hour) | 409 Conflict | "طلبك موجود بالفعل — تحققي من هاتفك" |
| Google Sheets fail | Log only | Order still created, ops notified |
| Upsell on expired order | 404 | Redirect to thank-you directly |
