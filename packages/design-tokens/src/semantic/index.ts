import { baseColor } from "../base/color";

export const semanticColor = {
  background: baseColor.white,
  backgroundSubtle: baseColor.gray50,
  foreground: baseColor.gray900,
  foregroundMuted: baseColor.gray600,
  border: baseColor.gray200,
  primary: baseColor.blue500,
  primaryHover: baseColor.blue600,
  danger: baseColor.red500,
  success: baseColor.green500,
  warning: baseColor.yellow500,
} as const;

export type SemanticColor = keyof typeof semanticColor;
