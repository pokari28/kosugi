import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const outDir = resolve(process.argv[2] ?? ".output/public");
const prerenderEntry = resolve("node_modules/.nitro/prerender/index.mjs");

const { default: prerender } = await import(pathToFileURL(prerenderEntry).href);

const base = process.env.SITE_BASE ?? "/kosugi";

function pageUrl(path) {
  if (!base || base === "/") return path;
  const prefix = base.replace(/\/$/, "");
  return path === "/" ? `${prefix}/` : `${prefix}${path}`;
}

const pages = [
  { url: pageUrl("/"), file: "index.html" },
  { url: pageUrl("/contact"), file: "contact/index.html" },
  { url: pageUrl("/privacy"), file: "privacy/index.html" },
  { url: pageUrl("/products"), file: "products/index.html" },
  { url: pageUrl("/customize"), file: "customize/index.html" },
  { url: pageUrl("/cases"), file: "cases/index.html" },
  { url: pageUrl("/admin/news"), file: "admin/news/index.html" },
  { url: pageUrl("/admin/products"), file: "admin/products/index.html" },
  { url: pageUrl("/admin/instagram"), file: "admin/instagram/index.html" },
  { url: pageUrl("/admin/embroidery"), file: "admin/embroidery/index.html" },
  { url: pageUrl("/admin/cases"), file: "admin/cases/index.html" },
];

for (const page of pages) {
  const res = await prerender.fetch(
    new Request(`http://localhost${page.url}`, {
      headers: { "x-nitro-prerender": "1" },
    }),
  );
  const html = await res.text();
  if (res.status !== 200 || !html.includes("株式会社コスギ")) {
    throw new Error(`Prerender failed for ${page.url}: status=${res.status} bytes=${html.length}`);
  }
  const dest = resolve(outDir, page.file);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, html);
  console.log(`wrote ${page.file} (${html.length} bytes)`);
}

await prerender.close?.();
