export const baseColor = {
  white: "#ffffff",
  black: "#000000",
  gray50: "#f9fafb",
  gray100: "#f2f4f6",
  gray200: "#e5e8eb",
  gray300: "#d1d6db",
  gray400: "#b0b8c1",
  gray500: "#8b95a1",
  gray600: "#6b7684",
  gray700: "#4e5968",
  gray800: "#333d4b",
  gray900: "#191f28",
  blue500: "#3182f6",
  blue600: "#2272eb",
  red500: "#f04452",
  green500: "#00c896",
  yellow500: "#f5a623",
} as const;

export type BaseColor = keyof typeof baseColor;
