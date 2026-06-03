"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// ─── Constants ────────────────────────────────────────────────────────────────

const PLATFORM_FEE = 65;

const PRODUCTS = [
  { key: "niacinamide", label: "Niacinamide", cost: 52 },
  { key: "retinol",     label: "Retinol",     cost: 37 },
  { key: "spf50",       label: "Crème Solaire SPF 50", cost: 66 },
  { key: "serum",       label: "Sérum Anti-Cernes",    cost: 44 },
] as const;

type ProductKey = (typeof PRODUCTS)[number]["key"];

// ─── Styles (same tokens as main admin page) ──────────────────────────────────

const S = {
  page: { minHeight: "100vh", background: "#f8f9fa" } as React.CSSProperties,

  header: {
    background: "#3D2C32",
    color: "#FFF9F6",
    padding: "16px 28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
  } as React.CSSProperties,

  headerLeft: { display: "flex", alignItems: "center", gap: "20px" } as React.CSSProperties,

  headerTitle: {
    fontSize: "17px",
    fontWeight: 600,
    letterSpacing: "0.01em",
    margin: 0,
    cursor: "pointer",
  } as React.CSSProperties,

  navTab: (active: boolean): React.CSSProperties => ({
    fontSize: "13px",
    fontWeight: active ? 600 : 400,
    color: active ? "#FFF9F6" : "rgba(255,249,246,0.55)",
    background: active ? "rgba(255,255,255,0.14)" : "transparent",
    border: "1px solid",
    borderColor: active ? "rgba(255,255,255,0.22)" : "transparent",
    borderRadius: "6px",
    padding: "6px 14px",
    cursor: "pointer",
    transition: "all 0.15s",
  }),

  logoutBtn: {
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#FFF9F6",
    borderRadius: "6px",
    padding: "6px 14px",
    fontSize: "13px",
    cursor: "pointer",
  } as React.CSSProperties,

  body: {
    padding: "28px 28px 64px",
    maxWidth: "820px",
    margin: "0 auto",
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "#8E5A68",
    marginBottom: "14px",
    marginTop: "32px",
  } as React.CSSProperties,

  card: {
    background: "#ffffff",
    borderRadius: "10px",
    padding: "22px 24px",
    border: "1px solid #EBE0E4",
    boxShadow: "0 1px 4px rgba(61,44,50,0.05)",
  } as React.CSSProperties,

  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    padding: "10px 0",
    borderBottom: "1px solid #f3ede8",
  } as React.CSSProperties,

  rowLast: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    padding: "10px 0",
  } as React.CSSProperties,

  label: { fontSize: "13px", color: "#6B4E56", fontWeight: 500 } as React.CSSProperties,
  subLabel: { fontSize: "12px", color: "#8D7D82" } as React.CSSProperties,

  input: {
    width: "130px",
    padding: "7px 10px",
    border: "1px solid #EBE0E4",
    borderRadius: "7px",
    fontSize: "14px",
    textAlign: "right" as const,
    color: "#3D2C32",
    outline: "none",
    fontVariantNumeric: "tabular-nums",
    background: "#fff",
  } as React.CSSProperties,

  resultGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "14px",
  } as React.CSSProperties,

  resultCard: (accent?: boolean): React.CSSProperties => ({
    background: accent ? "#3D2C32" : "#ffffff",
    borderRadius: "10px",
    padding: "18px 20px",
    border: `1px solid ${accent ? "#3D2C32" : "#EBE0E4"}`,
    boxShadow: "0 1px 4px rgba(61,44,50,0.05)",
  }),

  resultLabel: (accent?: boolean): React.CSSProperties => ({
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: accent ? "rgba(255,249,246,0.55)" : "#8D7D82",
    marginBottom: "6px",
  }),

  resultValue: (accent?: boolean, negative?: boolean): React.CSSProperties => ({
    fontSize: "22px",
    fontWeight: 700,
    color: accent ? "#FFF9F6" : negative ? "#e74c3c" : "#3D2C32",
    lineHeight: 1.15,
    fontVariantNumeric: "tabular-nums",
  }),

  resultSub: (accent?: boolean): React.CSSProperties => ({
    fontSize: "11px",
    color: accent ? "rgba(255,249,246,0.45)" : "#8D7D82",
    marginTop: "3px",
  }),

  resetBtn: {
    background: "transparent",
    border: "1px solid #EBE0E4",
    color: "#8D7D82",
    borderRadius: "6px",
    padding: "7px 16px",
    fontSize: "13px",
    cursor: "pointer",
    marginTop: "24px",
  } as React.CSSProperties,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number, decimals = 0) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

