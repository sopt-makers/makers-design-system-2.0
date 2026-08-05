import { spacing, typography } from "@sopt-mds/design-tokens";
import type { CheckboxSize } from "../Checkbox/types";
import type { DialogDevice } from "./types";

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

/** description에 얹는 타이포 토큰의 구조. body1/body2 어느 쪽이든 받는다. */
type DialogTypographyToken = {
  fontWeight: number;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
};

export type DialogDeviceToken = {
  /** Dialog 폭. device마다 고정이다. */
  width: string;
  /** Dialog 안쪽 여백. */
  padding: string;
  /** Title과 Description 사이 간격. */
  textGap: string;
  /** Description 타이포. */
  descriptionTypography: DialogTypographyToken;
  /** 본문 Checkbox가 `size`를 생략했을 때 상속할 크기. */
  checkboxSize: CheckboxSize;
};

/**
 * device별 치수 토큰. (Figma node 1255:943 — `Device=Mobile` / `Device=PC`)
 *
 * Figma 프레임 높이가 이 조합과 정확히 맞는다.
 *   Mobile 303×232 = 20*2 + 30(title) + 8 + 44(desc 2줄) + 24 + 20(checkbox) + 20 + 46(button)
 *   PC     400×256 = 24*2 + 30(title) + 12 + 52(desc 2줄) + 24 + 24(checkbox) + 20 + 46(button)
 */
export const DIALOG_DEVICE_TOKENS: Record<DialogDevice, DialogDeviceToken> = {
  mobile: {
    width: "303px",
    padding: spacing.s20,
    textGap: spacing.s8,
    descriptionTypography: typography.body2,
    checkboxSize: "small",
  },
  pc: {
    width: "400px",
    padding: spacing.s24,
    textGap: spacing.s12,
    descriptionTypography: typography.body1,
    checkboxSize: "large",
  },
};
