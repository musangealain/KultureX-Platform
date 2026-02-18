import { apiRequest, normalizeList } from "../../api/client";

export interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: string;
  is_active: boolean;
}

export interface CartItem {
  id: number;
  cart: number;
  product: number;
  product_name: string;
  product_price: string;
  quantity: number;
  line_total: string;
}

export interface Cart {
  id: number;
  user: number;
  checked_out: boolean;
  total_amount: string;
  items: CartItem[];
}

export interface OrderItem {
  id: number;
  order: number;
  product: number;
  product_name: string;
  quantity: number;
  unit_price: string;
  line_total: string;
}

export interface Order {
  id: number;
  user: number;
  status: "pending" | "paid" | "fulfilled" | "canceled";
  total_amount: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: number;
  order: number;
  provider: "stripe" | "mobile_money";
  status: "pending" | "succeeded" | "failed";
  amount: string;
  provider_reference: string;
  created_at: string;
  updated_at: string;
}

export async function fetchProducts(): Promise<Product[]> {
  const data = await apiRequest<Product[] | { results: Product[] }>("/store/products/");
  return normalizeList(data);
}

export async function ensureActiveCart(token: string): Promise<Cart> {
  return apiRequest<Cart>("/store/carts/", {
    method: "POST",
    token
  });
}

export async function fetchCartById(token: string, cartId: number): Promise<Cart> {
  return apiRequest<Cart>(`/store/carts/${cartId}/`, {
    method: "GET",
    token
  });
}

export async function addCartItem(token: string, product: number, quantity = 1): Promise<CartItem> {
  return apiRequest<CartItem>("/store/cart-items/", {
    method: "POST",
    token,
    body: JSON.stringify({ product, quantity })
  });
}

export async function updateCartItem(token: string, itemId: number, quantity: number): Promise<CartItem> {
  return apiRequest<CartItem>(`/store/cart-items/${itemId}/`, {
    method: "PATCH",
    token,
    body: JSON.stringify({ quantity })
  });
}

export async function removeCartItem(token: string, itemId: number): Promise<void> {
  await apiRequest<void>(`/store/cart-items/${itemId}/`, {
    method: "DELETE",
    token
  });
}

export async function checkoutCart(token: string, cartId: number): Promise<Order> {
  return apiRequest<Order>(`/store/carts/${cartId}/checkout/`, {
    method: "POST",
    token
  });
}

export async function fetchOrders(token: string): Promise<Order[]> {
  const data = await apiRequest<Order[] | { results: Order[] }>("/store/orders/", {
    method: "GET",
    token
  });
  return normalizeList(data);
}

export async function fetchOrderById(token: string, orderId: number): Promise<Order> {
  return apiRequest<Order>(`/store/orders/${orderId}/`, {
    method: "GET",
    token
  });
}

export async function createPayment(
  token: string,
  payload: { order: number; provider: "stripe" | "mobile_money"; provider_reference?: string }
): Promise<Payment> {
  return apiRequest<Payment>("/store/payments/", {
    method: "POST",
    token,
    body: JSON.stringify(payload)
  });
}

export async function updatePaymentStatus(
  token: string,
  paymentId: number,
  status: "pending" | "succeeded" | "failed"
): Promise<Payment> {
  return apiRequest<Payment>(`/store/payments/${paymentId}/`, {
    method: "PATCH",
    token,
    body: JSON.stringify({ status })
  });
}
