export function formatStatus(status: string): string {
  if (!status) return "";
  return status.charAt(0) + status.slice(1).toLowerCase();
}