import { apiRequest } from "@/lib/api/client";
import { normalizeList, type ListResponse } from "@/lib/api/types";

export interface SkateVideo {
  id: number;
  title: string;
  caption: string;
}

export async function getSkateVideos(): Promise<SkateVideo[]> {
  const data = await apiRequest<ListResponse<SkateVideo>>("/skate/videos/");
  return normalizeList(data);
}
