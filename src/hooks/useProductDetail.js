import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../utils/Slugify';

export const useProductDetail = (product) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(product?.image || "");
  const [errorMsg, setErrorMsg] = useState("");

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setSelectedSize("");
      setQuantity(1);
      setErrorMsg("");
    }
  }, [product]);

  const clearError = () => setErrorMsg("");

  const setError = (error) => setErrorMsg(error);

  return {
    quantity,
    setQuantity,
    selectedSize,
    setSelectedSize,
    selectedImage,
    setSelectedImage,
    errorMsg,
    clearError,
    setError
  };
};