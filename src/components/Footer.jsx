export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>&copy; {new Date().getFullYear()} ShopFlow Ecommerce. All rights reserved.</p>
        <div className="footer-links">
          <span>Fast Shipping</span> • <span>Easy Returns</span> • <span>Secure Checkout</span>
        </div>
      </div>
    </footer>
  );
}
