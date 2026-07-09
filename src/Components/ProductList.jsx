import { useState, useMemo, useEffect } from "react"
import products from "../data/products.json"
import GlassCard from "./GlassCard"
import "./ProductList.css"

const ITEMS_PER_PAGE = 8;

function ProductList() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce the search input to avoid excessive filtering on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // reset to page 1 whenever the filters change
  useEffect(() => { setCurrentPage(1); }, [debouncedSearch, category]);

  function GetCategories() {
    const all = products.flatMap((product) => product.category)
    return ["all", ...new Set(all)];
  }

  function GetFilteredProducts() {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      const matchesCategory = category === "all" || product.category.includes(category);

      return matchesSearch && matchesCategory;
    })
  }

  // Build main list once
  const categories = useMemo(GetCategories, []);

  // Build filtered list whenever search or category changes
  const filteredProducts = useMemo(GetFilteredProducts, [debouncedSearch, category]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Get the products for the current page
  function GetPaginatedProducts() {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const paginatedProducts = useMemo(GetPaginatedProducts, [filteredProducts, currentPage]);

  // Assign handlers to update state on input changes
  function HandleSearchChange(e) {
    setSearch(e.target.value);
  };

  function HandleCategoryChange(e) {
    setCategory(e.target.value);
  };

  function HandlePreviousPage() {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  function HandleNextPage() {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  return (
    <div className="product-list">
      <div className="product-controls">
        <input type="text" className="search-input" placeholder="Search by name..." value={search} onChange={HandleSearchChange}/>

        <select className="category-select" value={category} onChange={HandleCategoryChange}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat === "all" ? "All categories" : cat}</option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="no-results">No pieces match your search — try a different term or category.</p>
      ) : (
        <>
          <div className="product-grid">
            {paginatedProducts.map((product) => (
              <GlassCard key={product.id} {...product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button className="pagination-button" onClick={HandlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button>

              <span className="pagination-status">
                Page {currentPage} of {totalPages}
              </span>

              <button className="pagination-button" onClick={HandleNextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ProductList