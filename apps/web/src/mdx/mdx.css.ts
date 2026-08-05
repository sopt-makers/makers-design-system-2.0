import { colors, radius, spacing, typography } from "@sopt-mds/design-tokens";
import { style } from "@vanilla-extract/css";

const MONO_FONT = '"SF Mono", "SFMono-Regular", Menlo, Consolas, monospace';

/** TOC 앵커 클릭 시 헤딩이 상단에 너무 붙지 않도록 하는 여백. */
const HEADING_SCROLL_MARGIN = 80;

export const h1 = style({
  ...typography.heading1,
  margin: 0,
  marginBottom: spacing.s14,
  scrollMarginTop: HEADING_SCROLL_MARGIN,
  color: colors.fg.neutral.bold,
});

export const h2 = style({
  ...typography.title2,
  margin: 0,
  marginTop: spacing.s48,
  marginBottom: spacing.s16,
  scrollMarginTop: HEADING_SCROLL_MARGIN,
  color: colors.fg.neutral.bold,
});

export const h3 = style({
  ...typography.title3,
  margin: 0,
  marginTop: spacing.s40,
  marginBottom: spacing.s12,
  scrollMarginTop: HEADING_SCROLL_MARGIN,
  color: colors.fg.neutral.bold,
});

export const h4 = style({
  ...typography.body2,
  margin: 0,
  marginTop: spacing.s16,
  marginBottom: spacing.s8,
  scrollMarginTop: HEADING_SCROLL_MARGIN,
  color: colors.fg.neutral.subtle,
});

export const paragraph = style({
  ...typography.body1,
  margin: 0,
  marginBottom: spacing.s16,
  color: colors.fg.neutral.default,
});

export const list = style({
  ...typography.body1,
  margin: 0,
  marginBottom: spacing.s16,
  paddingLeft: spacing.s20,
  color: colors.fg.neutral.default,
});

export const listItem = style({
  marginBottom: spacing.s4,
});

/** 본문 인라인 링크 — 임시 색(디자인 확정 시 토큰 교체). */
export const link = style({
  color: colors.fg.secondary.default,
  textDecoration: "underline",
});

export const inlineCode = style({
  ...typography.body2,
  fontFamily: MONO_FONT,
  paddingInline: spacing.s6,
  paddingBlock: spacing.s2,
  borderRadius: radius.r4,
  backgroundColor: colors.base.gray800,
  color: colors.fg.neutral.bold,
});

export const codeBlock = style({
  margin: 0,
  marginBlock: spacing.s20,
  padding: spacing.s16,
  borderRadius: radius.r8,
  border: `1px solid ${colors.stroke.neutral.ghost}`,
  backgroundColor: colors.base.gray900,
  color: colors.fg.neutral.bold,
  fontFamily: MONO_FONT,
  fontSize: 14,
  lineHeight: "22px",
  overflowX: "auto",
});

export const image = style({
  display: "block",
  width: "100%",
  marginBlock: spacing.s20,
  borderRadius: radius.r8,
  border: `1px solid ${colors.stroke.neutral.ghost}`,
  backgroundColor: colors.base.gray900,
});

export const blockquote = style({
  ...typography.body1,
  margin: 0,
  marginBlock: spacing.s20,
  paddingLeft: spacing.s16,
  borderLeft: `2px solid ${colors.stroke.neutral.subtle}`,
  color: colors.fg.neutral.subtle,
});

export const divider = style({
  border: 0,
  borderTop: `1px solid ${colors.stroke.neutral.subtle}`,
  marginBlock: spacing.s32,
});

export const strong = style({
  fontWeight: 600,
  color: colors.fg.neutral.bold,
});
