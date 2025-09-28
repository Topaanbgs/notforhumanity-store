export const formatCurrency = (amount) => `Rp ${Number(amount || 0).toLocaleString("id-ID")}`;

export const formatTime = (seconds) => {
  const minutes = Math.floor(Math.max(0, seconds) / 60);
  const remainingSeconds = Math.max(0, seconds) % 60;
  const paddedSeconds = remainingSeconds.toString().padStart(2, "0");
  return `${minutes}m ${paddedSeconds}s`;
};

export const generateOrderId = (timestamp) => `NFHMN-${timestamp || Date.now()}`;

export const formatOrderDate = () =>
  new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

export const getPaymentStatusColor = (status) => {
  const statusColors = {
    Paid: "text-green-600",
    Cancelled: "text-gray-500",
    Expired: "text-gray-500",
    Unpaid: "text-red-600",
  };
  return statusColors[status] || "text-red-600";
};

export const getStatusBackgroundColor = (status, isPaid) => {
  if (isPaid) return "bg-green-100 text-green-700";
  return "bg-gray-100 text-gray-700";
};
