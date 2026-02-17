import { apiRequest, normalizeList } from "../../api/client";

export interface SkateVideo {
  id: number;
  title: string;
  caption: string;
}

export async function fetchSkateVideos(): Promise<SkateVideo[]> {
  const data = await apiRequest<SkateVideo[] | { results: SkateVideo[] }>("/skate/videos/");
  return normalizeList(data);
}
