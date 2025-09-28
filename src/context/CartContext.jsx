import { createContext, useContext, useState } from "react";
import { useWishlist } from "./WishlistContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { addToWishlist, openWishlist } = useWishlist();

  // Add product to cart, handling size and stock
  const addToCart = (product, quantity = 1, selectedSize = null) => {
    const sizeToUse = selectedSize || product.size || null;
    const stockInfo = product.sizes?.find((s) => s.size === sizeToUse);
    const maxStock = stockInfo ? stockInfo.stock : Infinity;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === sizeToUse);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, maxStock);
        return prev.map((item) => (item.id === product.id && item.size === sizeToUse ? { ...item, quantity: newQty } : item));
      }
      return [...prev, { ...product, size: sizeToUse, quantity: Math.min(quantity, maxStock) }];
    });

    setIsCartOpen(true);
  };

  // Update item quantity with stock validation
  const updateQuantity = (id, size, newQuantity) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.size === size) {
            const stockInfo = item.sizes?.find((s) => s.size === size);
            const maxStock = stockInfo ? stockInfo.stock : Infinity;
            return {
              ...item,
              quantity: Math.max(1, Math.min(newQuantity, maxStock)),
            };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item by id and size
  const removeFromCart = (id, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  // Move item to wishlist (ignores size/quantity)
  const moveToWishlist = (id, size) => {
    const itemToMove = cart.find((item) => item.id === id && item.size === size);

    if (itemToMove) {
      removeFromCart(id, size);
      const productForWishlist = {
        ...itemToMove,
        quantity: undefined,
        size: undefined,
      };

      addToWishlist(productForWishlist);
      closeCart();
      openWishlist();
    }
  };

  const clearCart = () => setCart([]);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Convert formatted price string to number
  const parsePrice = (val) => {
    if (typeof val === "number") return val;
    if (!val) return 0;
    const digits = String(val)
      .replace(/\./g, "")
      .replace(/[^0-9]/g, "");
    return digits ? parseInt(digits, 10) : 0;
  };

  // Calculate total cart price
  const totalPrice = cart.reduce((sum, item) => {
    const num = parsePrice(item.price || item.priceNumber);
    return sum + num * (item.quantity || 0);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalPrice,
        isCartOpen,
        openCart,
        closeCart,
        moveToWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
