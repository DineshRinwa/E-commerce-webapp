import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

export default function Checkout() {
  const { cartItems = [], clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  // Support both "Buy Now" (single product via route state) and normal cart checkout
  const buyNowProduct = location.state?.buyNowProduct;
  const items = buyNowProduct ? [buyNowProduct] : (cartItems ?? []);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Only clear the shared cart when checking out normally (not Buy Now)
    if (!buyNowProduct) clearCart();
  };

  if (submitted) {
    return (
      <div className="page checkout-success-page">
        <div className="success-card">
          <div className="success-icon">🎉</div>
          <h2>Thank You For Your Order!</h2>
          <p>
            We've received your order and will send an email confirmation to{' '}
            <strong>{formData.email}</strong>.
          </p>
          <Link to="/" className="btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Guard: if no items to checkout (neither Buy Now nor cart items), redirect user
  if (items.length === 0) {
    return (
      <div className="page empty-cart-page">
        <h2>Your Cart is Empty</h2>
        <p>Add some products before heading to checkout.</p>
        <Link to="/products" className="btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="page checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Shipping Information</h3>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Jane Doe"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="jane@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Street Address</label>
            <input
              id="address"
              name="address"
              type="text"
              required
              placeholder="123 Market St"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                required
                placeholder="San Francisco"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="zip">ZIP Code</label>
              <input
                id="zip"
                name="zip"
                type="text"
                required
                placeholder="94103"
                value={formData.zip}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary btn-block">
            Place Order ({formatPrice(totalPrice)})
          </button>
        </form>

        <div className="checkout-summary-card">
          <h3>Order Overview ({items.length} {items.length === 1 ? 'item' : 'items'})</h3>
          <ul className="checkout-items-list">
            {items.map((item) => (
              <li key={item.id} className="checkout-mini-item">
                <span className="mini-title">{item.title} (x{item.quantity})</span>
                <span className="mini-price">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="summary-row total-row">
            <span>Total to Pay:</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
