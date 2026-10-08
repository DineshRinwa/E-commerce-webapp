import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import VerticalPromoSlider from '../components/VerticalPromoSlider';
import PromoPosters from '../components/PromoPosters';
import ProductList from '../components/ProductList';
import Loader from '../components/Loader';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setFeatured(data.slice(0, 8));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="page home-page">
      {/* 1. Top Vertical Auto-Scrolling Upcoming Sale Showcase */}
      <VerticalPromoSlider />

      {/* 2. Three Promotional Posters downside of it */}
      <PromoPosters />

      {/* 3. Featured Trending Products */}
      <section className="featured-section">
        <div className="section-header">
          <div>
            <h2>Trending Products</h2>
            <p className="section-subtitle">Top curated picks from our 100+ catalog items</p>
          </div>
          <Link to="/products" className="view-all-link">
            Explore All 100+ Products →
          </Link>
        </div>

        {loading ? (
          <Loader message="Loading trending products..." />
        ) : (
          <ProductList products={featured} />
        )}
      </section>
    </div>
  );
}
