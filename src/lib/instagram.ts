import { asset } from "@/lib/paths";
import postsFile from "@/data/instagram-posts.json";
const file = postsFile as {
  accountUrl: string;
  accountName: string;
  source: string;
  posts: InstagramPost[];
};

export const INSTAGRAM_STORAGE_KEY = "cosugi-instagram-demo";

export type InstagramSource = "manual" | "api";

export type InstagramSettings = {
  url: string;
  accountName: string;
  visible: boolean;
  source: InstagramSource;
};

export type InstagramPost = {
  id: string;
  permalink: string;
  image: string;
  alt: string;
};

export const INSTAGRAM_DEFAULT: InstagramSettings = {
  url: file.accountUrl,
  accountName: file.accountName,
  visible: true,
  source: file.source === "api" ? "api" : "manual",
};

export const INSTAGRAM_POSTS: InstagramPost[] = file.posts.slice(0, 6).map((post) => ({
  id: post.id,
  permalink: post.permalink,
  image: post.image.startsWith("http") ? post.image : asset(post.image),
  alt: post.alt,
}));

export function loadInstagram(): InstagramSettings {
  if (typeof window === "undefined") return INSTAGRAM_DEFAULT;
  try {
    const raw = window.localStorage.getItem(INSTAGRAM_STORAGE_KEY);
    if (!raw) return INSTAGRAM_DEFAULT;
    const parsed = JSON.parse(raw) as Partial<InstagramSettings>;
    return {
      url: typeof parsed.url === "string" && parsed.url.trim() ? parsed.url.trim() : INSTAGRAM_DEFAULT.url,
      accountName:
        typeof parsed.accountName === "string" && parsed.accountName.trim()
          ? parsed.accountName.trim()
          : INSTAGRAM_DEFAULT.accountName,
      visible: parsed.visible !== false,
      source: parsed.source === "api" ? "api" : "manual",
    };
  } catch {
    return INSTAGRAM_DEFAULT;
  }
}

export function saveInstagram(settings: InstagramSettings) {
  window.localStorage.setItem(INSTAGRAM_STORAGE_KEY, JSON.stringify(settings));
}
