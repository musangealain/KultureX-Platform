import { apiRequest } from "@/lib/api/client";
import { normalizeList, type ListResponse } from "@/lib/api/types";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
}

export async function getProducts(): Promise<Product[]> {
  const data = await apiRequest<ListResponse<Product>>("/store/products/");
  return normalizeList(data);
}
