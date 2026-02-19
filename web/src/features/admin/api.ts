import { normalizeList, type ListResponse } from "@/lib/api/types";

export const ADMIN_API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api/v1").replace(
  /\/$/,
  ""
);

export type UserRole = "super_admin" | "admin" | "moderator" | "editor" | "author" | "registered";

export type AdminPermissions = {
  is_super_admin: boolean;
  is_admin: boolean;
  can_access_admin_portal: boolean;
  can_manage_users: boolean;
  can_manage_roles: boolean;
  can_manage_products: boolean;
  can_manage_events: boolean;
  can_review_articles: boolean;
  can_publish_articles: boolean;
  can_moderate_community: boolean;
  can_view_analytics: boolean;
  can_manage_system: boolean;
};

export type AuthTokens = {
  access: string;
  refresh: string;
};

export type AdminUser = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  bio: string;
  avatar_url: string;
  two_factor_enabled: boolean;
  two_factor_verified_at: string | null;
  permissions: AdminPermissions;
};

export type AdminAnalytics = {
  users_total: number;
  articles_total: number;
  products_total: number;
  orders_total: number;
  events_total: number;
  ticket_bookings_total: number;
};

export type Brand = {
  id: number;
  name: string;
  description: string;
  logo_url: string;
  owner: number;
};

export type Product = {
  id: number;
  brand: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
  is_active: boolean;
};

export type EventItem = {
  id: number;
  title: string;
  description: string;
  venue: string;
  city: string;
  start_at: string;
  end_at: string;
  capacity: number;
  cover_image_url: string;
  is_published: boolean;
  organizer: number;
};

export type Article = {
  id: number;
  title: string;
  summary: string;
  status: string;
  author_username: string;
  published_at: string | null;
};

export type TwoFactorChallenge = {
  challenge_id: string;
  expires_in: number;
  delivery: "app" | "email";
  code?: string;
};

export type TwoFactorVerification = {
  verified: boolean;
  verified_at: string;
};

type RequestOptions = Omit<RequestInit, "body"> & {
  token?: string;
  body?: unknown;
};

function getErrorMessage(payload: unknown, fallback: string): string {
  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    if (typeof record.detail === "string") {
      return record.detail;
    }
    const firstKey = Object.keys(record)[0];
    if (firstKey) {
      const value = record[firstKey];
      if (Array.isArray(value) && typeof value[0] === "string") {
        return value[0];
      }
      if (typeof value === "string") {
        return value;
      }
    }
  }
  return fallback;
}

async function adminRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers ?? {});
  headers.set("Content-Type", "application/json");
  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  let response: Response;
  try {
    response = await fetch(`${ADMIN_API_BASE_URL}${path}`, {
      ...options,
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      cache: "no-store"
    });
  } catch {
    throw new Error(
      `Cannot reach the backend API (${ADMIN_API_BASE_URL}). Start Django: cd backend; python manage.py runserver`
    );
  }

  const text = await response.text();
  let payload: unknown = null;
  if (text) {
    try {
      payload = JSON.parse(text) as unknown;
    } catch {
      payload = { detail: text };
    }
  }

  if (!response.ok) {
    const fallback = `Request failed (${response.status})`;
    throw new Error(getErrorMessage(payload, fallback));
  }

  return payload as T;
}

export async function loginAdmin(username: string, password: string): Promise<AuthTokens> {
  return adminRequest<AuthTokens>("/auth/token/", {
    method: "POST",
    body: { username, password }
  });
}

export async function getMe(token: string): Promise<AdminUser> {
  return adminRequest<AdminUser>("/auth/me/", { token });
}

export async function requestTwoFactorChallenge(
  token: string,
  delivery: "app" | "email" = "app"
): Promise<TwoFactorChallenge> {
  return adminRequest<TwoFactorChallenge>("/auth/2fa/challenge/", {
    method: "POST",
    token,
    body: { delivery }
  });
}

export async function verifyTwoFactorCode(
  token: string,
  challengeId: string,
  code: string
): Promise<TwoFactorVerification> {
  return adminRequest<TwoFactorVerification>("/auth/2fa/verify/", {
    method: "POST",
    token,
    body: {
      challenge_id: challengeId,
      code
    }
  });
}

export async function getAnalytics(token: string): Promise<AdminAnalytics> {
  return adminRequest<AdminAnalytics>("/admin/analytics/", { token });
}

export async function listUsers(token: string): Promise<AdminUser[]> {
  const data = await adminRequest<ListResponse<AdminUser>>("/users/", { token });
  return normalizeList(data);
}

export async function updateUserRole(token: string, id: number, role: UserRole): Promise<AdminUser> {
  return adminRequest<AdminUser>(`/users/${id}/`, {
    method: "PATCH",
    token,
    body: { role }
  });
}

export async function listBrands(token: string): Promise<Brand[]> {
  const data = await adminRequest<ListResponse<Brand>>("/store/brands/", { token });
  return normalizeList(data);
}

export async function createBrand(
  token: string,
  payload: Pick<Brand, "name" | "description" | "logo_url">
): Promise<Brand> {
  return adminRequest<Brand>("/store/brands/", {
    method: "POST",
    token,
    body: payload
  });
}

export async function listProducts(token: string): Promise<Product[]> {
  const data = await adminRequest<ListResponse<Product>>("/store/products/", { token });
  return normalizeList(data);
}

export async function createProduct(
  token: string,
  payload: Pick<Product, "brand" | "name" | "description" | "price" | "image_url" | "is_active">
): Promise<Product> {
  return adminRequest<Product>("/store/products/", {
    method: "POST",
    token,
    body: payload
  });
}

export async function listEvents(token: string): Promise<EventItem[]> {
  const data = await adminRequest<ListResponse<EventItem>>("/events/", { token });
  return normalizeList(data);
}

export async function createEvent(
  token: string,
  payload: Pick<
    EventItem,
    "title" | "description" | "venue" | "city" | "start_at" | "end_at" | "capacity" | "cover_image_url" | "is_published"
  >
): Promise<EventItem> {
  return adminRequest<EventItem>("/events/", {
    method: "POST",
    token,
    body: payload
  });
}

export async function listArticles(token: string): Promise<Article[]> {
  const data = await adminRequest<ListResponse<Article>>("/articles/", { token });
  return normalizeList(data);
}

export async function approveArticle(token: string, id: number, reviewNotes = ""): Promise<Article> {
  return adminRequest<Article>(`/articles/${id}/approve/`, {
    method: "POST",
    token,
    body: { review_notes: reviewNotes }
  });
}

export async function rejectArticle(token: string, id: number, reviewNotes = ""): Promise<Article> {
  return adminRequest<Article>(`/articles/${id}/reject/`, {
    method: "POST",
    token,
    body: { review_notes: reviewNotes }
  });
}

export async function publishArticle(token: string, id: number): Promise<Article> {
  return adminRequest<Article>(`/articles/${id}/publish/`, {
    method: "POST",
    token
  });
}
