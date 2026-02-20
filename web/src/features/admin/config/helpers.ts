export function getInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) {
    return "AD";
  }
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function formatInteger(value: number): string {
  return value.toLocaleString("en-US");
}

export function formatCurrency(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}
