export const NEWS_CATEGORIES = ["お知らせ", "商品情報", "採用情報", "その他"] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type NewsItem = {
  id: string;
  date: string;
  category: NewsCategory;
  title: string;
  body: string;
  published: boolean;
};

export const NEWS_STORAGE_KEY = "cosugi-news-demo";

export const NEWS_SEED: NewsItem[] = [
  {
    id: "news-20260928",
    date: "2026-09-28",
    category: "お知らせ",
    title: "ホームページをリニューアルしました",
    body: "株式会社コスギのホームページをリニューアルしました。",
    published: true,
  },
  {
    id: "news-20260915",
    date: "2026-09-15",
    category: "商品情報",
    title: "秋冬ユニフォームのご相談を承っております",
    body: "秋冬ユニフォームのご相談を承っております。お気軽にお問い合わせください。",
    published: true,
  },
  {
    id: "news-20260820",
    date: "2026-08-20",
    category: "お知らせ",
    title: "ユニフォームへの刺繍・プリント加工もお任せください",
    body: "刺繍・プリントなどの加工も、デザインからご提案します。",
    published: true,
  },
];

export function formatNewsDate(date: string) {
  return date.replaceAll("-", ".");
}

export function loadNews(): NewsItem[] {
  if (typeof window === "undefined") return NEWS_SEED;
  try {
    const raw = window.localStorage.getItem(NEWS_STORAGE_KEY);
    if (!raw) return NEWS_SEED;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return NEWS_SEED;
    return parsed.filter(isNewsItem);
  } catch {
    return NEWS_SEED;
  }
}

export function saveNews(items: NewsItem[]) {
  window.localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(items));
}

export function publishedNews(items: NewsItem[], limit = 3) {
  return [...items]
    .filter((item) => item.published)
    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id))
    .slice(0, limit);
}

function isNewsItem(value: unknown): value is NewsItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<NewsItem>;
  return (
    typeof item.id === "string" &&
    typeof item.date === "string" &&
    typeof item.title === "string" &&
    typeof item.body === "string" &&
    typeof item.published === "boolean" &&
    NEWS_CATEGORIES.includes(item.category as NewsCategory)
  );
}
