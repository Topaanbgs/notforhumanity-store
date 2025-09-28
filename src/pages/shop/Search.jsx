import { useSearch } from "../../context/SearchContext";
import { products } from "../../data/Products";
import ProductCard from "../../components/shop/ProductCard";
import { useState } from "react";

export default function Search() {
  const { query } = useSearch();
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));

  if (!query || query.trim() === "") {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>Type something in the search bar above to find products.</p>
      </div>
    );
  }

  const filtered = products.filter((p) => {
    const nameMatch = p.name.toLowerCase().includes(query.toLowerCase());
    const categoryMatch = Array.isArray(p.categories) ? p.categories.some((c) => c.toLowerCase().includes(query.toLowerCase())) : false;
    return nameMatch || categoryMatch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl md:text-xl font-bold mb-6">
        Search results for: <span className="text-red-600">{query}</span>
      </h2>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} wishlist={wishlist} toggleWishlist={toggleWishlist} />
          ))}
        </div>
      )}
    </div>
  );
}
