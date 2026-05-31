import { colors } from "@sopt-mds/design-tokens";
import { style } from "@vanilla-extract/css";
import { MEDIA } from "../styles/breakpoints";

/** 사이드바 폭 (Figma 230px). */
const SIDEBAR_WIDTH = 230;
/** TOC 폭 (Figma 188px). */
const TOC_WIDTH = 188;
/** 콘텐츠 최대 폭 (Figma default 1440px). */
const CONTENT_MAX_WIDTH = 1440;
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
  flex: 1,
  width: "100%",
  maxWidth: CONTENT_MAX_WIDTH,
  marginInline: "auto",
  // ≤768: 사이드바·TOC를 숨기고 본문 단일 컬럼으로 전환
  "@media": {
    [MEDIA.tabletDown]: {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
});

export const sidebar = style({
  paddingBlock: 24,
  paddingInline: 24,
  borderRight: `1px solid ${colors.stroke.neutral.subtle}`,
  color: colors.fg.neutral.subtle,
  "@media": {
    [MEDIA.tabletDown]: {
      display: "none",
    },
  },
});

export const article = style({
  minWidth: 0,
  paddingBlock: 40,
  paddingInline: 48,
  // 모바일에서만 좌우 마진 16px
  "@media": {
    [MEDIA.mobileDown]: {
      paddingInline: MOBILE_INLINE_MARGIN,
    },
  },
});

export const toc = style({
  paddingBlock: 40,
  paddingInline: 16,
  color: colors.fg.neutral.subtle,
  fontSize: 13,
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

export const overlayPlaceholder = style({
  marginTop: 24,
  color: colors.fg.neutral.ghost,
});

export const placeholderLabel = style({
  fontSize: 12,
  color: colors.fg.neutral.ghost,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
});
