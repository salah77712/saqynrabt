CREATE TABLE IF NOT EXISTS security_incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  incident_type VARCHAR(50) NOT NULL CHECK (incident_type IN ('data_breach', 'system_outage', 'unauthorised_access', 'vulnerability', 'other')),
  severity VARCHAR(10) NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'investigation', 'containment', 'eradication', 'recovery', 'closed')),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  affected_resources TEXT,
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  reported_by VARCHAR(100),
  assigned_to VARCHAR(100),
  client_notified BOOLEAN NOT NULL DEFAULT FALSE,
  notified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS incident_timeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  incident_id UUID NOT NULL REFERENCES security_incidents(id) ON DELETE CASCADE,
  action VARCHAR(255) NOT NULL,
  actor VARCHAR(100) NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_incidents_status ON security_incidents(status);
CREATE INDEX IF NOT EXISTS idx_incidents_severity ON security_incidents(severity);
CREATE INDEX IF NOT EXISTS idx_incidents_type ON security_incidents(incident_type);

COMMENT ON TABLE security_incidents IS 'Security incident records for compliance with Qatari Law No. 13 of 2016 breach notification requirements';
COMMENT ON TABLE incident_timeline IS 'Audited timeline of actions taken during incident response';
