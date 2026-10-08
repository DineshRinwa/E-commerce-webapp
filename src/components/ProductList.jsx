import ProductCard from './ProductCard';

export default function ProductList({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="empty-state">
        <p>No products found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
