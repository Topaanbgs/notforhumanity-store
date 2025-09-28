import ProductSummary from "./ProductSummary";
import OrderDetails from "./OrderDetails";
import ActionButtons from "../common/ActionButtons";

const OrderSummary = ({ orderData, items, isOrderActive, onNavigateHome, onDownloadInvoice, onCancelOrder }) => {
  return (
    <div className="lg:w-1/2 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <ProductSummary items={items} />
      <OrderDetails orderData={orderData} />
      <ActionButtons isOrderActive={isOrderActive} onNavigateHome={onNavigateHome} onDownloadInvoice={onDownloadInvoice} onCancelOrder={onCancelOrder} />
    </div>
  );
};

export default OrderSummary;
