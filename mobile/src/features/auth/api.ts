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
