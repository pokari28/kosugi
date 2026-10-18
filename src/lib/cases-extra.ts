export const CASE_EXTRA_KEY = "cosugi-cases-extra";

export type ExtraCase = {
  id: string;
  client: string;
  industry: string;
  industryLabel: string;
  uniform: string;
  proposal: string;
  background: string;
  effect: string;
  image: string;
  visible: boolean;
};

export function loadExtraCases(): ExtraCase[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CASE_EXTRA_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCase);
  } catch {
    return [];
  }
}

export function saveExtraCases(items: ExtraCase[]) {
  window.localStorage.setItem(CASE_EXTRA_KEY, JSON.stringify(items));
}

export function visibleExtraCases(items: ExtraCase[]) {
  return items.filter((item) => item.visible && item.client.trim() && item.image);
}

function isCase(value: unknown): value is ExtraCase {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<ExtraCase>;
  return typeof item.id === "string" && typeof item.client === "string" && typeof item.image === "string" && typeof item.visible === "boolean";
}
