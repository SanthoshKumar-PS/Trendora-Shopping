export function formatOrderDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short", 
    day: "numeric", 
    year: "numeric",
  });
}
export function formatPdfDate(inputDate?:string) {
  if(!inputDate) return;
  const date = new Date(inputDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}