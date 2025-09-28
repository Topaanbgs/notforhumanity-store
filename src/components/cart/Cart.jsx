import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FaTimes, FaShoppingCart, FaLock, FaShieldAlt } from "react-icons/fa";
import { products } from "../../data/Products";
import { slugify } from "../../utils/Slugify";
import { formatCurrency } from "../../utils/Currency";

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
          <h3 className="text-md font-bold">Select Size for {product.name}</h3>
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

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, isCartOpen, closeCart, addToCart, moveToWishlist } = useCart();
  const [modalProduct, setModalProduct] = useState(null);

  const recentlyViewed = products.slice(0, 12);

  const handleAddToCartFromRecentlyViewed = (product) => {
    if (product.sizes && product.sizes.length > 0) {
      setModalProduct(product);
    } else {
      handleFinalAddToCart(product, null);
    }
  };

  const handleFinalAddToCart = (product, selectedSize) => {
    const sizeToUse = selectedSize || product.size || null;
    addToCart(product, 1, sizeToUse);
  };

  const getFormattedPrice = (price) => {
    if (typeof price === "string" && price.startsWith("Rp")) {
      return price;
    }
    return formatCurrency(price);
  };

  const RecentlyViewedItem = ({ product }) => (
    <Link to={`/products/${product.id}-${slugify(product.name)}`} onClick={closeCart} className="relative p-2 hover:shadow transition flex flex-col items-start group">
      <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-2" />
      <div className="flex-1 w-full">
        <p className="font-medium text-xs line-clamp-2 text-gray-800">{product.name}</p>
        <p className="text-red-600 font-semibold text-sm">{getFormattedPrice(product.price)}</p>
      </div>
      <button
        className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow hover:bg-white transition opacity-0 group-hover:opacity-100"
        onClick={(e) => {
          e.preventDefault();
          handleAddToCartFromRecentlyViewed(product);
        }}
        title="Add to Cart"
      >
        <FaShoppingCart className="text-red-500 text-sm" />
      </button>
    </Link>
  );

  return (
    <>
      {isCartOpen && <div className="fixed inset-0 bg-black/30 z-40" onClick={closeCart} />}

      <div className={`fixed top-0 right-0 w-full sm:w-[480px] h-screen bg-white shadow-lg z-50 flex flex-col transform transition-transform duration-300 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-xl font-bold">Cart</h1>
          <button onClick={closeCart} className="text-gray-500 hover:text-gray-800">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {!Array.isArray(cart) || cart.length === 0 ? (
            <div className="text-center flex flex-col items-center justify-center">
              <p className="text-lg font-semibold mb-2">Your cart is empty</p>
              <p className="text-gray-600 mb-4">Discover products or log in to pick up where you left off.</p>

              <Link to="/" onClick={closeCart} className="w-full text-center border border-red-600 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition">
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
              {cart.map((item) => {
                const stockInfo = item.sizes?.find((s) => s.size === item.size);
                const maxStock = stockInfo ? stockInfo.stock : Infinity;

                return (
                  <div key={`${item.id}-${item.size}`} className="flex items-start mb-4 pb-4 last:border-b-0">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4 flex-shrink-0" />

                    <div className="flex-1">
                      <h2 className="font-semibold text-sm">{item.name}</h2>
                      {item.size && <p className="text-gray-500 text-sm">Size: {item.size}</p>}
                      <p className="text-gray-800 font-semibold text-sm">{getFormattedPrice(item.price)}</p>
                      {stockInfo && stockInfo.stock <= 3 && <p className="text-xs text-red-500 font-medium">Only {stockInfo.stock} left!</p>}

                      <div className="flex gap-2 text-xs mt-2">
                        <button className="text-blue-500 hover:underline" onClick={() => moveToWishlist(item.id, item.size)}>
                          Move to wishlist
                        </button>
                        <button className="text-red-500 hover:underline" onClick={() => removeFromCart(item.id, item.size)}>
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center border h-10 rounded-lg flex-shrink-0 ml-4">
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="px-2 py-1 text-gray-700 rounded-sm hover:bg-gray-100 transition" disabled={item.quantity <= 1}>
                        −
                      </button>
                      <span className="px-2 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className={`px-2 py-1 text-gray-700 rounded-sm hover:bg-gray-100 transition ${item.quantity >= maxStock ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={item.quantity >= maxStock}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-2 text-center text-sm text-gray-600 mb-6">
                  <div className="flex flex-col items-center gap-1 border-r pr-2">
                    <FaLock className="text-lg text-gray-700" />
                    <span>Secure payment</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 pl-2">
                    <FaShieldAlt className="text-lg text-gray-700" />
                    <span>Privacy protection</span>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="font-semibold mb-3 pb-2">Recently Viewed</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {recentlyViewed.map((product) => (
                      <RecentlyViewedItem key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {Array.isArray(cart) && cart.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between mb-4">
              <p className="font-medium">Total Price ({cart.reduce((acc, it) => acc + it.quantity, 0)} items)</p>
              <p className="font-bold text-xl text-red-600">Rp {totalPrice.toLocaleString("id-ID")}</p>
            </div>
            <Link to="/checkout" onClick={closeCart} className="block w-full text-center border border-red-600 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition">
              Checkout
            </Link>
          </div>
        )}
      </div>

      {modalProduct && <SizeSelectionModal product={modalProduct} onSelect={(product, selectedSize) => handleFinalAddToCart(product, selectedSize)} onClose={() => setModalProduct(null)} />}
    </>
  );
}
