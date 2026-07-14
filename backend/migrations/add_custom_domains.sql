-- Create table for custom domains (Enterprise Feature)
CREATE TABLE IF NOT EXISTS custom_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id VARCHAR(255) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  domain VARCHAR(255) NOT NULL UNIQUE,
  ssl_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index domain queries
CREATE INDEX IF NOT EXISTS idx_custom_domains_domain ON custom_domains(domain);
