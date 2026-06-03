/**
 * 반응형 브레이크포인트 단일 소스.
 *
 * 디자이너 요구사항:
 * - 769px 이상      : 데스크탑 3컬럼 (사이드바 | 본문 | TOC)
 * - 768px 이하      : 헤더+햄버거로 전환, TOC·사이드바 숨김 (태블릿/모바일 공통)
 * - 375px 이하      : 위 + 본문 좌우 마진 16px (모바일에서만)
 */
export const BREAKPOINT = {
  /** 데스크탑 3컬럼 → 헤더+햄버거 전환 경계 */
  tablet: 768,
  /** 본문 좌우 마진을 16px로 줄이는 경계 */
  mobile: 375,
} as const;

/**
 * vanilla-extract `@media` 키로 그대로 사용하는 미디어 쿼리 문자열.
 *
 * @example
 * style({
 *   "@media": {
 *     [MEDIA.tabletDown]: { display: "none" },
 *   },
 * });
 */
export const MEDIA = {
  /** 768px 이하 (태블릿·모바일) */
  tabletDown: `screen and (max-width: ${BREAKPOINT.tablet}px)`,
  /** 375px 이하 (모바일) */
  mobileDown: `screen and (max-width: ${BREAKPOINT.mobile}px)`,
} as const;
