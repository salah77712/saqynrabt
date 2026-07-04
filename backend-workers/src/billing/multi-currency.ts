const exchangeRates: Record<string, number> = {
  QAR: 1.0,
  USD: 0.27,
  EUR: 0.25,
  SAR: 1.03,
  AED: 1.01,
};

export function convertCurrency(
  amountInQar: number,
  targetCurrency: string
): { amount: number; currency: string } {
  const rate = exchangeRates[targetCurrency.toUpperCase()] || 1.0;
  return {
    amount: Math.round(amountInQar * rate * 100) / 100,
    currency: targetCurrency.toUpperCase(),
  };
}
