const ContinueShoppingButton = ({ onClick }) => (
  <button 
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      onClick?.(e);
    }}
    className="w-full py-3 border border-red-600 bg-red-600 text-white hover:bg-white hover:text-red-600 rounded-lg font-semibold transition duration-300"
  >
    Continue Shopping
  </button>
);

export default ContinueShoppingButton;
