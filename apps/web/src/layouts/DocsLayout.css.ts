import { spacing } from "@sopt-mds/design-tokens";
import { style } from "@vanilla-extract/css";
import { MEDIA } from "../styles/breakpoints";
import {
  BELOW_TOP_NAVIGATION_HEIGHT,
  COLUMN_GAP,
  SHELL_INLINE_PADDING,
  SHELL_MAX_WIDTH,
  SIDEBAR_WIDTH,
  TOC_WIDTH,
  TOP_NAVIGATION_HEIGHT,
} from "../styles/layout";

/** 모바일(≤375) 본문 좌우 마진. */
const MOBILE_INLINE_MARGIN = spacing.s16;
/** 사이드바 상단 여백 (Figma pt 48px) — Sidebar가 아닌 셀이 제공하는 chrome. */
const SIDEBAR_TOP_PADDING = spacing.s48;

export const shell = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

/**
 * 3컬럼 본문 그리드.
 *
 * 콘텐츠 열은 `1fr`이고 상한은 셸의 max-width가 만든다 — 1440에서 사이드바·TOC·간격·
 * 거터를 빼면 정확히 942가 남는다. 화면이 더 넓어지면 콘텐츠 대신 좌우 여백이 늘어난다.
 *
 * 이전에는 max-width 없이 전체 폭을 썼다("넓은 모니터에서도 사이드바가 화면 좌측과
 * 24px를 유지"). #34에서 정한 그 결정을 이번 요구사항이 대체한다.
 */
export const body = style({
  display: "grid",
  gridTemplateColumns: `${SIDEBAR_WIDTH}px minmax(0, 1fr) ${TOC_WIDTH}px`,
  columnGap: COLUMN_GAP,
  flex: 1,
  width: "100%",
  maxWidth: SHELL_MAX_WIDTH,
  marginInline: "auto",
  paddingInline: SHELL_INLINE_PADDING,
  // ≤768: 사이드바·TOC를 숨기고 본문 단일 컬럼으로 전환 (좌우 여백은 본문이 직접 관리)
  "@media": {
    [MEDIA.tabletDown]: {
      gridTemplateColumns: "minmax(0, 1fr)",
      paddingInline: 0,
    },
  },
});

/**
 * 사이드바 그리드 셀. 콘텐츠 스타일은 Sidebar 컴포넌트가 담당하고, 여기선 배치/여백/숨김만.
 *
 * 스크롤과 무관하게 상단바 아래에 고정된다(디자인 QA). 메뉴가 화면보다 길면 셀 안에서만
 * 스크롤되고, `border-box`라 상단 여백 48이 높이를 넘기지 않는다.
 */
export const sidebarCell = style({
  position: "sticky",
  top: TOP_NAVIGATION_HEIGHT,
  alignSelf: "start",
  boxSizing: "border-box",
  height: BELOW_TOP_NAVIGATION_HEIGHT,
  overflowY: "auto",
  paddingTop: SIDEBAR_TOP_PADDING,
  "@media": {
    [MEDIA.tabletDown]: {
      display: "none",
    },
  },
});

export const article = style({
  minWidth: 0,
  paddingTop: spacing.s40,
  paddingBottom: spacing.s24,
  paddingInline: spacing.s32,
  // 모바일에서만 좌우 마진 16px
  "@media": {
    [MEDIA.mobileDown]: {
      paddingInline: MOBILE_INLINE_MARGIN,
    },
  },
});

/**
 * 목차 그리드 셀. 콘텐츠 스타일은 TableOfContents 컴포넌트가 담당.
 *
 * 사이드바와 같은 기준으로 고정된다. 이전에는 `top: 0`이었는데, 상단바가 고정되면서
 * 그대로 두면 목차가 상단바 뒤로 파고들어 가려진다.
 */
export const tableOfContentsCell = style({
  position: "sticky",
  top: TOP_NAVIGATION_HEIGHT,
  alignSelf: "start",
  boxSizing: "border-box",
  maxHeight: BELOW_TOP_NAVIGATION_HEIGHT,
  overflowY: "auto",
  "@media": {
    [MEDIA.tabletDown]: {
      display: "none",
    },
  },
});
