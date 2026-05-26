"""Tests for Google Sheets webhook payload mapping."""

from app.models.order import Order, OrderItem
from app.services.sheets_service import build_sheets_webhook_payload


def test_single_product_payload():
    order = Order(
        order_number="NS-20260525-001",
        customer_name="فاطمة",
        customer_phone="0612345678",
        customer_city="Casablanca",
        total=249.0,
        shipping_cost=0.0,
    )
    order.items = [
        OrderItem(
            product_slug="nura-balance",
            product_name="سيروم توازن وإشراقة البشرة بالنياسيناميد",
            quantity=1,
            unit_price=249.0,
        )
    ]

    payload = build_sheets_webhook_payload(order)

    assert payload["orderId"] == "NS-20260525-001"
    assert payload["city"] == "Casablanca"
    assert payload["name"] == "فاطمة"
    assert payload["phone"] == "0612345678"
    assert payload["product"] == "سيروم توازن وإشراقة البشرة بالنياسيناميد"
    assert payload["sku"] == "nura-balance"
    assert payload["totalQty"] == 1
    assert payload["pack"] == ""
    assert payload["totalPrice"] == 249.0
    assert payload["status"] == "New"


def test_bundle_payload():
    order = Order(
        order_number="NS-20260525-002",
        customer_name="مريم",
        customer_phone="0712345678",
        customer_city="Rabat",
        total=599.0,
        shipping_cost=0.0,
    )
    order.items = [
        OrderItem(
            product_slug="nura-balance",
            product_name="سيروم توازن",
            quantity=1,
            unit_price=200.0,
            bundle_name="روتين الصباح",
        ),
        OrderItem(
            product_slug="nura-eye-revive",
            product_name="سيروم العين",
            quantity=1,
            unit_price=200.0,
            bundle_name="روتين الصباح",
        ),
        OrderItem(
            product_slug="nura-spf-50",
            product_name="واقي الشمس",
            quantity=1,
            unit_price=199.0,
            bundle_name="روتين الصباح",
        ),
    ]

    payload = build_sheets_webhook_payload(order)

    assert payload["totalQty"] == 3
    assert payload["pack"] == "روتين الصباح"
    assert payload["sku"] == "nura-balance, nura-eye-revive, nura-spf-50"
    assert payload["totalPrice"] == 599.0
