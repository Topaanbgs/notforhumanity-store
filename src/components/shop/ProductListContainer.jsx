import React, { useMemo } from "react";
import { useProduct } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";
import ProductCard from "./ProductCard";

const ProductList = ({ category = null, limit = null }) => {
  const { products, getProductsByCategory } = useProduct();
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState("name");

  const displayProducts = useMemo(() => {
    let filtered = category ? getProductsByCategory(category) : products;

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return limit ? filtered.slice(0, limit) : filtered;
  }, [products, category, sortBy, limit, getProductsByCategory]);

  const handleAddToCart = (product, size) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
    });
  };

  const handleViewDetails = (product) => {
    // Navigate to product detail page
    window.location.href = `/product/${product.id}`;
  };

  if (displayProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No products available</h3>
        <p className="text-gray-500">{category ? `No products found in "${category}" category.` : "No products in store yet."}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {category ? `${category} Products` : "All Products"}
          <span className="text-lg text-gray-500 ml-2">({displayProducts.length})</span>
        </h2>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
          <option value="name">Sort by Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest First</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} onViewDetails={handleViewDetails} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
