import { colors } from "@sopt-mds/design-tokens";
import { style } from "@vanilla-extract/css";
import { MEDIA } from "../styles/breakpoints";

/** 사이드바 폭 (Figma 230px). */
const SIDEBAR_WIDTH = 230;
/** TOC 폭 (Figma 188px). */
const TOC_WIDTH = 188;
/** 콘텐츠 최대 폭 (Figma default 1440px). */
const CONTENT_MAX_WIDTH = 1440;
/** 데스크탑 콘텐츠 좌우 여백 (Figma 24px). */
const CONTENT_INLINE_PADDING = 24;
/** 컬럼 사이 간격 (Figma 16px). */
const COLUMN_GAP = 16;
/** 모바일(≤375) 본문 좌우 마진. */
const MOBILE_INLINE_MARGIN = 16;

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
  maxWidth: CONTENT_MAX_WIDTH,
  marginInline: "auto",
  paddingInline: CONTENT_INLINE_PADDING,
  // ≤768: 사이드바·TOC를 숨기고 본문 단일 컬럼으로 전환 (좌우 여백은 본문이 직접 관리)
  "@media": {
    [MEDIA.tabletDown]: {
      gridTemplateColumns: "minmax(0, 1fr)",
      paddingInline: 0,
    },
  },
});

/** 사이드바 그리드 셀. 콘텐츠 스타일은 Sidebar 컴포넌트가 담당하고, 여기선 배치/숨김만. */
export const sidebarCell = style({
  "@media": {
    [MEDIA.tabletDown]: {
      display: "none",
    },
  },
});

export const article = style({
  minWidth: 0,
  paddingTop: 40,
  paddingBottom: 24,
  paddingInline: 32,
  // 모바일에서만 좌우 마진 16px
  "@media": {
    [MEDIA.mobileDown]: {
      paddingInline: MOBILE_INLINE_MARGIN,
    },
  },
});

/** TOC 그리드 셀. 스크롤 시 상단에 고정, 콘텐츠 스타일은 Toc 컴포넌트가 담당. */
export const tocCell = style({
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

/**
 * 모바일 햄버거 메뉴 오버레이 placeholder.
 * 실제 메뉴(사이드바 트리)는 이후 hamburger 영역 작업에서 채운다.
 */
export const overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 10,
  display: "flex",
  flexDirection: "column",
  padding: 24,
  backgroundColor: colors.base.gray950,
});

export const overlayCloseButton = style({
  alignSelf: "flex-end",
  padding: 0,
  border: "none",
  background: "transparent",
  color: colors.fg.neutral.bold,
  cursor: "pointer",
});
