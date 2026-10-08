import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TICKER_ITEMS = [
  {
    id: 1,
    tag: '🔥 UPCOMING SALE',
    text: 'Up to 60% OFF Premium Electronics & Smart Accessories — Starts Friday!',
    link: '/products',
  },
  {
    id: 2,
    idTag: '⚡ NEW SEASON',
    tag: '⚡ NEW COLLECTION',
    text: 'Luxury Designer Fragrances & Beauty Essentials Just Dropped — Explore Now',
    link: '/products',
  },
  {
    id: 3,
    tag: '🚚 FREE DELIVERY',
    text: 'Complimentary Worldwide Express Shipping & 30-Day Hassle-Free Returns',
    link: '/products',
  },
];

export default function TopTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TICKER_ITEMS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="top-ticker-bar">
      <div className="ticker-wrapper">
        <div
          className="ticker-scroller"
          style={{ transform: `translateY(-${index * 36}px)` }}
        >
          {TICKER_ITEMS.map((item) => (
            <div key={item.id} className="ticker-item">
              <span className="ticker-badge">{item.tag}</span>
              <span className="ticker-text">{item.text}</span>
              <Link to={item.link} className="ticker-link">
                View Deals →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
