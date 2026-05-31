import { colors, radius, typography } from "@sopt-mds/design-tokens";
import { style } from "@vanilla-extract/css";

/** 검색 아이콘 크기 (Figma 16px). */
const SEARCH_ICON_SIZE = 16;
/** 셰브론 아이콘 크기 (Figma 20px). */
const CHEVRON_SIZE = 20;
/** 자식 링크 들여쓰기 (Figma pl 24px). */
const CHILD_INDENT = 24;
/** 자식 영역 좌측 세로 디바이더 두께 (Figma 2px). */
const DIVIDER_WIDTH = 2;
/** 디바이더 좌측 위치 (Figma left 12px). */
const DIVIDER_LEFT = 12;
/** 사이드바 상단 여백 (Figma pt 48px). */
const SIDEBAR_TOP_PADDING = 48;

export const sidebar = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%",
  paddingTop: SIDEBAR_TOP_PADDING,
  paddingBottom: 16,
  backgroundColor: colors.base.gray950,
});

/* 검색 — 정적 표시(현재 동작 없음) */
export const search = style({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  gap: 4,
  width: "100%",
  paddingLeft: 10,
  paddingRight: 16,
  paddingBlock: 8,
  borderRadius: radius.r8,
  backgroundColor: colors.base.gray900,
});

export const searchIcon = style({
  flexShrink: 0,
  width: SEARCH_ICON_SIZE,
  height: SEARCH_ICON_SIZE,
  color: colors.fg.neutral.subtle,
});

export const searchPlaceholder = style({
  ...typography.label2,
  color: colors.fg.neutral.subtle,
});

/* 메뉴 트리 */
export const nav = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  width: "100%",
});

export const group = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const groupHeader = style({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  paddingInline: 12,
  paddingBlock: 10,
  border: "none",
  borderRadius: radius.r8,
  background: "transparent",
  color: colors.fg.neutral.default,
  cursor: "pointer",
  selectors: {
    "&:hover": {
      backgroundColor: colors.base.gray900,
    },
  },
});

export const groupLabel = style({
  ...typography.label2,
});

export const chevron = style({
  flexShrink: 0,
  width: CHEVRON_SIZE,
  height: CHEVRON_SIZE,
  color: colors.fg.neutral.default,
});

export const groupChildren = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  paddingTop: 2,
  width: "100%",
});

export const childrenDivider = style({
  position: "absolute",
  top: 11,
  bottom: 11,
  left: DIVIDER_LEFT,
  width: DIVIDER_WIDTH,
  borderRadius: radius.full,
  backgroundColor: colors.stroke.neutral.subtle,
});

export const link = style({
  ...typography.label2,
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  width: "100%",
  paddingLeft: CHILD_INDENT,
  paddingRight: 10,
  paddingBlock: 10,
  borderRadius: radius.r8,
  color: colors.fg.neutral.default,
  selectors: {
    "&:hover": {
      backgroundColor: colors.base.gray900,
    },
  },
});

export const linkActive = style({
  backgroundColor: colors.base.gray800,
  color: colors.fg.neutral.bold,
});
