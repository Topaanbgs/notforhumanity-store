export const mapOrderToPaymentStatus = (status) => {
  if (!status) return "Unpaid";
  const lower = String(status).toLowerCase();
  if (["unpaid"].includes(lower)) return "Unpaid";
  if (["paid"].includes(lower)) return "Paid";
  if (["cancel", "canceled", "cancelled"].includes(lower)) return "Cancelled";
  if (["expired"].includes(lower)) return "Expired";
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

export const createInfoModal = (message) => ({
  isOpen: true,
  message
});

export const createLeaveModal = (target = null) => ({
  isOpen: true,
  target
});