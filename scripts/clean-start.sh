#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo
echo "EES v1.9.1 clean runtime start"
echo "Project directory:"
pwd
echo

echo "Checking source..."
node scripts/verify-runtime.mjs
node scripts/verify-opening-flow.mjs

echo
echo "Stopping any existing process on port 5174..."
PIDS="$(lsof -ti tcp:5174 2>/dev/null || true)"

if [ -n "$PIDS" ]; then
  echo "$PIDS" | xargs kill -9
  sleep 1
fi

echo "Removing generated Vite cache..."
rm -rf node_modules/.vite
rm -rf dist

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

echo
echo "Starting the verified v1.9.1 project..."
echo "Expected watermark:"
echo "BUILD v1.9.1-CLEAN-RUNTIME-VERIFICATION • PORT 5174"
echo

npm run dev
