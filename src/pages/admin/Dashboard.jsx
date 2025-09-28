import React, { useMemo } from "react";
import { FaBoxOpen, FaShoppingCart, FaChartLine, FaUsers } from "react-icons/fa";
import { useProduct } from "../../context/ProductContext";

// --- Order Statistics ---
const useOrderStats = () => {
  const { products } = useProduct();

  const orders = useMemo(() => {
    try {
      const rawOrders = JSON.parse(localStorage.getItem("orders")) || [];
      return rawOrders
        .map((o) => ({
          ...o,
          total: Number(o?.total) || 0,
          date: Number.isFinite(Number(o?.date)) ? Number(o.date) : o?.date ? Date.parse(o.date) || 0 : 0,
          customerName: String(o?.customerName ?? "").trim(),
          status: String(o?.status ?? "").toLowerCase(),
        }))
        .filter((o) => o.date > 0 && o.total >= 0)
        .sort((a, b) => b.date - a.date); // Newest first
    } catch (e) {
      console.error("Failed to parse orders from localStorage:", e);
      return [];
    }
  }, []);

  const calculateRevenue = useMemo(() => {
    return orders.reduce((sum, order) => {
      if (["paid", "delivered"].includes(order.status)) {
        return sum + order.total;
      }
      return sum;
    }, 0);
  }, [orders]);

  const calculateUniqueCustomers = useMemo(() => {
    const customerNames = new Set(orders.map((o) => o.customerName).filter((name) => name));
    return customerNames.size;
  }, [orders]);

  const recentActivities = useMemo(() => {
    const activity = orders.slice(0, 3).map((order) => ({
      type: "order",
      message: `Order #${order.id} placed by ${order.customerName}`,
      date: order.date,
      time: new Date(order.date).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    }));

    // Add latest product update if available
    const latestProduct = products.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))[0];
    if (latestProduct) {
      activity.push({
        type: "product",
        message: `Product '${latestProduct.name}' updated.`,
        date: new Date(latestProduct.updatedAt).getTime(),
        time: new Date(latestProduct.updatedAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      });
    }

    // Return top 3 most recent activities
    return activity.sort((a, b) => b.date - a.date).slice(0, 3);
  }, [orders, products]);

  return {
    totalOrders: orders.length,
    totalRevenue: calculateRevenue,
    uniqueCustomers: calculateUniqueCustomers,
    recentActivities,
  };
};

// --- UI Components ---
const StatCard = ({ title, value, icon: Icon, colorClass }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center justify-between transition-shadow duration-300 hover:shadow-xl">
      <div>
        <div className="text-sm font-medium text-gray-500">{title}</div>
        <div className="mt-1 text-2xl font-extrabold text-gray-900">{value}</div>
      </div>
      <div className={`p-3 rounded-full ${colorClass} bg-opacity-10`}>
        <Icon className={`text-4xl ${colorClass}`} />
      </div>
    </div>
  );
};

// --- Main Dashboard ---
export default function AdminDashboard() {
  const productContext = useProduct();

  if (!productContext) {
    return <div className="p-6 text-center text-red-600">Error: ProductContext not available.</div>;
  }

  const { products } = productContext;
  const { totalOrders, totalRevenue, uniqueCustomers, recentActivities } = useOrderStats();
  const totalProducts = products.length;

  const cards = useMemo(
    () => [
      { title: "Total Products", value: totalProducts, icon: FaBoxOpen, colorClass: "text-red-600" },
      { title: "Total Orders", value: totalOrders, icon: FaShoppingCart, colorClass: "text-blue-600" },
      { title: "Total Revenue (Paid)", value: `Rp ${totalRevenue.toLocaleString("id-ID")}`, icon: FaChartLine, colorClass: "text-green-600" },
      { title: "New Customers", value: uniqueCustomers, icon: FaUsers, colorClass: "text-indigo-600" },
    ],
    [totalProducts, totalOrders, totalRevenue, uniqueCustomers]
  );

  return (
    <div className="space-y-6 p-4 md:p-6 lg:max-w-7xl lg:mx-auto">
      {/* Page Header */}
      <h1 className="text-3xl font-extrabold text-gray-900 border-b pb-4 border-gray-200">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      {/* Activity & Welcome Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <ul className="space-y-3 text-gray-600">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <li key={index} className={`p-3 rounded-lg flex justify-between items-center text-sm ${activity.type === "order" ? "bg-blue-50" : "bg-red-50"}`}>
                  <span>{activity.message}</span>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </li>
              ))
            ) : (
              <li className="p-3 text-center text-gray-500 text-sm">No recent activities to display.</li>
            )}
          </ul>
        </div>

        {/* Welcome Card */}
        <div className="bg-red-50 p-6 rounded-xl shadow-lg border border-red-200 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-red-800 mb-2">Welcome Back!</h2>
            <p className="text-red-700 text-sm">This is your centralized control panel to manage products, orders, and customer data.</p>
          </div>
          <p className="mt-4 text-xs text-red-600">Last login: {new Date().toLocaleDateString("id-ID")}</p>
        </div>
      </div>
    </div>
  );
}
