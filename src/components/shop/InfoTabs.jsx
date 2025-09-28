import { FaTruck, FaUndo } from "react-icons/fa";

const INFO_TABS = [
  { id: "shipping", name: "Shipping", icon: FaTruck },
  { id: "returns", name: "Returns", icon: FaUndo },
];

const TabButton = ({ tab, isActive, onClick }) => {
  const Icon = tab.icon;
  
  return (
    <button
      onClick={() => onClick(tab.id)}
      className={`flex-1 p-3 text-sm font-semibold transition flex items-center justify-center gap-2 ${
        isActive 
          ? "text-red-600 border-b-2 border-red-600" 
          : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <Icon className="h-4 w-4" />
      {tab.name}
    </button>
  );
};

const ShippingContent = () => (
  <div className="p-4">
    <h4 className="font-semibold text-base mb-2">Shipping Information</h4>
    <ul className="list-disc pl-5 text-gray-700 space-y-1">
      <li>Orders ship Monday-Saturday at 5:00 PM WIB.</li>
      <li>Orders after 4:00 PM WIB ship next business day.</li>
      <li>Saturday-Sunday orders ship on Monday.</li>
      <li>No shipping on public holidays; dispatched next business day.</li>
    </ul>
  </div>
);

const ReturnsContent = () => (
  <div className="p-4">
    <h4 className="font-semibold text-base mb-2">Return Product Terms & Conditions</h4>
    <ul className="list-disc pl-5 text-gray-700 space-y-1">
      <li>Valid only for defective or incorrect items.</li>
      <li>Complaints must be filed within 2x24 hours of arrival.</li>
      <li>Unboxing video is required, otherwise not accepted.</li>
      <li>No returns for wrong size, model, or color chosen by customer.</li>
    </ul>
  </div>
);

const TabContent = ({ activeTab }) => {
  switch (activeTab) {
    case "shipping":
      return <ShippingContent />;
    case "returns":
      return <ReturnsContent />;
    default:
      return null;
  }
};

const InfoTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="border border-gray-200 rounded-lg">
      <div className="flex border-b border-gray-200">
        {INFO_TABS.map((tab) => (
          <TabButton
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            onClick={onTabChange}
          />
        ))}
      </div>
      <TabContent activeTab={activeTab} />
    </div>
  );
};

export default InfoTabs;