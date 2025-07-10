import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyOrders.css';

const statusIcons = {
  delivered: '✔️',
  shipped: '🚚',
  processing: '⏳',
  cancelled: '❌',
  pending: '🕒',
};
const placeholderImg = 'https://via.placeholder.com/90x90?text=No+Img';

// Helper to get correct image URL for GitHub Pages (copied from Product.jsx)
const getImageUrl = (img) => {
  if (!img) return placeholderImg;
  const fileName = img.split('/').pop();
  return `${import.meta.env.BASE_URL}images/${fileName}`;
};

export default function MyOrders() {
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
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/myorders/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [navigate]);

  const getStatusClass = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'delivered': return 'status-delivered';
      case 'shipped': return 'status-shipped';
      case 'processing': return 'status-processing';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };
  const getStatusIcon = (status) => {
    return statusIcons[(status || '').toLowerCase()] || statusIcons['pending'];
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div>Loading your orders...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="error-container">
        Error: {error}
      </div>
    );
  }
  if (!orders.length) {
    return (
      <div className="empty-container">
        <h2>No Orders Yet</h2>
        <p>You haven't placed any orders yet.</p>
        <button className="start-shopping-btn" onClick={() => navigate('/product')}>
          Start Shopping
        </button>
      </div>
    );
  }
  return (
    <div className="orders-container">
      <h2 className="orders-header">Your Orders</h2>
      <div className="orders-grid">
        {orders.map(order => {
          const firstItem = order.items && order.items[0];
          const imgSrc = getImageUrl(firstItem?.product?.image || firstItem?.image);
          return (
            <div key={order._id} className="order-card" onClick={() => setSelectedOrder(order)}>
              <div style={{display:'flex',alignItems:'center',gap:'0.7em',marginBottom:'0.5rem',justifyContent:'center',width:'100%'}}>
                <img src={imgSrc} alt={firstItem?.name || 'Product'} className="product-image" onError={e => e.target.src = placeholderImg} />
                <div className="order-id">Order #{order._id.slice(-6)}</div>
              </div>
              <div className="order-status">
                <span className={`status-icon ${getStatusClass(order.status)}`}>{getStatusIcon(order.status)}</span>
                <span className={getStatusClass(order.status)}>{order.status || 'Pending'}</span>
              </div>
              <div className="order-date">Placed: {formatDate(order.createdAt)}</div>
              <div className="order-total">Total: <b>${order.total?.toFixed(2)}</b></div>
              <div className="order-items-count">Items: {order.items?.length || 0}</div>
              <hr className="gold-divider" />
              <button className="view-details-btn">View Details</button>
            </div>
          );
        })}
      </div>
      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content fade-in-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedOrder(null)}>&times;</button>
            <h3 className="modal-title">Order #{selectedOrder._id.slice(-6)}</h3>
            <div className="modal-section">
              <span className={`status-icon ${getStatusClass(selectedOrder.status)}`}>{getStatusIcon(selectedOrder.status)}</span>
              <strong>Status:</strong> <span className={getStatusClass(selectedOrder.status)}>{selectedOrder.status || 'Pending'}</span>
            </div>
            <div className="modal-section">
              <strong>Placed:</strong> {formatDate(selectedOrder.createdAt)}
            </div>
            <div className="modal-section">
              <strong>Total:</strong> <b>${selectedOrder.total?.toFixed(2)}</b>
            </div>
            <hr className="gold-divider" />
            <div className="modal-section">
              <strong>Items ({selectedOrder.items?.length || 0}):</strong>
            </div>
            <ul className="modal-items-list">
              {selectedOrder.items?.map((item, idx) => (
                <li key={idx} style={{display:'flex',alignItems:'center',gap:'0.7em',marginBottom:'0.7em'}}>
                  <img
                    src={getImageUrl(item.product?.image || item.image)}
                    alt={item.name || 'Product'}
                    className="product-image"
                    onError={e => e.target.src = placeholderImg}
                  />
                  <span style={{flex:1}}>
                    <strong>{item.name || 'Product'}</strong> x {item.quantity}
                    <span style={{ color: '#888', marginLeft: '0.5rem' }}>
                      ${item.price?.toFixed(2) || '0.00'}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            {selectedOrder.shippingAddress && (
              <div className="modal-section">
                <strong>Shipping Address:</strong><br/>
                {selectedOrder.shippingAddress.fullName}<br/>
                {selectedOrder.shippingAddress.address1}
                {selectedOrder.shippingAddress.address2 && <>, {selectedOrder.shippingAddress.address2}</>}<br/>
                {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}<br/>
                {selectedOrder.shippingAddress.country}
              </div>
            )}
            <div className="modal-section">
              <strong>Shipping Method:</strong> {selectedOrder.shippingMethod || 'Standard'}
            </div>
            <div className="modal-section">
              <strong>Payment Method:</strong> {selectedOrder.paymentMethod || 'Card'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}