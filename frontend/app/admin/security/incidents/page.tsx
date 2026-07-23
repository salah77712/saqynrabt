'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useLocale } from '../../../providers';

function ShieldSvg() { return <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>; }
function AlertTriangleSvg() { return <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>; }
function LoaderSvg() { return <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>; }
function PlusSvg() { return <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>; }
function ChevronDownSvg() { return <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>; }
function ChevronUpSvg() { return <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>; }
function SearchSvg() { return <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>; }

interface Incident {
  id: string;
  incident_type: string;
  severity: string;
  status: string;
  title: string;
  description: string;
  affected_resources: string | null;
  start_time: string | null;
  reported_by: string | null;
  assigned_to: string | null;
  client_notified: boolean;
  created_at: string;
  updated_at: string;
}

const severityColors: Record<string, string> = {
  critical: 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800',
  high: 'bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800',
  medium: 'bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800',
  low: 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
};

const statusColors: Record<string, string> = {
  new: 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
  investigation: 'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800',
  containment: 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800',
  eradication: 'bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800',
  recovery: 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800',
  closed: 'bg-gray-50 dark:bg-primary text-primary/40 dark:text-surface/40 border border-gray-200 dark:border-surface/20',
};

export default function AdminIncidentsPage() {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
const { getToken } = useAuth();
const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  const [newIncident, setNewIncident] = useState({
    title: '',
    description: '',
    incidentType: 'other' as Incident['incident_type'],
    severity: 'medium' as Incident['severity'],
    affectedResources: '',
  });

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async (status?: string, severity?: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (status) params.set('status', status);
      if (severity) params.set('severity', severity);
      const token = await getToken();
      const res = await fetch(`/api/admin/incidents?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch incidents');
      const data = await res.json();
      setIncidents(data.incidents);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const token = await getToken();
      const res = await fetch('/api/admin/incidents', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIncident),
      });
      if (!res.ok) throw new Error('Failed to create incident');
      setShowCreate(false);
      setNewIncident({ title: '', description: '', incidentType: 'other', severity: 'medium', affectedResources: '' });
      fetchIncidents();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const token = await getToken();
      await fetch(`/api/admin/incidents/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, timelineAction: `Status changed to ${status}` }),
      });
      fetchIncidents();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const filteredIncidents = incidents.filter((inc) =>
    inc.title.toLowerCase().includes(filter.toLowerCase()) ||
    inc.incident_type.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary flex items-center gap-3">
            <ShieldSvg />{t({ en: 'Security Incidents', ar: 'حوادث الأمن السيبراني' })}
          </h1>
          <p className="text-xs text-primary font-medium mt-1">{t({ en: 'Incident management for Qatari Law No. 13 of 2016 compliance', ar: 'إدارة الحوادث وفقاً للقانون القطري رقم 13 لسنة 2016' })}</p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-3 bg-primary text-surface text-xs font-bold px-6 py-3 rounded-xl min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
        >
          <PlusSvg />{t({ en: 'New Incident', ar: 'حادث جديد' })}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-3 text-primary text-xs bg-surface p-3 rounded-xl border border-primary/10">
          <AlertTriangleSvg /> {error}
        </div>
      )}

      {showCreate && (
        <div className="bg-surface rounded-xl border border-primary/10 p-8 space-y-4">
          <h2 className="text-sm font-bold text-primary">{t({ en: 'Log New Incident', ar: 'تسجيل حادث جديد' })}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <input
              placeholder={t({ en: 'Incident Title', ar: 'عنوان الحادث' })}
              value={newIncident.title}
              onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
              className="col-span-full min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal"
            />
            <textarea
              placeholder={t({ en: 'Description', ar: 'الوصف' })}
              value={newIncident.description}
              onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
              className="col-span-full min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal"
            />
            <select
              value={newIncident.incidentType}
              onChange={(e) => setNewIncident({ ...newIncident, incidentType: e.target.value as any })}
              className="min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal"
            >
              <option value="data_breach">{t({ en: 'Data Breach', ar: 'خرق بيانات' })}</option>
              <option value="system_outage">{t({ en: 'System Outage', ar: 'انقطاع النظام' })}</option>
              <option value="unauthorised_access">{t({ en: 'Unauthorised Access', ar: 'وصول غير مصرح' })}</option>
              <option value="vulnerability">{t({ en: 'Vulnerability', ar: 'ثغرة أمنية' })}</option>
              <option value="other">{t({ en: 'Other', ar: 'أخرى' })}</option>
            </select>
            <select
              value={newIncident.severity}
              onChange={(e) => setNewIncident({ ...newIncident, severity: e.target.value as any })}
              className="min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal"
            >
              <option value="critical">{t({ en: 'Critical', ar: 'حرج' })}</option>
              <option value="high">{t({ en: 'High', ar: 'عالي' })}</option>
              <option value="medium">{t({ en: 'Medium', ar: 'متوسط' })}</option>
              <option value="low">{t({ en: 'Low', ar: 'منخفض' })}</option>
            </select>
            <input
              placeholder={t({ en: 'Affected Resources', ar: 'الموارد المتأثرة' })}
              value={newIncident.affectedResources}
              onChange={(e) => setNewIncident({ ...newIncident, affectedResources: e.target.value })}
              className="min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal"
            />
          </div>
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="px-6 py-3 rounded-xl border border-primary/10 text-xs font-bold text-primary/70 min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 hover:bg-primary"
            >
              {t({ en: 'Cancel', ar: 'إلغاء' })}
            </button>
            <button
              type="button"
              onClick={handleCreate}
              className="px-6 py-3 rounded-xl bg-primary text-surface text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
            >
              {t({ en: 'Create Incident', ar: 'إنشاء الحادث' })}
            </button>
          </div>
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <span className="absolute inset-inline-start-3 top-1/2 -translate-y-1/2 text-primary"><SearchSvg /></span>
        <input
          placeholder={t({ en: 'Filter incidents...', ar: 'تصفية الحوادث...' })}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          aria-label={t({ en: 'Filter incidents', ar: 'تصفية الحوادث' })}
          className="min-h-[44px] w-full ps-10 pe-4 rounded-xl border border-primary/10 bg-surface text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal shadow-sm"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><LoaderSvg /></div>
      ) : filteredIncidents.length === 0 ? (
        <div className="text-center py-12 text-xs text-primary/70">{t({ en: 'No incidents found', ar: 'لا توجد حوادث' })}</div>
      ) : (
        <div className="space-y-3">
          {filteredIncidents.map((inc) => (
            <div key={inc.id} className="bg-surface rounded-xl border border-primary/10 overflow-hidden">
              <button
                type="button"
                onClick={() => setExpandedId(expandedId === inc.id ? null : inc.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-primary transition-colors text-left"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase border ${severityColors[inc.severity] || 'bg-gray-50 dark:bg-primary text-primary dark:text-surface border border-gray-200 dark:border-surface/20'}`}>
                    {inc.severity}
                  </span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase border ${statusColors[inc.status] || 'bg-gray-50 dark:bg-primary text-primary dark:text-surface border border-gray-200 dark:border-surface/20'}`}>
                    {inc.status}
                  </span>
                  <span className="text-xs font-medium text-primary truncate">{inc.title}</span>
                  <span className="text-xs text-primary/70 uppercase">{inc.incident_type.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs text-primary/70">{new Date(inc.created_at).toLocaleDateString()}</span>
                  {expandedId === inc.id ? <ChevronUpSvg /> : <ChevronDownSvg />}
                </div>
              </button>

              {expandedId === inc.id && (
                <div className="px-4 pb-4 border-t border-primary/10 pt-3 space-y-3">
                  <p className="text-xs text-primary/70">{inc.description}</p>
                  {inc.affected_resources && (
                    <p className="text-xs text-primary/70"><span className="font-bold">{t({ en: 'Affected:', ar: 'متأثر:' })}</span> {inc.affected_resources}</p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-primary/70">
                    <span>{t({ en: 'Reported by:', ar: 'أبلغ عن:' })} {inc.reported_by || 'N/A'}</span>
                    <span>{t({ en: 'Assigned to:', ar: 'مسند إلى:' })} {inc.assigned_to || 'Unassigned'}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {Object.entries(statusColors).map(([s, _]) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleStatusUpdate(inc.id, s)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 ${
                          inc.status === s
                            ? 'bg-primary text-surface'
                            : 'bg-surface text-primary border border-primary/10 hover:bg-primary'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
