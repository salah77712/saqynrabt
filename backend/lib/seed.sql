-- ==============================================================================
-- SAQYN RABT - NEON SERVERLESS DATABASE SEED SCRIPT
-- ==============================================================================

-- Enable the pgvector extension for embedding searches (Rule 20 / 34)
CREATE EXTENSION IF NOT EXISTS vector;

-- 1. Companies Table (Rule 17)
CREATE TABLE IF NOT EXISTS companies (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    auto_overage_enabled BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Company Entitlements Table (Rule 25 / 26 / 27 / 28)
CREATE TABLE IF NOT EXISTS company_entitlements (
    company_id VARCHAR(255) PRIMARY KEY REFERENCES companies(id) ON DELETE CASCADE,
    max_employees INT DEFAULT 50 NOT NULL,
    max_documents INT DEFAULT 5 NOT NULL,
    max_questions INT DEFAULT 1000 NOT NULL,
    dept_limit INT DEFAULT 3 NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Company Members / Employees Table (Rule 11 / 28 / 36)
CREATE TABLE IF NOT EXISTS company_members (
    id SERIAL PRIMARY KEY,
    company_id VARCHAR(255) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    clerk_user_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL, -- 'pending' or 'active'
    role VARCHAR(50) DEFAULT 'employee' NOT NULL,  -- 'admin' or 'employee'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Employee Profiles Table (Rule 21)
CREATE TABLE IF NOT EXISTS employee_profiles (
    clerk_user_id VARCHAR(255) PRIMARY KEY REFERENCES company_members(clerk_user_id) ON DELETE CASCADE,
    company_id VARCHAR(255) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    vacation_balance INT DEFAULT 30 NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Documents Table (Rule 37)
CREATE TABLE IF NOT EXISTS documents (
    id VARCHAR(255) PRIMARY KEY,
    company_id VARCHAR(255) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'active' NOT NULL, -- 'active' or 'deleted'
    r2_key VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Chatbot Chunks Table (Rule 30 / 34)
CREATE TABLE IF NOT EXISTS chatbot_chunks (
    id SERIAL PRIMARY KEY,
    company_id VARCHAR(255) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    document_id VARCHAR(255) REFERENCES documents(id) ON DELETE SET NULL,
    text_content TEXT NOT NULL,
    embedding vector(1536), -- 1536-dimensional embedding
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Knowledge Gaps Table (Rule 40)
CREATE TABLE IF NOT EXISTS knowledge_gaps (
    id SERIAL PRIMARY KEY,
    company_id VARCHAR(255) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    user_id VARCHAR(255) NOT NULL,
    question_text TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 8. Usage Ledger Table (Rule 22)
CREATE TABLE IF NOT EXISTS usage_ledger (
    company_id VARCHAR(255) PRIMARY KEY REFERENCES companies(id) ON DELETE CASCADE,
    questions_count INT DEFAULT 0 NOT NULL,
    last_reset TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 9. Feedback Table (Rule 42)
CREATE TABLE IF NOT EXISTS feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id VARCHAR(255) REFERENCES companies(id) ON DELETE CASCADE,
    user_id TEXT,
    rating INTEGER,
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 10. Audit Logs Table (Security Rule S3)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id VARCHAR(255) REFERENCES companies(id) ON DELETE CASCADE,
    user_id TEXT,
    action TEXT,
    details JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 11. Notifications Table (Rule 43)
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id VARCHAR(255) REFERENCES companies(id) ON DELETE CASCADE,
    user_id TEXT,
    title TEXT,
    body TEXT,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==============================================================================
-- DML - SEED DATA INSERTS (Rule 30)
-- ==============================================================================

-- 1. Insert Demo Company
INSERT INTO companies (id, name, auto_overage_enabled)
VALUES ('demo-company', 'SAQYN RABT Demo', false)
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Default Entitlements for Demo Company
INSERT INTO company_entitlements (company_id, max_employees, max_documents, max_questions, dept_limit)
VALUES ('demo-company', 50, 5, 1000, 3)
ON CONFLICT (company_id) DO NOTHING;

-- 3. Insert Usage Ledger for Demo Company (starts at zero; increments via real usage)
INSERT INTO usage_ledger (company_id, questions_count)
VALUES ('demo-company', 0)
ON CONFLICT (company_id) DO NOTHING;

-- 4. Insert 1 Active Admin User (created via Clerk; synced here for dashboard access)
INSERT INTO company_members (company_id, clerk_user_id, email, name, status, role)
VALUES (
    'demo-company',
    'user_admin12345demo',
    'admin@saqyn.ai',
    'Salah Admin',
    'active',
    'admin'
)
ON CONFLICT (clerk_user_id) DO NOTHING;

-- 5. Insert Employee Profile for the Active User (to test get_employee_balance tool)
INSERT INTO employee_profiles (clerk_user_id, company_id, name, department, vacation_balance)
VALUES (
    'user_admin12345demo',
    'demo-company',
    'Salah Admin',
    'Operations',
    30
)
ON CONFLICT (clerk_user_id) DO NOTHING;

-- 6. Insert Demo Document with a minimal R2 key
INSERT INTO documents (id, company_id, name, status, r2_key)
VALUES (
    'doc_demo_01',
    'demo-company',
    'saqyn_hr_policy_2026.pdf',
    'active',
    'demo-company/doc_demo_01.pdf'
)
ON CONFLICT (id) DO NOTHING;

-- 7. Insert Exactly 3 Rows into chatbot_chunks with dummy 1536-dim embeddings
-- so the chat works immediately upon first login (Rule 30)
INSERT INTO chatbot_chunks (company_id, document_id, text_content, embedding)
VALUES (
    'demo-company',
    'doc_demo_01',
    'Company Policy: Office hours are Sunday through Thursday, 8:00 AM to 5:00 PM. All team members must coordinate their attendance with their respective department heads.',
    ARRAY_FILL(0.001::float, ARRAY[1536])::vector
),
(
    'demo-company',
    'doc_demo_01',
    'Vacation Policy: Employees accrue 2.5 vacation days per month, up to 30 days annually. Vacation balance requests can be checked directly by asking the Staff Knowledge Hub assistant.',
    ARRAY_FILL(0.002::float, ARRAY[1536])::vector
),
(
    'demo-company',
    'doc_demo_01',
    'Operations Protocol: Technical maintenance shifts operate on a 24/7 on-call rotation. Critical incidents must be logged within the dashboard queue within 15 minutes of occurrence.',
    ARRAY_FILL(0.003::float, ARRAY[1536])::vector
)
ON CONFLICT DO NOTHING;
