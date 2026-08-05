import { spacing } from "@sopt-mds/design-tokens";

/**
 * 문서 사이트 셸의 치수 단일 소스.
 *
 * 상단바와 본문 그리드가 같은 최대 폭에 정렬돼야 로고와 사이드바의 좌측이 맞으므로,
 * DocsLayout과 TopNavigation이 이 값을 함께 소비한다.
 */

/** 사이드바 폭 (Figma 230px). */
export const SIDEBAR_WIDTH = 230;

/** TOC 폭 (Figma 188px). */
export const TOC_WIDTH = 188;

/** 콘텐츠 열 최대 폭 (Figma 942px). */
export const CONTENT_MAX_WIDTH = 942;

/** 컬럼 사이 간격 (Figma 16px). */
export const COLUMN_GAP = spacing.s16;

/** 화면 좌우 최소 여백 (Figma 24px). */
export const SHELL_INLINE_PADDING = spacing.s24;

/** 상단바 높이 (Figma 64px). */
export const TOP_NAVIGATION_HEIGHT = 64;

/**
 * 셸 최대 폭 — 230 + 16 + 942 + 16 + 188 + 24×2 = 1440. (Figma `default_1440`)
 *
 * 화면이 이보다 넓어지면 콘텐츠 열을 늘리지 않고 좌우 여백이 대신 늘어난다.
 * 콘텐츠 942는 이 폭에서 나머지를 뺀 결과라 `1fr`로 두고, 여기서 상한만 건다.
 */
export const SHELL_MAX_WIDTH = `calc(${SIDEBAR_WIDTH}px + ${CONTENT_MAX_WIDTH}px + ${TOC_WIDTH}px + 2 * ${COLUMN_GAP} + 2 * ${SHELL_INLINE_PADDING})`;

/** 상단바 아래로 고정되는 열(사이드바·TOC)이 쓸 수 있는 세로 공간. */
export const BELOW_TOP_NAVIGATION_HEIGHT = `calc(100vh - ${TOP_NAVIGATION_HEIGHT}px)`;

/**
 * 겹침 순서.
 *
 * 고정된 셋(상단바·사이드바·TOC)은 전부 sticky라 각자 쌓임 맥락을 만든다. DOM 순서대로면
 * 뒤에 오는 사이드바·TOC가 상단바 위에 그려지므로, 상단바에만 z-index를 얹어 되돌린다.
 * 모바일 드로어는 그 위를 덮어야 하므로 항상 최상단이다.
 */
export const Z_INDEX = {
  /** 스크롤에도 남아 있는 상단바. */
  topNavigation: 10,
  /** 화면 전체를 덮는 모바일 메뉴. */
  mobileMenu: 20,
} as const;
