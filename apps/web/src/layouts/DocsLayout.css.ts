import { spacing } from "@sopt-mds/design-tokens";
import { style } from "@vanilla-extract/css";
import { MEDIA } from "../styles/breakpoints";

/** 사이드바 폭 (Figma 230px). */
const SIDEBAR_WIDTH = 230;
/** TOC 폭 (Figma 188px). */
const TOC_WIDTH = 188;
/** 데스크탑 콘텐츠 좌우 여백 (Figma 24px). */
const CONTENT_INLINE_PADDING = spacing.s24;
/** 컬럼 사이 간격 (Figma 16px). */
const COLUMN_GAP = spacing.s16;
/** 모바일(≤375) 본문 좌우 마진. */
const MOBILE_INLINE_MARGIN = spacing.s16;
/** 사이드바 상단 여백 (Figma pt 48px) — Sidebar가 아닌 셀이 제공하는 chrome. */
const SIDEBAR_TOP_PADDING = spacing.s48;

export const shell = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

export const body = style({
  display: "grid",
  gridTemplateColumns: `${SIDEBAR_WIDTH}px minmax(0, 1fr) ${TOC_WIDTH}px`,
  columnGap: COLUMN_GAP,
  flex: 1,
  width: "100%",
  // 넓은 모니터에서도 좌측 사이드바가 화면 좌측과 24px를 유지하도록,
  // 중앙정렬(max-width) 없이 전체 폭을 쓰고 좌우 24px 거터만 둔다.
  paddingInline: CONTENT_INLINE_PADDING,
  // ≤768: 사이드바·TOC를 숨기고 본문 단일 컬럼으로 전환 (좌우 여백은 본문이 직접 관리)
  "@media": {
    [MEDIA.tabletDown]: {
      gridTemplateColumns: "minmax(0, 1fr)",
      paddingInline: 0,
    },
  },
});

/** 사이드바 그리드 셀. 콘텐츠 스타일은 Sidebar 컴포넌트가 담당하고, 여기선 배치/여백/숨김만. */
export const sidebarCell = style({
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

/** 목차 그리드 셀. 스크롤 시 상단에 고정, 콘텐츠 스타일은 TableOfContents 컴포넌트가 담당. */
export const tableOfContentsCell = style({
  position: "sticky",
  top: 0,
  alignSelf: "start",
  maxHeight: "100vh",
  overflowY: "auto",
  "@media": {
    [MEDIA.tabletDown]: {
      display: "none",
    },
  },
});
