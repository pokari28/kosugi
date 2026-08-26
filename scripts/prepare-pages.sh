#!/usr/bin/env bash
set -euo pipefail

OUT="${1:-.output/public}"
BASE="/bamboo-fair-bloom-crane"

if [ ! -d "$OUT/assets" ]; then
  echo "Missing $OUT/assets"
  ls -la .output || true
  ls -la "$OUT" || true
  exit 1
fi

JS="$(basename "$(ls "$OUT"/assets/index-*.js | head -1)")"
CSS="$(basename "$(ls "$OUT"/assets/styles-*.css | head -1)")"
echo "JS=$JS CSS=$CSS"

cat > "$OUT/index.html" <<EOF
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>株式会社コスギ｜ユニフォーム専門店</title>
    <meta name="description" content="株式会社コスギは秋田・庄内エリアを中心に、作業服・事務服・白衣などワーキングウェアを提案するユニフォーム専門店です。" />
    <meta name="theme-color" content="#002559" />
    <link rel="icon" type="image/svg+xml" href="${BASE}/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" />
    <link rel="stylesheet" href="${BASE}/assets/${CSS}" />
    <script type="module" src="${BASE}/assets/${JS}"></script>
  </head>
  <body></body>
</html>
EOF

cp "$OUT/index.html" "$OUT/404.html"
touch "$OUT/.nojekyll"
rm -f "$OUT/cosugi-website.zip" "$OUT/index"
ls -la "$OUT"
