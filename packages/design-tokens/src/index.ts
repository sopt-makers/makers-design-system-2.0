export * from "./base/index";
export * from "./semantic/index";

import { baseColor } from "./base/color";
import { colorBg, colorFg, colorStroke } from "./semantic/color";

export const colors = {
  base: baseColor,
  fg: colorFg,
  bg: colorBg,
  stroke: colorStroke,
} as const;

import {
  typographyLetterSpacing,
  typographyLineHeight,
  typographySize,
  typographyWeight,
} from "./base/typography";
import { semanticTypography } from "./semantic/typography";

export const typography = {
  weight: typographyWeight,
  size: typographySize,
  lineHeight: typographyLineHeight,
  letterSpacing: typographyLetterSpacing,
  ...semanticTypography,
} as const;

import { spacingBase } from "./base/space";

export const spacing = spacingBase;
