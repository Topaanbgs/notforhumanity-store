export const validateAddress = (address) => {
  return address.fullName.trim() && 
         address.address.trim() && 
         address.phone.trim();
};

export const validateDropshipper = (isDropshipper, senderName, senderPhone) => {
  if (!isDropshipper) return true;
  return senderName.trim() && senderPhone.trim();
};

export const validateCheckoutItems = (items) => {
  return Array.isArray(items) && items.length > 0;
};