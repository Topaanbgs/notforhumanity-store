import React, { createContext, useContext, useState, useEffect } from "react";
import { products as staticProducts } from "../data/Products";

const initialProducts = staticProducts;
const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [categories] = useState(["Jersey", "T-Shirt", "Shorts", "Headwear", "Accessories", "Collaborations"]);

  // Persist products to localStorage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const generateId = () => {
    return Math.max(...products.map((p) => p.id || 0), 0) + 1;
  };

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: generateId(),
      price: Number(productData.price),
      rating: 0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProducts((prev) => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, productData) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              ...productData,
              price: Number(productData.price),
              updatedAt: new Date().toISOString(),
            }
          : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const getProductById = (id) => {
    return products.find((product) => product.id === Number(id));
  };

  const getProductsByCategory = (category) => {
    if (!category) return products;
    return products.filter((product) => product.categories && product.categories.includes(category));
  };

  const getTotalStock = (product) => {
    if (!product.sizes || !Array.isArray(product.sizes)) return 0;
    return product.sizes.reduce((total, size) => total + (size.stock || 0), 0);
  };

  const updateStock = (id, size, newStock) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            sizes: product.sizes.map((s) => (s.size === size ? { ...s, stock: newStock } : s)),
            updatedAt: new Date().toISOString(),
          };
        }
        return product;
      })
    );
  };

  const value = {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByCategory,
    getTotalStock,
    updateStock,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
