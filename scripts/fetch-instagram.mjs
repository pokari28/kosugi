import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const token = process.env.INSTAGRAM_ACCESS_TOKEN;
const outJson = new URL("../src/data/instagram-posts.json", import.meta.url);
const mediaDir = new URL("../public/instagram/", import.meta.url);

if (!token) {
  console.log("INSTAGRAM_ACCESS_TOKEN is not set. Keeping the current posts file.");
  process.exit(0);
}

const endpoint = new URL("https://graph.instagram.com/me/media");
endpoint.searchParams.set("fields", "id,caption,media_type,media_url,thumbnail_url,permalink");
endpoint.searchParams.set("limit", "12");
endpoint.searchParams.set("access_token", token);

const response = await fetch(endpoint);
if (!response.ok) {
  console.error(`Instagram API ${response.status}`);
  process.exit(1);
}

const payload = await response.json();
const media = (payload.data ?? [])
  .filter((item) => item.permalink && (item.media_url || item.thumbnail_url))
  .filter((item) => item.media_type === "IMAGE" || item.media_type === "CAROUSEL_ALBUM" || item.media_type === "VIDEO")
  .slice(0, 6);

await mkdir(mediaDir, { recursive: true });

const posts = [];
for (const item of media) {
  const source = item.media_type === "VIDEO" ? item.thumbnail_url || item.media_url : item.media_url;
  const file = `${item.id}.jpg`;
  const imageResponse = await fetch(source);
  if (!imageResponse.ok) continue;
  await writeFile(new URL(file, mediaDir), Buffer.from(await imageResponse.arrayBuffer()));
  posts.push({
    id: item.id,
    permalink: item.permalink,
    image: `/instagram/${file}`,
    alt: (item.caption || "株式会社コスギのInstagram").slice(0, 80),
  });
}

const next = {
  accountUrl: "https://www.instagram.com/cosugiakita/",
  accountName: "cosugiakita",
  source: "api",
  posts,
};

await mkdir(dirname(outJson.pathname), { recursive: true });
await writeFile(outJson, `${JSON.stringify(next, null, 2)}\n`);
console.log(`Wrote ${posts.length} posts`);
