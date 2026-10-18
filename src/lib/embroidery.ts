import { asset } from "@/lib/paths";

export const EMBROIDERY_STORAGE_KEY = "cosugi-embroidery-demo";

export type EmbroideryExample = {
  id: string;
  title: string;
  body: string;
  image: string;
  visible: boolean;
};

export const EMBROIDERY_SEED: EmbroideryExample[] = [
  {
    id: "emb-machine",
    title: "刺繍機",
    body: "社名・ロゴ・個人名などの刺繍に対応しています。",
    image: asset("/images/emb-machine.jpg"),
    visible: true,
  },
  {
    id: "emb-chest",
    title: "社名と個人名",
    body: "胸元に社名と個人名を刺繍した見本です。",
    image: asset("/images/emb-chest.jpg"),
    visible: true,
  },
  {
    id: "emb-sleeve",
    title: "袖のネーム",
    body: "袖にも名前を刺繍できます。",
    image: asset("/images/emb-sleeve.jpg"),
    visible: true,
  },
];

export const EMBROIDERY_TYPES = [
  { title: "社名刺繍", body: "胸元や背中など、指定の位置へ社名を入れられます。" },
  { title: "ロゴ刺繍", body: "企業ロゴの色や大きさに合わせて対応します。" },
  { title: "個人名刺繍", body: "スタッフ名や個人名の刺繍にも対応しています。" },
] as const;

type StoredExample = Partial<EmbroideryExample>;

export function loadEmbroidery(): EmbroideryExample[] {
  if (typeof window === "undefined") return EMBROIDERY_SEED;
  try {
    const raw = window.localStorage.getItem(EMBROIDERY_STORAGE_KEY);
    if (!raw) return EMBROIDERY_SEED;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMBROIDERY_SEED;
    const items = parsed.filter(isExample).filter((item) => item.id !== "emb-sample" && item.id !== "emb-sample-wear");
    if (!items.length) return EMBROIDERY_SEED;
    const legacy = items.every((item) => item.id === "emb-company" || item.id === "emb-logo" || item.id === "emb-name");
    return legacy ? EMBROIDERY_SEED : items;
  } catch {
    return EMBROIDERY_SEED;
  }
}

export function saveEmbroidery(items: EmbroideryExample[]) {
  window.localStorage.setItem(EMBROIDERY_STORAGE_KEY, JSON.stringify(items));
}

export function visibleEmbroidery(items: EmbroideryExample[]) {
  return items.filter((item) => item.visible && item.title.trim());
}

function isExample(value: unknown): value is EmbroideryExample {
  if (!value || typeof value !== "object") return false;
  const item = value as StoredExample;
  return typeof item.id === "string" && typeof item.title === "string" && typeof item.body === "string" && typeof item.image === "string" && typeof item.visible === "boolean";
}
