/**
 * Enterprise Reseller revenue share commissions calculator
 */
export interface ResellerCommission {
  reseller_id: string;
  total_revenue: number;
  commission_rate: number; // e.g. 0.20 for 20%
  payout_amount: number;
}

/**
 * Calculates commission payouts for billing records
 */
export function calculateResellerShare(
  revenue: number,
  rate = 0.20
): number {
  const payout = revenue * rate;
  return parseFloat(payout.toFixed(2));
}
