
export function formatCurrency(amount: number): string {
  if (isNaN(amount)) return "₹0";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0, // removes decimal points
  }).format(amount);
}
