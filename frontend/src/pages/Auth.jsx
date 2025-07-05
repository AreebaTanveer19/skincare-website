import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import './Auth.css';
import Navbar from './Navbar';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.logout) {
      setSuccess('You have been logged out successfully.');
      localStorage.removeItem('isLoggedIn');
      // Clean up state so message doesn't persist on next visit
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    reset();
  };

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');
    try {
      if (isLogin) {
        // Login
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email, password: data.password })
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || 'Login failed');
        localStorage.setItem('isLoggedIn', 'true');
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => navigate('/'), 1200); // Redirect after 1.2s
      } else {
        // Register
        const res = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: data.fullName, email: data.email, password: data.password })
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || 'Registration failed');
        setIsLogin(true);
        setSuccess('Registration successful! Please log in.');
        reset();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--soft-grey)', padding: '5rem 0' }}>
      <div className="auth-card">
        <div className="brand-logo">
          <span role="img" aria-label="leaf">🌿</span>
        </div>
        <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
        <p>{isLogin ? 'Welcome back! Please login to your account.' : 'Join our skincare community. Create your account below.'}</p>
        {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        {success && <div className="success-message" style={{ color: 'green', marginBottom: '1rem' }}>{success}</div>}
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          {!isLogin && (
            <>
              <label htmlFor="fullName">Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Your name"
                {...register('fullName', { required: 'Please enter your name.' })}
                className=""
                autoFocus
              />
              {errors.fullName && <div className="error-message">{errors.fullName.message}</div>}
            </>
          )}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Please enter your email.',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email format',
              },
            })}
            className=""
          />
          {errors.email && <div className="error-message">{errors.email.message}</div>}
          <label htmlFor="password">Password</label>
          <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password', {
                required: 'Please enter your password.',
                minLength: {
                  value: 6,
                  message: 'Minimum 6 characters required',
                },
              })}
              className=""
              style={{ width: '100%', paddingRight: '0.5rem' }}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((s) => !s)}
              tabIndex={-1}
              style={{
                position: 'absolute',
                right: '0.8rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {showPassword ? <Eye size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <div className="error-message">{errors.password.message}</div>}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }} className="remember-me">
              <input type="checkbox" style={{ marginRight: '0.4em' }} /> Remember me
            </label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>
          <button className="submit-btn" type="submit">
            {isLogin ? 'Login' : 'Sign up'}
          </button>
        </form>
        <div className="toggle-form">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button type="button" onClick={toggleForm}>
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
