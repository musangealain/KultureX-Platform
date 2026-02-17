import type { AuthUser } from "../features/auth/api";

export interface AuthContextValue {
  isInitializing: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  loginWithCredentials: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}
