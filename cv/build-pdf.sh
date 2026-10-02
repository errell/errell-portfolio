#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/cv/errell-nino-cv.html"
OUT="$ROOT/public/errell-nino-cv.pdf"
CHROME="${CHROME:-google-chrome}"
"$CHROME" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$OUT" \
  "file://$SRC"
echo "Wrote $OUT"
