import { colors, radius, spacing, typography } from "@sopt-mds/design-tokens";
import type { TextAreaState, TextAreaVariant } from "./types";

export type TextAreaVariantToken = {
  backgroundColor: string;
  disabledBackgroundColor: string;
};

export type TextAreaStateToken = {
  borderColor: string;
};

export type TextAreaTypographyToken = {
  fontWeight: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
};

/**
 * 전용 border 토큰이 없어 1px 리터럴을 상수로 분리합니다.
 * border는 box-shadow inset으로 그려 state 변경 시 w/h가 바뀌지 않도록 합니다.
 */
export const TEXTAREA_BORDER_WIDTH = "1px";

export const TEXTAREA_MIN_HEIGHT = "46px";
export const TEXTAREA_MAX_HEIGHT = "170px";
export const TEXTAREA_RADIUS = radius.r10;
/** spacing 토큰에 13px가 없어 리터럴로 둡니다. */
export const TEXTAREA_PADDING_BLOCK = "13px";
export const TEXTAREA_PADDING_INLINE = spacing.s16;
/** addon과 textarea 사이 간격 (px 숫자값 — addon 폭 예약 계산에 사용) */
export const TEXTAREA_ADDON_GAP_VALUE = 8;
/** addon과 textarea 사이 간격 */
export const TEXTAREA_ADDON_GAP = `${TEXTAREA_ADDON_GAP_VALUE}px`;

export const TEXTAREA_LABEL_DESCRIPTION_GAP = spacing.s4;
export const TEXTAREA_DESCRIPTION_INPUT_GAP = spacing.s10;
export const TEXTAREA_INPUT_FOOTER_GAP = spacing.s6;
/** label / description / helper 영역의 좌우 패딩 */
export const TEXTAREA_META_PADDING_INLINE = spacing.s2;
/** footer 내 helper text와 count 사이 최소 간격 */
export const TEXTAREA_FOOTER_GAP = spacing.s8;
/** error 아이콘과 에러 메시지 사이 간격 */
export const TEXTAREA_HELPER_ICON_GAP = spacing.s4;
/** label과 required(*) 표시 사이 간격 */
export const TEXTAREA_REQUIRED_GAP = spacing.s4;

export const TEXTAREA_LABEL_TYPOGRAPHY: TextAreaTypographyToken = {
  ...typography.title4,
  fontWeight: `${typography.title4.fontWeight}`,
};

export const TEXTAREA_DESCRIPTION_TYPOGRAPHY: TextAreaTypographyToken = {
  ...typography.label3,
  fontWeight: `${typography.label3.fontWeight}`,
};

export const TEXTAREA_TYPOGRAPHY: TextAreaTypographyToken = {
  ...typography.body1,
  fontWeight: `${typography.body1.fontWeight}`,
};

export const TEXTAREA_FOOTER_TYPOGRAPHY: TextAreaTypographyToken = {
  ...typography.body3,
  fontWeight: `${typography.body3.fontWeight}`,
};

/** variant는 기본/비활성 배경을 결정합니다. border는 state로만 제어됩니다. */
export const TEXTAREA_VARIANT_TOKENS: Record<
  TextAreaVariant,
  TextAreaVariantToken
> = {
  default: {
    backgroundColor: colors.bg.layer.default,
    disabledBackgroundColor: colors.bg.layer.default,
  },
  ghost: {
    backgroundColor: colors.bg.neutral.ghost,
    disabledBackgroundColor: colors.bg.neutral.ghost,
  },
};

/**
 * border 색은 state로만 제어됩니다.
 * default/disabled는 border 없음(transparent), focus/error에서만 표시됩니다.
 */
export const TEXTAREA_STATE_TOKENS: Record<TextAreaState, TextAreaStateToken> =
  {
    default: {
      borderColor: "transparent",
    },
    focused: {
      borderColor: colors.stroke.neutral.defaultFocused,
    },
    error: {
      borderColor: colors.stroke.danger.default,
    },
    disabled: {
      borderColor: "transparent",
    },
  };

export const TEXTAREA_TEXT_COLOR = {
  default: colors.fg.neutral.bold,
  disabled: colors.fg.neutral.defaultDisabled,
  placeholder: colors.fg.neutral.ghost,
} as const;

export const TEXTAREA_LABEL_COLOR = colors.fg.neutral.bold;
export const TEXTAREA_REQUIRED_COLOR = colors.fg.brand.default;
export const TEXTAREA_DESCRIPTION_COLOR = colors.fg.neutral.default;

export const TEXTAREA_HELPER_COLOR = {
  default: colors.fg.neutral.ghost,
  error: colors.fg.danger.default,
  disabled: colors.fg.neutral.ghostDisabled,
} as const;

/** count(1/nnn)는 error 상태의 영향을 받지 않습니다. */
export const TEXTAREA_COUNTER_COLOR = colors.fg.neutral.ghost;