function fmtMAD(n: number) {
  return `${fmt(n)} DH`;
}

function numInput(val: string): number {
  const n = parseFloat(val.replace(/,/g, ""));
  return isNaN(n) || n < 0 ? 0 : n;
}

// ─── Component ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "nura_admin_key";

export default function ProfitPage() {
  const router = useRouter();

  // auth check
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      router.replace("/admin");
    } else {
      setReady(true);
    }
  }, [router]);

  // inputs
  const [deliveredRevenue, setDeliveredRevenue] = useState("");
  const [adSpend, setAdSpend] = useState("");
  const [deliveredOrders, setDeliveredOrders] = useState("");
  const [qty, setQty] = useState<Record<ProductKey, string>>({
    niacinamide: "",
    retinol: "",
    spf50: "",
    serum: "",
  });

  function handleQty(key: ProductKey, val: string) {
    setQty((prev) => ({ ...prev, [key]: val }));
  }

  function handleReset() {
    setDeliveredRevenue("");
    setAdSpend("");
    setDeliveredOrders("");
    setQty({ niacinamide: "", retinol: "", spf50: "", serum: "" });
  }

  function handleLogout() {
    localStorage.removeItem(STORAGE_KEY);
    router.push("/admin");
  }

  // ── Calculations ──────────────────────────────────────────────────────────

  const revenue = numInput(deliveredRevenue);
  const spend = numInput(adSpend);
  const orders = numInput(deliveredOrders);

  const productCost = PRODUCTS.reduce(
    (sum, p) => sum + numInput(qty[p.key]) * p.cost,
    0
  );
  const platformFees = orders * PLATFORM_FEE;
  const totalExpenses = productCost + platformFees + spend;
  const netProfit = revenue - totalExpenses;
  const profitMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
  const roas = spend > 0 ? revenue / spend : 0;
  const costPerDelivered = orders > 0 ? spend / orders : 0;

  const hasData = revenue > 0 || spend > 0 || orders > 0;

  if (!ready) return null;

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <div style={S.headerLeft}>
          <h1 style={S.headerTitle} onClick={() => router.push("/admin")}>
            Nura Skin — Admin
          </h1>
          <button style={S.navTab(false)} onClick={() => router.push("/admin")}>
            Dashboard
          </button>
          <button style={S.navTab(true)}>
            Profit Calculator
          </button>
        </div>
        <button onClick={handleLogout} style={S.logoutBtn}>
          Sign out
        </button>
      </div>

      <div style={S.body}>

        {/* ── Inputs ── */}
        <div style={S.sectionTitle}>Inputs</div>
        <div style={S.card}>
          {/* Delivered revenue */}
          <div style={S.row}>
            <div>
              <div style={S.label}>Delivered Revenue</div>
              <div style={S.subLabel}>Cash actually collected — delivered orders only</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={deliveredRevenue}
                onChange={(e) => setDeliveredRevenue(e.target.value)}
                style={S.input}
              />
              <span style={{ fontSize: "12px", color: "#8D7D82" }}>DH</span>
            </div>
          </div>

          {/* Ad spend */}
          <div style={S.row}>
            <div>
              <div style={S.label}>Ad Spend</div>
              <div style={S.subLabel}>Total paid to ads (Meta, TikTok, etc.)</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={adSpend}
                onChange={(e) => setAdSpend(e.target.value)}
                style={S.input}
              />
              <span style={{ fontSize: "12px", color: "#8D7D82" }}>DH</span>
            </div>
          </div>

          {/* Delivered orders */}
          <div style={S.rowLast}>
            <div>
              <div style={S.label}>Delivered Orders</div>
              <div style={S.subLabel}>Number of orders physically received by customers</div>
            </div>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={deliveredOrders}
              onChange={(e) => setDeliveredOrders(e.target.value)}
              style={S.input}
            />
          </div>
        </div>

        {/* ── Product quantities ── */}
        <div style={S.sectionTitle}>Product Quantities</div>
        <div style={S.card}>
          {PRODUCTS.map((p, i) => (
            <div key={p.key} style={i < PRODUCTS.length - 1 ? S.row : S.rowLast}>
              <div>
                <div style={S.label}>{p.label}</div>
                <div style={S.subLabel}>Cost: {p.cost} DH / unit</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={qty[p.key]}
                  onChange={(e) => handleQty(p.key, e.target.value)}
                  style={S.input}
                />
                <span style={{ fontSize: "12px", color: "#8D7D82", width: "60px", textAlign: "right" }}>
                  = {fmtMAD(numInput(qty[p.key]) * p.cost)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Cost breakdown ── */}
        <div style={S.sectionTitle}>Cost Breakdown</div>
        <div style={S.card}>
          <div style={S.row}>
            <div style={S.label}>Product Cost</div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#3D2C32" }}>
              {fmtMAD(productCost)}
            </div>
          </div>
          <div style={S.row}>
            <div>
              <div style={S.label}>Platform Fees</div>
              <div style={S.subLabel}>{fmt(orders)} orders × {PLATFORM_FEE} DH</div>
            </div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#3D2C32" }}>
              {fmtMAD(platformFees)}
            </div>
          </div>
          <div style={S.row}>
            <div style={S.label}>Ad Spend</div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#3D2C32" }}>
              {fmtMAD(spend)}
            </div>
          </div>
          <div style={{ ...S.rowLast, paddingTop: "14px" }}>
            <div style={{ ...S.label, fontWeight: 700, color: "#3D2C32" }}>Total Expenses</div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#3D2C32" }}>
              {fmtMAD(totalExpenses)}
            </div>
          </div>
        </div>

        {/* ── Results ── */}
        <div style={S.sectionTitle}>Results</div>
        <div style={S.resultGrid}>
          {/* Net profit — accent */}
          <div style={S.resultCard(true)}>
            <div style={S.resultLabel(true)}>Net Profit</div>
            <div style={{ ...S.resultValue(true, netProfit < 0 && hasData), color: hasData ? (netProfit >= 0 ? "#4ade80" : "#f87171") : "#FFF9F6" }}>
              {hasData ? fmtMAD(netProfit) : "—"}
            </div>
            <div style={S.resultSub(true)}>Revenue − Expenses</div>
          </div>

          {/* Profit margin */}
          <div style={S.resultCard()}>
            <div style={S.resultLabel()}>Profit Margin</div>
            <div style={{ ...S.resultValue(), color: hasData && revenue > 0 ? (profitMargin >= 0 ? "#3D2C32" : "#e74c3c") : "#3D2C32" }}>
              {hasData && revenue > 0 ? `${fmt(profitMargin, 1)}%` : "—"}
            </div>
            <div style={S.resultSub()}>Net profit / Revenue</div>
          </div>

          {/* ROAS */}
          <div style={S.resultCard()}>
            <div style={S.resultLabel()}>ROAS</div>
            <div style={S.resultValue()}>
              {spend > 0 ? `${fmt(roas, 2)}x` : "—"}
            </div>
            <div style={S.resultSub()}>Revenue / Ad Spend</div>
          </div>

          {/* Total expenses */}
          <div style={S.resultCard()}>
            <div style={S.resultLabel()}>Total Expenses</div>
            <div style={S.resultValue()}>{hasData ? fmtMAD(totalExpenses) : "—"}</div>
            <div style={S.resultSub()}>Products + Platform + Ads</div>
          </div>

          {/* Cost per delivered order */}
          <div style={S.resultCard()}>
            <div style={S.resultLabel()}>Cost / Delivered Order</div>
            <div style={S.resultValue()}>
              {orders > 0 && spend > 0 ? fmtMAD(costPerDelivered) : "—"}
            </div>
            <div style={S.resultSub()}>Ad Spend / Delivered Orders</div>
          </div>

          {/* Platform fees */}
          <div style={S.resultCard()}>
            <div style={S.resultLabel()}>Platform Fees</div>
            <div style={S.resultValue()}>{hasData ? fmtMAD(platformFees) : "—"}</div>
            <div style={S.resultSub()}>{fmt(orders)} orders × {PLATFORM_FEE} DH</div>
          </div>
        </div>

        <button onClick={handleReset} style={S.resetBtn}>
          Reset
        </button>
      </div>
    </div>
  );
}
