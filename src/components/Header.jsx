import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { totalCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="header-inner" ref={menuRef}>
        <Link to="/" className="brand-logo">
          🛍️ <span>ShopFlow</span>
        </Link>

        {/* Desktop nav */}
        <nav className="nav-links nav-desktop">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
            Products
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? 'cart-link active' : 'cart-link')}>
            🛒 Cart
            {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
          </NavLink>
        </nav>

        {/* Hamburger button (mobile only) */}
        <button
          className={`hamburger-btn${menuOpen ? ' open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="ham-line" />
          <span className="ham-line" />
          <span className="ham-line" />
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}

      {/* Mobile slide-in nav drawer - only rendered when open to eliminate any ghost space or scrolling */}
      {menuOpen && (
        <nav className="mobile-nav-drawer open" aria-hidden="false">
          <div className="mobile-nav-header">
            <Link to="/" className="brand-logo" onClick={() => setMenuOpen(false)}>
              🛍️ <span>ShopFlow</span>
            </Link>
            <button className="mobile-close-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
          </div>
          <div className="mobile-nav-links">
            <NavLink to="/" end className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}>
              🏠 Home
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}>
              🏪 Products
            </NavLink>
            <NavLink to="/cart" className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}>
              🛒 Cart
              {totalCount > 0 && <span className="cart-badge mobile-cart-badge">{totalCount}</span>}
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}
