import * as React from 'react';
import { Button } from '@/components/shadcn/button';
import { AlertTriangle, FileText, BellOff, Users } from 'lucide-react';

interface EmptyStateAction {
  label: string;
  onClick: () => void;
}

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  secondaryAction?: EmptyStateAction;
  compact?: boolean;
  retry?: () => void;
}

export function EmptyState({
  icon = undefined,
  title,
  description = "",
  actionText,
  onAction,
  secondaryAction,
  compact = false,
  retry,
}: EmptyStateProps) {
  const containerClass = compact
    ? 'flex flex-col items-center justify-center text-center p-6'
    : 'flex flex-col items-center justify-center text-center p-8 border border-[#141F33]/10 dark:border-[#141F33]/30 rounded-[40px] bg-[#F8F9FB] dark:bg-[#141F33] shadow-sm max-w-sm mx-auto';

  return (
    <div className={containerClass}>
      <span className={compact ? 'text-3xl mb-3' : 'text-4xl mb-4'}>
        {icon || <AlertTriangle className="w-10 h-10 text-[#141F33]/40" />}
      </span>
      <h3 className={`font-bold text-[#141F33] dark:text-[#F8F9FB] ${compact ? 'text-sm' : 'text-base'} mb-1`}>
        {title}
      </h3>
      <p className={`text-xs text-[#141F33]/60 leading-relaxed mb-6 ${compact ? 'max-w-xs' : ''}`}>
        {description}
      </p>
      <div className={`flex ${secondaryAction ? 'gap-4' : ''}`}>
        {((actionText && onAction) || retry) && (
          <Button variant="default" size="sm" onClick={onAction || retry}>
            {actionText || "Retry"}
          </Button>
        )}
        {secondaryAction && (
          <Button variant="outline" size="sm" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
}

export function EmptyStateWithRetry({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <EmptyState
      icon={<AlertTriangle className="w-10 h-10 text-[#141F33]/40" />}
      title="Something went wrong"
      description={message}
      actionText="Retry"
      onAction={onRetry}
    />
  );
}

export function EmptyDocumentsState({ onUpload }: { onUpload: () => void }) {
  return (
    <EmptyState
      icon={<FileText className="w-10 h-10 text-[#141F33]/40" />}
      title="No documents yet"
      description="Upload your first SOP or policy PDF to expand your chatbot knowledge."
      actionText="Upload Document"
      onAction={onUpload}
    />
  );
}

export function EmptyAutomationState() {
  return (
    <EmptyState
      icon={<BellOff className="w-10 h-10 text-[#141F33]/40" />}
      title="No automation requests"
      description="All clear! There are no pending automation requests."
      compact
    />
  );
}

export function EmptyTeamState({ onInvite }: { onInvite: () => void }) {
  return (
    <EmptyState
      icon={<Users className="w-10 h-10 text-[#141F33]/40" />}
      title="No team members"
      description="Invite your colleagues to collaborate on the platform."
      actionText="Invite Colleague"
      onAction={onInvite}
    />
  );
}
export default EmptyState;
