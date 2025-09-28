import { useState, useEffect, useMemo } from "react";
import { FaTrashAlt, FaSearch, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import ConfirmModal from "../../components/admin/ConfirmModal";

/* Status badge */
const StatusBadge = ({ status }) => {
  const normStatus = String(status ?? "")
    .trim()
    .toLowerCase();
  let colorClass = "bg-gray-100 text-gray-700 border border-gray-300";
  let displayStatus = status;

  if (["paid", "delivered"].includes(normStatus)) {
    colorClass = "bg-green-100 text-green-700 border border-green-200";
    displayStatus = "Paid / Delivered";
  } else if (["in transit", "in_transit", "shipped"].includes(normStatus)) {
    colorClass = "bg-blue-100 text-blue-700 border border-blue-200";
    displayStatus = "Shipped";
  } else if (["unpaid", "pending"].includes(normStatus)) {
    colorClass = "bg-yellow-100 text-yellow-700 border border-yellow-200";
    displayStatus = "Pending Payment";
  } else if (["cancel", "canceled", "cancelled"].includes(normStatus)) {
    colorClass = "bg-red-100 text-red-700 border border-red-200";
    displayStatus = "Canceled";
  }

  return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}>{displayStatus}</span>;
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const normalizeStatus = (s) => {
    const st = String(s ?? "")
      .trim()
      .toLowerCase();
    if (["paid", "delivered"].includes(st)) return "paid";
    if (["in transit", "in_transit", "shipped"].includes(st)) return "shipped";
    if (["unpaid", "pending"].includes(st)) return "pending";
    if (["cancel", "canceled", "cancelled"].includes(st)) return "cancel";
    return st;
  };

  /* Load and sanitize orders from localStorage */
  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem("orders")) || [];
    const sanitized = raw
      .map((o) => {
        const idStr = String(o?.id ?? "").trim();
        const customerName = String(o?.customerName ?? "").trim();
        const status = String(o?.status ?? "").trim();
        const totalNum = Number.isFinite(Number(o?.total)) ? Number(o.total) : 0;
        const dateNum = Number.isFinite(Number(o?.date)) ? Number(o.date) : o?.date ? Date.parse(o.date) || 0 : 0;
        return {
          ...o,
          id: idStr,
          customerName,
          status,
          total: totalNum,
          date: dateNum,
          _normId: idStr.toLowerCase(),
          _normName: customerName.toLowerCase(),
          _normStatus: normalizeStatus(status),
        };
      })
      .filter((o) => o.id && o.id.toLowerCase() !== "nan" && o.date !== 0);
    sanitized.sort((a, b) => (Number(b.date) || 0) - (Number(a.date) || 0));
    setOrders(sanitized);
  }, []);

  const handleDeleteOrder = () => {
    if (!selectedOrder) return;
    const updated = orders.filter((o) => o.id !== selectedOrder.id);
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    setModalType(null);
    setSelectedOrder(null);
  };

  const openModal = (type, order) => {
    setSelectedOrder(order);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedOrder(null);
  };

  /* Filter orders by search query */
  const filteredOrders = useMemo(() => {
    const query = String(searchQuery ?? "")
      .trim()
      .toLowerCase();
    if (!query) return orders;
    return orders.filter((o) => {
      if (!o.id) return false;
      return o._normId.includes(query) || o._normName.includes(query) || o._normStatus.includes(query) || new Date(o.date).toLocaleDateString().includes(query);
    });
  }, [orders, searchQuery]);

  return (
    <div className="space-y-6 p-4 md:p-6 lg:max-w-7xl lg:mx-auto">
      {/* Header */}
      <div className="border-b pb-4 border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900">Order Management</h1>
        <p className="text-gray-500 mt-1">Track and manage all customer orders ({orders.length} total)</p>
      </div>

      {/* Search bar */}
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder={`Search across ${orders.length} orders...`}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Orders table */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
          <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <FaSearch className="text-3xl text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">{orders.length === 0 ? "No Orders Placed Yet" : "No Orders Match Your Search"}</h3>
          <p className="text-gray-500">The order list is currently empty or try clearing the search filter.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Order Date</th>
                <th className="px-6 py-3 text-right">Total</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 font-medium text-gray-800">{order.id}</td>
                  <td className="px-6 py-4 text-gray-700">{order.customerName}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(order.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900">Rp {Number(order.total || 0).toLocaleString("id-ID")}</td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <Link to={`/admin/order/${order.id}`} className="p-2 rounded-full text-indigo-600 hover:bg-indigo-50 transition" title="View Details">
                        <FaEye />
                      </Link>
                      <button onClick={() => openModal("delete", order)} className="p-2 rounded-full text-red-600 hover:bg-red-50 transition" title="Delete Order">
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete confirmation */}
      {modalType === "delete" && selectedOrder && (
        <ConfirmModal title="Delete Order" message={`Are you sure you want to delete order ${selectedOrder.id} (${selectedOrder.customerName})? This action cannot be undone.`} onConfirm={handleDeleteOrder} onCancel={closeModal} />
      )}
    </div>
  );
}
