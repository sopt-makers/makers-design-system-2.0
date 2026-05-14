export * from "./color";
export * from "./space";
export * from "./typography";

import { baseColor, colorBg, colorFg, colorStroke } from "./color";
import { spacingBase } from "./space";
import {
  semanticTypography,
  typographyLetterSpacing,
  typographyLineHeight,
  typographySize,
  typographyWeight,
} from "./typography";

export const colors = {
  base: baseColor,
  fg: colorFg,
  bg: colorBg,
  stroke: colorStroke,
} as const;

export const typography = {
  weight: typographyWeight,
  size: typographySize,
  lineHeight: typographyLineHeight,
  letterSpacing: typographyLetterSpacing,
  ...semanticTypography,
} as const;

export const spacing = spacingBase;
