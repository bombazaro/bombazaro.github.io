/** Joins a Vite base path and an asset path with exactly one slash between them. */
export function joinBase(base: string, path: string): string {
  return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

/** Public asset URL that keeps working if the site is ever served from a sub path. */
export function asset(path: string): string {
  return joinBase(import.meta.env.BASE_URL, path);
}
