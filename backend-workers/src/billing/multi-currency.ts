/**
 * Multi-Currency Exchange Rates and formatters
 */
export const CURRENCY_SYMBOLS: Record<string, string> = {
  QAR: '﷼',
  USD: '$',
  EUR: '€',
  SAR: 'SR',
  AED: 'DH'
};

/**
 * Formats amount based on company preferred currency
 */
export function formatLocalPrice(
  amount: number,
  currency = 'QAR'
): string {
  const symbol = CURRENCY_SYMBOLS[currency.toUpperCase()] || '$';
  return `${amount.toFixed(2)} ${symbol}`;
}
