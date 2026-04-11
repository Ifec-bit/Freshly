import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    const { error } = isRegister
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoIcon}>F</div>
        <h1 style={styles.logoName}>FRESHLY</h1>
        <p style={styles.logoSub}>Stop wasting food</p>

        <label style={styles.label}>Email</label>
        <input style={styles.input} type="email" placeholder="you@email.com"
          value={email} onChange={e => setEmail(e.target.value)} />

        <label style={styles.label}>Password</label>
        <input style={styles.input} type="password" placeholder="••••••••"
          value={password} onChange={e => setPassword(e.target.value)} />

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.btnGreen} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Please wait...' : isRegister ? 'Create account' : 'Sign in'}
        </button>

        <p style={styles.switchText}>
          {isRegister ? 'Have an account? ' : 'No account? '}
          <span style={styles.switchLink} onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Sign in' : 'Register here'}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f4ef' },
  card: { background: '#fff', borderRadius: 20, padding: '32px 28px', width: '100%', maxWidth: 360, textAlign: 'center' },
  logoIcon: { width: 56, height: 56, borderRadius: 16, background: '#E1F5EE', border: '1.5px solid #5DCAA5', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, color: '#0F6E56', marginBottom: 8 },
  logoName: { fontSize: 24, fontWeight: 800, color: '#1a1a1a', margin: '0 0 4px' },
  logoSub: { fontSize: 13, color: '#888780', margin: '0 0 24px' },
  label: { display: 'block', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#5F5E5A', margin: '12px 0 5px' },
  input: { width: '100%', height: 40, border: '1.5px solid #D3D1C7', borderRadius: 10, padding: '0 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box' },
  btnGreen: { width: '100%', height: 42, borderRadius: 10, background: '#1D9E75', border: 'none', color: '#fff', fontSize: 14, fontWeight: 700, marginTop: 20, cursor: 'pointer' },
  error: { color: '#E24B4A', fontSize: 12, margin: '8px 0 0', textAlign: 'left' },
  switchText: { fontSize: 12, color: '#888780', marginTop: 16 },
  switchLink: { color: '#1D9E75', fontWeight: 700, cursor: 'pointer' },
};