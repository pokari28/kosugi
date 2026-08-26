import { chromium } from "playwright";
import { copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const fontSrc = "/usr/share/fonts/opentype/ipafont-gothic/ipagp.ttf";
const fontDst = join(root, "ipagp.ttf");
if (!existsSync(fontDst)) copyFileSync(fontSrc, fontDst);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
});
await page.goto(`file://${join(root, "og-card.html")}`, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(150);
await page.screenshot({
  path: join(root, "og-card-raw.png"),
  type: "png",
  clip: { x: 0, y: 0, width: 1200, height: 630 },
});
await browser.close();
console.log("wrote og-card-raw.png");
