import * as React from 'react';

type IconProps = { className?: string; size?: number };

export function HomeIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function PhoneIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function ChatIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function DocumentIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round"/><polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round"/><line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" strokeLinejoin="round"/><line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function TeamIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 21v-2a4 4 0 00-3-3.87" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function SettingsIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function BoltIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function CheckIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function XIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" strokeLinejoin="round"/><line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function WarningIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function InfoIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="16" x2="12" y2="12" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="8" x2="12.01" y2="8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function BellIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function BellOffIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.63 13A17.89 17.89 0 0118 8" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.26 6.26A5.86 5.86 0 006 8c0 7-3 9-3 9h14" strokeLinecap="round" strokeLinejoin="round"/><path d="M18 8a6 6 0 00-9.33-5" strokeLinecap="round" strokeLinejoin="round"/><line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function TrendingUpIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" strokeLinecap="round" strokeLinejoin="round"/><polyline points="17 6 23 6 23 12" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function LockIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function SearchIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round"/><line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function MailIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function GlobeIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/><line x1="2" y1="12" x2="22" y2="12" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function ArrowRightIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" strokeLinejoin="round"/><polyline points="12 5 19 12 12 19" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function ArrowLeftIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><line x1="19" y1="12" x2="5" y2="12" strokeLinecap="round" strokeLinejoin="round"/><polyline points="12 19 5 12 12 5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function ArrowDownIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" strokeLinejoin="round"/><polyline points="19 12 12 19 5 12" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function TrashIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polyline points="3 6 5 6 21 6" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function ShieldIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function DollarIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><line x1="12" y1="1" x2="12" y2="23" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function MenuIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" strokeLinejoin="round"/><line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" strokeLinejoin="round"/><line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function BarChartIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><line x1="18" y1="20" x2="18" y2="10" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="20" x2="12" y2="4" strokeLinecap="round" strokeLinejoin="round"/><line x1="6" y1="20" x2="6" y2="14" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function FileTextIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round"/><polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round"/><line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" strokeLinejoin="round"/><line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function ClockIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/><polyline points="12 6 12 12 16 14" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function BoxIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" strokeLinecap="round" strokeLinejoin="round"/><polyline points="3.27 6.96 12 12.01 20.73 6.96" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="22.08" x2="12" y2="12" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function PlusIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" strokeLinejoin="round"/><line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function BuildingIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="4" y="2" width="16" height="20" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 22v-4h6v4" strokeLinecap="round" strokeLinejoin="round"/><line x1="8" y1="6" x2="10" y2="6" strokeLinecap="round" strokeLinejoin="round"/><line x1="14" y1="6" x2="16" y2="6" strokeLinecap="round" strokeLinejoin="round"/><line x1="8" y1="10" x2="10" y2="10" strokeLinecap="round" strokeLinejoin="round"/><line x1="14" y1="10" x2="16" y2="10" strokeLinecap="round" strokeLinejoin="round"/><line x1="8" y1="14" x2="10" y2="14" strokeLinecap="round" strokeLinejoin="round"/><line x1="14" y1="14" x2="16" y2="14" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function ForbiddenIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function HealthcareIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="8" x2="12" y2="16" strokeLinecap="round" strokeLinejoin="round"/><line x1="8" y1="12" x2="16" y2="12" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function LawIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 2l7 4v4c0 4.42-3.13 8.07-7 9-3.87-.93-7-4.58-7-9V6l7-4z" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="11" x2="12" y2="16" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 11h6" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 16h10" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function WrenchIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function CarIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17a2 2 0 002 2h10a2 2 0 002-2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="7" cy="14" r="1.5" fill="currentColor"/><circle cx="17" cy="14" r="1.5" fill="currentColor"/></svg>;
}

export function StarIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function UploadIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/><polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function ConfettiIcon({ className = '' }: IconProps) {
  return <svg className={className} width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 6v2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 16v2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 12H4" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 12h-2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function AmbulanceIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="2" y="6" width="20" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 18a2 2 0 100-4 2 2 0 000 4z" strokeLinecap="round" strokeLinejoin="round"/><path d="M18 18a2 2 0 100-4 2 2 0 000 4z" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 12h8" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8v8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function ShoppingBagIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/><line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function ConstructionIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M2 22l16-16" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 12l4-4" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 4l4-4" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 10l6-6" strokeLinecap="round" strokeLinejoin="round"/><path d="M14.5 21.5L22 14" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function FlagIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" strokeLinecap="round" strokeLinejoin="round"/><line x1="4" y1="22" x2="4" y2="15" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function ClipboardIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" strokeLinecap="round" strokeLinejoin="round"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function MapPinIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function SparklesIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" strokeLinecap="round" strokeLinejoin="round"/><path d="M18 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function FolderIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>;
}

export function BriefcaseIcon({ className = '' }: IconProps) {
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="2" y="7" width="20" height="14" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
