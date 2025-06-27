import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import './Auth.css';
import Navbar from './Navbar';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    reset();
  };

  const onSubmit = (data) => {
    console.log(isLogin ? "Login Data" : "Signup Data", data);
    reset();
  };

  return (
  
      <div className="min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--soft-grey)', padding: '5rem 0' }}>
      <div className="auth-card">
        <div className="brand-logo">
          <span role="img" aria-label="leaf">🌿</span>
        </div>
        <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
        <p>{isLogin ? 'Welcome back! Please login to your account.' : 'Join our skincare community. Create your account below.'}</p>
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
          <div style={{ position: 'relative' }}>
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
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((s) => !s)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <div className="error-message">{errors.password.message}</div>}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>
            <label className="remember-me">
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
