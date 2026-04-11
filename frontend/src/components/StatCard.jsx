export default function StatCard({ count, label, color, bg }) {
  return (
    <div style={{ flex: 1, background: bg, borderRadius: 10, padding: '10px 12px' }}>
      <div style={{ fontSize: 24, fontWeight: 800, color, lineHeight: 1 }}>{count}</div>
      <div style={{ fontSize: 10, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 3 }}>{label}</div>
    </div>
  );
}
