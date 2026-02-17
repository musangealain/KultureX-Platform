import { apiRequest, normalizeList } from "../../api/client";

export interface CreatorProfile {
  id: number;
  display_name: string;
  primary_discipline: string;
}

export async function fetchProfiles(): Promise<CreatorProfile[]> {
  const data = await apiRequest<CreatorProfile[] | { results: CreatorProfile[] }>("/community/profiles/");
  return normalizeList(data);
}
