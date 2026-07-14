/**
 * Qatari VAT & International Sales Tax calculation rules
 */
export interface TaxDetails {
  taxRate: number;
  taxAmount: number;
  totalWithTax: number;
}

/**
 * Calculates VAT based on country locale (5% for Qatar)
 */
export function calculateVAT(
  amount: number,
  country = 'QA'
): TaxDetails {
  const isQatar = country.toUpperCase() === 'QA' || country.toUpperCase() === 'QATAR';
  const taxRate = isQatar ? 0.05 : 0.0; // 5% VAT rate in Qatar
  
  const taxAmount = amount * taxRate;
  const totalWithTax = amount + taxAmount;

  return {
    taxRate,
    taxAmount: parseFloat(taxAmount.toFixed(2)),
    totalWithTax: parseFloat(totalWithTax.toFixed(2))
  };
}
