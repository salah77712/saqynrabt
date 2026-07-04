-- ── Partitioning Script for Large Datasets ───────────────────

-- Partitioning usage_ledger by Range of month_year values
CREATE TABLE IF NOT EXISTS usage_ledger_partitioned (
    id SERIAL,
    company_id INT NOT NULL,
    month_year VARCHAR(7) NOT NULL, -- e.g. "2026-07"
    active_questions INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id, month_year)
) PARTITION BY RANGE (month_year);

-- Example partition allocations
CREATE TABLE IF NOT EXISTS usage_ledger_y2026m07 PARTITION OF usage_ledger_partitioned
    FOR VALUES FROM ('2026-07') TO ('2026-08');

CREATE TABLE IF NOT EXISTS usage_ledger_y2026m08 PARTITION OF usage_ledger_partitioned
    FOR VALUES FROM ('2026-08') TO ('2026-09');
