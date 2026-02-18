import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import { getMe, login, type AuthUser } from "../features/auth/api";
import type { AuthContextValue } from "./types";

const ACCESS_TOKEN_KEY = "kulturex_access_token";
const REFRESH_TOKEN_KEY = "kulturex_refresh_token";
const GUEST_MODE_KEY = "kulturex_guest_mode";

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isInitializing, setIsInitializing] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  const clearSession = useCallback(async () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    setIsGuest(false);
    await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, GUEST_MODE_KEY]);
  }, []);

  const continueAsGuest = useCallback(async () => {
    setIsGuest(true);
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    await AsyncStorage.setItem(GUEST_MODE_KEY, "1");
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!accessToken) {
      setUser(null);
      return;
    }
    const profile = await getMe(accessToken);
    setUser(profile);
  }, [accessToken]);

  const loginWithCredentials = useCallback(async (username: string, password: string) => {
    const tokens = await login(username, password);
    setIsGuest(false);
    setAccessToken(tokens.access);
    setRefreshToken(tokens.refresh);
    await AsyncStorage.multiSet([
      [ACCESS_TOKEN_KEY, tokens.access],
      [REFRESH_TOKEN_KEY, tokens.refresh],
      [GUEST_MODE_KEY, "0"]
    ]);
    const profile = await getMe(tokens.access);
    setUser(profile);
  }, []);

  const logout = useCallback(async () => {
    await clearSession();
  }, [clearSession]);

  useEffect(() => {
    let mounted = true;

    async function initSession() {
      try {
        const values = await AsyncStorage.multiGet([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, GUEST_MODE_KEY]);
        const storedAccess = values.find(([k]) => k === ACCESS_TOKEN_KEY)?.[1] || null;
        const storedRefresh = values.find(([k]) => k === REFRESH_TOKEN_KEY)?.[1] || null;
        const storedGuest = values.find(([k]) => k === GUEST_MODE_KEY)?.[1] === "1";

        if (!mounted) {
          return;
        }

        if (!storedAccess) {
          setIsGuest(storedGuest);
          setIsInitializing(false);
          return;
        }

        setAccessToken(storedAccess);
        setRefreshToken(storedRefresh);
        setIsGuest(false);

        try {
          const profile = await getMe(storedAccess);
          if (mounted) {
            setUser(profile);
          }
        } catch {
          if (mounted) {
            await clearSession();
          }
        }
      } finally {
        if (mounted) {
          setIsInitializing(false);
        }
      }
    }

    void initSession();

    return () => {
      mounted = false;
    };
  }, [clearSession]);

  const contextValue = useMemo<AuthContextValue>(
    () => ({
      isInitializing,
      accessToken,
      refreshToken,
      user,
      isGuest,
      loginWithCredentials,
      logout,
      refreshProfile,
      continueAsGuest
    }),
    [isInitializing, accessToken, refreshToken, user, isGuest, loginWithCredentials, logout, refreshProfile, continueAsGuest]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
