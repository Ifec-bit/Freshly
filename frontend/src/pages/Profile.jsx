import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';
import { getItems } from '../lib/api';

export default function Profile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setEmail(user?.email || '');
    });
    getItems().then(setItems);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const urgent = items.filter(i => i.status === 'URGENT').length;
  const initial = email.charAt(0).toUpperCase();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.back} onClick={() => navigate('/')}>← Back</span>
        <span style={styles.title}>Profile</span>
        <span style={{ width: 40 }} />
      </div>

      <div style={styles.avatarWrap}>
        <div style={styles.avatar}>{initial}</div>
        <div style={styles.email}>{email}</div>
      </div>

      <div style={styles.statsCard}>
        <div style={styles.row}>
          <span style={styles.rowLabel}>Total items</span>
          <span style={styles.rowVal}>{items.length}</span>
        </div>
        <div style={styles.divider} />
        <div style={styles.row}>
          <span style={styles.rowLabel}>Urgent items</span>
          <span style={{ ...styles.rowVal, color: '#E24B4A' }}>{urgent}</span>
        </div>
      </div>

      <button style={styles.btnSignOut} onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
}

const styles = {
  container: { maxWidth: 480, margin: '0 auto', padding: '24px 16px', minHeight: '100vh', background: '#f5f4ef' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  back: { fontSize: 13, color: '#888780', cursor: 'pointer' },
  title: { fontSize: 17, fontWeight: 800, color: '#1a1a1a' },
  avatarWrap: { textAlign: 'center', marginBottom: 24 },
  avatar: { width: 64, height: 64, borderRadius: '50%', background: '#E1F5EE', border: '2px solid #5DCAA5', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 800, color: '#0F6E56', marginBottom: 10 },
  email: { fontSize: 13, color: '#888780' },
  statsCard: { background: '#fff', borderRadius: 14, border: '1px solid #E8E6DF', padding: '4px 16px', marginBottom: 20 },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' },
  rowLabel: { fontSize: 13, color: '#888780', fontWeight: 600 },
  rowVal: { fontSize: 14, fontWeight: 800, color: '#1a1a1a' },
  divider: { height: 1, background: '#F1EFE8' },
  btnSignOut: { width: '100%', height: 42, borderRadius: 10, background: '#F1EFE8', border: '1px solid #E8E6DF', color: '#5F5E5A', fontSize: 14, fontWeight: 700, cursor: 'pointer' },
};