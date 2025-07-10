import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import AdminLogin from './AdminLogin';

const API = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: '', desc: '', price: '', image: '', category: '', quantity: 0 });
  const [tab, setTab] = useState('products');
  const [isAdmin, setIsAdmin] = useState(false);
  const [checked, setChecked] = useState(false);
  const [forceLogin, setForceLogin] = useState(true);
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Always require login for /admin
    setIsAdmin(false);
    setChecked(true);
    setForceLogin(true);
    // Optionally, clear any admin session
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    const res = await fetch(`${API}/products`);
    setProducts(await res.json());
  };

  // Fetch orders
  const fetchOrders = async () => {
    const res = await fetch(`${API}/orders`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    setOrders(await res.json());
  };

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchOrders();
    }
  }, [isAdmin]);

  // Handle form changes
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Create or update product
  const handleSubmit = async e => {
    e.preventDefault();
    const method = editingProduct ? 'PUT' : 'POST';
    const url = editingProduct ? `${API}/products/${editingProduct._id}` : `${API}/products`;

    // Validate and convert quantity for both add and edit
    let qty = Number(form.quantity);
    if (isNaN(qty) || form.quantity === '' || qty < 0) {
      alert('Please enter a valid quantity (0 or more).');
      return;
    }

    const submitForm = { ...form, quantity: qty };

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(submitForm)
    });

    setShowProductForm(false);
    setEditingProduct(null);
    setForm({ name: '', desc: '', price: '', image: '', category: '', quantity: 0 });
    await fetchProducts(); // Ensure dashboard updates after change
  };

  // Edit product
  const handleEdit = product => {
    setEditingProduct(product);
    setForm({ ...product, quantity: typeof product.quantity === 'number' ? product.quantity : 0 });
    setShowProductForm(true);
  };

  // Delete product
  const handleDelete = async id => {
    if (!window.confirm('Delete this product?')) return;
    await fetch(`${API}/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token }
    });
    fetchProducts();
  };

  // Update order status
  const handleStatusUpdate = async (orderId, newStatus) => {
    await fetch(`${API}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ status: newStatus })
    });
    fetchOrders();
  };

  // Add this function inside the AdminDashboard component, after handleDelete
  const handleDeleteOrder = async id => {
    if (!window.confirm('Delete this order?')) return;
    await fetch(`${API}/orders/${id}`, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token }
    });
    fetchOrders();
  };

  // Helper to get correct image URL for GitHub Pages
  const getImageUrl = (img) => {
    if (!img) return '';
    const fileName = img.split('/').pop();
    return `${import.meta.env.BASE_URL}images/${fileName}`;
  };

  if (!checked) return null;
  if (forceLogin) return <AdminLogin onLogin={() => { setIsAdmin(true); setForceLogin(false); }} />;
  if (!isAdmin) return (
    <div style={{padding: '4rem', textAlign: 'center', color: 'red', fontWeight: 600, fontSize: '1.3rem'}}>
      Error: This path can only be accessed by an admin user.
    </div>
  );

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <button className={tab === 'products' ? 'active' : ''} onClick={() => setTab('products')}>Products</button>
          <button className={tab === 'orders' ? 'active' : ''} onClick={() => setTab('orders')}>Orders</button>
        </nav>
        <button
          style={{ marginTop: '2rem', background: '#f44336', color: '#fff', width: '100%', borderRadius: '0.5rem', padding: '0.7rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.reload();
          }}
        >
          Logout
        </button>
      </aside>
      <main className="admin-main">
        <header className="admin-header">
          <h1>{tab === 'products' ? 'Manage Products' : 'Track Orders'}</h1>
          {tab === 'products' && (
            <button className="add-btn" onClick={() => { setShowProductForm(true); setEditingProduct(null); setForm({ name: '', desc: '', price: '', image: '', category: '', quantity: 0 }); }}>+ Add Product</button>
          )}
        </header>
        {tab === 'products' && (
          <section>
            <div className="admin-search-bar-wrapper">
              <span className="admin-search-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7"/>
                  <line x1="16.5" y1="16.5" x2="21" y2="21"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search products by name or category..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="admin-search-bar"
              />
            </div>
            {showProductForm && (
              <div className="modal">
                <form className="product-form" onSubmit={handleSubmit}>
                  <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
                  <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                  <input name="desc" placeholder="Description" value={form.desc} onChange={handleChange} />
                  <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} required />
                  <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
                  {/* Replace this input with a dropdown for category */}
                  <select
                    name="category"
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    required
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="Serums">Serums</option>
                    <option value="Creams">Creams</option>
                    <option value="Cleansers">Cleansers</option>
                  </select>
                  <input
                    name="quantity"
                    type="number"
                    min="0"
                    placeholder="Quantity"
                    value={form.quantity}
                    onChange={e => setForm({ ...form, quantity: e.target.value === '' ? 0 : Number(e.target.value) })}
                    required
                  />
                  <div className="form-actions">
                    <button type="submit">{editingProduct ? 'Update' : 'Create'}</button>
                    <button type="button" onClick={() => { setShowProductForm(false); setEditingProduct(null); }}>Cancel</button>
                  </div>
                </form>
              </div>
            )}
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products
                  .filter(p =>
                    p.name.toLowerCase().includes(search.toLowerCase()) ||
                    (p.category && p.category.toLowerCase().includes(search.toLowerCase()))
                  )
                  .map(p => (
                    <tr key={p._id}>
                      <td>{p.name}</td>
                      <td>{p.desc}</td>
                      <td>${p.price}</td>
                      <td>{p.category}</td>
                      <td>{p.quantity ?? 0}</td>
                      <td>
                        <button onClick={() => handleEdit(p)} style={{ marginRight: '0.5rem' }}>Edit</button>
                        <button onClick={() => handleDelete(p._id)} className="danger">Delete</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>
        )}
        {tab === 'orders' && (
          <section>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o._id}>
                    <td>{o._id.slice(-8)}</td>
                    <td>
                      <div>
                        <strong>{o.shippingAddress?.fullName || 'N/A'}</strong><br/>
                        <small>{o.shippingAddress?.email || o.user?.email || 'N/A'}</small><br/>
                        <small>{o.shippingAddress?.phone || 'N/A'}</small>
                      </div>
                    </td>
                    <td>
                      <div className="order-items">
                        {o.items.map((item, index) => (
                          <div key={index} className="order-item">
                            <img
                              src={item.image ? getImageUrl(item.image) : getImageUrl('default.jpg')}
                              alt={item.name}
                              className="item-image"
                            />
                            <div>
                              <strong>{item.name}</strong><br/>
                              <small>Qty: {item.quantity} × ${item.price}</small>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>${o.total}</td>
                    <td>
                      <select 
                        value={o.status} 
                        onChange={(e) => handleStatusUpdate(o._id, e.target.value)}
                        className="status-select"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => handleDeleteOrder(o._id)} className="danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
} 