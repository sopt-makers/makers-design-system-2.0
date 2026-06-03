import { colors, spacing, typography } from "@sopt-mds/design-tokens";
import { style } from "@vanilla-extract/css";
import { MEDIA } from "../../styles/breakpoints";

/** 상단바 높이 (Figma 64px). */
const BAR_HEIGHT = 64;
/** 로고와 내비게이션 사이 간격 (Figma gap 67px). */
const LOGO_NAV_GAP = 67;
/** 활성 탭 하단 인디케이터 두께. */
const ACTIVE_INDICATOR_WIDTH = 2;

export const bar = style({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "stretch",
  height: BAR_HEIGHT,
  width: "100%",
  paddingInline: spacing.s24,
  backgroundColor: colors.base.gray950,
  borderBottom: `1px solid ${colors.stroke.neutral.ghost}`,
});

export const logoLink = style({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
});

export const nav = style({
  display: "flex",
  alignItems: "stretch",
  gap: spacing.s24,
  marginLeft: LOGO_NAV_GAP,
  "@media": {
    [MEDIA.tabletDown]: {
      display: "none",
    },
  },
});

export const navLink = style({
  ...typography.label2,
  display: "flex",
  alignItems: "center",
  color: colors.fg.neutral.ghost,
  borderBottom: `${ACTIVE_INDICATOR_WIDTH}px solid transparent`,
  whiteSpace: "nowrap",
  transition: "color 150ms ease",
  selectors: {
    "&:hover": {
      color: colors.fg.neutral.default,
    },
  },
});

export const navLinkActive = style({
  color: colors.fg.neutral.bold,
  borderBottomColor: colors.fg.neutral.bold,
});

export const menuButton = style({
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "auto",
  padding: 0,
  border: "none",
  background: "transparent",
  color: colors.fg.neutral.bold,
  cursor: "pointer",
  "@media": {
    [MEDIA.tabletDown]: {
      display: "inline-flex",
    },
  },
});
