import { colors, radius, spacing, typography } from "@sopt-mds/design-tokens";
import type { FloatingButtonMode, FloatingButtonState } from "./types";

/* Figma `floating button` 마스터(node 157:4780) 실측값 기준. */

export type FloatingButtonModeToken = {
  paddingInline: string;
  paddingBlock: string;
  iconSize: string;
  gap: string;
};

export type FloatingButtonStateToken = {
  backgroundColor: string;
  color: string;
};

/** 공통 토큰(형태/상태 무관). */
export const FLOATING_BUTTON_HEIGHT = "48px";
export const FLOATING_BUTTON_BORDER_RADIUS = radius.r16;
export const FLOATING_BUTTON_TYPOGRAPHY = {
  ...typography.label1,
  fontWeight: `${typography.label1.fontWeight}`,
};

export const FLOATING_BUTTON_MODE_TOKENS: Record<
  FloatingButtonMode,
  FloatingButtonModeToken
> = {
  iconOnly: {
    paddingInline: spacing.s10,
    paddingBlock: spacing.s10,
    iconSize: spacing.s28,
    gap: spacing.s0,
  },
  withLabel: {
    paddingInline: spacing.s14,
    paddingBlock: spacing.s12,
    iconSize: spacing.s24,
    gap: spacing.s4,
  },
};

/**
 * state 색상 토큰 (Figma 마스터 실측).
 * ActionButton primary와 동일한 밝은(neutral inverse) 솔리드 계열.
 */
export const FLOATING_BUTTON_STATE_TOKENS: Record<
  FloatingButtonState,
  FloatingButtonStateToken
> = {
  default: {
    backgroundColor: colors.bg.neutral.inverse,
    color: colors.fg.neutral.inverse,
  },
  hover: {
    backgroundColor: colors.bg.neutral.inverseHover,
    color: colors.fg.neutral.inverse,
  },
  press: {
    backgroundColor: colors.bg.neutral.inversePressed,
    color: colors.fg.neutral.inverse,
  },
  disabled: {
    backgroundColor: colors.bg.neutral.defaultDisabled,
    color: colors.fg.neutral.defaultDisabled,
  },
};
