'use client';

import { useState, useEffect } from 'react';
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
  critical: 'bg-red-50 text-red-700 border border-red-200',
  high: 'bg-orange-50 text-orange-700 border border-orange-200',
  medium: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  low: 'bg-blue-50 text-blue-700 border border-blue-200',
};

const statusColors: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700 border border-blue-200',
  investigation: 'bg-purple-50 text-purple-700 border border-purple-200',
  containment: 'bg-red-50 text-red-700 border border-red-200',
  eradication: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  recovery: 'bg-green-50 text-green-700 border border-green-200',
  closed: 'bg-gray-50 text-[#141F33]/40 border border-gray-200',
};

export default function AdminIncidentsPage() {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
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
      const res = await fetch(`/api/admin/incidents?${params}`, {
        headers: { Authorization: `Bearer ${await window.Clerk?.session?.getToken()}` },
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
      const res = await fetch('/api/admin/incidents', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await window.Clerk?.session?.getToken()}`,
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
      await fetch(`/api/admin/incidents/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${await window.Clerk?.session?.getToken()}`,
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
          <h1 className="text-xl font-extrabold text-[#141F33] flex items-center gap-3">
            <ShieldSvg />{t({ en: 'Security Incidents', ar: 'حوادث الأمن السيبراني' })}
          </h1>
          <p className="text-xs text-[#141F33] font-medium mt-1">{t({ en: 'Incident management for Qatari Law No. 13 of 2016 compliance', ar: 'إدارة الحوادث وفقاً للقانون القطري رقم 13 لسنة 2016' })}</p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-3 bg-[#141F33] text-[#F8F9FB] text-xs font-bold px-6 py-3 rounded-xl min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
        >
          <PlusSvg />{t({ en: 'New Incident', ar: 'حادث جديد' })}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-3 text-[#141F33] text-xs bg-[#F8F9FB] p-3 rounded-xl border border-[#141F33]/10">
          <AlertTriangleSvg /> {error}
        </div>
      )}

      {showCreate && (
        <div className="bg-[#F8F9FB] rounded-xl border border-[#141F33]/10 p-8 space-y-4">
          <h2 className="text-sm font-bold text-[#141F33]">{t({ en: 'Log New Incident', ar: 'تسجيل حادث جديد' })}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <input
              placeholder={t({ en: 'Incident Title', ar: 'عنوان الحادث' })}
              value={newIncident.title}
              onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
              className="col-span-full min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal"
            />
            <textarea
              placeholder={t({ en: 'Description', ar: 'الوصف' })}
              value={newIncident.description}
              onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
              className="col-span-full min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal"
            />
            <select
              value={newIncident.incidentType}
              onChange={(e) => setNewIncident({ ...newIncident, incidentType: e.target.value as any })}
              className="min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal"
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
              className="min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal"
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
              className="min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal"
            />
          </div>
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="px-6 py-3 rounded-xl border border-[#141F33]/10 text-xs font-bold text-[#141F33]/70 min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 hover:bg-[#141F33]"
            >
              {t({ en: 'Cancel', ar: 'إلغاء' })}
            </button>
            <button
              type="button"
              onClick={handleCreate}
              className="px-6 py-3 rounded-xl bg-[#141F33] text-[#F8F9FB] text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
            >
              {t({ en: 'Create Incident', ar: 'إنشاء الحادث' })}
            </button>
          </div>
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#141F33]"><SearchSvg /></span>
        <input
          placeholder={t({ en: 'Filter incidents...', ar: 'تصفية الحوادث...' })}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="min-h-[44px] w-full pl-10 pr-4 rounded-xl border border-[#141F33]/10 bg-[#F8F9FB] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal shadow-sm"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><LoaderSvg /></div>
      ) : filteredIncidents.length === 0 ? (
        <div className="text-center py-12 text-xs text-[#141F33]/70">{t({ en: 'No incidents found', ar: 'لا توجد حوادث' })}</div>
      ) : (
        <div className="space-y-3">
          {filteredIncidents.map((inc) => (
            <div key={inc.id} className="bg-[#F8F9FB] rounded-xl border border-[#141F33]/10 overflow-hidden">
              <button
                type="button"
                onClick={() => setExpandedId(expandedId === inc.id ? null : inc.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-[#141F33] transition-colors text-left"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase border ${severityColors[inc.severity] || 'bg-gray-50 text-[#141F33] border border-gray-200'}`}>
                    {inc.severity}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase border ${statusColors[inc.status] || 'bg-gray-50 text-[#141F33] border border-gray-200'}`}>
                    {inc.status}
                  </span>
                  <span className="text-xs font-medium text-[#141F33] truncate">{inc.title}</span>
                  <span className="text-[10px] text-[#141F33]/70 uppercase">{inc.incident_type.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-[10px] text-[#141F33]/70">{new Date(inc.created_at).toLocaleDateString()}</span>
                  {expandedId === inc.id ? <ChevronUpSvg /> : <ChevronDownSvg />}
                </div>
              </button>

              {expandedId === inc.id && (
                <div className="px-4 pb-4 border-t border-[#141F33]/10 pt-3 space-y-3">
                  <p className="text-xs text-[#141F33]/70">{inc.description}</p>
                  {inc.affected_resources && (
                    <p className="text-xs text-[#141F33]/70"><span className="font-bold">{t({ en: 'Affected:', ar: 'متأثر:' })}</span> {inc.affected_resources}</p>
                  )}
                  <div className="flex items-center gap-3 text-[10px] text-[#141F33]/70">
                    <span>{t({ en: 'Reported by:', ar: 'أبلغ عن:' })} {inc.reported_by || 'N/A'}</span>
                    <span>{t({ en: 'Assigned to:', ar: 'مسند إلى:' })} {inc.assigned_to || 'Unassigned'}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {Object.entries(statusColors).map(([s, _]) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleStatusUpdate(inc.id, s)}
                        className={`px-2.5 py-1.5 rounded-xl text-[10px] font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 ${
                          inc.status === s
                            ? 'bg-[#141F33] text-[#F8F9FB]'
                            : 'bg-[#F8F9FB] text-[#141F33] border border-[#141F33]/10 hover:bg-[#141F33]'
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
