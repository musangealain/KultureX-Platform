import { apiRequest } from "../../api/client";

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  bio: string;
  avatar_url: string;
}

export const DEMO_CREDENTIALS = {
  username: "musange.alain",
  password: "KultureX@2026"
} as const;

export const DEMO_USER: AuthUser = {
  id: 1,
  username: "musange.alain",
  email: "musange.alain@kulturex.app",
  first_name: "Musange Muyango",
  last_name: "Alain",
  role: "registered_user",
  bio: "KultureX demo account",
  avatar_url: ""
};

export function isDemoCredentials(username: string, password: string): boolean {
  return username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/auth/token/", {
    method: "POST",
    body: JSON.stringify({ username, password })
  });
}

export async function getMe(token: string): Promise<AuthUser> {
  return apiRequest<AuthUser>("/auth/me/", {
    method: "GET",
    token
  });
}
