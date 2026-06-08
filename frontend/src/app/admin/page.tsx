"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OverviewStats {
  period_days: number;
  total_orders: number;
  confirmed_orders: number;
  shipped_orders: number;
  delivered_orders: number;
  cancelled_orders: number;
  revenue: number;
  collected_cash: number;
  pending_cash: number;
}

interface ProductStat {
  slug: string;
  name: string;
  quantity: number;
  order_count: number;
  revenue: number;
}

interface BundleStat {
  name: string;
  quantity: number;
  order_count: number;
}

interface ProductsStats {
  period_days: number;
  best_selling_products: ProductStat[];
  best_selling_bundles: BundleStat[];
  average_order_value: number;
  order_count: number;
}

interface CodStats {
  period_days: number;
  total_orders: number;
  confirmation_rate: number;
  delivery_rate: number;
  refusal_rate: number;
  confirmed_count: number;
  delivered_count: number;
  cancelled_count: number;
}

interface CampaignStat {
  name: string;
  order_count: number;
  revenue: number;
}

interface SourceStat {
  source: string;
  order_count: number;
  revenue: number;
  campaigns: CampaignStat[];
}

interface MarketingStats {
  period_days: number;
  by_source: SourceStat[];
  ad_spend: number | null;
  cost_per_order: number | null;
  cost_per_delivered_order: number | null;
  roas: number | null;
  note: string;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const S = {
  page: {
    minHeight: "100vh",
    background: "#f8f9fa",
    padding: "0",
  } as React.CSSProperties,

  header: {
    background: "#3D2C32",
    color: "#FFF9F6",
    padding: "16px 28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
  } as React.CSSProperties,

  headerTitle: {
    fontSize: "17px",
    fontWeight: 600,
    letterSpacing: "0.01em",
    margin: 0,
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
  }),

  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  } as React.CSSProperties,

  logoutBtn: {
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#FFF9F6",
    borderRadius: "6px",
    padding: "6px 14px",
    fontSize: "13px",
    cursor: "pointer",
  } as React.CSSProperties,

  periodSelect: {
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#FFF9F6",
    borderRadius: "6px",
    padding: "6px 10px",
    fontSize: "13px",
    cursor: "pointer",
  } as React.CSSProperties,

  body: {
    padding: "24px 28px 48px",
    maxWidth: "1200px",
    margin: "0 auto",
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "#8E5A68",
    marginBottom: "14px",
    marginTop: "36px",
  } as React.CSSProperties,

  grid: (cols: number): React.CSSProperties => ({
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: "14px",
    marginBottom: "8px",
  }),

  card: {
    background: "#ffffff",
    borderRadius: "10px",
    padding: "20px 22px",
    border: "1px solid #EBE0E4",
    boxShadow: "0 1px 4px rgba(61,44,50,0.05)",
  } as React.CSSProperties,

  cardLabel: {
    fontSize: "12px",
    color: "#8D7D82",
    fontWeight: 500,
    marginBottom: "8px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
  } as React.CSSProperties,

  cardValue: {
    fontSize: "26px",
    fontWeight: 700,
    color: "#3D2C32",
    lineHeight: 1.1,
  } as React.CSSProperties,

  cardSub: {
    fontSize: "12px",
    color: "#8D7D82",
    marginTop: "4px",
  } as React.CSSProperties,

  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontSize: "13px",
  } as React.CSSProperties,

  th: {
    padding: "9px 12px",
    textAlign: "left" as const,
    fontWeight: 600,
    fontSize: "11px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
    color: "#8D7D82",
    borderBottom: "1px solid #EBE0E4",
    background: "#FAF7F4",
  } as React.CSSProperties,

  td: {
    padding: "10px 12px",
    borderBottom: "1px solid #f3ede8",
    color: "#3D2C32",
    fontSize: "13px",
  } as React.CSSProperties,

  rateBar: (value: number, color: string): React.CSSProperties => ({
    height: "6px",
    background: "#f0e8eb",
    borderRadius: "3px",
    marginTop: "8px",
    overflow: "hidden",
    position: "relative",
  }),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);
}

