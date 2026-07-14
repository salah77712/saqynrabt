CREATE TABLE IF NOT EXISTS system_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  config_key VARCHAR(100) UNIQUE NOT NULL,
  config_value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by VARCHAR(100)
);

-- Data retention defaults
INSERT INTO system_config (config_key, config_value, description) VALUES
  ('retention.chat_messages_days', '365'::jsonb, 'Number of days to retain chat messages before automatic purge'),
  ('retention.audit_logs_days', '1095'::jsonb, 'Number of days to retain audit logs (3 years for Qatari tax compliance)'),
  ('retention.cancellation_grace_days', '30'::jsonb, 'Grace period in days before purging cancelled company data (Qatari Civil Code Art. 190)'),
  ('retention.temp_pdf_minutes', '10'::jsonb, 'Minutes before temporary PDF downloads are deleted')
ON CONFLICT (config_key) DO NOTHING;

-- Trial period config (Qatari Law No. 8 of 2019)
INSERT INTO system_config (config_key, config_value, description) VALUES
  ('trial.cooling_off_days', '14'::jsonb, 'Cooling-off period in days for new clients under Qatari E-Commerce Law')
ON CONFLICT (config_key) DO NOTHING;

COMMENT ON TABLE system_config IS 'System-wide configuration for retention periods, trial settings, and compliance parameters';
