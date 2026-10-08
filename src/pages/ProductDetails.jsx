import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        setActiveImage(data.image || '');
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Product not found');
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      setAdded(true);
      setTimeout(() => setAdded(false), 2200);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      navigate('/checkout', {
        state: { buyNowProduct: { ...product, quantity } },
      });
    }
  };

  if (loading) return <Loader message="Fetching product details & reviews..." />;
  if (error || !product) {
    return (
      <div className="page error-page">
        <h2>Product Not Found</h2>
        <p>Sorry, we could not find product #{id}.</p>
        <Link to="/products" className="btn-primary">Back to Catalog</Link>
      </div>
    );
  }

  const hasDiscount = product.discountPercentage > 0;
  const isLowStock = product.stock <= 10;

  return (
    <div className="page product-details-page">
      <div className="breadcrumbs">
        <Link to="/">Home</Link> <span>/</span>
        <Link to="/products">Products</Link> <span>/</span>
        <span className="current">{product.title}</span>
      </div>

      <div className="details-layout">
        {/* Left: Gallery */}
        <div className="details-gallery">
          <div className="details-image-box">
            {hasDiscount && (
              <span className="badge-discount-lg">
                -{Math.round(product.discountPercentage)}% OFF
              </span>
            )}
            <img src={activeImage || product.image} alt={product.title} />
          </div>

          {Array.isArray(product.images) && product.images.length > 1 && (
            <div className="thumbnail-row">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`thumb-btn ${activeImage === imgUrl ? 'active' : ''}`}
                  onClick={() => setActiveImage(imgUrl)}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info, Price, Actions */}
        <div className="details-info">
          <div className="details-meta-top">
            <span className="product-category-tag">{product.category}</span>
            {product.brand && <span className="product-brand-badge">{product.brand}</span>}
            <span className={`status-pill ${isLowStock ? 'status-low' : 'status-in'}`}>
              ● {product.availabilityStatus} ({product.stock} left)
            </span>
          </div>

          <h1 className="details-title">{product.title}</h1>

          <div className="details-rating-summary">
            <span className="stars-gold">★</span>
            <span className="rating-score">{product.rating?.rate}</span>
            <span className="rating-divider">•</span>
            <a href="#reviews-section" className="review-anchor">
              {product.reviews?.length || product.rating?.count || 0} Customer Reviews
            </a>
            <span className="rating-divider">•</span>
            <span className="sku-code">SKU: {product.sku}</span>
          </div>

          <div className="details-price-box">
            <div className="price-main">{formatPrice(product.price)}</div>
            {hasDiscount && (
              <div className="price-was">
                <span className="original-strike">{formatPrice(product.originalPrice)}</span>
                <span className="save-amount">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </div>
            )}
          </div>

          <p className="details-description">{product.description}</p>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="details-tags">
              {product.tags.map((tag) => (
                <span key={tag} className="tag-pill">#{tag}</span>
              ))}
            </div>
          )}

          {/* Add to Cart Controls */}
          <div className="details-actions">
            <div className="qty-selector">
              <label htmlFor="qty-input">Qty:</label>
              <div className="qty-buttons">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span id="qty-input">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              className={`btn-primary btn-add-full ${added ? 'btn-success' : ''}`}
              onClick={handleAddToCart}
            >
              {added ? '✓ Added to Cart!' : `Add to Cart • ${formatPrice(product.price * quantity)}`}
            </button>

            <button
              type="button"
              className="btn-buy-now"
              onClick={handleBuyNow}
              title={`Buy now for ${formatPrice(product.price * quantity)}`}
            >
              ⚡ Buy Now • {formatPrice(product.price * quantity)}
            </button>
          </div>

          {/* Guarantees & Shipping Badges */}
          <div className="product-perks-grid">
            <div className="perk-card">
              <span className="perk-icon">🚚</span>
              <div>
                <strong>Shipping</strong>
                <p>{product.shippingInformation}</p>
              </div>
            </div>
            <div className="perk-card">
              <span className="perk-icon">🛡️</span>
              <div>
                <strong>Warranty</strong>
                <p>{product.warrantyInformation}</p>
              </div>
            </div>
            <div className="perk-card">
              <span className="perk-icon">🔄</span>
              <div>
                <strong>Returns</strong>
                <p>{product.returnPolicy}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Dimensions Section */}
      <section className="specs-section">
        <h2 className="section-title">Product Specifications</h2>
        <div className="specs-grid">
          <div className="spec-item">
            <span className="spec-label">Brand</span>
            <span className="spec-value">{product.brand}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Category</span>
            <span className="spec-value capitalize">{product.category}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Stock Quantity</span>
            <span className="spec-value">{product.stock} units</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Weight</span>
            <span className="spec-value">{product.weight}g</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Dimensions (W × H × D)</span>
            <span className="spec-value">
              {product.dimensions?.width} × {product.dimensions?.height} × {product.dimensions?.depth} cm
            </span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Min. Order Qty</span>
            <span className="spec-value">{product.minimumOrderQuantity} unit(s)</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">SKU Identifier</span>
            <span className="spec-value">{product.sku}</span>
          </div>
          {product.meta?.qrCode && (
            <div className="spec-item qr-spec">
              <span className="spec-label">Product QR Code</span>
              <img src={product.meta.qrCode} alt="Product QR" className="qr-thumbnail" />
            </div>
          )}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews-section" className="reviews-section">
        <div className="reviews-header">
          <div>
            <h2 className="section-title">Customer Reviews</h2>
            <p className="section-subtitle">Real verified feedback from customers</p>
          </div>
          <div className="overall-score-badge">
            <span className="score-big">{product.rating?.rate}</span>
            <div className="score-stars">
              {'★'.repeat(Math.round(product.rating?.rate || 5))}
              <span className="score-label">out of 5 stars</span>
            </div>
          </div>
        </div>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="reviews-cards-grid">
            {product.reviews.map((rev, index) => (
              <div key={index} className="review-card">
                <div className="review-top">
                  <div className="reviewer-avatar">
                    {(rev.reviewerName || 'Customer').charAt(0).toUpperCase()}
                  </div>
                  <div className="reviewer-meta">
                    <span className="reviewer-name">{rev.reviewerName}</span>
                    <span className="verified-badge">✓ Verified Buyer</span>
                  </div>
                  <span className="review-stars">
                    {'★'.repeat(rev.rating)}
                    <span className="stars-empty">{'☆'.repeat(5 - rev.rating)}</span>
                  </span>
                </div>

                <p className="review-comment">"{rev.comment}"</p>

                <div className="review-bottom">
                  <span className="review-date">
                    {new Date(rev.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-reviews">
            <p>No customer reviews written yet for this item.</p>
          </div>
        )}
      </section>
    </div>
  );
}
