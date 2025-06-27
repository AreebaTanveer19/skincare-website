// CheckoutPage.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './Checkout.css';
import Navbar from './Navbar';
import { FaTrash } from 'react-icons/fa';

export default function Checkout({ cartItems, setCartItems }) {
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleQuantityChange = (id, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = shippingMethod === 'standard' ? 0 : shippingMethod === 'express' ? 5 : 10;
  const total = subtotal + shippingCost;

  const onSubmit = () => {
    setOrderPlaced(true);
    reset();
  };

  return (
   
      <div className="checkout-container">
        <h1>Checkout</h1>
        <div className="checkout-grid">
          <section className="cart-summary">
            <h2>Cart Summary</h2>
            {cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <p>{item.name} ({item.variant})</p>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                  </div>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button className="remove-btn" onClick={() => removeItem(item.id)}><FaTrash /></button>
              </div>
            ))}
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <Link to="/product" className="add-more-btn">
                + Add More Items
              </Link>
            </div>
          </section>

          <section className="shipping-info">
            <h2>Shipping Information</h2>
            <form className="form-grid" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <input type="text" placeholder="Full Name" {...register('fullName', { required: 'Full Name is required' })} />
              {errors.fullName && <span className="error-message">{errors.fullName.message}</span>}
              <input type="email" placeholder="Email Address" {...register('email', { required: 'Email is required' })} />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
              <input type="tel" placeholder="Phone Number" {...register('phone', { required: 'Phone Number is required' })} />
              {errors.phone && <span className="error-message">{errors.phone.message}</span>}
              <input type="text" placeholder="Address Line 1" {...register('address1', { required: 'Address Line 1 is required' })} />
              {errors.address1 && <span className="error-message">{errors.address1.message}</span>}
              <input type="text" placeholder="Address Line 2" {...register('address2')} />
              <input type="text" placeholder="City" {...register('city', { required: 'City is required' })} />
              {errors.city && <span className="error-message">{errors.city.message}</span>}
              <input type="text" placeholder="State / Province" {...register('state', { required: 'State/Province is required' })} />
              {errors.state && <span className="error-message">{errors.state.message}</span>}
              <input type="text" placeholder="Zip / Postal Code" {...register('zip', { required: 'Zip/Postal Code is required' })} />
              {errors.zip && <span className="error-message">{errors.zip.message}</span>}
              <select {...register('country', { required: 'Country is required' })} defaultValue="Pakistan">
                <option value="Pakistan">Pakistan</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
              {errors.country && <span className="error-message">{errors.country.message}</span>}
              <label>
                <input type="checkbox" {...register('saveAddress')} /> Save this address
              </label>

              <div className="shipping-method">
                <h2>Shipping Method</h2>
                <label><input type="radio" value="standard" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} /> Standard (Free)</label>
                <label><input type="radio" value="express" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} /> Express ($5)</label>
                <label><input type="radio" value="nextday" checked={shippingMethod === 'nextday'} onChange={() => setShippingMethod('nextday')} /> Next-Day ($10)</label>
              </div>

              <div className="payment-method">
                <h2>Payment Method</h2>
                <label><input type="radio" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} /> Credit/Debit Card</label>
                <label><input type="radio" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} /> Cash on Delivery</label>
                {paymentMethod === 'card' && (
                  <div className="card-form">
                    <input type="text" placeholder="Card Number" {...register('cardNumber', { required: paymentMethod === 'card' ? 'Card Number is required' : false })} />
                    {errors.cardNumber && <span className="error-message">{errors.cardNumber.message}</span>}
                    <input type="text" placeholder="MM/YY" {...register('expiry', { required: paymentMethod === 'card' ? 'Expiry is required' : false })} />
                    {errors.expiry && <span className="error-message">{errors.expiry.message}</span>}
                    <input type="text" placeholder="CVV" {...register('cvv', { required: paymentMethod === 'card' ? 'CVV is required' : false })} />
                    {errors.cvv && <span className="error-message">{errors.cvv.message}</span>}
                    <input type="text" placeholder="Cardholder Name" {...register('cardName', { required: paymentMethod === 'card' ? 'Cardholder Name is required' : false })} />
                    {errors.cardName && <span className="error-message">{errors.cardName.message}</span>}
                  </div>
                )}
              </div>

              <div className="order-summary">
                <h2>Order Summary</h2>
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Shipping: ${shippingCost.toFixed(2)}</p>
                <p>Total: ${total.toFixed(2)}</p>
               
                <button className="place-order" type="submit">Place Order</button>
              </div>
            </form>
          </section>
        </div>

        {/* ✅ Confirmation Popup */}
        {orderPlaced && (
          <div className="confirmation-popup">
            <div className="confirmation-box">
              <h3>Thank You for Your Order!</h3>
              <p>Your skincare products are on their way. You'll receive them shortly.</p>
              <button onClick={() => setOrderPlaced(false)} className="close-confirmation">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
   
  );
}
