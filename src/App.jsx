import { useState } from 'react';
import LNB from './LNB';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'password') {
      setIsAuthenticated(true);
    } else {
      setError('Incorrect password');
    }
  };

  if (isAuthenticated) {
    return <LNB />;
  }

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#091b33', color: '#fff', fontFamily: "'DM Sans', sans-serif" }}>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', padding: '3rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', width: '100%', maxWidth: '360px', backdropFilter: 'blur(10px)' }}>
        <h2 style={{ margin: 0, textAlign: 'center', fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 500 }}>Client Access</h2>
        {error && <p style={{ color: '#ff6b6b', margin: 0, fontSize: '0.85rem', textAlign: 'center' }}>{error}</p>}
        <input 
          type="password" 
          value={password} 
          onChange={(e) => { setPassword(e.target.value); setError(''); }} 
          placeholder="Enter Password"
          style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.2)', color: '#fff', outline: 'none', fontSize: '15px' }}
        />
        <button type="submit" style={{ padding: '14px', borderRadius: '8px', border: 'none', background: '#3d8bfd', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '15px', letterSpacing: '0.5px' }}>
          Enter Site
        </button>
      </form>
    </div>
  );
}
