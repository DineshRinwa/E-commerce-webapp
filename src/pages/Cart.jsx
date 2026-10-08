import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import CartItem from '../components/CartItem';

export default function Cart() {
  const { cartItems, totalPrice, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="page empty-cart-page">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <button type="button" onClick={clearCart} className="btn-text">
          Clear Cart
        </button>
      </div>

      <div className="cart-content-layout">
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-summary-card">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="summary-row">
            <span>Estimated Shipping</span>
            <span className="free-shipping">FREE</span>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span className="summary-total-amount">{formatPrice(totalPrice)}</span>
          </div>

          <Link to="/checkout" className="btn-primary btn-block">
            Proceed to Checkout →
          </Link>

          <Link to="/products" className="continue-shopping">
            or Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
