import { colors, radius, spacing, typography } from "@sopt-mds/design-tokens";
import { style } from "@vanilla-extract/css";

/** 검색 아이콘 크기 (Figma 16px). */
const SEARCH_ICON_SIZE = 16;
/** 셰브론 아이콘 크기 (Figma 20px). */
const CHEVRON_SIZE = 20;
/** 자식 링크 들여쓰기 (Figma pl 24px). */
const CHILD_INDENT = spacing.s24;
/** 자식 영역 좌측 세로 디바이더 두께 (Figma 2px). */
const DIVIDER_WIDTH = 2;
/** 디바이더 좌측 위치 (Figma left 12px). */
const DIVIDER_LEFT = 12;

/**
 * 사이드바 콘텐츠 스택(검색 + 메뉴). 순수 콘텐츠만 담당하고,
 * 상단 여백·좌우 여백 같은 chrome은 감싸는 쪽(데스크탑 셀 / 모바일 드로어)이 준다.
 */
export const sidebar = style({
  display: "flex",
  flexDirection: "column",
  gap: spacing.s16,
  width: "100%",
  paddingBottom: spacing.s16,
  backgroundColor: colors.base.gray950,
});

/* 검색 — 정적 표시(현재 동작 없음) */
export const search = style({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  gap: spacing.s4,
  width: "100%",
  paddingLeft: spacing.s10,
  paddingRight: spacing.s16,
  paddingBlock: spacing.s8,
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
  gap: spacing.s4,
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
  paddingInline: spacing.s12,
  paddingBlock: spacing.s10,
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
  gap: spacing.s2,
  paddingTop: spacing.s2,
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

/** 선택 가능한 링크 공통 베이스 (대분류 단독 링크·자식 링크가 공유). */
const selectableRow = style({
  ...typography.label2,
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  width: "100%",
  paddingBlock: spacing.s10,
  borderRadius: radius.r8,
  color: colors.fg.neutral.default,
  selectors: {
    "&:hover": {
      backgroundColor: colors.base.gray900,
    },
  },
});

/** 하위가 없는 대분류 링크 (그룹 헤더와 같은 행 스타일, 선택 가능). */
export const topLink = style([
  selectableRow,
  { paddingInline: spacing.s12, justifyContent: "space-between" },
]);

/** 그룹 안의 들여쓴 자식 링크. */
export const childLink = style([
  selectableRow,
  { paddingLeft: CHILD_INDENT, paddingRight: spacing.s10 },
]);

/** top/child 공통 선택(active) 스타일. */
export const linkActive = style({
  backgroundColor: colors.base.gray800,
  color: colors.fg.neutral.bold,
});
