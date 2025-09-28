export const extractSlugParts = (slug) => {
  const [idPart, ...slugParts] = slug.split("-");
  return {
    id: parseInt(idPart, 10),
    slugText: slugParts.join("-")
  };
};

export const getStockForSize = (product, size) => {
  const sizeData = product.sizes?.find((s) => s.size === size);
  return sizeData?.stock ?? null;
};

export const validatePurchase = (selectedSize, quantity, stock) => {
  if (!selectedSize) {
    return { isValid: false, error: "Please select size" };
  }
  
  if (stock !== null && stock <= 0) {
    return { isValid: false, error: "Ukuran ini sudah habis!" };
  }
  
  if (quantity > stock) {
    return { 
      isValid: false, 
      error: `Stock tidak mencukupi. Maksimal ${stock} item untuk size ${selectedSize}.` 
    };
  }
  
  return { isValid: true, error: null };
};

export const getProductImages = (product) => {
  return [
    product.image, 
    product.imageBack, 
    ...(product.extraImages || [])
  ].filter(Boolean);
};