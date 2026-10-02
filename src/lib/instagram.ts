import { asset } from "@/lib/paths";

export const INSTAGRAM_STORAGE_KEY = "cosugi-instagram-demo";

export type InstagramSource = "manual" | "api";

export type InstagramSettings = {
  url: string;
  accountName: string;
  visible: boolean;
  source: InstagramSource;
};

export const INSTAGRAM_DEFAULT: InstagramSettings = {
  url: "https://www.instagram.com/cosugiakita/",
  accountName: "cosugiakita",
  visible: true,
  source: "manual",
};

export const INSTAGRAM_POSTS = [
  { id: "ig-01", image: asset("/images/ig-01.jpg"), alt: "作業服の展示" },
  { id: "ig-02", image: asset("/images/ig-02.jpg"), alt: "現場の様子" },
  { id: "ig-03", image: asset("/images/ig-03.jpg"), alt: "作業服の品揃え" },
  { id: "ig-04", image: asset("/images/ig-04.jpg"), alt: "のぼりの設置例" },
  { id: "ig-05", image: asset("/images/ig-05.jpg"), alt: "刺繍加工" },
  { id: "ig-06", image: asset("/images/ig-06.jpg"), alt: "白衣・医療ウェア" },
] as const;

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
