#!/bin/bash
# Hardcore file size check - NO file over 50 lines!

MAX_LINES=50
FAILED=false

echo "🔍 Checking all JS files for 50 line limit..."
echo "==========================================="

for file in *.js renderers/*.js; do
  if [ -f "$file" ]; then
    lines=$(wc -l < "$file")
    if [ "$lines" -gt "$MAX_LINES" ]; then
      echo "❌ FAIL: $file has $lines lines (max: $MAX_LINES)"
      FAILED=true
    else
      echo "✅ OK: $file has $lines lines"
    fi
  fi
done

if [ "$FAILED" = true ]; then
  echo ""
  echo "❌ DEPLOYMENT BLOCKED: Files exceed 50 line limit!"
  echo "Fix these files before deploying."
  exit 1
else
  echo ""
  echo "✅ All files under 50 lines - ready to deploy!"
  exit 0
fi