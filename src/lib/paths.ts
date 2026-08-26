/** Prefix public URLs with Vite `base` so GitHub Pages (`/kosugi/`) works. */
export function asset(path: string) {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${path.replace(/^\//, "")}`;
}

export function withBase(path: string) {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  if (!path.startsWith("/")) return path;
  return `${base}${path}`;
}
