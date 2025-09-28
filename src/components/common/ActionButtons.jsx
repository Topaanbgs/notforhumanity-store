import ContinueShoppingButton from "./ContinueShoppingButton";

const ContactSupport = ({ onContactClick }) => (
  <p className="font-semibold">
    Need help?{" "}
    <button 
      type="button" 
      className="text-red-600 font-semibold hover:underline" 
      onClick={onContactClick}
    >
      Contact us
    </button>
  </p>
);

const SecondaryActions = ({ 
  onDownloadInvoice, 
  onCancelOrder, 
  showCancelButton 
}) => (
  <div className="flex justify-center gap-6 text-sm text-gray-600 font-medium">
    <button type="button" onClick={onDownloadInvoice} className="hover:underline">
      Download Invoice
    </button>
    {showCancelButton && (
      <button type="button" onClick={onCancelOrder} className="hover:underline text-gray-600">
        Cancel Order
      </button>
    )}
  </div>
);

const TermsLink = ({}) => (
  <a href="/terms" className="mt-2 text-xs text-red-600 font-medium hover:underline">
    Terms & Conditions
  </a>
);

const ActionButtons = ({ 
  isOrderActive,
  onNavigateHome,
  onDownloadInvoice,
  onCancelOrder,
  onContactSupport = () => window.open("https://wa.me/62", "_blank")
}) => {
  return (
    <div className="mt-8 pt-4 border-t border-gray-200 flex flex-col gap-4 items-center">
      <ContactSupport onContactClick={onContactSupport} />
      <ContinueShoppingButton onClick={onNavigateHome} />
      <SecondaryActions 
        onDownloadInvoice={onDownloadInvoice}
        onCancelOrder={onCancelOrder}
        showCancelButton={isOrderActive}
      />
      <TermsLink />
    </div>
  );
};

export default ActionButtons;
