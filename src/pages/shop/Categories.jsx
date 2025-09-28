import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../../data/Products";
import { slugify } from "../../utils/Slugify";
import ProductCard from "../../components/shop/ProductCard";

export default function Categories() {
  const { slug } = useParams();

  // Filter products by category slug
  const filtered = products.filter((p) => {
    const cats = p.categories || [p.category];
    return cats.some((c) => slugify(c) === slug);
  });

  // Format slug into readable title
  const prettyTitle = slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl md:text-2xl font-bold mb-6">{prettyTitle}</h1>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} wishlist={[]} toggleWishlist={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}
