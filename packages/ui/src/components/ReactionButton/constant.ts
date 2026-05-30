import { colors, spacing, typography } from "@sopt-mds/design-tokens";
import type { ReactionButtonSize } from "./types";

/* Figma `reaction button` 마스터(node 180:179) 실측값 기준. */

export type ReactionButtonSizeToken = {
  fontWeight: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  paddingInline: string;
  paddingBlock: string;
  gap: string;
  height: string;
  iconSize: string;
};

export const REACTION_BUTTON_SIZE_TOKENS: Record<
  ReactionButtonSize,
  ReactionButtonSizeToken
> = {
  xsmall: {
    ...typography.label4,
    fontWeight: `${typography.label4.fontWeight}`,
    paddingInline: spacing.s4,
    paddingBlock: spacing.s2,
    gap: spacing.s4,
    height: "auto",
    iconSize: "16px",
  },
  small: {
    ...typography.label4,
    fontWeight: `${typography.label4.fontWeight}`,
    paddingInline: spacing.s14,
    paddingBlock: spacing.s8,
    gap: spacing.s4,
    height: "32px",
    iconSize: "16px",
  },
  medium: {
    ...typography.label3,
    fontWeight: `${typography.label3.fontWeight}`,
    paddingInline: spacing.s16,
    paddingBlock: spacing.s10,
    gap: spacing.s4,
    height: "38px",
    iconSize: "20px",
  },
  large: {
    ...typography.label1,
    fontWeight: `${typography.label1.fontWeight}`,
    paddingInline: spacing.s24,
    paddingBlock: spacing.s14,
    gap: spacing.s6,
    height: "54px",
    iconSize: "24px",
  },
};

/** 텍스트/아이콘 색 (selected 여부 + disabled에 따라). size 무관. */
export const REACTION_BUTTON_TEXT_COLOR = {
  unselected: colors.fg.neutral.default,
  selected: colors.fg.neutral.bold,
  disabled: colors.fg.neutral.defaultDisabled,
};

/** pill(small/medium/large) 형태의 배경/테두리 색. */
export const REACTION_BUTTON_PILL = {
  background: colors.fg.neutral.inverse,
  backgroundDisabled: colors.bg.neutral.defaultDisabled,
  borderColor: colors.stroke.neutral.default,
  borderColorHover: colors.stroke.neutral.defaultFocused,
  borderColorDisabled: colors.stroke.neutral.defaultDisabled,
};
