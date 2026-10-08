import { Link } from 'react-router-dom';

const POSTERS = [
  {
    id: 1,
    category: 'AUDIO & GADGETS',
    badge: 'HOT DEAL',
    title: 'Studio Quality Wireless Headsets',
    tagline: 'Active noise cancelling & 40-hour battery life.',
    offer: 'Starts at $39.99 • Save 45%',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    link: '/products',
  },
  {
    id: 2,
    category: 'LUXURY BEAUTY',
    badge: 'TRENDING',
    title: 'Artisan French Perfumes & Care',
    tagline: 'Captivating notes of citrus, cedar & vanilla orchid.',
    offer: 'Free Travel Atomizer with orders $50+',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    link: '/products',
  },
  {
    id: 3,
    category: 'STREET & ATHLETIC',
    badge: 'LIMITED DROP',
    title: 'Performance Sneakers & Runners',
    tagline: 'Ultra-cushioned responsive everyday footwear.',
    offer: 'Limited Pairs Available Now',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    link: '/products',
  },
];

export default function PromoPosters() {
  return (
    <section className="promo-posters-section" aria-label="Featured Product Posters">
      <div className="promo-posters-grid">
        {POSTERS.map((poster) => (
          <Link
            key={poster.id}
            to={poster.link}
            className="poster-card"
          >
            <div className="poster-image-container">
              <img
                src={poster.image}
                alt={poster.title}
                className="poster-image"
                loading="lazy"
              />
              <div className="poster-overlay"></div>
            </div>

            <div className="poster-content">
              <div className="poster-header-badges">
                <span className="poster-cat-badge">{poster.category}</span>
                <span className="poster-pill-badge">{poster.badge}</span>
              </div>

              <h3 className="poster-title">{poster.title}</h3>
              <p className="poster-tagline">{poster.tagline}</p>

              <div className="poster-footer">
                <span className="poster-offer">{poster.offer}</span>
                <span className="poster-arrow-btn">Shop Now →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
