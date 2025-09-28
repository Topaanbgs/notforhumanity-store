import { useState, useEffect } from 'react';

export const useQRCodeData = (orderId, totalPayment) => {
  const [qrCodeData, setQrCodeData] = useState("");

  useEffect(() => {
    if (orderId && totalPayment) {
      setQrCodeData(`Order ID: ${orderId}, Total: ${totalPayment}`);
    }
  }, [orderId, totalPayment]);

  return qrCodeData;
};