import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <Link to={`/products/${item.id}`} className="cart-item-img-link">
        <img src={item.image} alt={item.title} className="cart-item-image" />
      </Link>

      <div className="cart-item-details">
        {item.brand && <span className="cart-item-brand">{item.brand}</span>}
        <h4 className="cart-item-title">
          <Link to={`/products/${item.id}`}>{item.title}</Link>
        </h4>
        <div className="cart-item-meta">
          <span className="cart-item-price">{formatPrice(item.price)} each</span>
          {item.discountPercentage > 0 && (
            <span className="cart-discount-tag">-{Math.round(item.discountPercentage)}%</span>
          )}
        </div>
      </div>

      <div className="cart-item-controls">
        <div className="qty-picker">
          <button
            type="button"
            onClick={() => updateQuantity(item.id, -1)}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            type="button"
            onClick={() => updateQuantity(item.id, 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <span className="cart-item-subtotal">
          {formatPrice(item.price * item.quantity)}
        </span>

        <button
          type="button"
          className="btn-remove"
          onClick={() => removeFromCart(item.id)}
          title="Remove item"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
