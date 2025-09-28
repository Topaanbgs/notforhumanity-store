import { useState } from "react";
import { useProduct } from "../../context/ProductContext";
import { products as staticProducts } from "../../data/Products";
import { useSearch } from "../../context/SearchContext";
import ProductCard from "../shop/ProductCard";

export default function ProductSection() {
  const [sortBy, setSortBy] = useState("new");
  const { products: ctxProducts } = useProduct();
  const { query } = useSearch();

  const allProducts = ctxProducts.length > 0 ? ctxProducts : staticProducts;

  // Filter & sort
  const processed = (() => {
    let filtered = allProducts;

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)) || (p.categories && p.categories.some((cat) => cat.toLowerCase().includes(q))));
    }

    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "new":
          return new Date(b.createdAt || b.updatedAt || 0) - new Date(a.createdAt || a.updatedAt || 0);
        case "popular":
          return (b.rating || 0) * (b.reviewCount || 0) - (a.rating || 0) * (a.reviewCount || 0);
        case "price-low": {
          const pa = typeof a.price === "string" ? parseInt(a.price.replace(/[^\d]/g, "")) || 0 : a.price || 0;
          const pb = typeof b.price === "string" ? parseInt(b.price.replace(/[^\d]/g, "")) || 0 : b.price || 0;
          return pa - pb;
        }
        case "price-high": {
          const pa = typeof a.price === "string" ? parseInt(a.price.replace(/[^\d]/g, "")) || 0 : a.price || 0;
          const pb = typeof b.price === "string" ? parseInt(b.price.replace(/[^\d]/g, "")) || 0 : b.price || 0;
          return pb - pa;
        }
        case "featured":
        default:
          if (a.bestSeller && !b.bestSeller) return -1;
          if (!a.bestSeller && b.bestSeller) return 1;
          return (b.rating || 0) - (a.rating || 0);
      }
    });

    return filtered;
  })();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 mb-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">All Products</h2>
          {query && (
            <p className="text-gray-600 mt-1">
              Search results for "{query}" ({processed.length} found)
            </p>
          )}
        </div>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded px-3 py-2 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500">
          <option value="new">New Arrivals</option>
          <option value="featured">Featured</option>
          <option value="popular">Most Popular</option>
          <option value="price-low">Lowest Price</option>
          <option value="price-high">Highest Price</option>
        </select>
      </div>

      {processed.length === 0 ? (
        <div className="text-center py-12">
          {query ? (
            <div>
              <p className="text-gray-500 mb-4">No products found for "{query}".</p>
              <button onClick={() => (window.location.href = "/search")} className="text-red-600 hover:text-red-700 underline">
                Try advanced search
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-500 mb-4">No products available.</p>
              <p className="text-sm text-gray-400">Products will appear here once they're added via the admin panel.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {processed.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
