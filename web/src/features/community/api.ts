import { apiRequest } from "@/lib/api/client";
import { normalizeList, type ListResponse } from "@/lib/api/types";

export interface CreatorProfile {
  id: number;
  display_name: string;
  tagline: string;
  primary_discipline: string;
}

export async function getProfiles(): Promise<CreatorProfile[]> {
  const data = await apiRequest<ListResponse<CreatorProfile>>("/community/profiles/");
  return normalizeList(data);
}
