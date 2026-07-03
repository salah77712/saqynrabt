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

-- ==============================================================================
-- DML - SEED DATA INSERTS (Rule 30)
-- ==============================================================================

-- 1. Insert Dummy Company
INSERT INTO companies (id, name, auto_overage_enabled)
VALUES ('dummy_company', 'Al Safa Business Hub', false)
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Default Entitlements for Dummy Company
INSERT INTO company_entitlements (company_id, max_employees, max_documents, max_questions, dept_limit)
VALUES ('dummy_company', 50, 5, 1000, 3)
ON CONFLICT (company_id) DO NOTHING;

-- 3. Insert Usage Ledger for Dummy Company
INSERT INTO usage_ledger (company_id, questions_count)
VALUES ('dummy_company', 15) -- 15 questions asked already
ON CONFLICT (company_id) DO NOTHING;

-- 4. Insert 1 Pending User for Clerk Webhook Demo Integration
INSERT INTO company_members (company_id, clerk_user_id, email, name, status, role)
VALUES (
    'dummy_company', 
    'user_2Pnd12345demo', 
    'pending.employee@alsafa.qa', 
    'Tariq Mahmood', 
    'pending', 
    'employee'
)
ON CONFLICT (clerk_user_id) DO NOTHING;

-- 5. Insert 1 Active Admin User to access dashboard
INSERT INTO company_members (company_id, clerk_user_id, email, name, status, role)
VALUES (
    'dummy_company', 
    'user_admin12345demo', 
    'admin@alsafa.qa', 
    'Salah Al-Qahtani', 
    'active', 
    'admin'
)
ON CONFLICT (clerk_user_id) DO NOTHING;

-- 6. Insert Employee Profile for the Active User (to test get_employee_balance tool - Rule 21)
INSERT INTO employee_profiles (clerk_user_id, company_id, name, department, vacation_balance)
VALUES (
    'user_admin12345demo',
    'dummy_company',
    'Salah Al-Qahtani',
    'Operations',
    28
)
ON CONFLICT (clerk_user_id) DO NOTHING;

-- 7. Insert Dummy Document
INSERT INTO documents (id, company_id, name, status, r2_key)
VALUES (
    'doc_dummy_01', 
    'dummy_company', 
    'Al_Safa_HR_SOP_2026.pdf', 
    'active', 
    'dummy_company/doc_dummy_01.pdf'
)
ON CONFLICT (id) DO NOTHING;

-- 8. Insert Exactly 3 Rows into chatbot_chunks with dummy 1536-dim embeddings (Rule 30)
-- Using ARRAY_FILL(0::float, ARRAY[1536])::vector to elegant construct 1536 float elements
INSERT INTO chatbot_chunks (company_id, document_id, text_content, embedding)
VALUES (
    'dummy_company',
    'doc_dummy_01',
    'Company Policy: Office hours are Sunday through Thursday, 8:00 AM to 5:00 PM. All team members must coordinate their attendance with their respective department heads.',
    ARRAY_FILL(0.001::float, ARRAY[1536])::vector
),
(
    'dummy_company',
    'doc_dummy_01',
    'Vacation Policy: Employees accrue 2.5 vacation days per month, up to 30 days annually. Vacation balance requests can be checked directly by asking the Staff Knowledge Hub assistant.',
    ARRAY_FILL(0.002::float, ARRAY[1536])::vector
),
(
    'dummy_company',
    'doc_dummy_01',
    'Operations Protocol: Technical maintenance shifts operate on a 24/7 on-call rotation. Critical incidents must be logged within the dashboard queue within 15 minutes of occurrence.',
    ARRAY_FILL(0.003::float, ARRAY[1536])::vector
)
ON CONFLICT DO NOTHING;
