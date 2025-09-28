import { useEffect, useRef, useState } from "react";

export const usePaymentCountdown = (initialMinutes = 10, paymentStatus = "Unpaid") => {
  const initialSeconds = Math.max(0, Math.floor(initialMinutes * 60));
  const [countdown, setCountdown] = useState(initialSeconds);
  const intervalRef = useRef(null);

  useEffect(() => {
    setCountdown(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (paymentStatus !== "Unpaid") {
      return;
    }

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [paymentStatus, initialSeconds]);

  return countdown;
};
