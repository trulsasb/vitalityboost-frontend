// format.ts

/**
 * Format price as NOK currency.
 * Always shows whole kroner (no øre), since all priser er inkl. MVA.
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Capitalize first letter of a string.
 */
export function capitalize(value: string): string {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Normalize phone numbers to a consistent format.
 * Example: "41234567" → "+47 412 34 567"
 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 8) {
    return `+47 ${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5)}`;
  }
  return phone;
}

/**
 * Format full name consistently.
 */
export function formatName(first: string, last: string): string {
  return `${capitalize(first)} ${capitalize(last)}`;
}

