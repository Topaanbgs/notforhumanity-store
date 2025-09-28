import React from "react";
import { Link } from "react-router-dom";
import { FaFire, FaHeart, FaRegHeart } from "react-icons/fa";
import { slugify } from "../../utils/Slugify";
import { useWishlist } from "../../context/WishlistContext";

// Product card
export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWished = isInWishlist(product.id);

  // id-name slug for product route
  const productSlug = `${product.id}-${slugify(product.name)}`;

  // Format price (number -> IDR string). Preserve non-number values.
  const formatPrice = (price) => {
    if (typeof price === "number") {
      return price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    }
    return price;
  };

  return (
    <Link to={`/products/${productSlug}`} className="rounded-lg shadow hover:shadow-lg transition bg-white relative group block cursor-pointer">
      {/* Best seller badge */}
      {product.bestSeller && <FaFire className="absolute top-2 left-2 text-red-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl z-10" />}

      {/* Wishlist button */}
      <div className="absolute bottom-2 right-2 z-10">
        <button
          className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWished ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-red-500" />}
        </button>
      </div>

      {/* Images hover swap */}
      <div className="relative w-full h-60 overflow-hidden rounded-t-lg z-0">
        <img src={product.image} alt={`${product.name} Front`} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0 z-0" />
        <img src={product.imageBack} alt={`${product.name} Back`} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0" />
      </div>

      {/* Basic product info */}
      <div className="p-4">
        <h2 className="font-semibold text-lg">{product.name}</h2>
        <p className="font-medium mt-1 text-red-600">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
