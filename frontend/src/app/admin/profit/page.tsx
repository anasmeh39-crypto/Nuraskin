"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// ─── Constants ────────────────────────────────────────────────────────────────

const PLATFORM_FEE = 65;

const PRODUCTS = [
  { key: "niacinamide", label: "Niacinamide",          cost: 52 },
  { key: "retinol",     label: "Retinol",               cost: 37 },
  { key: "spf50",       label: "Crème Solaire SPF 50",  cost: 66 },
  { key: "serum",       label: "Sérum Anti-Cernes",     cost: 44 },
] as const;

type ProductKey = (typeof PRODUCTS)[number]["key"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number, decimals = 0) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

function fmtMAD(n: number, showSign = false) {
  const sign = showSign && n > 0 ? "+" : "";
  return `${sign}${fmt(Math.abs(n))} DH`;
}

function numInput(val: string): number {
  const n = parseFloat(val.replace(/,/g, ""));
  return isNaN(n) || n < 0 ? 0 : n;
}

// ─── Component ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "nura_admin_key";

export default function ProfitPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      router.replace("/admin");
    } else {
      setReady(true);
    }
  }, [router]);

  // ── Inputs ────────────────────────────────────────────────────────────────
  const [deliveredRevenue, setDeliveredRevenue] = useState("");
  const [adSpend, setAdSpend]                   = useState("");
  const [deliveredOrders, setDeliveredOrders]   = useState("");
  const [qty, setQty] = useState<Record<ProductKey, string>>({
    niacinamide: "",
    retinol:     "",
    spf50:       "",
    serum:       "",
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

  // ── Calculations (unchanged) ──────────────────────────────────────────────
  const revenue     = numInput(deliveredRevenue);
  const spend       = numInput(adSpend);
  const orders      = numInput(deliveredOrders);

  const productCost   = PRODUCTS.reduce((sum, p) => sum + numInput(qty[p.key]) * p.cost, 0);
  const platformFees  = orders * PLATFORM_FEE;
  const totalExpenses = productCost + platformFees + spend;
  const netProfit     = revenue - totalExpenses;
  const profitMargin  = revenue > 0 ? (netProfit / revenue) * 100 : 0;
  const roas          = spend > 0 ? revenue / spend : 0;
  const costPerDelivered = orders > 0 ? spend / orders : 0;

  const hasData      = revenue > 0 || spend > 0 || orders > 0;
  const isPositive   = hasData && netProfit >= 0;
  const isNegative   = hasData && netProfit < 0;

  if (!ready) return null;

  // ── Profit hero colours ───────────────────────────────────────────────────
  const heroBg     = isPositive ? "#f0fdf4" : isNegative ? "#fef2f2" : "#ffffff";
  const heroBorder = isPositive ? "#bbf7d0" : isNegative ? "#fecaca" : "#EBE0E4";
  const heroColor  = isPositive ? "#15803d" : isNegative ? "#dc2626" : "#C9A4AE";

  return (
    <>
      {/* Responsive helpers injected once */}
      <style>{`
        .profit-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .profit-summary-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        @media (max-width: 720px) {
          .profit-main-grid   { grid-template-columns: 1fr; }
          .profit-summary-grid { grid-template-columns: repeat(2, 1fr); }
        }
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        input:focus { border-color: #C9A4AE !important; box-shadow: 0 0 0 3px rgba(201,164,174,0.15); }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f8f9fa", fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* ── Header ── */}
        <div style={{
          background: "#3D2C32", color: "#FFF9F6",
          padding: "16px 28px", display: "flex",
          alignItems: "center", justifyContent: "space-between", gap: "16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <h1
              onClick={() => router.push("/admin")}
              style={{ fontSize: "17px", fontWeight: 600, margin: 0, cursor: "pointer", letterSpacing: "0.01em" }}
            >
              Nura Skin — Admin
            </h1>
            <NavBtn active={false} onClick={() => router.push("/admin")}>Dashboard</NavBtn>
            <NavBtn active>Profit Calculator</NavBtn>
          </div>
          <button onClick={handleLogout} style={btn.logout}>Sign out</button>
        </div>

        <div style={{ padding: "28px 28px 64px", maxWidth: "1060px", margin: "0 auto" }}>

          {/* ── Net Profit Hero ── */}
          <div style={{
            background: heroBg, border: `1.5px solid ${heroBorder}`,
            borderRadius: "14px", padding: "28px 32px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "16px",
            boxShadow: "0 2px 8px rgba(61,44,50,0.06)",
            marginBottom: "16px",
          }}>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "#8D7D82", marginBottom: "8px" }}>
                Net Profit
              </div>
              <div style={{ fontSize: "44px", fontWeight: 800, color: heroColor, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
                {hasData ? `${netProfit >= 0 ? "+" : "−"}${fmt(Math.abs(netProfit))} DH` : "—"}
              </div>
              <div style={{ fontSize: "12px", color: "#8D7D82", marginTop: "8px" }}>
                {hasData
                  ? isPositive
                    ? `Profit margin ${fmt(profitMargin, 1)}% · After ads, products & platform fees`
                    : `Loss of ${fmt(Math.abs(netProfit))} DH — check your costs`
                  : "Enter your numbers on the left to see results"}
              </div>
            </div>
            {hasData && (
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <PillStat label="Margin" value={`${fmt(profitMargin, 1)}%`} positive={isPositive} />
                <PillStat label="ROAS"   value={spend > 0 ? `${fmt(roas, 2)}x` : "—"} />
              </div>
            )}
          </div>

          {/* ── Summary Row ── */}
          <div className="profit-summary-grid" style={{ marginBottom: "28px" }}>
            <SummaryCard label="Delivered Revenue" value={hasData ? fmtMAD(revenue) : "—"} sub="Cash collected" />
            <SummaryCard label="Total Expenses"    value={hasData ? fmtMAD(totalExpenses) : "—"} sub="Ads + products + platform" />
            <SummaryCard label="ROAS"              value={spend > 0 ? `${fmt(roas, 2)}x` : "—"} sub="Revenue / Ad spend" />
            <SummaryCard label="Cost / Delivered"  value={orders > 0 && spend > 0 ? fmtMAD(costPerDelivered) : "—"} sub="Ad spend / orders" />
          </div>

          {/* ── Main two-column area ── */}
          <div className="profit-main-grid">

            {/* LEFT — Inputs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* Manual inputs */}
              <Section title="Manual Inputs">
                <InputRow
                  label="Delivered Revenue"
                  hint="Use delivered revenue only — not total orders"
                  value={deliveredRevenue}
                  onChange={setDeliveredRevenue}
                  unit="DH"
                />
                <InputRow
                  label="Ad Spend"
                  hint="Total paid to Meta, TikTok, etc."
                  value={adSpend}
                  onChange={setAdSpend}
                  unit="DH"
                />
                <InputRow
                  label="Delivered Orders"
                  hint={`Platform fee: ${PLATFORM_FEE} DH per delivered order`}
                  value={deliveredOrders}
                  onChange={setDeliveredOrders}
                  last
                />
              </Section>

              {/* Product quantities */}
              <Section title="Product Quantities">
                <div style={{ fontSize: "12px", color: "#8D7D82", marginBottom: "16px" }}>
                  Enter units sold for each product to calculate product cost.
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {PRODUCTS.map((p) => (
                    <ProductInput
                      key={p.key}
                      label={p.label}
                      cost={p.cost}
                      value={qty[p.key]}
                      onChange={(v) => handleQty(p.key, v)}
                      subtotal={numInput(qty[p.key]) * p.cost}
                    />
                  ))}
                </div>
              </Section>

            </div>

            {/* RIGHT — P&L breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              <Section title="P&L Breakdown">
                <div style={{ fontSize: "12px", color: "#8D7D82", marginBottom: "16px" }}>
                  Profit is calculated after ads, product cost, and platform fees.
                </div>

                {/* Revenue line */}
                <PLLine label="Delivered Revenue" value={revenue} type="income" />

                {/* Expense lines */}
                <div style={{ margin: "4px 0", borderTop: "1px dashed #EBE0E4", paddingTop: "12px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#8D7D82", marginBottom: "10px" }}>
                    Expenses
                  </div>
                  <PLLine label="Ad Spend"      value={spend}        type="expense" />
                  <PLLine label="Product Cost"  value={productCost}  type="expense" />
                  <PLLine
                    label={`Platform Fees (${fmt(orders)} × ${PLATFORM_FEE} DH)`}
                    value={platformFees}
                    type="expense"
                  />
                </div>

                {/* Total expenses */}
                <div style={{ borderTop: "1.5px solid #EBE0E4", marginTop: "8px", paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#6B4E56" }}>Total Expenses</span>
                  <span style={{ fontSize: "15px", fontWeight: 700, color: "#3D2C32", fontVariantNumeric: "tabular-nums" }}>
                    {fmtMAD(totalExpenses)}
                  </span>
                </div>

                {/* Net profit result line */}
                <div style={{
                  marginTop: "12px", padding: "14px 16px",
                  background: heroBg, border: `1px solid ${heroBorder}`,
                  borderRadius: "9px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: heroColor }}>Net Profit</span>
                  <span style={{ fontSize: "20px", fontWeight: 800, color: heroColor, fontVariantNumeric: "tabular-nums" }}>
                    {hasData ? `${netProfit >= 0 ? "+" : "−"}${fmt(Math.abs(netProfit))} DH` : "—"}
                  </span>
                </div>
              </Section>

              {/* Profit analysis */}
              <Section title="Profit Analysis">
                <AnalysisRow
                  label="Profit Margin"
                  value={hasData && revenue > 0 ? `${fmt(profitMargin, 1)}%` : "—"}
                  sub="Net profit / Revenue"
                  highlight={hasData && revenue > 0}
                  good={profitMargin >= 0}
                />
                <AnalysisRow
                  label="ROAS"
                  value={spend > 0 ? `${fmt(roas, 2)}x` : "—"}
                  sub="Revenue / Ad Spend"
                />
                <AnalysisRow
                  label="Cost per Delivered Order"
                  value={orders > 0 && spend > 0 ? fmtMAD(costPerDelivered) : "—"}
                  sub="Ad Spend / Delivered Orders"
                  last
                />
              </Section>

              <button onClick={handleReset} style={btn.reset}>
                Reset all
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Small reusable pieces ────────────────────────────────────────────────────

function NavBtn({ active, onClick, children }: { active: boolean; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: "13px",
        fontWeight: active ? 600 : 400,
        color: active ? "#FFF9F6" : "rgba(255,249,246,0.55)",
        background: active ? "rgba(255,255,255,0.14)" : "transparent",
        border: `1px solid ${active ? "rgba(255,255,255,0.22)" : "transparent"}`,
        borderRadius: "6px",
        padding: "6px 14px",
        cursor: active ? "default" : "pointer",
      }}
    >
      {children}
    </button>
  );
}

function SummaryCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div style={{
      background: "#fff", borderRadius: "10px", padding: "16px 18px",
      border: "1px solid #EBE0E4", boxShadow: "0 1px 3px rgba(61,44,50,0.04)",
    }}>
      <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#8D7D82", marginBottom: "6px" }}>
        {label}
      </div>
      <div style={{ fontSize: "20px", fontWeight: 700, color: "#3D2C32", fontVariantNumeric: "tabular-nums", lineHeight: 1.2 }}>
        {value}
      </div>
      <div style={{ fontSize: "11px", color: "#B88996", marginTop: "4px" }}>{sub}</div>
    </div>
  );
}

function PillStat({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.8)",
      borderRadius: "8px", padding: "10px 16px", textAlign: "center" as const,
      minWidth: "80px",
    }}>
      <div style={{ fontSize: "11px", color: "#8D7D82", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "3px" }}>
        {label}
      </div>
      <div style={{ fontSize: "16px", fontWeight: 700, color: positive === false ? "#dc2626" : "#3D2C32" }}>
        {value}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "#fff", borderRadius: "12px", border: "1px solid #EBE0E4",
      boxShadow: "0 1px 4px rgba(61,44,50,0.05)", overflow: "hidden",
    }}>
      <div style={{
        padding: "14px 20px", borderBottom: "1px solid #f3ede8",
        fontSize: "11px", fontWeight: 700, textTransform: "uppercase",
        letterSpacing: "0.08em", color: "#8E5A68",
      }}>
        {title}
      </div>
      <div style={{ padding: "18px 20px" }}>{children}</div>
    </div>
  );
}

function InputRow({
  label, hint, value, onChange, unit, last,
}: {
  label: string; hint: string; value: string;
  onChange: (v: string) => void; unit?: string; last?: boolean;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", justifyContent: "space-between",
      gap: "12px", paddingBottom: last ? "0" : "14px",
      borderBottom: last ? "none" : "1px solid #f3ede8", marginBottom: last ? "0" : "14px",
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "#3D2C32", marginBottom: "3px" }}>{label}</div>
        <div style={{ fontSize: "11px", color: "#B88996" }}>{hint}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "5px", flexShrink: 0 }}>
        <input
          type="number"
          min="0"
          placeholder="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "110px", padding: "8px 10px",
            border: "1px solid #EBE0E4", borderRadius: "7px",
            fontSize: "14px", textAlign: "right" as const,
            color: "#3D2C32", outline: "none",
            fontVariantNumeric: "tabular-nums", background: "#FAFAFA",
            transition: "border-color 0.15s, box-shadow 0.15s",
          }}
        />
        {unit && <span style={{ fontSize: "12px", color: "#8D7D82", width: "20px" }}>{unit}</span>}
      </div>
    </div>
  );
}

function ProductInput({
  label, cost, value, onChange, subtotal,
}: {
  label: string; cost: number; value: string;
  onChange: (v: string) => void; subtotal: number;
}) {
  const hasQty = numInput(value) > 0;
  return (
    <div style={{
      border: "1px solid #EBE0E4", borderRadius: "9px", padding: "12px 14px",
      background: hasQty ? "#FDFBF9" : "#FAFAFA",
      transition: "background 0.15s",
    }}>
      <div style={{ fontSize: "12px", fontWeight: 600, color: "#6B4E56", marginBottom: "2px" }}>{label}</div>
      <div style={{ fontSize: "11px", color: "#B88996", marginBottom: "10px" }}>{cost} DH / unit</div>
      <input
        type="number"
        min="0"
        placeholder="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%", padding: "7px 10px",
          border: "1px solid #EBE0E4", borderRadius: "6px",
          fontSize: "14px", textAlign: "right" as const,
          color: "#3D2C32", outline: "none",
          fontVariantNumeric: "tabular-nums", background: "#fff",
          boxSizing: "border-box" as const,
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}
      />
      {hasQty && (
        <div style={{ fontSize: "11px", color: "#8E5A68", fontWeight: 600, marginTop: "6px", textAlign: "right" as const }}>
          = {fmt(subtotal)} DH
        </div>
      )}
    </div>
  );
}

function PLLine({ label, value, type }: { label: string; value: number; type: "income" | "expense" }) {
  const isIncome  = type === "income";
  const color     = isIncome ? "#15803d" : value > 0 ? "#3D2C32" : "#8D7D82";
  const prefix    = isIncome ? "+" : value > 0 ? "−" : "";
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "6px 0", borderBottom: "1px solid #faf5f6",
    }}>
      <span style={{ fontSize: "13px", color: "#6B4E56" }}>{label}</span>
      <span style={{ fontSize: "13px", fontWeight: 600, color, fontVariantNumeric: "tabular-nums" }}>
        {prefix}{fmt(value)} DH
      </span>
    </div>
  );
}

function AnalysisRow({
  label, value, sub, highlight, good, last,
}: {
  label: string; value: string; sub: string;
  highlight?: boolean; good?: boolean; last?: boolean;
}) {
  const valueColor = highlight ? (good ? "#15803d" : "#dc2626") : "#3D2C32";
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "flex-start",
      padding: "11px 0", borderBottom: last ? "none" : "1px solid #f3ede8",
    }}>
      <div>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "#3D2C32" }}>{label}</div>
        <div style={{ fontSize: "11px", color: "#B88996", marginTop: "2px" }}>{sub}</div>
      </div>
      <div style={{ fontSize: "18px", fontWeight: 700, color: valueColor, fontVariantNumeric: "tabular-nums" }}>
        {value}
      </div>
    </div>
  );
}

const btn = {
  logout: {
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#FFF9F6", borderRadius: "6px",
    padding: "6px 14px", fontSize: "13px", cursor: "pointer",
  } as React.CSSProperties,

  reset: {
    background: "transparent", border: "1px solid #EBE0E4",
    color: "#8D7D82", borderRadius: "7px",
    padding: "9px 20px", fontSize: "13px", cursor: "pointer",
    alignSelf: "flex-start",
  } as React.CSSProperties,
};
