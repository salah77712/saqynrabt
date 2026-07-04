#!/bin/bash

# SOC2 Audit Logs Exporter
# Usage: ./export-audit-logs.sh <COMPANY_ID> <API_KEY>

COMPANY_ID=$1
API_KEY=$2

if [ -z "$COMPANY_ID" ] || [ -z "$API_KEY" ]; then
  echo "Error: Missing arguments."
  echo "Usage: ./export-audit-logs.sh <COMPANY_ID> <API_KEY>"
  exit 1
fi

echo "Exporting SOC2 audit logs for company: $COMPANY_ID"

curl -H "x-api-key: $API_KEY" \
     -H "Accept: application/json" \
     "https://saqyn-backend.workers.dev/api/audit/export?company_id=$COMPANY_ID" \
     > "saqyn_audit_logs_${COMPANY_ID}.json"

if [ $? -eq 0 ]; then
  echo "Audit logs saved successfully to saqyn_audit_logs_${COMPANY_ID}.json"
  exit 0
else
  echo "Error: Failed to fetch audit logs."
  exit 1
fi
