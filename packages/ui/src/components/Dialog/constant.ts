import { spacing } from "@sopt-mds/design-tokens";

/** 컨테이너 폭에서 파생되는 내부 레이아웃. 공개 API가 아니다. */
export type DialogLayout = "narrow" | "wide";

/**
 * 레이아웃이 갈리는 컨테이너 폭.
 *
 * Figma는 Mobile(303, 최대 324)과 PC(400)만 그렸을 뿐 임계값을 정하지 않았다.
 * 둘 사이 임의값이므로 디자이너 확인이 필요하다.
 */
export const DIALOG_CONTAINER_BREAKPOINT = "360px";

/** `--mds-dialog-width` 미지정 시 폭. (Figma Mobile 303) */
export const DIALOG_DEFAULT_WIDTH = "303px";

/** Figma: description max-height 264. 넘치면 본문만 스크롤된다. */
export const DIALOG_DESCRIPTION_MAX_HEIGHT = "264px";

/**
 * 본문 요소 사이 기본 간격. (Figma "Container" gap)
 *
 * panel의 gap이며, Title→Description과 본문→Actions는 여기서 음수 마진으로 좁힌다.
 * 자세한 계산은 Dialog.css.ts의 description/actions 참고.
 */
export const DIALOG_CONTENT_GAP = spacing.s24;

/** 본문과 버튼 행 사이 간격. (Figma 루트 gap) */
export const DIALOG_ACTIONS_MARGIN_TOP = spacing.s20;

/**
 * 버튼 사이 간격.
 *
 * Figma는 Danger 8 / Default 9로 갈리는데, 9px은 spacing 토큰에 없고
 * 다른 값은 전부 토큰을 쓰므로 실수로 보아 s8로 통일했다. 디자이너 확인이 필요하다.
 */
export const DIALOG_ACTIONS_GAP = spacing.s8;

export type DialogLayoutToken = {
  /** Dialog 안쪽 여백. */
  padding: string;
  /** Title과 Description 사이 간격. */
  textGap: string;
};

/** 컨테이너 폭에서 파생되는 레이아웃 토큰. (Figma node 1255:943) */
export const DIALOG_LAYOUT_TOKENS: Record<DialogLayout, DialogLayoutToken> = {
  narrow: { padding: spacing.s20, textGap: spacing.s8 },
  wide: { padding: spacing.s24, textGap: spacing.s12 },
};
