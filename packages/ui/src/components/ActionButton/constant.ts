import { colors, radius, spacing, typography } from "@sopt-mds/design-tokens";
import type {
  ActionButtonSize,
  ActionButtonState,
  ActionButtonVariant,
} from "./types";

/*
 * Figma `action button` 마스터(node 237:478) 실측값 기준.
 *
 * 2026-07-26 디자인 QA로 small 높이(36→38)와 좌우 여백(small 14→12, medium 20→16,
 * large 24→20)이 조정됐다. paddingBlock은 고정 높이 안에서 흡수되므로(box-sizing:
 * border-box + align-items: center) 실제 픽셀을 움직이는 건 paddingInline뿐이다.
 */

export type ActionButtonSizeToken = {
  fontWeight: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  paddingInline: string;
  paddingBlock: string;
  height: string;
  borderRadius: string;
  gap: string;
  iconSize: string;
};

export type ActionButtonStateToken = {
  backgroundColor: string;
  color: string;
};

/** size별 높이(확정값). */
export const ACTION_BUTTON_HEIGHT_FOR_SIZE: Record<ActionButtonSize, string> = {
  xsmall: "32px",
  small: "38px",
  medium: "46px",
  large: "56px",
};

export const ACTION_BUTTON_SIZE_TOKENS: Record<
  ActionButtonSize,
  ActionButtonSizeToken
> = {
  xsmall: {
    ...typography.label4,
    fontWeight: `${typography.label4.fontWeight}`,
    paddingInline: spacing.s12,
    paddingBlock: spacing.s8,
    height: ACTION_BUTTON_HEIGHT_FOR_SIZE.xsmall,
    borderRadius: radius.full,
    gap: spacing.s2,
    iconSize: spacing.s16,
  },
  small: {
    ...typography.label3,
    fontWeight: `${typography.label3.fontWeight}`,
    paddingInline: spacing.s12,
    paddingBlock: spacing.s10,
    height: ACTION_BUTTON_HEIGHT_FOR_SIZE.small,
    borderRadius: radius.r8,
    gap: spacing.s4,
    iconSize: spacing.s16,
  },
  medium: {
    ...typography.label2,
    fontWeight: `${typography.label2.fontWeight}`,
    paddingInline: spacing.s16,
    paddingBlock: spacing.s12,
    height: ACTION_BUTTON_HEIGHT_FOR_SIZE.medium,
    borderRadius: radius.r10,
    gap: spacing.s4,
    iconSize: spacing.s20,
  },
  large: {
    ...typography.label1,
    fontWeight: `${typography.label1.fontWeight}`,
    paddingInline: spacing.s20,
    paddingBlock: spacing.s16,
    height: ACTION_BUTTON_HEIGHT_FOR_SIZE.large,
    borderRadius: radius.r12,
    gap: spacing.s4,
    iconSize: spacing.s24,
  },
};

/**
 * variant × state 색상 토큰 (Figma 마스터 실측).
 * - primary: 가장 높은 위계의 밝은(흰색 계열) 솔리드 버튼.
 * - secondary: neutral subtle 솔리드.
 * - danger: bg/danger 토큰을 배경으로 사용(default/hover/pressed).
 * - 모든 variant의 disabled는 neutral default-disabled로 통일.
 */
export const ACTION_BUTTON_VARIANT_STATE_TOKENS: Record<
  ActionButtonVariant,
  Record<ActionButtonState, ActionButtonStateToken>
> = {
  primary: {
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
  },
  secondary: {
    default: {
      backgroundColor: colors.bg.neutral.subtle,
      color: colors.fg.neutral.bold,
    },
    hover: {
      backgroundColor: colors.bg.neutral.subtleHover,
      color: colors.fg.neutral.bold,
    },
    press: {
      backgroundColor: colors.bg.neutral.subtlePressed,
      color: colors.fg.neutral.bold,
    },
    disabled: {
      backgroundColor: colors.bg.neutral.defaultDisabled,
      color: colors.fg.neutral.defaultDisabled,
    },
  },
  danger: {
    default: {
      backgroundColor: colors.bg.danger.default,
      color: colors.fg.neutral.bold,
    },
    hover: {
      backgroundColor: colors.bg.danger.defaultHover,
      color: colors.fg.neutral.bold,
    },
    press: {
      backgroundColor: colors.bg.danger.defaultPressed,
      color: colors.fg.neutral.bold,
    },
    disabled: {
      backgroundColor: colors.bg.neutral.defaultDisabled,
      color: colors.fg.neutral.defaultDisabled,
    },
  },
};
