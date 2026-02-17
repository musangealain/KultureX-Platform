import { apiRequest, normalizeList } from "../../api/client";

export interface Product {
  id: number;
  name: string;
  price: string;
}

export async function fetchProducts(): Promise<Product[]> {
  const data = await apiRequest<Product[] | { results: Product[] }>("/store/products/");
  return normalizeList(data);
}
