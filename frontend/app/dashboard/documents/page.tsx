'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useEntitlements } from '../../providers';

interface Document {
  id: string;
  name: string;
  status: string;
  created_at: string;
}

export default function DocumentsPage() {
  const { getToken } = useAuth();
  const { entitlements, refreshEntitlements, mockMode } = useEntitlements();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: 'info' });

  // Sandbox data (Rule 30)
  const [sandboxDocs, setSandboxDocs] = useState<Document[]>([
    { id: 'doc_dummy_01', name: 'Al_Safa_HR_SOP_2026.pdf', status: 'active', created_at: new Date().toISOString() }
  ]);

  const maxDocs = entitlements?.max_documents ?? 5;
  const activeCount = mockMode ? sandboxDocs.length : (entitlements?.active_documents ?? 0);
  const limitReached = activeCount >= maxDocs;

  const fetchDocuments = async () => {
    if (mockMode) {
      setDocuments(sandboxDocs);
      setLoading(false);
      return;
    }

    try {
      const token = await getToken();
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
      const response = await fetch(`${apiBase}/api/documents`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      }
    } catch (err: any) {
      setMessage({ text: 'Failed to retrieve database documents.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [mockMode, sandboxDocs]);

  // Upload File (Rule 24 / 28)
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Rule 24: Reject PDF uploads over 10MB
    if (file.size > 10 * 1024 * 1024) {
      setMessage({ text: 'Upload failed: File exceeds the 10MB limit (Rule 24).', type: 'error' });
      return;
    }

    // Rule 28: Plan limits cap check
    if (limitReached) {
      setMessage({ text: 'Upload blocked: Plan limit reached. Upgrade to add more documents.', type: 'error' });
      return;
    }

    setUploading(true);
    setMessage({ text: '', type: 'info' });

    if (mockMode) {
      setTimeout(() => {
        const newDoc: Document = {
          id: `doc_${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          status: 'active',
          created_at: new Date().toISOString()
        };
        setSandboxDocs(prev => [newDoc, ...prev]);
        setUploading(false);
        setMessage({ text: 'Document uploaded and chunked (Sandbox).', type: 'success' });
      }, 1000);
      return;
    }

    try {
      const token = await getToken();
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${apiBase}/api/documents`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setMessage({ text: 'Document registered successfully.', type: 'success' });
        fetchDocuments();
        refreshEntitlements();
      } else {
        const errData = await response.json();
        setMessage({ text: errData.message || 'Upload rejected.', type: 'error' });
      }
    } catch (err: any) {
      setMessage({ text: `Upload error: ${err.message}`, type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  // Delete Document with 3-tier cleanup (Rule 37)
  const handleDelete = async (docId: string) => {
    setMessage({ text: '', type: 'info' });
    if (mockMode) {
      setSandboxDocs(prev => prev.filter(d => d.id !== docId));
      setMessage({ text: 'Cascading clean complete (Pinecone vectors deleted, R2 file deleted, DB updated) (Sandbox).', type: 'success' });
      return;
    }

    try {
      const token = await getToken();
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
      const response = await fetch(`${apiBase}/api/documents`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ document_id: docId }),
      });

      if (response.ok) {
        setMessage({ text: 'Cascading clean complete. Vectors and file deleted.', type: 'success' });
        fetchDocuments();
        refreshEntitlements();
      } else {
        setMessage({ text: 'Delete command failed.', type: 'error' });
      }
    } catch (err: any) {
      setMessage({ text: `Delete error: ${err.message}`, type: 'error' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-700 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Staff Knowledge Base Documents</h1>
          <p className="text-sm text-slate-400 mt-1">
            Upload files (SOPs, manuals, guidelines) to index them into the Hub search index.
          </p>
        </div>
        <div className="bg-dark-800 border border-dark-700 px-4 py-2 rounded-lg text-right">
          <span className="text-xs text-slate-500 block uppercase font-mono">Active Documents</span>
          <span className="text-lg font-bold text-brand-400">{activeCount}</span>
          <span className="text-slate-500 text-xs"> / {maxDocs} limit</span>
        </div>
      </div>

      {message.text && (
        <div className={`p-4 rounded-lg text-sm border ${
          message.type === 'success' 
            ? 'bg-emerald-950/60 border-emerald-500/20 text-emerald-400' 
            : 'bg-red-950/60 border-red-500/20 text-red-300'
        }`}>
          {message.text}
        </div>
      )}

      {/* Upload Box (Rule 24 / 28) */}
      <div className="bg-dark-800 border border-dark-700 rounded-xl p-8 text-center space-y-4">
        <div className="max-w-md mx-auto flex flex-col items-center justify-center">
          <span className="text-4xl mb-3">📁</span>
          <h3 className="text-sm font-semibold text-slate-200">Upload PDF Manual</h3>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            PDF files only. Hard limit of 10MB per file.
          </p>

          <label className={`flex items-center justify-center px-6 font-bold rounded-lg transition-all cursor-pointer ${
            limitReached || uploading
              ? 'bg-dark-700 text-slate-500 cursor-not-allowed border border-dark-600'
              : 'bg-brand-500 hover:bg-brand-600 text-dark-900 shadow-md'
          }`} style={{ minHeight: '44px' }}>
            <input
              type="file"
              accept=".pdf"
              disabled={limitReached || uploading}
              onChange={handleUpload}
              className="hidden"
            />
            {uploading ? 'Processing File...' : 'Choose PDF File'}
          </label>

          {limitReached && (
            <p className="text-xs text-brand-400 mt-3 font-semibold">
              Plan limit reached. Upgrade to add more documents.
            </p>
          )}
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden shadow-md">
        <div className="px-6 py-4 bg-dark-900/60 border-b border-dark-700">
          <h2 className="text-sm font-semibold text-slate-300">Indexed Knowledge Documents</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400 animate-pulse text-sm">
            Loading documents...
          </div>
        ) : documents.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            All clear. No documents uploaded.
          </div>
        ) : (
          <div className="divide-y divide-dark-700">
            {documents.map((doc) => (
              <div key={doc.id} className="p-6 flex items-center justify-between gap-4 hover:bg-dark-900/20 transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-slate-200 text-sm">{doc.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    ID: {doc.id} | Uploaded: {new Date(doc.created_at).toLocaleDateString()}
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(doc.id)}
                  className="px-4 border border-red-500/30 text-red-400 hover:bg-red-950/20 font-semibold rounded-lg text-xs transition-colors"
                  style={{ minHeight: '44px' }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Simulator helper */}
      {mockMode && (
        <div className="bg-dark-800/40 border border-dark-700 p-4 rounded-xl flex items-center justify-between text-xs text-slate-400">
          <span>Demo Tool: Toggle plan document capacity limits.</span>
          <button
            onClick={() => {
              if (entitlements) {
                entitlements.max_documents = activeCount;
                refreshEntitlements();
              }
            }}
            className="px-3 py-1 bg-dark-700 hover:bg-dark-600 rounded text-slate-300 font-semibold"
          >
            Force Capacity Ceiling
          </button>
        </div>
      )}

    </div>
  );
}
