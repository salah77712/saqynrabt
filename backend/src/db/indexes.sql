-- ── Critical Indexes ──────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_chatbot_chunks_company_id ON chatbot_chunks (company_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_chunks_document_id ON chatbot_chunks (document_id);

CREATE INDEX IF NOT EXISTS idx_company_members_company_id ON company_members (company_id);
CREATE INDEX IF NOT EXISTS idx_company_members_status ON company_members (status);

CREATE INDEX IF NOT EXISTS idx_usage_ledger_company_id ON usage_ledger (company_id);
CREATE INDEX IF NOT EXISTS idx_usage_ledger_month_year ON usage_ledger (month_year);

CREATE INDEX IF NOT EXISTS idx_audit_logs_company_id ON audit_logs (company_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs (timestamp);

CREATE INDEX IF NOT EXISTS idx_documents_company_id ON documents (company_id, status);
CREATE INDEX IF NOT EXISTS idx_employees_company_id ON employees (company_id);
