export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for products by name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={() => onSearchChange('')}
          className="search-clear-btn"
          title="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
