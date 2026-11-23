#!/usr/bin/env bash
# Build a domain-root static site for FTP. Does not touch the GitHub Pages output layout
# beyond the directory passed in (default .output/public).
set -euo pipefail

OUT="${1:-.output/public}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${ROOT}/dist/cosugi-akita-ftp"

if [ ! -d "$OUT/assets" ]; then
  echo "Missing $OUT/assets"
  exit 1
fi

JS="$(basename "$(ls "$OUT"/assets/index-*.js | head -1)")"
CSS="$(basename "$(ls "$OUT"/assets/styles-*.css | head -1)")"
echo "JS=$JS CSS=$CSS"

SITE_BASE=/ node "$ROOT/scripts/prerender-pages.mjs" "$OUT"

python3 - "$OUT" "$CSS" "$JS" <<'PY'
import json, re, sys
from pathlib import Path
out = Path(sys.argv[1])
css, js = sys.argv[2], sys.argv[3]
html_files = [out / "index.html"]
html_files += list(out.glob("*/index.html"))
html_files += list(out.glob("*/*/index.html"))
for path in html_files:
    if not path.is_file():
        continue
    text = path.read_text(encoding="utf-8")
    text = re.sub(r"(?:/kosugi)?/assets/styles-[^\"']+\.css", f"/assets/{css}", text)
    text = re.sub(r"(?:/kosugi)?/assets/index-[^\"']+\.js", f"/assets/{js}", text)
    text = text.replace("/kosugi/", "/")
    text = text.replace("https://pokari28.github.io/kosugi", "https://cosugi-akita.com")
    if "https://cosugi-akita.com/" not in text:
        raise SystemExit(f"canonical/og URL missing in {path}")
    if "/kosugi/" in text:
        raise SystemExit(f"/kosugi/ still present in {path}")
    path.write_text(text, encoding="utf-8")
    print(f"fixed {path.relative_to(out)} ({len(text)} bytes)")

(out / "404.html").write_text((out / "index.html").read_text(encoding="utf-8"), encoding="utf-8")

manifest = out / "manifest.webmanifest"
if manifest.is_file():
    data = json.loads(manifest.read_text(encoding="utf-8"))
    data["start_url"] = "/"
    data["scope"] = "/"
    manifest.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

htaccess = """DirectoryIndex index.html

<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /

# 設定と送信記録は公開しない。
RewriteRule ^private/ - [F,L]

# Real files and directories are served as-is.
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# /products -> /products/ so the prerendered index.html is used.
RewriteCond %{REQUEST_URI} !/$
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI}/index.html -f
RewriteRule ^(.+)$ /$1/ [R=301,L]

# Client-side routes fall back to the top page.
RewriteRule ^ index.html [L]
</IfModule>

ErrorDocument 404 /index.html

<IfModule mod_headers.c>
Header set X-Content-Type-Options "nosniff"
</IfModule>
"""
(out / ".htaccess").write_text(htaccess, encoding="utf-8")

for extra in [out / "__grok", out / "cosugi-website.zip"]:
    if extra.is_dir():
        import shutil
        shutil.rmtree(extra)
    elif extra.is_file():
        extra.unlink()

print("ftp public ready")
PY

rm -rf "$DEST"
mkdir -p "$DEST"
cp -a "$OUT"/. "$DEST"/
rm -rf "$DEST/__grok"
find "$DEST" -name '*.map' -delete
mkdir -p "$DEST/private"
cp "$ROOT/ftp/contact-send.php" "$DEST/contact-send.php"
cp "$ROOT/ftp/private/contact-config.php" "$DEST/private/contact-config.php"
cp "$ROOT/ftp/private/contact-lib.php" "$DEST/private/contact-lib.php"
cp "$ROOT/ftp/private/.htaccess" "$DEST/private/.htaccess"

ZIP="${ROOT}/artifacts/cosugi-akita-ftp.zip"
rm -f "$ZIP"
python3 - "$DEST" "$ZIP" <<'PY'
import sys, zipfile
from pathlib import Path
src, zip_path = Path(sys.argv[1]), Path(sys.argv[2])
with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
    for path in sorted(src.rglob("*")):
        if not path.is_file() or path.suffix == ".map":
            continue
        zf.write(path, path.relative_to(src).as_posix())
names = zipfile.ZipFile(zip_path).namelist()
assert "index.html" in names, "index.html missing at zip root"
assert ".htaccess" in names, ".htaccess missing"
assert "contact-send.php" in names, "contact-send.php missing"
assert "private/contact-config.php" in names, "mail config missing"
assert "private/.htaccess" in names, "private htaccess missing"
config = (src / "private/contact-config.php").read_text(encoding="utf-8")
assert "'to' => ''" in config and "'from' => ''" in config
assert any(n.startswith("assets/") and n.endswith(".css") for n in names)
print(f"zip {zip_path} files={len(names)} bytes={zip_path.stat().st_size}")
PY
