/**
 * Format a date string for display.
 * @param dateString - ISO date string
 * @param longMonth  - Use full month name (default: abbreviated)
 */
export function formatDate(dateString: string, longMonth = false): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: longMonth ? 'long' : 'short',
    day: 'numeric',
  });
}
