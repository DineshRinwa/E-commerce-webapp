export default function CategoryFilter({
  categories = [],
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <div className="category-filter">
      <button
        type="button"
        className={`filter-chip ${selectedCategory === 'all' ? 'active' : ''}`}
        onClick={() => onSelectCategory('all')}
      >
        All Items
      </button>

      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`filter-chip ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
