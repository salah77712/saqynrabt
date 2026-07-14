/**
 * Least-Privilege Access Control (LPAC) granular check
 */
export function hasResourceActionPermission(
  memberPermissions: string[] | null | undefined,
  resource: 'documents' | 'employees' | 'billing' | 'settings',
  action: 'create' | 'read' | 'update' | 'delete'
): boolean {
  if (!memberPermissions || !Array.isArray(memberPermissions)) {
    return false;
  }

  const required = `${resource}:${action}`;
  return memberPermissions.includes(required);
}
