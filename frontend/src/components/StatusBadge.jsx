const config = {
  URGENT:        { label: 'Urgent', bg: '#FCEBEB', color: '#A32D2D' },
  EXPIRING_SOON: { label: 'Soon',   bg: '#FAEEDA', color: '#633806' },
  FRESH:         { label: 'Fresh',  bg: '#EAF3DE', color: '#27500A' },
  EXPIRED:       { label: 'Expired',bg: '#F1EFE8', color: '#5F5E5A' },
};

export default function StatusBadge({ status }) {
  const c = config[status] || config.EXPIRED;
  return (
    <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 12, background: c.bg, color: c.color, flexShrink: 0 }}>
      {c.label}
    </span>
  );
}