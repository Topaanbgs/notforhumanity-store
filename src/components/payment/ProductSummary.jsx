import { formatCurrency, normalizePrice } from "../../utils/Currency";

const ProductItem = ({ item }) => {
  const qty = item.quantity || 1;
  const priceNum = normalizePrice(item.price || item.priceNumber || 0);

  return (
    <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
      {item.image ? (
        <img src={item.image} alt={item.name || "Product"} className="w-20 h-20 object-cover rounded-md" />
      ) : (
        <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-400">No Image</div>
      )}
      <div className="flex-1">
        <p className="font-semibold text-sm">{item.name || "Product"}</p>
        <p className="text-xs text-gray-500">
          Size: {item.size || "-"} | Quantity: {qty}
        </p>
      </div>
      <p className="font-semibold text-sm">{formatCurrency(priceNum * qty)}</p>
    </div>
  );
};

const ProductSummary = ({ items = [] }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      {items.length > 0 ? (
        <div className="space-y-4 max-h-[250px] overflow-y-auto mb-6">
          {items.map((item, index) => (
            <ProductItem key={index} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No items in your order.</p>
      )}
    </div>
  );
};

export default ProductSummary;
