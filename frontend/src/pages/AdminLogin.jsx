import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok && data.user.isAdmin) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      onLogin();
    } else if (res.ok && !data.user.isAdmin) {
      setError('You are not authorized to access the admin dashboard.');
    } else {
      setError(data.message || 'Login failed');
    }
  };

  return (
    <div className="admin-login" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f4f6fa' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2.5rem 2rem', borderRadius: '1.2rem', boxShadow: '0 4px 24px rgba(35,41,70,0.13)', minWidth: 320 }}>
        <h2 style={{ marginBottom: '1rem', color: '#232946', fontFamily: 'Playfair Display, serif' }}>Admin Login</h2>
        {error && <div className="error" style={{ color: '#f44336', marginBottom: '1rem' }}>{error}</div>}
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '1rem', padding: '0.7rem 0.5rem', border: '1px solid #eebf63', borderRadius: '0.6rem', fontSize: '1rem' }}
        />
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '1rem', padding: '0.7rem 0.5rem', border: '1px solid #eebf63', borderRadius: '0.6rem', fontSize: '1rem' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(s => !s)}
            style={{
              position: 'absolute',
              right: '0.8rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
            style={{ marginRight: '0.5em' }}
          />
          <label htmlFor="rememberMe" style={{ marginRight: 'auto' }}>Remember me</label>
          <a href="#" style={{ color: '#5a67d8', textDecoration: 'none', fontSize: '0.98em' }}>Forgot password?</a>
        </div>
        <button type="submit" style={{ width: '100%', padding: '0.7rem', borderRadius: '2rem', border: 'none', fontSize: '1rem', fontWeight: 500, cursor: 'pointer', background: 'linear-gradient(90deg, #eebf63, #f9d923)', color: '#232946', transition: 'background 0.2s, color 0.2s' }}>
          Login
        </button>
      </form>
    </div>
  );
} 