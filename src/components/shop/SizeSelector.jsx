const SizeChartButton = ({ onClick }) => (
  <button 
    className="flex items-center gap-1 text-sm font-semibold text-black hover:underline" 
    onClick={onClick}
  >
    Size Chart
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-4 w-4 text-gray-400" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="black"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M9 5l7 7-7 7" 
      />
    </svg>
  </button>
);

const SizeButton = ({ 
  size, 
  stock, 
  isSelected, 
  onClick 
}) => {
  const isOutOfStock = stock <= 0;
  
  const getButtonClasses = () => {
    if (isOutOfStock) {
      return "opacity-50 cursor-not-allowed line-through text-gray-400 border-gray-400 hover:bg-white hover:text-gray-400";
    }
    
    if (isSelected) {
      return "bg-red-600 text-white";
    }
    
    return "bg-white text-red-600 border-red-600 hover:bg-red-600 hover:text-white cursor-pointer";
  };

  return (
    <button
      onClick={() => !isOutOfStock && onClick(size)}
      disabled={isOutOfStock}
      className={`px-4 py-2 border rounded-md transition ${getButtonClasses()}`}
    >
      {size}
    </button>
  );
};

const SizeHeader = ({ onOpenSizeGuide }) => (
  <div className="flex items-center justify-between mb-2">
    <p className="font-medium">Size</p>
    <SizeChartButton onClick={onOpenSizeGuide} />
  </div>
);

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="mt-3 border border-red-200 bg-red-50 text-red-600 px-4 py-2 rounded">
      {message}
    </div>
  );
};

const SizeSelector = ({ 
  sizes, 
  selectedSize, 
  onSizeSelect, 
  onOpenSizeGuide,
  errorMessage,
  getStockForSize
}) => {
  return (
    <div className="mb-4">
      <SizeHeader onOpenSizeGuide={onOpenSizeGuide} />
      
      <div className="flex gap-2 flex-wrap">
        {sizes?.map((sizeData) => {
          const stock = sizeData.stock;
          const isSelected = selectedSize === sizeData.size;
          
          return (
            <SizeButton
              key={sizeData.size}
              size={sizeData.size}
              stock={stock}
              isSelected={isSelected}
              onClick={onSizeSelect}
            />
          );
        })}
      </div>
      
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default SizeSelector;