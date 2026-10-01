import { PRODUCT_CATEGORIES, PRODUCTS } from "@/data/site";

export const CATALOG_STORAGE_KEY = "cosugi-catalog-demo";

export type CatalogItem = {
  slug: string;
  name: string;
  nameEn: string;
  summary: string;
  image: string;
  imageClass: string;
  visible: boolean;
  home: boolean;
};

const HOME_SLUGS = new Set<string>(PRODUCTS.map((item) => item.slug));

export const CATALOG_SEED: CatalogItem[] = PRODUCT_CATEGORIES.map((item) => ({
  slug: item.slug,
  name: item.name,
  nameEn: item.slug === "nobori" ? "NOBORI" : "",
  summary: item.summary,
  image: item.image,
  imageClass: item.imageClass,
  visible: true,
  home: HOME_SLUGS.has(item.slug),
}));

type StoredCatalog = Partial<Pick<CatalogItem, "slug" | "name" | "nameEn" | "image" | "visible">>;

export function loadCatalog(): CatalogItem[] {
  if (typeof window === "undefined") return CATALOG_SEED;
  try {
    const raw = window.localStorage.getItem(CATALOG_STORAGE_KEY);
    if (!raw) return CATALOG_SEED;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return CATALOG_SEED;
    const saved = new Map(
      parsed
        .filter((item): item is StoredCatalog & { slug: string } => !!item && typeof item.slug === "string")
        .map((item) => [item.slug, item]),
    );
    return CATALOG_SEED.map((seed) => {
      const over = saved.get(seed.slug);
      if (!over) return seed;
      return {
        ...seed,
        name: typeof over.name === "string" && over.name.trim() ? over.name.trim() : seed.name,
        nameEn: typeof over.nameEn === "string" ? over.nameEn.trim() : seed.nameEn,
        image: typeof over.image === "string" && over.image ? over.image : seed.image,
        visible: over.visible !== false,
      };
    });
  } catch {
    return CATALOG_SEED;
  }
}

export function saveCatalog(items: CatalogItem[]) {
  const compact = items.map((item) => ({
    slug: item.slug,
    name: item.name,
    nameEn: item.nameEn,
    image: item.image.startsWith("data:") ? item.image : "",
    visible: item.visible,
  }));
  window.localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(compact));
}

export function homeProducts(items: CatalogItem[]) {
  return items.filter((item) => item.home && item.visible);
}

export function visibleProducts(items: CatalogItem[]) {
  return items.filter((item) => item.visible);
}
