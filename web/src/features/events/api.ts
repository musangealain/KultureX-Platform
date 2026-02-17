import { apiRequest } from "@/lib/api/client";
import { normalizeList, type ListResponse } from "@/lib/api/types";

export interface EventItem {
  id: number;
  title: string;
  venue: string;
  city: string;
  start_at: string;
}

export async function getEvents(): Promise<EventItem[]> {
  const data = await apiRequest<ListResponse<EventItem>>("/events/");
  return normalizeList(data);
}
