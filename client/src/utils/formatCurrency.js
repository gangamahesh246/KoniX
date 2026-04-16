export function formatCurrency(value) {
  const absValue = Math.abs(value);

  if (absValue >= 1) {
    const formatted = absValue.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return value < 0 ? `-₹${formatted}` : `₹${formatted}`;
  }

  if (absValue === 0) return "₹0.00";

  const formatted = absValue.toFixed(6).replace(/0+$/, "");
  return value < 0 ? `-₹${formatted}` : `₹${formatted}`;
}

export function formatCurrencyShort(value) {
  const absValue = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (absValue >= 1e9) return `${sign}₹${(absValue / 1e9).toFixed(2)}B`;
  if (absValue >= 1e7) return `${sign}₹${(absValue / 1e7).toFixed(2)}Cr`;
  if (absValue >= 1e5) return `${sign}₹${(absValue / 1e5).toFixed(2)}L`;
  if (absValue >= 1e3) return `${sign}₹${(absValue / 1e3).toFixed(2)}K`;

  if (absValue >= 1) {
    return `${sign}₹${absValue.toFixed(2)}`;
  }
  if (absValue === 0) return "₹0.00";

  return `${sign}₹${absValue.toFixed(6).replace(/0+$/, "")}`;
}

export function formatHolding(value) {
  if (value === 0) return "0";
  if (Math.abs(value) < 0.000001) return value.toExponential(4);
  if (Math.abs(value) >= 1) {
    return value.toLocaleString("en-IN", { maximumFractionDigits: 6 });
  }
  return value.toFixed(8).replace(/0+$/, "");
}
