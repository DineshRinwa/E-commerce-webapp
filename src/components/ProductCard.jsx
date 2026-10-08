import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const hasDiscount = product.discountPercentage > 0;
  const isLowStock = product.stock <= 10;

  const handleBuyNow = () => {
    navigate('/checkout', {
      state: { buyNowProduct: { ...product, quantity: 1 } },
    });
  };


  return (
    <div className="product-card">
      <div className="product-card-badge-container">
        {hasDiscount && (
          <span className="badge-discount">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
        {isLowStock ? (
          <span className="badge-stock low">Only {product.stock} left</span>
        ) : (
          <span className="badge-stock in-stock">In Stock</span>
        )}
      </div>

      <Link to={`/products/${product.id}`} className="product-card-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="product-card-image"
          loading="lazy"
        />
      </Link>

      <div className="product-card-info">
        <div className="product-meta-header">
          <span className="product-category">{product.category}</span>
          {product.brand && <span className="product-brand-tag">{product.brand}</span>}
        </div>

        <h3 className="product-title">
          <Link to={`/products/${product.id}`} title={product.title}>
            {product.title}
          </Link>
        </h3>

        <div className="product-rating">
          <span className="stars">★</span>
          <span className="rate-num">{product.rating?.rate ?? '4.5'}</span>
          <span className="review-count">({product.rating?.count ?? 20})</span>
        </div>

        <div className="product-bottom">
          <div className="product-pricing">
            <span className="product-price">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="product-original-price">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            className="btn-add-cart"
            onClick={() => addToCart(product)}
            title="Add to shopping cart"
          >
            <span>+</span> Cart
          </button>


          <button
  type="button"
  className="buy-button"
  onClick={handleBuyNow}
  title="Buy this product now"
>
  Buy
</button>
        </div>
      </div>
    </div>
  );
}
