export async function validateCouponCode(
  db: any,
  code: string
): Promise<{ valid: boolean; discountPercentage?: number; message: string }> {
  const query = `
    SELECT discount_percentage, max_uses, current_uses, expires_at
    FROM coupons
    WHERE code = $1 AND active = TRUE
  `;
  
  const result = await db.query(query, [code.toUpperCase()]);
  if (result.rows.length === 0) {
    return { valid: false, message: 'Invalid coupon code.' };
  }

  const coupon = result.rows[0];

  if (coupon.expires_at && new Date(coupon.expires_at).getTime() < Date.now()) {
    return { valid: false, message: 'Coupon has expired.' };
  }

  if (coupon.current_uses >= coupon.max_uses) {
    return { valid: false, message: 'Coupon usage limit reached.' };
  }

  return {
    valid: true,
    discountPercentage: coupon.discount_percentage,
    message: 'Coupon applied successfully.',
  };
}
