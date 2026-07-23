export type PlanKey = 'chatbot' | 'voice' | 'platform';
export type UserRole = 'admin' | 'manager' | 'employee' | 'viewer';

export interface ModuleDef {
  key: string;
  path: string;
  label: Record<string, string>;
  icon: string;
  planFeature: PlanFeature;
  requiredPermission?: string;
  adminVisible: boolean;
  managerVisible: boolean;
  employeeVisible: boolean;
}

export type PlanFeature =
  | 'chatbot'
  | 'documents'
  | 'voice_automation'
  | 'workflows'
  | 'call_dashboard'
  | 'team'
  | 'approvals'
  | 'inbox'
  | 'integrations'
  | 'usage'
  | 'audit_logs'
  | 'settings'
  | 'billing_status'
  | 'admin_panel'
  | 'profile';

export const PLAN_FEATURES: Record<PlanKey, PlanFeature[]> = {
  chatbot: ['chatbot', 'documents', 'profile'],
  voice: ['voice_automation', 'workflows', 'call_dashboard', 'profile'],
  platform: [
    'chatbot', 'documents', 'voice_automation', 'workflows', 'call_dashboard',
    'team', 'approvals', 'inbox', 'integrations', 'usage', 'audit_logs',
    'settings', 'billing_status', 'admin_panel', 'profile',
  ],
};

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: [
    'overview:read', 'chatbot:read', 'chatbot:write',
    'documents:read', 'documents:create', 'documents:update', 'documents:delete',
    'voice:read', 'voice:write',
    'workflows:read', 'workflows:create', 'workflows:update', 'workflows:delete',
    'call_dashboard:read',
    'team:read', 'team:create', 'team:update', 'team:delete',
    'approvals:read', 'approvals:update',
    'inbox:read', 'inbox:write',
    'integrations:read', 'integrations:update',
    'usage:read',
    'audit_logs:read',
    'settings:read', 'settings:update',
    'billing:read',
    'admin:read', 'admin:write',
    'profile:read', 'profile:update',
  ],
  manager: [
    'chatbot:read',
    'workflows:read', 'workflows:update',
    'team:read',
    'profile:read', 'profile:update',
    'approvals:read', 'approvals:update',
  ],
  employee: [
    'chatbot:read',
    'workflows:read',
    'profile:read', 'profile:update',
  ],
  viewer: [
    'chatbot:read',
    'documents:read',
    'profile:read', 'profile:update',
  ],
};

export interface ModuleVisibility {
  visible: boolean;
  locked: boolean;
  lockedReason: 'plan' | 'role' | null;
  lockedMessage: string;
}

export function getModuleVisibility(
  module: ModuleDef,
  userRole: UserRole,
  planKey: PlanKey,
): ModuleVisibility {
  const planIncludes = PLAN_FEATURES[planKey]?.includes(module.planFeature) ?? false;
  const rolePerms = ROLE_PERMISSIONS[userRole] ?? [];
  const hasPerm = module.requiredPermission
    ? rolePerms.includes(module.requiredPermission)
    : true;

  if (userRole === 'admin') {
    if (planIncludes) return { visible: true, locked: false, lockedReason: null, lockedMessage: '' };
    return {
      visible: true,
      locked: true,
      lockedReason: 'plan',
      lockedMessage: 'This module is not included in your current plan. Book a free demo call to enable it.',
    };
  }

  if (userRole === 'manager') {
    if (!module.managerVisible) return { visible: false, locked: false, lockedReason: 'role', lockedMessage: '' };
    if (!planIncludes) {
      return { visible: true, locked: true, lockedReason: 'plan', lockedMessage: 'This module is not available for your account. Contact your admin.' };
    }
    if (!hasPerm) {
      return { visible: true, locked: true, lockedReason: 'role', lockedMessage: 'This module is not available for your account. Contact your admin.' };
    }
    return { visible: true, locked: false, lockedReason: null, lockedMessage: '' };
  }

  if (userRole === 'employee') {
    if (!module.employeeVisible) return { visible: false, locked: false, lockedReason: 'role', lockedMessage: '' };
    if (!planIncludes) {
      return { visible: true, locked: true, lockedReason: 'plan', lockedMessage: 'This module is not available for your account. Contact your admin.' };
    }
    if (!hasPerm) {
      return { visible: true, locked: true, lockedReason: 'role', lockedMessage: 'This module is not available for your account. Contact your admin.' };
    }
    return { visible: true, locked: false, lockedReason: null, lockedMessage: '' };
  }

  return { visible: false, locked: false, lockedReason: null, lockedMessage: '' };
}

