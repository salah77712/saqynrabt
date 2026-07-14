#!/bin/bash

# Database Backup Restoration Script for Neon PostgreSQL
# Usage: ./restore-backup.sh <BACKUP_FILE> <NEON_DB_URL>

BACKUP_FILE=$1
NEON_DB_URL=$2

if [ -z "$BACKUP_FILE" ] || [ -z "$NEON_DB_URL" ]; then
  echo "Error: Missing arguments."
  echo "Usage: ./restore-backup.sh <BACKUP_FILE> <NEON_DB_URL>"
  exit 1
fi

echo "Starting database restoration from: $BACKUP_FILE"
echo "Target Database: $NEON_DB_URL"

# Execute pg_restore to overwrite targets cleanly
pg_restore --no-owner --clean --no-privileges -d "$NEON_DB_URL" "$BACKUP_FILE"

if [ $? -eq 0 ]; then
  echo "Database restoration completed successfully."
  exit 0
else
  echo "Error: Database restoration failed."
  exit 1
fi
