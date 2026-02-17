import { apiRequest, normalizeList } from "../../api/client";

export interface Article {
  id: number;
  title: string;
  summary: string;
}

export async function fetchArticles(): Promise<Article[]> {
  const data = await apiRequest<Article[] | { results: Article[] }>("/articles/");
  return normalizeList(data);
}
