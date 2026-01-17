/**
 * Hex formatting utilities for page navigation
 */

/**
 * Convert a number to hex string with 0x prefix
 * Always uppercase, zero-padded to 2 digits minimum
 */
export function toHex(n: number): string {
  return `0x${n.toString(16).toUpperCase().padStart(2, '0')}`;
}

/**
 * Parse a hex string (with or without 0x prefix) to number
 * Returns null if invalid
 */
export function fromHex(str: string): number | null {
  // Remove 0x prefix if present
  const cleaned = str.toLowerCase().replace(/^0x/, '');

  // Validate hex characters only
  if (!/^[0-9a-f]+$/.test(cleaned)) {
    return null;
  }

  const num = parseInt(cleaned, 16);
  return isNaN(num) ? null : num;
}

/**
 * Format page indicator: "0x03 / 0x08"
 */
export function formatPageIndicator(current: number, total: number): string {
  return `${toHex(current)} / ${toHex(total)}`;
}
