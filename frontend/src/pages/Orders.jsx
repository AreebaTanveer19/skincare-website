import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Product.css'; // Reuse product styling for card layout

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id || user?.id;
    if (!userId) {
      navigate('/auth');
      return;
    }
    fetch(`/api/orders/user/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch orders');
        return res.json();
      })
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <div style={{padding:'2rem'}}>Loading your orders...</div>;
  if (error) return <div style={{padding:'2rem', color:'red'}}>Error: {error}</div>;
  if (!orders.length) return <div style={{padding:'2rem'}}>You have not placed any orders yet.</div>;

  return (
    <div className="product-list" style={{paddingTop:'6rem', minHeight:'80vh'}}>
      <h2 style={{marginBottom:'2rem', textAlign:'center'}}>Your Orders</h2>
      <div style={{display:'flex', flexWrap:'wrap', gap:'2rem', justifyContent:'center'}}>
        {orders.map(order => (
          <div key={order._id} className="product-card" style={{minWidth:'320px', maxWidth:'350px', cursor:'pointer'}} onClick={() => setSelectedOrder(order)}>
            <div style={{fontWeight:'bold', marginBottom:'0.5rem'}}>Order #{order._id.slice(-6)}</div>
            <div>Status: <span style={{color: order.status === 'Delivered' ? 'green' : order.status === 'Cancelled' ? 'red' : '#d4af37'}}>{order.status || 'Pending'}</span></div>
            <div>Placed: {new Date(order.createdAt).toLocaleString()}</div>
            <div>Total: <b>₹{order.total}</b></div>
            <div style={{fontSize:'0.95em', marginTop:'0.5rem'}}>Items: {order.items.length}</div>
            <button style={{marginTop:'1rem', background:'#d4af37', color:'#fff', border:'none', borderRadius:'1rem', padding:'0.4rem 1.2rem', cursor:'pointer'}}>View Details</button>
          </div>
        ))}
      </div>
      {selectedOrder && (
        <div style={{position:'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.25)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center'}} onClick={()=>setSelectedOrder(null)}>
          <div style={{background:'#fff', borderRadius:'1.2rem', padding:'2rem', minWidth:'340px', maxWidth:'95vw', boxShadow:'0 8px 32px rgba(0,0,0,0.12)', position:'relative'}} onClick={e=>e.stopPropagation()}>
            <button style={{position:'absolute', top:'1rem', right:'1rem', background:'none', border:'none', fontSize:'1.5rem', cursor:'pointer'}} onClick={()=>setSelectedOrder(null)}>&times;</button>
            <h3 style={{marginBottom:'1rem'}}>Order #{selectedOrder._id.slice(-6)}</h3>
            <div>Status: <span style={{color: selectedOrder.status === 'Delivered' ? 'green' : selectedOrder.status === 'Cancelled' ? 'red' : '#d4af37'}}>{selectedOrder.status || 'Pending'}</span></div>
            <div>Placed: {new Date(selectedOrder.createdAt).toLocaleString()}</div>
            <div>Total: <b>₹{selectedOrder.total}</b></div>
            <div style={{margin:'1rem 0 0.5rem 0', fontWeight:'bold'}}>Items:</div>
            <ul style={{paddingLeft:'1.2rem'}}>
              {selectedOrder.items.map((item, idx) => (
                <li key={idx} style={{marginBottom:'0.5rem'}}>
                  {item.product?.name || 'Product'} x {item.quantity} <span style={{color:'#888'}}>₹{item.product?.price || ''}</span>
                </li>
              ))}
            </ul>
            <div style={{marginTop:'1rem'}}><b>Shipping Address:</b><br/>{selectedOrder.shippingAddress?.address || ''}, {selectedOrder.shippingAddress?.city || ''}, {selectedOrder.shippingAddress?.state || ''}, {selectedOrder.shippingAddress?.zip || ''}</div>
            <div style={{marginTop:'0.5rem'}}><b>Shipping Method:</b> {selectedOrder.shippingMethod}</div>
            <div style={{marginTop:'0.5rem'}}><b>Payment Method:</b> {selectedOrder.paymentMethod}</div>
          </div>
        </div>
      )}
    </div>
  );
} 