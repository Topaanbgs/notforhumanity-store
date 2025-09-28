import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaHeart } from "react-icons/fa";
import { products } from "../../data/Products";
import { slugify } from "../../utils/Slugify";
import { formatCurrency } from "../../utils/Currency";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const SizeSelectionModal = ({ product, onSelect, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]?.size || null);
  const handleAddToCart = () => {
    onSelect(product, selectedSize);
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Select Size for {product.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FaTimes />
          </button>
        </div>
        <div className="flex gap-2 flex-wrap mb-6">
          {product.sizes.map((s) => (
            <button
              key={s.size}
              onClick={() => setSelectedSize(s.size)}
              disabled={s.stock === 0}
              className={`px-4 py-2 border rounded-full text-sm font-medium transition ${s.size === selectedSize ? "bg-red-600 text-white border-red-600" : "bg-white text-gray-800 border-gray-300 hover:border-red-500"} ${
                s.stock === 0 ? "opacity-50 cursor-not-allowed line-through" : ""
              }`}
            >
              {s.size} {s.stock === 0 && "(Sold Out)"}
            </button>
          ))}
        </div>
        {product.sizes.length > 0 && (
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize || product.sizes.find((s) => s.size === selectedSize)?.stock === 0}
            className={`w-full text-center bg-red-600 text-white py-2 rounded-lg font-semibold transition ${
              !selectedSize || product.sizes.find((s) => s.size === selectedSize)?.stock === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
            }`}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default function Wishlist() {
  const { wishlist, removeFromWishlist, isWishlistOpen, closeWishlist, isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart, openCart, closeCart } = useCart();
  const [modalProduct, setModalProduct] = useState(null);

  const recentlyViewed = products.slice(0, 12);

  const handleFinalAddToCart = (product, selectedSize) => {
    const sizeToUse = selectedSize || product.size || null;
    addToCart(product, 1, sizeToUse);
    removeFromWishlist(product.id);
    closeWishlist();
    openCart();
  };

  const handleMoveToCart = (product) => {
    if (product.sizes && product.sizes.length > 0) {
      setModalProduct(product);
    } else {
      handleFinalAddToCart(product, null);
    }
  };

  const getFormattedPrice = (price) => {
    if (typeof price === "string" && price.startsWith("Rp")) {
      return price;
    }
    return formatCurrency(price);
  };

  const RecentlyViewedItem = ({ product }) => {
    const wished = isInWishlist(product.id);
    return (
      <Link to={`/products/${product.id}-${slugify(product.name)}`} onClick={closeWishlist} className="relative p-2 hover:shadow transition flex flex-col items-start group">
        <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-2" />
        <div className="flex-1 w-full">
          <p className="font-medium text-xs line-clamp-2 text-gray-800">{product.name}</p>
          <p className="text-red-600 font-semibold text-sm">{getFormattedPrice(product.price)}</p>
        </div>
        <button
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow hover:bg-white transition opacity-0 group-hover:opacity-100"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          title={wished ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <FaHeart className={`text-sm transition ${wished ? "text-red-600" : "text-gray-400 hover:text-red-600"}`} />
        </button>
      </Link>
    );
  };

  return (
    <>
      {isWishlistOpen && <div className="fixed inset-0 bg-black/30 z-40" onClick={closeWishlist} />}

      <div className={`fixed top-0 right-0 w-full sm:w-[480px] h-screen bg-white shadow-lg z-50 flex flex-col transform transition-transform duration-300 ${isWishlistOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <FaHeart className="text-red-600" /> Wishlist ({wishlist.length})
          </h1>
          <button onClick={closeWishlist} className="text-gray-500 hover:text-gray-800">
            <FaTimes size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {!Array.isArray(wishlist) || wishlist.length === 0 ? (
            <div className="text-center flex flex-col items-center justify-center">
              <p className="text-lg font-semibold mb-2">Your Wishlist is empty</p>
              <p className="text-gray-600 mb-4">You don't have any products on your wishlist.</p>
              <Link to="/" onClick={closeWishlist} className="w-full text-center border border-red-600 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition">
                Continue Shopping
              </Link>
              <div className="mt-8 w-full text-left">
                <h3 className="font-semibold mb-3 pb-2 border-b">Recently Viewed</h3>
                <div className="grid grid-cols-2 gap-4">
                  {recentlyViewed.map((product) => (
                    <RecentlyViewedItem key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {wishlist.map((item) => (
                <div key={item.id} className="flex items-start mt-2">
                  <Link to={`/products/${item.id}-${slugify(item.name)}`} onClick={closeWishlist} className="flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded mr-4" />
                  </Link>
                  <div className="flex-1">
                    <h2 className="font-semibold text-sm">{item.name}</h2>
                    <p className="text-gray-800 font-semibold text-sm mt-1">{getFormattedPrice(item.price)}</p>
                    <div className="flex gap-2 text-xs mt-2">
                      <button className="text-blue-500 hover:underline" onClick={() => handleMoveToCart(item)}>
                        Add to Cart
                      </button>
                      <button className="text-red-500 hover:underline" onClick={() => removeFromWishlist(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t">
                <h3 className="font-semibold mb-3 pb-2">Recently Viewed</h3>
                <div className="grid grid-cols-2 gap-4">
                  {recentlyViewed.map((product) => (
                    <RecentlyViewedItem key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {modalProduct && <SizeSelectionModal product={modalProduct} onSelect={(product, selectedSize) => handleFinalAddToCart(product, selectedSize)} onClose={() => setModalProduct(null)} />}
    </>
  );
}
