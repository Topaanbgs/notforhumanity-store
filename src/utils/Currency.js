export const normalizePrice = (val) => {
  if (typeof val === "number") return val;
  if (!val) return 0;
  const digits = String(val)
    .replace(/\./g, "")
    .replace(/[^0-9]/g, "");
  return digits ? parseInt(digits, 10) : 0;
};

export const formatCurrency = (num) => "Rp " + Number(num).toLocaleString("id-ID");