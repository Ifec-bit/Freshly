import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { getItems } from '../lib/api';
import ItemCard from '../components/ItemCard';
import StatCard from '../components/StatCard';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getItems().then(data => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const urgent  = items.filter(i => i.status === 'URGENT');
  const soon    = items.filter(i => i.status === 'EXPIRING_SOON');
  const fresh   = items.filter(i => i.status === 'FRESH');
  const attention = [...urgent, ...soon].slice(0, 4);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <p style={styles.greeting}>Good morning,</p>
          <h1 style={styles.name}>My Fridge</h1>
        </div>
        <div style={styles.avatar} onClick={() => navigate('/profile')}>M</div>
      </div>

      <div style={styles.statsRow}>
        <StatCard count={urgent.length} label="Urgent" color="#E24B4A" bg="#FCEBEB" />
        <StatCard count={soon.length}   label="Soon"   color="#EF9F27" bg="#FAEEDA" />
        <StatCard count={fresh.length}  label="Fresh"  color="#639922" bg="#EAF3DE" />
      </div>

      <div style={styles.sectionRow}>
        <span style={styles.sectionH}>Needs attention</span>
        <span style={styles.seeAll} onClick={() => navigate('/inventory')}>See all</span>
      </div>

      {loading ? <p style={styles.empty}>Loading...</p> :
       attention.length === 0 ? <p style={styles.empty}>All good! Nothing expiring soon.</p> :
       attention.map(item => <ItemCard key={item.id} item={item} onClick={() => navigate(`/item/${item.id}`)} />)
      }

      <div style={styles.fab} onClick={() => navigate('/add')}>+</div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 480, margin: '0 auto', padding: '24px 16px', minHeight: '100vh', background: '#f5f4ef', position: 'relative' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greeting: { fontSize: 12, color: '#888780', margin: 0 },
  name: { fontSize: 22, fontWeight: 800, color: '#1a1a1a', margin: 0 },
  avatar: { width: 38, height: 38, borderRadius: '50%', background: '#E1F5EE', border: '1.5px solid #5DCAA5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#0F6E56', cursor: 'pointer' },
  statsRow: { display: 'flex', gap: 8, marginBottom: 20 },
  sectionRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionH: { fontSize: 14, fontWeight: 700, color: '#1a1a1a' },
  seeAll: { fontSize: 12, color: '#1D9E75', fontWeight: 700, cursor: 'pointer' },
  empty: { textAlign: 'center', color: '#888780', fontSize: 13, marginTop: 40 },
  fab: { position: 'fixed', bottom: 32, right: 'calc(50% - 240px + 16px)', width: 52, height: 52, borderRadius: '50%', background: '#1D9E75', color: '#fff', fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 300 },
};