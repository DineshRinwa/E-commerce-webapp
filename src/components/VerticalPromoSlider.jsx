import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    id: 1,
    badge: 'UPCOMING FLASH SALE',
    discount: 'UP TO 55% OFF',
    title: 'Next-Gen Audio & Smart Tech Extravaganza',
    subtitle: 'Starts this Friday at midnight. Score deep discounts on premium wireless headphones, 4K curved displays, and smart gadgets.',
    date: 'Starts in: 2 Days • Oct 10',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=80',
    link: '/products',
    category: 'electronics',
  },
  {
    id: 2,
    badge: 'NEW LAUNCH PREVIEW',
    discount: 'BUY 1 GET 1 40% OFF',
    title: 'Luxury Artisan Fragrances & Skincare Drop',
    subtitle: 'Curated French notes, floral essences, and clinical glow serums. Exclusive early-bird access for registered members.',
    date: 'Exclusive Drop • Limited Batches',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=80',
    link: '/products',
    category: 'beauty',
  },
  {
    id: 3,
    badge: 'LIMITED TIME EVENT',
    discount: 'SAVE 35% TODAY',
    title: 'Minimalist Chrono & Designer Lifestyle Gear',
    subtitle: 'Sleek sapphire crystal timepieces and handcrafted luxury leather accessories built for timeless modern aesthetics.',
    date: 'Pre-Order Now • Free Gift Included',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80',
    link: '/products',
    category: 'mens-watches',
  },
];

export default function VerticalPromoSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="vertical-slider-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Upcoming Sale Auto Showcase"
    >
      <div
        className="vertical-slider-track"
        style={{ transform: `translateY(-${current * 100}%)` }}
      >
        {SLIDES.map((slide, idx) => (
          <div key={slide.id} className="vertical-slider-slide">
            <div className="slide-media-wrapper">
              <img
                src={slide.image}
                alt={slide.title}
                className="slide-image"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
              <div className="slide-overlay-gradient"></div>
            </div>

            <div className="slide-content">
              <div className="slide-top-badges">
                <span className="slide-badge-sale">{slide.badge}</span>
                <span className="slide-badge-discount">{slide.discount}</span>
                <span className="slide-badge-date">{slide.date}</span>
              </div>

              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-subtitle">{slide.subtitle}</p>

              <div className="slide-action-row">
                <Link to={slide.link} className="btn-primary btn-slide-cta">
                  Explore Upcoming Deals →
                </Link>
                <span className="slide-auto-indicator">
                  ● Auto-cycling showcase ({current + 1}/{SLIDES.length})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vertical Navigation Dots / Indicators */}
      <div className="vertical-slider-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`slider-dot-btn ${current === i ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          >
            <span className="dot-number">0{i + 1}</span>
            <span className="dot-bar"></span>
          </button>
        ))}
      </div>
    </section>
  );
}
