CREATE TABLE IF NOT EXISTS legal_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_name VARCHAR(50) NOT NULL CHECK (document_name IN ('privacy', 'tos', 'dpa', 'security', 'nda')),
  version_hash VARCHAR(64) NOT NULL,
  effective_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  superseded_at TIMESTAMPTZ,
  change_summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_legal_versions_doc ON legal_versions(document_name);
CREATE INDEX IF NOT EXISTS idx_legal_versions_effective ON legal_versions(effective_date DESC);

COMMENT ON TABLE legal_versions IS 'Tracks every published version of SAQYN RABT legal documents for audit & versioning';
COMMENT ON COLUMN legal_versions.version_hash IS 'SHA-256 hash of the document content at time of publishing';
COMMENT ON COLUMN legal_versions.superseded_at IS 'Timestamp when this version was replaced by a newer version';
