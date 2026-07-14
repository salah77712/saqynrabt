#!/bin/bash

# Automated Penetration Testing Runner using OWASP ZAP CLI
# Usage: ./pen-test.sh <TARGET_URL>

TARGET_URL=$1

if [ -z "$TARGET_URL" ]; then
  echo "Error: Missing target URL argument."
  echo "Usage: ./pen-test.sh <TARGET_URL>"
  exit 1
fi

echo "Starting automated security penetration scan against: $TARGET_URL"

# Simulate ZAP baseline rules execution
docker run -t owasp/zap2docker-stable zap-baseline.py -t "$TARGET_URL" -g gen.conf -r testreport.html

if [ $? -eq 0 ]; then
  echo "Penetration scan completed successfully. Report generated: testreport.html"
  exit 0
else
  echo "Warning: Scan generated warnings or vulnerabilities detected."
  exit 1
fi
