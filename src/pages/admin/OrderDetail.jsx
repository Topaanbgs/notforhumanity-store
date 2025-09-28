// pages/OrderDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { IoMdArrowBack, IoMdCopy } from "react-icons/io";
import { FiCheck } from "react-icons/fi";
import InfoModal from "../../components/common/InfoModal";

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [trackingInput, setTrackingInput] = useState("");
  const [message, setMessage] = useState(null);

  // Load order from localStorage
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const found = storedOrders.find((o) => String(o.id) === String(orderId));
    if (found) setOrder(found);
  }, [orderId]);

  // Helpers
  const formatCurrency = (num) => `Rp ${Number(num || 0).toLocaleString("id-ID")}`;
  const formatDate = (timestamp) => {
    try {
      return new Date(timestamp).toLocaleString("id-ID");
    } catch {
      return timestamp;
    }
  };
  const normalizedStatus = (s) => String(s || "").toLowerCase();

  // Submit tracking number
  const handleSubmitTracking = (e) => {
    e?.preventDefault();
    setMessage(null);

    if (!trackingInput.trim()) {
      setMessage({ type: "error", text: "Please enter a valid tracking number." });
      return;
    }

    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const idx = storedOrders.findIndex((o) => String(o.id) === String(orderId));
    if (idx === -1) {
      setMessage({ type: "error", text: "Order not found in storage." });
      return;
    }

    const updated = {
      ...storedOrders[idx],
      trackingNumber: trackingInput.trim(),
      status: "In Transit",
      lastUpdated: new Date().toISOString(),
    };
    storedOrders[idx] = updated;
    localStorage.setItem("orders", JSON.stringify(storedOrders));
    setOrder(updated);
    setTrackingInput("");
    setMessage({ type: "success", text: "Tracking number saved — status updated to In Transit." });
  };

  // Copy to clipboard
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(String(text || ""));
      setMessage({ type: "success", text: "Copied to clipboard." });
    } catch {
      setMessage({ type: "error", text: "Unable to copy." });
    }
  };

  // Subtotal calculation
  const subtotalCalc = useMemo(() => {
    if (!order?.items?.length) return 0;
    return order.items.reduce((acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 0), 0);
  }, [order]);

  if (!order) return <p className="p-6 text-gray-500">Order not found.</p>;

  // --- Sub-components ---

  // Status badge renderer
  const StatusBadge = ({ status }) => {
    const normalized = normalizedStatus(status);
    let classes = "bg-gray-100 text-gray-800 border border-gray-200";
    let displayText = status;

    switch (normalized) {
      case "paid":
        classes = "bg-green-100 text-green-800 border-green-200";
        displayText = "Paid";
        break;
      case "unpaid":
        displayText = "Unpaid";
        break;
      case "in transit":
      case "shipped":
        classes = "bg-blue-100 text-blue-800 border-blue-200";
        displayText = "Shipped";
        break;
      case "cancel":
      case "canceled":
        classes = "bg-red-100 text-red-800 border-red-200";
        displayText = "Canceled";
        break;
    }

    return (
      <div className={`ml-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${classes}`} title={`Status: ${displayText}`} aria-live="polite">
        <span className="uppercase tracking-wide text-xs">Status</span>
        <span className="whitespace-nowrap">{displayText}</span>
      </div>
    );
  };

  // Right section in header (tracking, form, or info)
  const HeaderRightArea = () => {
    const isPaid = normalizedStatus(order.status) === "paid";
    const hasTracking = Boolean(order.trackingNumber && String(order.trackingNumber).trim());

    if (hasTracking) {
      return (
        <div className="w-full md:w-80 p-3 bg-white border rounded-lg shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="text-xs text-gray-500">Tracking / Resi</div>
              <div className="mt-1 text-sm font-medium text-gray-900 break-words">{order.trackingNumber}</div>
              <div className="mt-2 text-xs text-gray-500">
                Status: <span className="font-semibold">{order.status}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button onClick={() => handleCopy(order.trackingNumber)} className="inline-flex items-center gap-2 px-3 py-1 border rounded-md text-sm hover:bg-gray-50 transition" title="Copy tracking">
                <IoMdCopy /> Copy
              </button>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(order.trackingNumber)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs w-full text-center px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Track
              </a>
            </div>
          </div>
        </div>
      );
    }

    if (isPaid && !hasTracking) {
      return (
        <div className="w-full md:w-[550px] p-2">
          <form onSubmit={handleSubmitTracking} className="flex gap-2 items-end">
            <div className="flex-1">
              <label htmlFor="tracking-header" className="text-sm text-gray-500 block mb-2">
                Tracking / Resi Number
              </label>
              <input
                id="tracking-header"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="Enter tracking number..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium transition duration-150 flex-shrink-0">
              <FiCheck /> Submit
            </button>
          </form>
          <div className="mt-2 text-xs text-gray-500">
            Submitting will update order status to <span className="font-medium">In Transit</span>.
          </div>
        </div>
      );
    }

    return (
      <div className="w-full md:w-80 p-3 bg-gray-50 border rounded-lg text-sm text-gray-600">
        <div>
          Order: <span className="font-medium text-gray-800">#{order.id}</span>
        </div>
        <div className="text-xs mt-1">
          Status: <span className="font-semibold">{order.status}</span>
        </div>
      </div>
    );
  };

  // --- Render ---

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
          <IoMdArrowBack /> Back to Orders
        </button>

        {/* Header */}
        <header className="mb-6 p-4 bg-white border rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Order Details</h1>
                <StatusBadge status={order.status} />
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Created: {formatDate(order.date)} • {order.items?.length ?? 0} item(s)
              </p>
              <div
                className="mt-3 inline-flex items-center px-3 py-1 text-sm font-medium rounded-lg bg-indigo-50 text-indigo-700 shadow-sm cursor-pointer border border-indigo-200 hover:bg-indigo-100 transition"
                style={{ letterSpacing: "0.4px" }}
                onClick={() => handleCopy(order.id)}
              >
                ID: #{order.id} <IoMdCopy className="inline ml-2 text-indigo-500 opacity-90" />
              </div>
            </div>
            <div className="flex-shrink-0">
              <HeaderRightArea />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: recipient, shipment, items */}
          <section className="lg:col-span-2 space-y-6">
            {/* Recipient info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-white shadow-sm">
                <h3 className="font-semibold mb-2 text-lg">Recipient</h3>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-800">Name:</span> {order.recipient?.fullName}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-800">Phone:</span> {order.recipient?.phone}
                </p>
                <p className="break-words text-sm text-gray-700">
                  <span className="font-medium text-gray-800">Address:</span> {order.recipient?.address}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-800">Zip Code:</span> {order.recipient?.zipCode}
                </p>
              </div>

              {/* Shipment & payment */}
              <div className="p-4 border rounded-lg bg-white shadow-sm">
                <h3 className="font-semibold mb-2 text-lg">Shipment & Payment</h3>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-800">Shipment:</span> {order.shipment?.name ?? order.shipment ?? "-"}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-800">Payment:</span> {order.paymentMethod ?? "-"}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-800">Order Date:</span> {formatDate(order.date)}
                </p>
                {order.sender && order.isDropshipper && (
                  <div className="mt-3 pt-3 border-t text-sm text-gray-600">
                    <div className="font-semibold text-gray-800">Dropship Sender</div>
                    <div>
                      {order.sender.name} • {order.sender.phone}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Ordered items */}
            <div className="p-4 border rounded-lg bg-white shadow-sm overflow-hidden">
              <h3 className="font-semibold mb-3 text-lg">Ordered Items</h3>
              <div className="w-full overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="px-3 py-2 text-left w-2/5">Product</th>
                      <th className="px-3 py-2 text-left w-1/8">Size</th>
                      <th className="px-3 py-2 text-center w-1/10">Qty</th>
                      <th className="px-3 py-2 text-right w-1/6">Price</th>
                      <th className="px-3 py-2 text-right w-1/6">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items?.map((item, idx) => (
                      <tr key={idx} className="border-t hover:bg-gray-50 transition">
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-3">
                            <img src={item.image || "https://via.placeholder.com/64"} alt={item.name} className="w-14 h-14 object-cover rounded-md flex-shrink-0" />
                            <div className="text-gray-800">
                              <div className="font-medium">{item.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 hidden sm:table-cell text-gray-800">{item.size ?? "-"}</td>
                        <td className="px-3 py-3 text-center font-medium text-gray-800">{item.quantity}</td>
                        <td className="px-3 py-3 text-right text-gray-700">{formatCurrency(item.price)}</td>
                        <td className="px-3 py-3 text-right font-semibold text-red-600">{formatCurrency(item.price * item.quantity)}</td>
                      </tr>
                    ))}
                    {!order.items?.length && (
                      <tr>
                        <td className="px-3 py-6 text-center text-gray-500" colSpan={5}>
                          No items found for this order.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Right column: notes & summary */}
          <aside className="space-y-6">
            <div className="p-4 border rounded-lg bg-white shadow-sm">
              <h3 className="font-semibold mb-2 text-lg">Order Notes & History</h3>
              <p className="text-sm text-gray-600">{order.notes ?? "No notes provided."}</p>
              <div className="mt-3 text-xs text-gray-500 border-t pt-2">Last updated: {formatDate(order.lastUpdated ?? order.date)}</div>
            </div>

            <div className="p-4 border rounded-lg bg-white shadow-sm sticky top-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-gray-500">Order ID</div>
                  <div className="font-medium text-lg">#{order.id}</div>
                </div>
              </div>

              <div className="mt-4 border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <div>Subtotal</div>
                  <div className="font-medium">{formatCurrency(order.subtotal ?? subtotalCalc)}</div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <div>Shipping</div>
                  <div className="font-medium">{formatCurrency(order.shippingFee)}</div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <div>Insurance</div>
                  <div className="font-medium">{formatCurrency(order.insuranceFee)}</div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t">
                  <div className="font-semibold text-lg text-gray-900">Total Payment</div>
                  <div className="font-bold text-xl text-red-600">{formatCurrency(order.total ?? subtotalCalc)}</div>
                </div>
              </div>
            </div>
          </aside>
        </main>

        {/* Feedback modal */}
        {message && <InfoModal message={message.text} type={message.type} onClose={() => setMessage(null)} duration={2500} />}
      </div>
    </div>
  );
}
