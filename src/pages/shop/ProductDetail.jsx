import React from "react";
import { useParams } from "react-router-dom";
import { products as staticProducts } from "../../data/Products";

import ImageGallery from "../../components/shop/ImageGallery";
import ProductDescription from "../../components/shop/ProductDescription";
import StarRating from "../../components/shop/StarRating";
import SizeSelector from "../../components/shop/SizeSelector";
import QuantitySelector from "../../components/shop/QuantitySelector";
import ProductActionButtons from "../../components/shop/ProductActionButtons";
import InfoTabs from "../../components/shop/InfoTabs";
import SizeGuideModal from "../../components/shop/SizeGuideModal";

import { useProductDetail } from "../../hooks/useProductDetail";
import { useSlugValidation } from "../../hooks/useSlugValidation";
import { useProductActions } from "../../hooks/useProductActions";
import { useModalState } from "../../hooks/useModalState";

import { extractSlugParts, getStockForSize, getProductImages } from "../../utils/ProductDetail";
import { useProduct } from "../../context/ProductContext";
import { formatCurrency } from "../../utils/Currency";

export default function ProductDetail() {
  const { slug } = useParams();
  const { id, slugText } = extractSlugParts(slug);

  let productContext = null;
  try {
    productContext = useProduct();
  } catch (e) {
    productContext = null;
  }

  const productFromContext = productContext?.getProductById?.(id) || productContext?.products?.find((p) => Number(p.id) === Number(id));
  const product = productFromContext || staticProducts.find((item) => Number(item.id) === Number(id));

  const { quantity, setQuantity, selectedSize, setSelectedSize, selectedImage, setSelectedImage, errorMsg, clearError, setError } = useProductDetail(product);

  const { showSizeGuide, openSizeGuide, closeSizeGuide, activeTab, setActiveTab } = useModalState();

  useSlugValidation(product, slugText);

  const { handleAddToCart, handleBuyNow, handleMessageSeller } = useProductActions(product);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto mt-10 mb-10 p-4 text-center">
        <p>Product not found.</p>
      </div>
    );
  }

  const images = getProductImages(product);
  const stockForSelected = selectedSize ? getStockForSize(product, selectedSize) : null;

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    clearError();
    setQuantity(1);
  };

  const handleAddToCartClick = () => {
    handleAddToCart(selectedImage, quantity, selectedSize, setError, () => setQuantity(1));
  };

  const handleBuyNowClick = () => {
    handleBuyNow(selectedImage, quantity, selectedSize, setError);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 mb-10 grid grid-cols-1 md:grid-cols-2 p-4 md:p-0">
      <div>
        <ImageGallery images={images} selectedImage={selectedImage} onImageSelect={setSelectedImage} productName={product.name} />
        <ProductDescription product={product} />
      </div>

      <div className="flex flex-col md:pl-8 mt-6 md:mt-0">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl md:text-3xl font-bold mb-2">{product.name}</h1>
            <StarRating rating={product.rating || 4.5} reviewCount={product.reviewCount} />
          </div>
        </div>

        <p className="text-lg font-semibold text-gray-800 mb-4">{formatCurrency(product.price)}</p>

        <SizeSelector sizes={product.sizes} selectedSize={selectedSize} onSizeSelect={handleSizeSelect} onOpenSizeGuide={openSizeGuide} errorMessage={errorMsg} getStockForSize={(size) => getStockForSize(product, size)} />

        <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} maxStock={stockForSelected} selectedSize={selectedSize} />

        <ProductActionButtons onAddToCart={handleAddToCartClick} onBuyNow={handleBuyNowClick} onMessageSeller={handleMessageSeller} />

        <InfoTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <SizeGuideModal isOpen={showSizeGuide} onClose={closeSizeGuide} image={product.sizeGuideImage || "/default-size-guide.jpg"} />
    </div>
  );
}
