export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      dir="ltr"
      className="fixed inset-0 z-50 overflow-auto"
      style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#f8f9fa", color: "#1a1a2e" }}
    >
      {children}
    </div>
  );
}
