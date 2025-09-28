import { useState, useEffect, useCallback, useRef } from 'react';
import { useOrder } from '../context/OrderContext';

export const useOrderResolver = (incomingOrderId, incomingOrderData, onNavigate) => {
  const { orders, addOrder } = useOrder();
  const [resolvedOrderId, setResolvedOrderId] = useState(incomingOrderId || null);
  const [isOrderReady, setIsOrderReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (resolvedOrderId && isOrderReady) return;
    
    const resolveOrder = async () => {
      try {
        let orderToUse = null;
        
        if (incomingOrderId) {
          const found = orders.find((o) => o.id === incomingOrderId);
          if (found) {
            orderToUse = found;
            setResolvedOrderId(found.id);
          } else {
            setError('Order not found');
            onNavigate('/checkout');
            return;
          }
        } else if (incomingOrderData) {
          const found = orders.find((o) => 
            o.createdAt && incomingOrderData.createdAt && 
            o.createdAt === incomingOrderData.createdAt
          );
          
          if (found) {
            orderToUse = found;
            setResolvedOrderId(found.id);
          } else {
            const { orderId } = addOrder(incomingOrderData);
            orderToUse = incomingOrderData;
            setResolvedOrderId(orderId);
          }
        } else {
          setError('No order data provided');
          onNavigate('/checkout');
          return;
        }
        
        setIsOrderReady(true);
      } catch (err) {
        setError('Failed to resolve order');
        onNavigate('/checkout');
      }
    };

    resolveOrder();
  }, [incomingOrderId, incomingOrderData, orders, addOrder, resolvedOrderId, isOrderReady, onNavigate]);

  const orderFromContext = resolvedOrderId ? orders.find((o) => o.id === resolvedOrderId) : null;
  const effectiveOrder = orderFromContext ?? incomingOrderData ?? null;

  return {
    resolvedOrderId,
    effectiveOrder,
    isOrderReady,
    error
  };
};