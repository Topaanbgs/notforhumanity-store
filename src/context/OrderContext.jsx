import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { products as initialProducts } from "../data/Products";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(() => {
    try {
      const raw = localStorage.getItem("orders");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Persist orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("orders", JSON.stringify(orders));
    } catch {}
  }, [orders]);

  const normalizePrice = (value) => {
    if (!value) return 0;
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      return parseInt(value.replace(/[^\d]/g, ""), 10) || 0;
    }
    return 0;
  };

  const addOrder = (newOrderData) => {
    const newOrderId = `NFHMN-${Date.now()}`;
    const newOrder = {
      id: newOrderId,
      customerName: newOrderData.fullName || newOrderData.nama || "Customer",
      date: Date.now(),
      items: (newOrderData.items || []).map((i) => ({
        id: i.id ?? null,
        name: i.name,
        size: i.size || "-",
        quantity: i.quantity,
        price: normalizePrice(i.priceNumber ?? i.price),
        image: i.image || "https://via.placeholder.com/150",
      })),
      subtotal: normalizePrice(newOrderData.subtotal),
      shippingFee: normalizePrice(newOrderData.shippingFee),
      insuranceFee: normalizePrice(newOrderData.insuranceFee),
      shipment: newOrderData.shipment || null,
      paymentMethod: newOrderData.paymentMethod || (newOrderData.payment && newOrderData.payment.name) || null,
      total: normalizePrice(newOrderData.total),
      status: "unpaid",
      recipient: {
        fullName: newOrderData.fullName || "N/A",
        phone: newOrderData.phone || "N/A",
        address: newOrderData.address || "N/A",
        zipCode: newOrderData.zipCode || "N/A",
      },
      isDropshipper: newOrderData.isDropshipper || false,
      sender: newOrderData.sender || null,
      createdAt: newOrderData.createdAt || Date.now(),
      trackingId: null,
    };

    setOrders((prev) => [...prev, newOrder]);
    return { orderId: newOrderId, orderData: newOrder };
  };

  const updateOrderStatus = (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const updateOrderTracking = (id, trackingId) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: "in_transit", trackingId } : o)));
  };

  const value = useMemo(
    () => ({
      products,
      orders,
      addOrder,
      updateOrderStatus,
      updateOrderTracking,
    }),
    [products, orders]
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrder = () => useContext(OrderContext);