function fmtMAD(n: number) {
  return `${fmt(n)} MAD`;
}

// ─── Login ────────────────────────────────────────────────────────────────────

function LoginPage({ onLogin }: { onLogin: (key: string) => void }) {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!key.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/stats/overview?days=1", {
        headers: { "x-admin-key": key.trim() },
      });
      if (res.ok) {
        onLogin(key.trim());
      } else {
        setError("Invalid admin key.");
      }
    } catch {
      setError("Connection error. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8f9fa",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "40px 44px",
          border: "1px solid #EBE0E4",
          boxShadow: "0 4px 20px rgba(61,44,50,0.08)",
          width: "340px",
        }}
      >
        <div style={{ marginBottom: "28px", textAlign: "center" }}>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#3D2C32",
              marginBottom: "6px",
            }}
          >
            Nura Skin
          </div>
          <div style={{ fontSize: "13px", color: "#8D7D82" }}>Admin Dashboard</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 600,
                color: "#6B4E56",
                marginBottom: "6px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Admin Key
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #EBE0E4",
                borderRadius: "7px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
                color: "#3D2C32",
              }}
              placeholder="Enter admin key"
              autoFocus
            />
          </div>
          {error && (
            <div
              style={{
                fontSize: "13px",
                color: "#c0392b",
                marginBottom: "12px",
                padding: "8px 12px",
                background: "#fdf0ef",
                borderRadius: "6px",
              }}
            >
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px",
              background: "#3D2C32",
              color: "#FFF9F6",
              border: "none",
              borderRadius: "7px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Checking..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        ...S.card,
        ...(accent
          ? { background: "#3D2C32", borderColor: "#3D2C32" }
          : {}),
      }}
    >
      <div style={{ ...S.cardLabel, ...(accent ? { color: "rgba(255,249,246,0.6)" } : {}) }}>
        {label}
      </div>
      <div
        style={{
          ...S.cardValue,
          ...(accent ? { color: "#FFF9F6" } : {}),
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ ...S.cardSub, ...(accent ? { color: "rgba(255,249,246,0.55)" } : {}) }}>
          {sub}
        </div>
      )}
    </div>
  );
}

// ─── Rate Card ────────────────────────────────────────────────────────────────

