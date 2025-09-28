const QuantityButton = ({ onClick, disabled = false, children }) => (
  <button 
    onClick={onClick} 
    disabled={disabled}
    className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {children}
  </button>
);

const StockWarning = ({ stock }) => {
  if (stock === null) return null;
  
  return (
    <p className="text-sm text-red-600 mb-4">
      Only {stock} left.
    </p>
  );
};

const QuantitySelector = ({ 
  quantity, 
  onQuantityChange, 
  maxStock,
  selectedSize 
}) => {
  const handleDecrease = () => {
    onQuantityChange(Math.max(1, quantity - 1));
  };

  const handleIncrease = () => {
    if (maxStock) {
      onQuantityChange(Math.min(maxStock, quantity + 1));
    } else {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <QuantityButton onClick={handleDecrease}>
          -
        </QuantityButton>
        <span className="px-4">{quantity}</span>
        <QuantityButton 
          onClick={handleIncrease}
          disabled={!selectedSize}
        >
          +
        </QuantityButton>
      </div>
      <StockWarning stock={maxStock} />
    </div>
  );
};

export default QuantitySelector;