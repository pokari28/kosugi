import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const outDir = resolve(process.argv[2] ?? ".output/public");
const prerenderEntry = resolve("node_modules/.nitro/prerender/index.mjs");

const { default: prerender } = await import(pathToFileURL(prerenderEntry).href);

const pages = [
  { url: "/kosugi/", file: "index.html" },
  { url: "/kosugi/contact", file: "contact/index.html" },
  { url: "/kosugi/privacy", file: "privacy/index.html" },
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
