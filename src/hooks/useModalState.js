import { useState } from 'react';

export const useModalState = () => {
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState("shipping");

  const openSizeGuide = () => setShowSizeGuide(true);
  const closeSizeGuide = () => setShowSizeGuide(false);

  return {
    showSizeGuide,
    openSizeGuide,
    closeSizeGuide,
    activeTab,
    setActiveTab
  };
};