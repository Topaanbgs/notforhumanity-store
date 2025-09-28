import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const usePaymentNavigation = () => {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationRef = useRef(false);

  const safeNavigate = useCallback((path, options = {}) => {
    if (navigationRef.current || isNavigating) return;
    
    navigationRef.current = true;
    setIsNavigating(true);
    
    setTimeout(() => {
      navigate(path, { replace: true, ...options });
    }, 100);
  }, [navigate, isNavigating]);

  return {
    safeNavigate,
    isNavigating
  };
};
