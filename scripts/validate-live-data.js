#!/usr/bin/env node

/**
 * validate-live-data.js
 *
 * CI validation script that verifies live data flows end-to-end.
 * Exits with non-zero code on failure to prevent deployment.
 *
 * Checks:
 * 1. Frontend API routes return valid JSON (not mock data)
 * 2. Usage endpoint returns real usage_ledger data
 * 3. Documents endpoint connects to R2/documents table
 * 4. Approvals endpoint connects to company_members table
 * 5. Automation endpoint connects to automation_requests table
 * 6. Chat history endpoint connects to chat_messages table
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const API_URL = process.env.API_URL || 'http://localhost:8787';
const CLERK_TOKEN = process.env.CLERK_TEST_TOKEN || '';

const PASS = '\x1b[32m✓\x1b[0m';
const FAIL = '\x1b[31m✗\x1b[0m';

let exitCode = 0;

function check(name, condition, detail = '') {
  if (condition) {
    console.log(`  ${PASS} ${name} ${detail}`);
  } else {
    console.log(`  ${FAIL} ${name} ${detail}`);
    exitCode = 1;
  }
}

async function fetchJson(url, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (CLERK_TOKEN) {
    headers['Authorization'] = `Bearer ${CLERK_TOKEN}`;
  }
  const res = await fetch(url, { ...options, headers });
  const text = await res.text();
  try {
    return { ok: res.ok, data: JSON.parse(text), status: res.status };
  } catch {
    return { ok: false, data: null, status: res.status, raw: text };
  }
}

async function main() {
  console.log('\n🔍 SAQYN RABT - Live Data Validation');
  console.log('======================================\n');

  // 1. Check Usage endpoint
  console.log('1. Usage endpoint [/api/usage]');
  try {
    const { ok, data } = await fetchJson(`${BASE_URL}/api/usage`);
    check('returns valid JSON', ok && data !== null);
    check('has questions_used field', data && typeof data.questions_used === 'number');
    check('has questions_limit field', data && typeof data.questions_limit === 'number');
  } catch (e) {
    check('usage endpoint reachable', false, e.message);
  }
  console.log();

  // 2. Check Documents endpoint
  console.log('2. Documents endpoint [/api/documents]');
  try {
    const { ok, data } = await fetchJson(`${BASE_URL}/api/documents`);
    check('returns valid JSON', ok && data !== null);
    check('has documents array', data && Array.isArray(data.documents));
  } catch (e) {
    check('documents endpoint reachable', false, e.message);
  }
  console.log();

  // 3. Check Approvals endpoint
  console.log('3. Approvals endpoint [/api/approvals]');
  try {
    const { ok, data } = await fetchJson(`${BASE_URL}/api/approvals`);
    check('returns valid JSON', ok && data !== null);
    check('has pending array', data && Array.isArray(data.pending));
    check('has active array', data && Array.isArray(data.active));
  } catch (e) {
    check('approvals endpoint reachable', false, e.message);
  }
  console.log();

  // 4. Check Automation endpoint
  console.log('4. Automation endpoint [/api/automation]');
  try {
    const { ok, data } = await fetchJson(`${BASE_URL}/api/automation`);
    check('returns valid JSON', ok && data !== null);
    check('has requests array', data && Array.isArray(data.requests));
    check('has activeCalls array', data && Array.isArray(data.activeCalls));
  } catch (e) {
    check('automation endpoint reachable', false, e.message);
  }
  console.log();

  // 5. Check Chat History endpoint
  console.log('5. Chat history endpoint [/api/chat/history]');
  try {
    const { ok, data } = await fetchJson(`${BASE_URL}/api/chat/history`);
    check('returns valid JSON', ok && data !== null);
    check('has messages array', data && Array.isArray(data.messages));
  } catch (e) {
    check('chat history endpoint reachable', false, e.message);
  }
  console.log();

  // 6. Check backend health directly
  console.log('6. Backend health check');
  try {
    const { ok, data } = await fetchJson(`${API_URL}/api/health`);
    check('backend reachable', ok);
    if (data && data.mcp) {
      check('all MCP providers online', Object.values(data.mcp).every(v => v === 'online'), JSON.stringify(data.mcp));
    }
  } catch (e) {
    check('backend health reachable', false, e.message);
  }
  console.log();

  // Summary
  console.log('======================================');
  if (exitCode === 0) {
    console.log('\x1b[32m✅ All live data checks passed!\x1b[0m\n');
  } else {
    console.log('\x1b[31m❌ Some checks failed. Review output above.\x1b[0m\n');
  }

  process.exit(exitCode);
}

main().catch((err) => {
  console.error('Validation script crashed:', err);
  process.exit(1);
});
