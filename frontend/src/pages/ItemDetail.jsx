import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getItems, deleteItem } from '../lib/api';
import StatusBadge from '../components/StatusBadge';

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getItems().then(data => {
      const found = data.find(i => i.id === id);
      setItem(found);
    });
  }, [id]);

  const handleDelete = async () => {
    await deleteItem(id);
    navigate('/inventory');
  };

  const handleConsumed = async () => {
    await deleteItem(id);
    navigate('/');
  };

  if (!item) return <div style={{ padding: '2rem' }}>Loading...</div>;

  const daysLeft = Math.ceil(
    (new Date(item.expiry_date) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.back} onClick={() => navigate('/inventory')}>← Back</span>
        <span style={styles.title}>Item detail</span>
        <span style={{ width: 40 }} />
      </div>

      <div style={styles.imgBox}>
        {item.category === 'DAIRY' ? '🥛' :
         item.category === 'MEAT' ? '🥩' :
         item.category === 'VEGETABLE' ? '🥦' :
         item.category === 'FRUIT' ? '🍎' :
         item.category === 'GRAIN' ? '🌾' : '🥫'}
      </div>

      <div style={styles.itemName}>{item.name}</div>
      <div style={styles.itemCat}>{item.category} · Qty: {item.quantity}</div>

      <div style={styles.detailCard}>
        <div style={styles.row}>
          <span style={styles.rowLabel}>Status</span>
          <StatusBadge status={item.status} />
        </div>
        <div style={styles.divider} />
        <div style={styles.row}>
          <span style={styles.rowLabel}>Expiry date</span>
          <span style={styles.rowVal}>{new Date(item.expiry_date).toLocaleDateString()}</span>
        </div>
        <div style={styles.divider} />
        <div style={styles.row}>
          <span style={styles.rowLabel}>Days left</span>
          <span style={{ ...styles.rowVal, color: daysLeft <= 2 ? '#E24B4A' : '#1a1a1a' }}>
            {daysLeft < 0 ? 'Expired' : `${daysLeft} days`}
          </span>
        </div>
        <div style={styles.divider} />
        <div style={styles.row}>
          <span style={styles.rowLabel}>Added on</span>
          <span style={styles.rowVal}>{new Date(item.created_at).toLocaleDateString()}</span>
        </div>
      </div>

      <button style={styles.btnGreen} onClick={handleConsumed}>
        Mark as consumed
      </button>
      <button style={styles.btnDelete} onClick={handleDelete}>
        Delete item
      </button>
    </div>
  );
}

const styles = {
  container: { maxWidth: 480, margin: '0 auto', padding: '24px 16px', minHeight: '100vh', background: '#f5f4ef' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  back: { fontSize: 13, color: '#888780', cursor: 'pointer' },
  title: { fontSize: 17, fontWeight: 800, color: '#1a1a1a' },
  imgBox: { width: '100%', height: 90, background: '#F1EFE8', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, marginBottom: 16 },
  itemName: { fontSize: 22, fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.02em', marginBottom: 4 },
  itemCat: { fontSize: 13, color: '#888780', marginBottom: 18 },
  detailCard: { background: '#fff', borderRadius: 14, border: '1px solid #E8E6DF', padding: '4px 16px', marginBottom: 16 },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' },
  rowLabel: { fontSize: 13, color: '#888780', fontWeight: 600 },
  rowVal: { fontSize: 13, fontWeight: 700, color: '#1a1a1a' },
  divider: { height: 1, background: '#F1EFE8' },
  btnGreen: { width: '100%', height: 42, borderRadius: 10, background: '#1D9E75', border: 'none', color: '#fff', fontSize: 14, fontWeight: 700, marginBottom: 10, cursor: 'pointer' },
  btnDelete: { width: '100%', height: 42, borderRadius: 10, background: '#FCEBEB', border: '1.5px solid #F7C1C1', color: '#A32D2D', fontSize: 14, fontWeight: 700, cursor: 'pointer' },
};