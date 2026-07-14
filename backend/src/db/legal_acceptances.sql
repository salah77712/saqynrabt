CREATE TABLE IF NOT EXISTS legal_acceptances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id VARCHAR(50) NOT NULL,
  user_id VARCHAR(50) NOT NULL,
  document_type VARCHAR(20) NOT NULL CHECK (document_type IN ('tos', 'dpa')),
  version_hash VARCHAR(64) NOT NULL,
  accepted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address VARCHAR(45),
  user_agent TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_legal_acceptances_company ON legal_acceptances(company_id);
CREATE INDEX IF NOT EXISTS idx_legal_acceptances_user ON legal_acceptances(user_id);

COMMENT ON TABLE legal_acceptances IS 'Audited record of each user''s explicit acceptance of TOS/DPA versions. Required under Qatari Law No. 8 of 2019.';
