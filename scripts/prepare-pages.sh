#!/usr/bin/env bash
set -euo pipefail

OUT="${1:-.output/public}"
BASE="/kosugi"

if [ ! -d "$OUT/assets" ]; then
  echo "Missing $OUT/assets"
  ls -la .output || true
  ls -la "$OUT" || true
  exit 1
fi

JS="$(basename "$(ls "$OUT"/assets/index-*.js | head -1)")"
CSS="$(basename "$(ls "$OUT"/assets/styles-*.css | head -1)")"
echo "JS=$JS CSS=$CSS"

node scripts/prerender-pages.mjs "$OUT"

fix_html() {
  local file="$1"
  python3 - "$file" "$BASE" "$CSS" "$JS" <<'PY'
import re, sys
path, base, css, js = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
text = open(path, "rb").read().decode("utf-8", "replace")
text = re.sub(r"/kosugi/assets/styles-[^\"']+\.css", f"{base}/assets/{css}", text)
text = re.sub(r"/kosugi/assets/index-[^\"']+\.js", f"{base}/assets/{js}", text)
text = text.replace('href="/favicon.svg"', f'href="{base}/favicon.svg"')
text = text.replace('href="/__grok/', f'href="{base}/__grok/')
open(path, "w", encoding="utf-8").write(text)
print(f"fixed {path} ({len(text)} bytes)")
PY
}

fix_html "$OUT/index.html"
cp "$OUT/index.html" "$OUT/404.html"
[ -f "$OUT/contact/index.html" ] && fix_html "$OUT/contact/index.html"
[ -f "$OUT/privacy/index.html" ] && fix_html "$OUT/privacy/index.html"

touch "$OUT/.nojekyll"
rm -f "$OUT/cosugi-website.zip" "$OUT/index"
rm -rf "$OUT/kosugi"

echo "==== public ===="
ls -la "$OUT"
python3 - <<'PY'
from pathlib import Path
t = Path(".output/public/index.html").read_text(encoding="utf-8")
assert "株式会社コスギ" in t, "homepage HTML missing site content"
assert "<body></body>" not in t.replace(" ", "")
print("homepage ok", len(t), "bytes")
PY
