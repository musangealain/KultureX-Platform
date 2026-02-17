import { apiRequest, normalizeList } from "../../api/client";

export interface EventItem {
  id: number;
  title: string;
  city: string;
  start_at: string;
}

export async function fetchEvents(): Promise<EventItem[]> {
  const data = await apiRequest<EventItem[] | { results: EventItem[] }>("/events/");
  return normalizeList(data);
}
