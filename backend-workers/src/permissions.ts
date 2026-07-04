/**
 * Role-Based Access Control (RBAC) granular feature flag helpers
 */
export type FeaturePermission =
  | 'view_automation'
  | 'edit_automation'
  | 'view_chatbot'
  | 'edit_chatbot'
  | 'manage_users'
  | 'view_billing';

/**
 * Validates if the member contains the specific operational permission
 */
export function hasPermission(
  memberPermissions: string[] | null | undefined,
  required: FeaturePermission,
  role: string
): boolean {
  // Owners and Admins possess all feature access privileges
  if (role === 'owner' || role === 'admin') {
    return true;
  }

  if (!memberPermissions || !Array.isArray(memberPermissions)) {
    return false;
  }

  return memberPermissions.includes(required);
}

/**
 * Expose helper to return default permission arrays based on member role
 */
export function getDefaultPermissions(role: string): FeaturePermission[] {
  if (role === 'owner' || role === 'admin') {
    return [
      'view_automation',
      'edit_automation',
      'view_chatbot',
      'edit_chatbot',
      'manage_users',
      'view_billing',
    ];
  }

  // standard receptionist members get limited access
  return ['view_automation', 'view_chatbot'];
}
