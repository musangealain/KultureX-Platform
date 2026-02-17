export type ListResponse<T> = T[] | { results: T[] };

export function normalizeList<T>(payload: ListResponse<T>): T[] {
  if (Array.isArray(payload)) {
    return payload;
  }
  return payload.results || [];
}