export const MODULES: ModuleDef[] = [
  {
    key: 'overview',
    path: '/dashboard',
    label: { en: 'Overview', ar: 'نظرة عامة' },
    icon: 'LayoutDashboard',
    planFeature: 'chatbot',
    adminVisible: true,
    managerVisible: false,
    employeeVisible: false,
  },
  {
    key: 'chatbot',
    path: '/dashboard/chat',
    label: { en: 'Chatbot', ar: 'المساعد الذكي' },
    icon: 'MessageSquare',
    planFeature: 'chatbot',
    requiredPermission: 'chatbot:read',
    adminVisible: true,
    managerVisible: true,
    employeeVisible: true,
  },
  {
    key: 'documents',
    path: '/dashboard/documents',
    label: { en: 'Documents', ar: 'المستندات' },
    icon: 'FileText',
    planFeature: 'documents',
    requiredPermission: 'documents:read',
    adminVisible: true,
    managerVisible: false,
    employeeVisible: false,
  },
  {
    key: 'voice_agent',
    path: '/dashboard/voice',
    label: { en: 'Voice Agent', ar: 'الوكيل الصوتي' },
    icon: 'Phone',
    planFeature: 'voice_automation',
    requiredPermission: 'voice:read',
    adminVisible: true,
    managerVisible: false,
    employeeVisible: false,
  },
  {
    key: 'workflows',
    path: '/dashboard/workflows',
    label: { en: 'Workflows', ar: 'سير العمل' },
    icon: 'Zap',
    planFeature: 'workflows',
    requiredPermission: 'workflows:read',
    adminVisible: true,
    managerVisible: true,
    employeeVisible: true,
  },
  {
    key: 'call_dashboard',
    path: '/dashboard/calls',
    label: { en: 'Call Dashboard', ar: 'لوحة المكالمات' },
    icon: 'PhoneCall',
    planFeature: 'call_dashboard',
    requiredPermission: 'call_dashboard:read',
    adminVisible: true,
    managerVisible: false,
    employeeVisible: false,
  },
  {
    key: 'team',
    path: '/dashboard/team',
    label: { en: 'Team', ar: 'الفريق' },
    icon: 'Users',
    planFeature: 'team',
    requiredPermission: 'team:read',
    adminVisible: true,
    managerVisible: true,
    employeeVisible: false,
  },
  {
    key: 'approvals',
    path: '/dashboard/approvals',
    label: { en: 'Approvals', ar: 'الموافقات' },
    icon: 'CheckCircle',
    planFeature: 'approvals',
    requiredPermission: 'approvals:read',
    adminVisible: true,
    managerVisible: true,
    employeeVisible: false,
  },
  {
    key: 'inbox',
    path: '/dashboard/inbox',
    label: { en: 'Inbox', ar: 'البريد الوارد' },
    icon: 'Inbox',
    planFeature: 'inbox',
    requiredPermission: 'inbox:read',
    adminVisible: true,
    managerVisible: false,
    employeeVisible: false,
  },
  {
    key: 'integrations',
    path: '/dashboard/settings/integrations',
    label: { en: 'Integrations', ar: 'التكاملات' },
    icon: 'Puzzle',
    planFeature: 'integrations',
    requiredPermission: 'integrations:read',
    adminVisible: true,
    managerVisible: false,
    employeeVisible: false,
  },
  {
    key: 'usage',
    path: '/dashboard/analytics',
    label: { en: 'Usage', ar: 'الاستخدام' },
    icon: 'BarChart3',
    planFeature: 'usage',
    requiredPermission: 'usage:read',
    adminVisible: true,
    managerVisible: false,
    employeeVisible: false,
  },
  {
    key: 'audit_logs',
    path: '/dashboard/audit',
    label: { en: 'Audit Logs', ar: 'سجلات التدقيق' },
    icon: 'ScrollText',
    planFeature: 'audit_logs',
    requiredPermission: 'audit_logs:read',
    adminVisible: true,
    managerVisible: false,
    employeeVisible: false,
  },
  {
    key: 'settings',
    path: '/dashboard/settings',
    label: { en: 'Settings', ar: 'الإعدادات' },
    icon: 'Settings',
    planFeature: 'settings',
    requiredPermission: 'settings:read',
    adminVisible: true,
    managerVisible: false,
    employeeVisible: false,
  },
  {
    key: 'billing_status',
    path: '/dashboard/settings/billing',
    label: { en: 'Billing', ar: 'الفواتير' },
    icon: 'CreditCard',
    planFeature: 'billing_status',
    requiredPermission: 'billing:read',
    adminVisible: true,
    managerVisible: false,
    employeeVisible: false,
  },
  {
    key: 'admin_panel',
    path: '/dashboard/admin',
    label: { en: 'Admin', ar: 'الإدارة' },
    icon: 'Shield',
    planFeature: 'admin_panel',
    requiredPermission: 'admin:read',
    adminVisible: true,
    managerVisible: false,
    employeeVisible: false,
  },
  {
    key: 'profile',
    path: '/dashboard/profile',
    label: { en: 'Profile', ar: 'الملف الشخصي' },
    icon: 'UserCircle',
    planFeature: 'profile',
    requiredPermission: 'profile:read',
    adminVisible: true,
    managerVisible: true,
    employeeVisible: true,
  },
];