function RateCard({
  label,
  rate,
  count,
  color,
}: {
  label: string;
  rate: number;
  count: number;
  color: string;
}) {
  return (
    <div style={S.card}>
      <div style={S.cardLabel}>{label}</div>
      <div style={{ ...S.cardValue, color }}>{rate}%</div>
      <div style={S.cardSub}>{fmt(count)} orders</div>
      <div style={{ height: "6px", background: "#f0e8eb", borderRadius: "3px", marginTop: "12px", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${Math.min(rate, 100)}%`,
            background: color,
            borderRadius: "3px",
            transition: "width 0.6s ease",
          }}
        />
      </div>
    </div>
  );
}

// ─── Loading / Error States ───────────────────────────────────────────────────

function LoadingSection() {
  return (
    <div style={{ padding: "40px", textAlign: "center", color: "#8D7D82", fontSize: "14px" }}>
      Loading...
    </div>
  );
}

function ErrorSection({ message }: { message: string }) {
  return (
    <div
      style={{
        padding: "20px",
        background: "#fdf0ef",
        borderRadius: "8px",
        color: "#c0392b",
        fontSize: "13px",
      }}
    >
      {message}
    </div>
  );
}

// ─── Settings Panel ───────────────────────────────────────────────────────────

const SETTING_LABELS: Record<string, string> = {
  ENABLE_CAPI: "Enable All CAPI",
  ENABLE_META_CAPI: "Enable Meta CAPI",
  META_PIXEL_ID: "Meta Pixel ID",
  META_ACCESS_TOKEN: "Meta Access Token",
  META_API_VERSION: "Meta API Version",
  ENABLE_TIKTOK_CAPI: "Enable TikTok CAPI",
  TIKTOK_PIXEL_CODE: "TikTok Pixel Code",
  TIKTOK_ACCESS_TOKEN: "TikTok Access Token",
  TIKTOK_API_VERSION: "TikTok API Version",
};

const BOOLEAN_KEYS = new Set(["ENABLE_CAPI", "ENABLE_META_CAPI", "ENABLE_TIKTOK_CAPI"]);
const SECRET_KEYS = new Set(["META_ACCESS_TOKEN", "TIKTOK_ACCESS_TOKEN"]);

function SettingsPanel({ apiKey }: { apiKey: string }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [reveal, setReveal] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const headers = { "x-admin-key": apiKey };

  useEffect(() => {
    setLoading(true);
    fetch("/api/admin/settings", { headers })
      .then((r) => r.json())
      .then((data) => {
        setValues(data);
        setDrafts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSave() {
    setSaving(true);
    setStatus("idle");
    // Only send keys that changed
    const changed: Record<string, string> = {};
    for (const k of Object.keys(drafts)) {
      if (drafts[k] !== values[k]) changed[k] = drafts[k];
    }
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(changed),
      });
      if (res.ok) {
        setValues({ ...values, ...changed });
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  }

  function toggle(key: string) {
    const next = drafts[key] === "true" ? "false" : "true";
    setDrafts((d) => ({ ...d, [key]: next }));
  }

  function field(key: string) {
    const isSecret = SECRET_KEYS.has(key);
    const isRevealed = reveal[key];
    const isMasked = isSecret && drafts[key]?.includes("••");
    return (
      <div key={key} style={{ marginBottom: "18px" }}>
        <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6B4E56", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {SETTING_LABELS[key] || key}
        </label>
        <div style={{ position: "relative" }}>
          <input
            type={isSecret && !isRevealed ? "password" : "text"}
            value={isMasked ? "" : drafts[key] || ""}
            placeholder={isMasked ? "Leave blank to keep current token" : ""}
            onChange={(e) => setDrafts((d) => ({ ...d, [key]: e.target.value }))}
            style={{
              width: "100%",
              padding: isSecret ? "10px 44px 10px 12px" : "10px 12px",
              border: "1px solid #EBE0E4",
              borderRadius: "7px",
              fontSize: "13px",
              color: "#3D2C32",
              boxSizing: "border-box",
              background: "#fff",
              outline: "none",
              fontFamily: isSecret && !isRevealed ? "monospace" : "inherit",
            }}
          />
          {isSecret && (
            <button
              type="button"
              onClick={() => setReveal((r) => ({ ...r, [key]: !r[key] }))}
              style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#8D7D82", fontSize: "12px" }}
            >
              {isRevealed ? "Hide" : "Show"}
            </button>
          )}
        </div>
      </div>
    );
  }

  function toggleSwitch(key: string) {
    const on = drafts[key] === "true";
    return (
      <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#3D2C32" }}>{SETTING_LABELS[key] || key}</span>
        <button
          type="button"
          onClick={() => toggle(key)}
          style={{
            width: "44px", height: "24px",
            background: on ? "#3D2C32" : "#d0c4c8",
            borderRadius: "12px", border: "none", cursor: "pointer",
            position: "relative", transition: "background 0.2s",
          }}
        >
          <span style={{
            position: "absolute", top: "3px",
            left: on ? "23px" : "3px",
            width: "18px", height: "18px",
            background: "#fff", borderRadius: "50%",
            transition: "left 0.2s",
          }} />
        </button>
      </div>
    );
  }

  if (loading) return <LoadingSection />;

  return (
    <div style={{ maxWidth: "640px" }}>
      {/* Global */}
      <div style={S.sectionTitle}>Global</div>
      <div style={S.card}>
        {toggleSwitch("ENABLE_CAPI")}
      </div>

      {/* Meta */}
      <div style={S.sectionTitle}>Meta (Facebook) CAPI</div>
      <div style={S.card}>
        {toggleSwitch("ENABLE_META_CAPI")}
        {field("META_PIXEL_ID")}
        {field("META_ACCESS_TOKEN")}
        {field("META_API_VERSION")}
      </div>

      {/* TikTok */}
      <div style={S.sectionTitle}>TikTok Events API</div>
      <div style={S.card}>
        {toggleSwitch("ENABLE_TIKTOK_CAPI")}
        {field("TIKTOK_PIXEL_CODE")}
        {field("TIKTOK_ACCESS_TOKEN")}
        {field("TIKTOK_API_VERSION")}
      </div>

      {/* Save */}
      <div style={{ marginTop: "28px", display: "flex", alignItems: "center", gap: "14px" }}>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            padding: "11px 28px",
            background: "#3D2C32",
            color: "#FFF9F6",
            border: "none",
            borderRadius: "7px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: saving ? "not-allowed" : "pointer",
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? "Saving…" : "Save"}
        </button>
        {status === "saved" && (
          <span style={{ color: "#2ecc71", fontSize: "13px", fontWeight: 500 }}>Saved successfully</span>
        )}
        {status === "error" && (
          <span style={{ color: "#c0392b", fontSize: "13px" }}>Save failed — check your admin key</span>
        )}
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ apiKey, onLogout }: { apiKey: string; onLogout: () => void }) {
  const router = useRouter();
  const [activeView, setActiveView] = useState<"dashboard" | "settings">("dashboard");
  const [days, setDays] = useState(30);
  const [overview, setOverview] = useState<OverviewStats | null>(null);
  const [products, setProducts] = useState<ProductsStats | null>(null);
  const [cod, setCod] = useState<CodStats | null>(null);
  const [marketing, setMarketing] = useState<MarketingStats | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const headers = { "x-admin-key": apiKey };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setErrors({});

    const endpoints = [
      { key: "overview", url: `/api/admin/stats/overview?days=${days}`, setter: setOverview },
      { key: "products", url: `/api/admin/stats/products?days=${days}`, setter: setProducts },
      { key: "cod", url: `/api/admin/stats/cod?days=${days}`, setter: setCod },
      { key: "marketing", url: `/api/admin/stats/marketing?days=${days}`, setter: setMarketing },
    ] as const;

    await Promise.all(
      endpoints.map(async ({ key, url, setter }) => {
        try {
          const res = await fetch(url, { headers });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          (setter as (v: unknown) => void)(data);
        } catch (e) {
          setErrors((prev) => ({ ...prev, [key]: String(e) }));
        }
      })
    );

    setLoading(false);
  }, [days, apiKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const periodLabel = `Last ${days} days`;

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <h1 style={S.headerTitle}>Nura Skin — Admin</h1>
          <button style={S.navTab(activeView === "dashboard")} onClick={() => setActiveView("dashboard")}>Dashboard</button>
          <button style={S.navTab(false)} onClick={() => router.push("/admin/profit")}>Profit Calculator</button>
          <button style={S.navTab(activeView === "settings")} onClick={() => setActiveView("settings")}>Settings</button>
        </div>
        <div style={S.headerRight}>
          {activeView === "dashboard" && (
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              style={S.periodSelect}
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
              <option value={365}>Last 365 days</option>
            </select>
          )}
          <button onClick={onLogout} style={S.logoutBtn}>
            Sign out
          </button>
        </div>
      </div>

      <div style={S.body}>
        {/* ── Settings View ── */}
        {activeView === "settings" && <SettingsPanel apiKey={apiKey} />}

        {/* ── Stats Views ── */}
        {activeView !== "settings" && <>
        {/* ── Overview ── */}
        <div style={S.sectionTitle}>Overview — {periodLabel}</div>
        {loading && !overview ? (
          <LoadingSection />
        ) : errors.overview ? (
          <ErrorSection message={errors.overview} />
        ) : overview ? (
          <>
            <div style={S.grid(4)}>
              <StatCard label="Total Orders" value={fmt(overview.total_orders)} />
              <StatCard label="Confirmed" value={fmt(overview.confirmed_orders)} />
              <StatCard label="Delivered" value={fmt(overview.delivered_orders)} />
              <StatCard label="Cancelled" value={fmt(overview.cancelled_orders)} />
            </div>
            <div style={{ ...S.grid(3), marginTop: "14px" }}>
              <StatCard
                label="Revenue"
                value={fmtMAD(overview.revenue)}
                sub="All non-cancelled orders"
                accent
              />
              <StatCard
                label="Collected Cash"
                value={fmtMAD(overview.collected_cash)}
                sub="Delivered orders only"
              />
              <StatCard
                label="Pending Cash"
                value={fmtMAD(overview.pending_cash)}
                sub="Pending + confirmed + shipped"
              />
            </div>
          </>
        ) : null}

        {/* ── COD Health ── */}
        <div style={S.sectionTitle}>COD Health — {periodLabel}</div>
        {loading && !cod ? (
          <LoadingSection />
        ) : errors.cod ? (
          <ErrorSection message={errors.cod} />
        ) : cod ? (
          <div style={S.grid(3)}>
            <RateCard
              label="Confirmation Rate"
              rate={cod.confirmation_rate}
              count={cod.confirmed_count}
              color="#2ecc71"
            />
            <RateCard
              label="Delivery Rate"
              rate={cod.delivery_rate}
              count={cod.delivered_count}
              color="#3498db"
            />
            <RateCard
              label="Refusal Rate"
              rate={cod.refusal_rate}
              count={cod.cancelled_count}
              color="#e74c3c"
            />
          </div>
        ) : null}

        {/* ── Products ── */}
        <div style={S.sectionTitle}>Products — {periodLabel}</div>
        {loading && !products ? (
          <LoadingSection />
        ) : errors.products ? (
          <ErrorSection message={errors.products} />
        ) : products ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {/* Best-selling products */}
            <div style={S.card}>
              <div style={{ ...S.cardLabel, marginBottom: "14px" }}>Best-Selling Products</div>
              {products.best_selling_products.length === 0 ? (
                <div style={{ color: "#8D7D82", fontSize: "13px" }}>No data yet.</div>
              ) : (
                <table style={S.table}>
                  <thead>
                    <tr>
                      <th style={S.th}>Product</th>
                      <th style={{ ...S.th, textAlign: "right" }}>Qty</th>
                      <th style={{ ...S.th, textAlign: "right" }}>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.best_selling_products.map((p) => (
                      <tr key={p.slug}>
                        <td style={S.td}>{p.name}</td>
                        <td style={{ ...S.td, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                          {fmt(p.quantity)}
                        </td>
                        <td style={{ ...S.td, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                          {fmtMAD(p.revenue)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Best-selling bundles + AOV */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={S.card}>
                <div style={S.cardLabel}>Average Order Value</div>
                <div style={S.cardValue}>{fmtMAD(products.average_order_value)}</div>
                <div style={S.cardSub}>Based on {fmt(products.order_count)} non-cancelled orders</div>
              </div>

              <div style={S.card}>
                <div style={{ ...S.cardLabel, marginBottom: "14px" }}>Best-Selling Bundles</div>
                {products.best_selling_bundles.length === 0 ? (
                  <div style={{ color: "#8D7D82", fontSize: "13px" }}>No bundle data yet.</div>
                ) : (
                  <table style={S.table}>
                    <thead>
                      <tr>
                        <th style={S.th}>Bundle</th>
                        <th style={{ ...S.th, textAlign: "right" }}>Orders</th>
                        <th style={{ ...S.th, textAlign: "right" }}>Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.best_selling_bundles.map((b) => (
                        <tr key={b.name}>
                          <td style={S.td}>{b.name}</td>
                          <td style={{ ...S.td, textAlign: "right" }}>{fmt(b.order_count)}</td>
                          <td style={{ ...S.td, textAlign: "right" }}>{fmt(b.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {/* ── Marketing ── */}
        <div style={S.sectionTitle}>Marketing — {periodLabel}</div>
        {loading && !marketing ? (
          <LoadingSection />
        ) : errors.marketing ? (
          <ErrorSection message={errors.marketing} />
        ) : marketing ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {/* Ad spend stub */}
            <div style={{ ...S.grid(4) }}>
              {(["Ad Spend", "Cost / Order", "Cost / Delivered", "ROAS"] as const).map((label) => (
                <div key={label} style={S.card}>
                  <div style={S.cardLabel}>{label}</div>
                  <div style={{ ...S.cardValue, color: "#C9A4AE", fontSize: "18px" }}>—</div>
                  <div style={S.cardSub}>Ads API not connected</div>
                </div>
              ))}
            </div>

            {/* Orders by source */}
            <div style={S.card}>
              <div style={{ ...S.cardLabel, marginBottom: "14px" }}>Orders by Source</div>
              {marketing.by_source.length === 0 ? (
                <div style={{ color: "#8D7D82", fontSize: "13px" }}>
                  No UTM data found. Make sure source URLs include utm_source parameters.
                </div>
              ) : (
                <table style={S.table}>
                  <thead>
                    <tr>
                      <th style={S.th}>Source</th>
                      <th style={S.th}>Campaign</th>
                      <th style={{ ...S.th, textAlign: "right" }}>Orders</th>
                      <th style={{ ...S.th, textAlign: "right" }}>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketing.by_source.flatMap((src) =>
                      src.campaigns.length > 0
                        ? src.campaigns.map((c, i) => (
                            <tr key={`${src.source}-${c.name}`}>
                              <td style={S.td}>{i === 0 ? src.source : ""}</td>
                              <td style={{ ...S.td, color: "#6B4E56" }}>{c.name}</td>
                              <td style={{ ...S.td, textAlign: "right" }}>{fmt(c.order_count)}</td>
                              <td style={{ ...S.td, textAlign: "right" }}>{fmtMAD(c.revenue)}</td>
                            </tr>
                          ))
                        : [
                            <tr key={src.source}>
                              <td style={S.td}>{src.source}</td>
                              <td style={{ ...S.td, color: "#8D7D82" }}>—</td>
                              <td style={{ ...S.td, textAlign: "right" }}>{fmt(src.order_count)}</td>
                              <td style={{ ...S.td, textAlign: "right" }}>{fmtMAD(src.revenue)}</td>
                            </tr>,
                          ]
                    )}
                  </tbody>
                </table>
              )}
              {marketing.note && (
                <div
                  style={{
                    marginTop: "14px",
                    padding: "10px 12px",
                    background: "#FAF7F4",
                    borderRadius: "6px",
                    fontSize: "12px",
                    color: "#8D7D82",
                  }}
                >
                  ℹ {marketing.note}
                </div>
              )}
            </div>
          </div>
        ) : null}
        </>}
      </div>
    </div>
  );
}

// ─── Root Component ───────────────────────────────────────────────────────────

const STORAGE_KEY = "nura_admin_key";

export default function AdminPage() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setApiKey(saved);
    setChecked(true);
  }, []);

  function handleLogin(key: string) {
    localStorage.setItem(STORAGE_KEY, key);
    setApiKey(key);
  }

  function handleLogout() {
    localStorage.removeItem(STORAGE_KEY);
    setApiKey(null);
  }

  if (!checked) return null;

  if (!apiKey) return <LoginPage onLogin={handleLogin} />;

  return <Dashboard apiKey={apiKey} onLogout={handleLogout} />;
}
