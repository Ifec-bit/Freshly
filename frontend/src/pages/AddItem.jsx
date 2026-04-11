import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../lib/api';

const CATEGORIES = ['DAIRY', 'VEGETABLE', 'MEAT', 'FRUIT', 'GRAIN', 'OTHER'];

export default function AddItem() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('DAIRY');
  const [expiryDate, setExpiryDate] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!name || !expiryDate) {
      setError('Item name and expiry date are required');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await addItem({ name, category, expiry_date: expiryDate, quantity });
      navigate('/');
    } catch (err) {
      setError('Failed to add item. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.back} onClick={() => navigate('/')}>← Back</span>
        <span style={styles.title}>Add item</span>
        <span style={{ width: 40 }} />
      </div>

      <div style={styles.label}>Item name</div>
      <input
        style={styles.input}
        placeholder="e.g. Whole milk"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <div style={styles.sectionLabel}>Category</div>
      <div style={styles.catGrid}>
        {CATEGORIES.map(cat => (
          <div
            key={cat}
            style={{ ...styles.catBtn, ...(category === cat ? styles.catBtnSel : {}) }}
            onClick={() => setCategory(cat)}
          >
            {cat.charAt(0) + cat.slice(1).toLowerCase()}
          </div>
        ))}
      </div>

      <div style={styles.label}>Expiry date</div>
      <input
        style={styles.input}
        type="date"
        value={expiryDate}
        onChange={e => setExpiryDate(e.target.value)}
      />

      <div style={styles.label}>Quantity</div>
      <div style={styles.qtyRow}>
        <div style={styles.qtyBtn} onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</div>
        <div style={styles.qtyVal}>{quantity}</div>
        <div style={styles.qtyBtn} onClick={() => setQuantity(q => q + 1)}>+</div>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      <button style={styles.btnGreen} onClick={handleSave} disabled={loading}>
        {loading ? 'Saving...' : 'Save item'}
      </button>
    </div>
  );
}

const styles = {
  container: { maxWidth: 480, margin: '0 auto', padding: '24px 16px', minHeight: '100vh', background: '#f5f4ef' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  back: { fontSize: 13, color: '#888780', cursor: 'pointer' },
  title: { fontSize: 17, fontWeight: 800, color: '#1a1a1a' },
  label: { fontSize: 12, fontWeight: 700, color: '#5F5E5A', margin: '14px 0 5px' },
  input: { width: '100%', height: 40, border: '1.5px solid #D3D1C7', borderRadius: 10, padding: '0 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box', background: '#f8f7f2' },
  sectionLabel: { fontSize: 10, fontWeight: 700, color: '#888780', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '14px 0 7px' },
  catGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 },
  catBtn: { height: 32, borderRadius: 8, border: '1.5px solid #D3D1C7', background: '#f8f7f2', fontSize: 12, fontWeight: 600, color: '#5F5E5A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  catBtnSel: { background: '#E1F5EE', borderColor: '#5DCAA5', color: '#0F6E56' },
  qtyRow: { display: 'flex', alignItems: 'center', gap: 14 },
  qtyBtn: { width: 34, height: 34, borderRadius: 8, border: '1.5px solid #D3D1C7', background: '#f8f7f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#5F5E5A', cursor: 'pointer' },
  qtyVal: { fontSize: 16, fontWeight: 800, color: '#1a1a1a', minWidth: 24, textAlign: 'center' },
  error: { color: '#E24B4A', fontSize: 12, marginTop: 10 },
  btnGreen: { width: '100%', height: 42, borderRadius: 10, background: '#1D9E75', border: 'none', color: '#fff', fontSize: 14, fontWeight: 700, marginTop: 20, cursor: 'pointer' },
};