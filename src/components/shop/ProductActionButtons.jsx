import { FaRegComment } from "react-icons/fa";

const ActionButton = ({ 
  onClick, 
  variant = "outline", 
  children, 
  className = "" 
}) => {
  const getButtonClasses = () => {
    const baseClasses = "flex-1 text-center py-3 rounded-lg font-semibold transition";
    
    if (variant === "filled") {
      return `${baseClasses} border border-red-600 bg-red-600 text-white hover:bg-white hover:text-red-600`;
    }
    
    return `${baseClasses} border border-red-600 bg-white text-red-600 hover:bg-red-600 hover:text-white`;
  };

  return (
    <button 
      onClick={onClick} 
      className={`${getButtonClasses()} ${className}`}
    >
      {children}
    </button>
  );
};

const MessageSellerButton = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="w-full border border-red-600 bg-red-600 text-white font-semibold hover:bg-white hover:text-red-600 transition rounded-lg py-3 flex items-center justify-center gap-2 mb-6"
  >
    <FaRegComment /> Message Seller
  </button>
);

const ProductActionButtons = ({ 
  onAddToCart, 
  onBuyNow, 
  onMessageSeller 
}) => {
  return (
    <div>
      <div className="flex gap-3 mb-4 mt-4">
        <ActionButton onClick={onAddToCart}>
          Add to Cart
        </ActionButton>
        <ActionButton onClick={onBuyNow}>
          Buy It Now
        </ActionButton>
      </div>
      
      <div className="mt-auto">
        <MessageSellerButton onClick={onMessageSeller} />
      </div>
    </div>
  );
};

export default ProductActionButtons;