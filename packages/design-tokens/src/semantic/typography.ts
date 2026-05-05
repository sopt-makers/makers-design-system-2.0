import {
  typographyLetterSpacing,
  typographyLineHeight,
  typographySize,
  typographyWeight,
} from "../base/typography";

export const typographyHeading = {
  t1: {
    fontWeight: typographyWeight.bold,
    fontSize: typographySize.t32,
    lineHeight: typographyLineHeight.t48,
    letterSpacing: typographyLetterSpacing.default,
  },
  t2: {
    fontWeight: typographyWeight.bold,
    fontSize: typographySize.t24,
    lineHeight: typographyLineHeight.t36,
    letterSpacing: typographyLetterSpacing.default,
  },
  t3: {
    fontWeight: typographyWeight.bold,
    fontSize: typographySize.t20,
    lineHeight: typographyLineHeight.t30,
    letterSpacing: typographyLetterSpacing.default,
  },
  t4: {
    fontWeight: typographyWeight.bold,
    fontSize: typographySize.t16,
    lineHeight: typographyLineHeight.t24,
    letterSpacing: typographyLetterSpacing.wide,
  },
} as const;

export const typographyTitle = {
  t1: {
    fontWeight: typographyWeight.semibold,
    fontSize: typographySize.t28,
    lineHeight: typographyLineHeight.t42,
    letterSpacing: typographyLetterSpacing.default,
  },
  t2: {
    fontWeight: typographyWeight.semibold,
    fontSize: typographySize.t24,
    lineHeight: typographyLineHeight.t36,
    letterSpacing: typographyLetterSpacing.default,
  },
  t3: {
    fontWeight: typographyWeight.semibold,
    fontSize: typographySize.t20,
    lineHeight: typographyLineHeight.t30,
    letterSpacing: typographyLetterSpacing.default,
  },
  t4: {
    fontWeight: typographyWeight.semibold,
    fontSize: typographySize.t16,
    lineHeight: typographyLineHeight.t24,
    letterSpacing: typographyLetterSpacing.wide,
  },
} as const;

export const typographyBody = {
  t1: {
    fontWeight: typographyWeight.regular,
    fontSize: typographySize.t16,
    lineHeight: typographyLineHeight.t26,
    letterSpacing: typographyLetterSpacing.wide,
  },
  t2: {
    fontWeight: typographyWeight.regular,
    fontSize: typographySize.t14,
    lineHeight: typographyLineHeight.t22,
    letterSpacing: typographyLetterSpacing.wide,
  },
} as const;

export const typographyLabel = {
  t1: {
    fontWeight: typographyWeight.semibold,
    fontSize: typographySize.t18,
    lineHeight: typographyLineHeight.t24,
    letterSpacing: typographyLetterSpacing.default,
  },
  t2: {
    fontWeight: typographyWeight.semibold,
    fontSize: typographySize.t16,
    lineHeight: typographyLineHeight.t22,
    letterSpacing: typographyLetterSpacing.default,
  },
  t3: {
    fontWeight: typographyWeight.semibold,
    fontSize: typographySize.t14,
    lineHeight: typographyLineHeight.t18,
    letterSpacing: typographyLetterSpacing.default,
  },
  t4: {
    fontWeight: typographyWeight.semibold,
    fontSize: typographySize.t12,
    lineHeight: typographyLineHeight.t16,
    letterSpacing: typographyLetterSpacing.default,
  },
} as const;
