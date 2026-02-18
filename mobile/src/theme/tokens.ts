import { DefaultTheme, type Theme } from "@react-navigation/native";

export const colors = {
  appBg: "#efefef",
  screenBg: "#f4f4f5",
  surface: "#ffffff",
  surfaceMuted: "#f7f7f8",
  surfaceBorder: "#e6e6e8",
  textPrimary: "#111113",
  textSecondary: "#52525b",
  textMuted: "#8f8f97",
  accent: "#0a0a0a",
  accentSoft: "#1b1b1f",
  danger: "#d8434f",
  success: "#2c9b5b"
} as const;

export const spacing = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24
} as const;

export const radii = {
  sm: 10,
  md: 14,
  lg: 20,
  pill: 999
} as const;

export const shadows = {
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3
  }
} as const;

export const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.accent,
    background: colors.screenBg,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.surfaceBorder,
    notification: colors.accent
  }
};
