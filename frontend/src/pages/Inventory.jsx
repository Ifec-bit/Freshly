import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItems } from '../lib/api';
import ItemCard from '../components/ItemCard';

const FILTERS = ['ALL', 'URGENT', 'EXPIRING_SOON', 'FRESH', 'EXPIRED'];

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getItems().then(data => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const filtered = filter === 'ALL' ? items : items.filter(i => i.status === filter);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.back} onClick={() => navigate('/')}>← Back</span>
        <span style={styles.title}>My fridge</span>
        <span style={{ width: 40 }} />
      </div>

      <div style={styles.filterRow}>
        {FILTERS.map(f => (
          <div
            key={f}
            style={{ ...styles.pill, ...(filter === f ? styles.pillActive : {}) }}
            onClick={() => setFilter(f)}
          >
            {f === 'EXPIRING_SOON' ? 'Soon' : f.charAt(0) + f.slice(1).toLowerCase()}
          </div>
        ))}
      </div>

      {loading ? <p style={styles.empty}>Loading...</p> :
       filtered.length === 0 ? <p style={styles.empty}>No items in this category.</p> :
       filtered.map(item => (
         <ItemCard key={item.id} item={item} onClick={() => navigate(`/item/${item.id}`)} />
       ))
      }

      <div style={styles.fab} onClick={() => navigate('/add')}>+</div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 480, margin: '0 auto', padding: '24px 16px', minHeight: '100vh', background: '#f5f4ef' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  back: { fontSize: 13, color: '#888780', cursor: 'pointer' },
  title: { fontSize: 17, fontWeight: 800, color: '#1a1a1a' },
  filterRow: { display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' },
  pill: { fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 20, border: '1.5px solid #D3D1C7', color: '#888780', background: '#f8f7f2', cursor: 'pointer' },
  pillActive: { background: '#E1F5EE', borderColor: '#5DCAA5', color: '#0F6E56' },
  empty: { textAlign: 'center', color: '#888780', fontSize: 13, marginTop: 40 },
  fab: { position: 'fixed', bottom: 32, right: 16, width: 52, height: 52, borderRadius: '50%', background: '#1D9E75', color: '#fff', fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 300, zIndex: 100 },
};