import { useState, useEffect, useMemo } from 'react';
import { fetchProducts, fetchCategories } from '../services/api';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ProductList from '../components/ProductList';
import Loader from '../components/Loader';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([prods, cats]) => {
        setProducts(prods);
        setCategories(cats);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading products page:', err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  return (
    <div className="page products-page">
      <div className="catalog-header">
        <h1>All Products</h1>
        <p>Browse our catalog of high quality items</p>
      </div>

      <div className="filters-container">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {loading ? (
        <Loader message="Loading catalog..." />
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
}
