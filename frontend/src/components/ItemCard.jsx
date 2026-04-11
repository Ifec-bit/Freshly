import StatusBadge from './StatusBadge';

const dotColors = {
  URGENT: '#E24B4A',
  EXPIRING_SOON: '#EF9F27',
  FRESH: '#639922',
  EXPIRED: '#B4B2A9',
};

export default function ItemCard({ item, onClick }) {
  return (
    <div style={styles.card} onClick={onClick}>
      <div style={{ ...styles.dot, background: dotColors[item.status] || '#B4B2A9' }} />
      <div style={styles.info}>
        <div style={styles.name}>{item.name}</div>
        <div style={styles.meta}>{item.category} · expires {new Date(item.expiry_date).toLocaleDateString()}</div>
      </div>
      <StatusBadge status={item.status} />
    </div>
  );
}

const styles = {
  card: { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, border: '1px solid #E8E6DF', background: '#fff', marginBottom: 8, cursor: 'pointer' },
  dot: { width: 9, height: 9, borderRadius: '50%', flexShrink: 0 },
  info: { flex: 1, minWidth: 0 },
  name: { fontSize: 13, fontWeight: 700, color: '#1a1a1a' },
  meta: { fontSize: 11, color: '#888780', marginTop: 2 },
};