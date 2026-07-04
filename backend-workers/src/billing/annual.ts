export function computeAnnualBilling(
  monthlyPrice: number,
  discountPercentage: number = 20
): { annualPrice: number; monthlyEquivalent: number } {
  const totalNoDiscount = monthlyPrice * 12;
  const discountFactor = (100 - discountPercentage) / 100;
  const annualPrice = totalNoDiscount * discountFactor;

  return {
    annualPrice: Math.round(annualPrice),
    monthlyEquivalent: Math.round(annualPrice / 12),
  };
}
