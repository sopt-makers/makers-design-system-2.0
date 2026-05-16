import {
  typographyLetterSpacing,
  typographyLineHeight,
  typographySize,
  typographyWeight,
} from "./base";

export const semanticTypography = {
  heading1: {
    fontWeight: typographyWeight.bold,
    fontSize: typographySize.t32,
    lineHeight: typographyLineHeight.t48,
    letterSpacing: typographyLetterSpacing.default,
  },
  heading2: {
    fontWeight: typographyWeight.bold,
    fontSize: typographySize.t24,
    lineHeight: typographyLineHeight.t36,
    letterSpacing: typographyLetterSpacing.default,
  },
  heading3: {
    fontWeight: typographyWeight.bold,
    fontSize: typographySize.t20,
    lineHeight: typographyLineHeight.t30,
    letterSpacing: typographyLetterSpacing.default,
  },
  heading4: {
    fontWeight: typographyWeight.bold,
    fontSize: typographySize.t16,
    lineHeight: typographyLineHeight.t24,
    letterSpacing: typographyLetterSpacing.wide,
  },
  title1: {
    fontWeight: typographyWeight.semibold,
    fontSize: typographySize.t28,
    lineHeight: typographyLineHeight.t42,
    letterSpacing: typographyLetterSpacing.default,
  },
  title2: {
    fontWeight: typographyWeight.semibold,
    fontSize: typographySize.t24,
    lineHeight: typographyLineHeight.t36,
    letterSpacing: typographyLetterSpacing.default,
  },
  title3: {
    fontWeight: typographyWeight.semibold,
    fontSize: typographySize.t20,
    lineHeight: typographyLineHeight.t30,
    letterSpacing: typographyLetterSpacing.default,
  },
  title4: {
    fontWeight: typographyWeight.semibold,
    fontSize: typographySize.t16,
    lineHeight: typographyLineHeight.t24,
    letterSpacing: typographyLetterSpacing.wide,
  },
  body1: {
    fontWeight: typographyWeight.regular,
    fontSize: typographySize.t16,
    lineHeight: typographyLineHeight.t26,
    letterSpacing: typographyLetterSpacing.wide,
  },
  body2: {
    fontWeight: typographyWeight.regular,
    fontSize: typographySize.t14,
    lineHeight: typographyLineHeight.t22,
    letterSpacing: typographyLetterSpacing.wide,
  },
  label1: {
    fontWeight: typographyWeight.semibold,
    fontSize: typographySize.t18,
    lineHeight: typographyLineHeight.t24,
    letterSpacing: typographyLetterSpacing.default,
  },
  label2: {
    fontWeight: typographyWeight.semibold,
    fontSize: typographySize.t16,
    lineHeight: typographyLineHeight.t22,
    letterSpacing: typographyLetterSpacing.default,
  },
  label3: {
    fontWeight: typographyWeight.semibold,
    fontSize: typographySize.t14,
    lineHeight: typographyLineHeight.t18,
    letterSpacing: typographyLetterSpacing.default,
  },
  label4: {
    fontWeight: typographyWeight.semibold,
    fontSize: typographySize.t12,
    lineHeight: typographyLineHeight.t16,
    letterSpacing: typographyLetterSpacing.default,
  },
} as const;
