import { colors, radius, spacing, typography } from "@sopt-mds/design-tokens";
import { style, styleVariants } from "@vanilla-extract/css";

/** s18 토큰 부재로 raw 18px 사용. 디자이너 측 토큰 보강 시 spacing.s18 로 교체. */
const containerPaddingHorizontal = "18px";

export const container = style({
  display: "flex",
  alignItems: "flex-start",
  gap: spacing.s10,
  padding: `${spacing.s14} ${containerPaddingHorizontal}`,
  borderRadius: radius.r10,
  borderStyle: "solid",
  borderWidth: "1px",
  color: colors.fg.neutral.bold,
});

export const containerVariant = styleVariants({
  danger: {
    background: colors.bg.danger.ghost,
    borderColor: colors.stroke.danger.default,
  },
  information: {
    background: colors.bg.information.ghost,
    borderColor: colors.stroke.information.subtle,
  },
});

export const icon = style({
  flexShrink: 0,
  width: 20,
  height: 20,
});

export const iconVariant = styleVariants({
  danger: {
    color: colors.fg.danger.default,
  },
  information: {
    color: colors.fg.information.default,
  },
});

/** 본문과 액션 버튼 사이 세로 간격. 2026-07-26 디자인 QA로 raw 18px → s16. */
export const contents = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: spacing.s16,
  flex: "1 0 0",
  minWidth: 0,
});

export const body = style({
  margin: 0,
  ...typography.body2,
});

export const action = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 0,
  padding: 0,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontFamily: "inherit",
  color: colors.fg.neutral.bold,
  ...typography.label4,
});
