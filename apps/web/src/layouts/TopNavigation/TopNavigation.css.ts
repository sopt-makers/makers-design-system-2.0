import { colors, spacing, typography } from "@sopt-mds/design-tokens";
import { style } from "@vanilla-extract/css";
import { MEDIA } from "../../styles/breakpoints";
import {
  SHELL_INLINE_PADDING,
  SHELL_MAX_WIDTH,
  TOP_NAVIGATION_HEIGHT,
} from "../../styles/layout";

/** 로고와 내비게이션 사이 간격 (Figma gap 67px). */
const LOGO_NAV_GAP = 67;
/** 활성 탭 하단 인디케이터 두께 (Figma border-b-2). */
const ACTIVE_INDICATOR_WIDTH = 2;

/**
 * 바깥 껍데기 — 배경과 하단 보더만 화면 폭 전체로 늘린다.
 * 넓은 모니터에서 바가 본문 폭에서 잘려 보이지 않게 하기 위함이다.
 */
export const bar = style({
  boxSizing: "border-box",
  height: TOP_NAVIGATION_HEIGHT,
  width: "100%",
  backgroundColor: colors.base.gray950, // #0F1012 (Figma bg/layer/layer-basement)
  borderBottom: `1px solid ${colors.stroke.neutral.ghost}`, // #202025
});

/**
 * 실제 콘텐츠 줄 — 본문 그리드와 같은 최대 폭·거터를 써서 로고 좌측이 사이드바 좌측과 맞는다.
 * (배경은 bar가 전체 폭으로 깔고, 정렬만 여기서 한다.)
 */
export const inner = style({
  boxSizing: "border-box",
  display: "flex",
  // Figma: 콘텐츠를 바닥에 정렬(items-end) → 활성 탭 밑줄이 헤더 하단에 붙는다.
  alignItems: "flex-end",
  height: "100%",
  maxWidth: SHELL_MAX_WIDTH,
  marginInline: "auto",
  paddingInline: SHELL_INLINE_PADDING,
  paddingBottom: "1px", // Figma: pb-px
});

export const logoLink = style({
  display: "flex",
  // 바가 items-end라 로고도 Figma처럼 바닥 정렬(로고 그룹 py-8 → 바닥 8px).
  alignItems: "flex-end",
  flexShrink: 0,
  paddingBottom: spacing.s8,
});

export const nav = style({
  display: "flex",
  // 링크들을 바닥 정렬 → 선택/비선택의 하단이 일치하고, 선택 텍스트가 위로 올라간다.
  alignItems: "flex-end",
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
  // 바닥정렬 모델과 일관: 링크 내부 콘텐츠도 하단 기준(아이콘 추가 등 대비).
  alignItems: "flex-end",
  paddingBottom: spacing.s6, // Figma: 비선택 pb-6
  color: colors.fg.neutral.ghost,
  whiteSpace: "nowrap",
  transition: "color 150ms ease",
  selectors: {
    "&:hover": {
      color: colors.fg.neutral.default,
    },
  },
});

export const navLinkActive = style({
  // Figma: 선택 시 pb-8(비선택보다 2px 깊은 패딩) + 2px 흰 보더 → 텍스트가 위로, 밑줄이 바닥에.
  paddingBottom: spacing.s8,
  color: colors.fg.neutral.bold,
  borderBottom: `${ACTIVE_INDICATOR_WIDTH}px solid ${colors.fg.neutral.bold}`,
  selectors: {
    // 활성 탭은 hover에도 bold 색 유지(기본 navLink:hover의 default 색을 덮는다).
    "&:hover": {
      color: colors.fg.neutral.bold,
    },
  },
});

export const menuButton = style({
  display: "none",
  // 바가 items-end라 모바일 햄버거는 세로 중앙으로 고정.
  alignSelf: "center",
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
