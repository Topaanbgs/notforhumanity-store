import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { validatePurchase, getStockForSize } from '../utils/ProductDetail';

export const useProductActions = (product) => {
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();

  const handleAddToCart = (selectedImage, quantity, selectedSize, onError, onSuccess) => {
    const stock = getStockForSize(product, selectedSize);
    const validation = validatePurchase(selectedSize, quantity, stock);
    
    if (!validation.isValid) {
      onError(validation.error);
      return;
    }

    addToCart({ ...product, image: selectedImage }, quantity, selectedSize);
    openCart();
    onSuccess();
  };

  const handleBuyNow = (selectedImage, quantity, selectedSize, onError) => {
    const stock = getStockForSize(product, selectedSize);
    const validation = validatePurchase(selectedSize, quantity, stock);
    
    if (!validation.isValid) {
      onError(validation.error);
      return;
    }

    navigate("/checkout", {
      state: {
        buyNowItem: {
          ...product,
          image: selectedImage,
          quantity,
          size: selectedSize,
        },
      },
    });
  };

  const handleMessageSeller = () => {
    console.log('Message seller functionality not implemented yet');
  };

  return {
    handleAddToCart,
    handleBuyNow,
    handleMessageSeller
  };
};