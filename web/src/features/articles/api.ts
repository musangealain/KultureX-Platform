import { apiRequest } from "@/lib/api/client";
import { normalizeList, type ListResponse } from "@/lib/api/types";

export interface Article {
  id: number;
  title: string;
  summary: string;
  status: string;
}

export async function getArticles(): Promise<Article[]> {
  const data = await apiRequest<ListResponse<Article>>("/articles/");
  return normalizeList(data);
}
