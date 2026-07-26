import { colors, spacing, typography } from "@sopt-mds/design-tokens";
import type { ChipSize, ChipState, ChipType } from "./types";

export type ChipSizeToken = {
  fontWeight: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  paddingBlock: string;
  paddingInline: string;
  height: string;
  gap: string;
};

export type ChipStateToken = {
  borderWidth: string;
  borderColor: string;
  backgroundColor: string;
  color: string;
};

export const CHIP_HEIGHT_FOR_SIZE: Record<ChipSize, string> = {
  small: "36px",
  medium: "42px",
};

export const CHIP_SIZE_TOKENS: Record<ChipSize, ChipSizeToken> = {
  small: {
    ...typography.label3,
    fontWeight: `${typography.label3.fontWeight}`,
    paddingBlock: spacing.s4,
    paddingInline: spacing.s14,
    height: CHIP_HEIGHT_FOR_SIZE.small,
    gap: spacing.s4,
  },
  medium: {
    ...typography.label2,
    fontWeight: `${typography.label2.fontWeight}`,
    paddingBlock: spacing.s10,
    paddingInline: spacing.s20,
    height: CHIP_HEIGHT_FOR_SIZE.medium,
    gap: spacing.s4,
  },
};

export const CHIP_TYPE_STATE_TOKENS: Record<
  ChipType,
  Record<ChipState, ChipStateToken>
> = {
  outlined: {
    default: {
      borderWidth: "1px",
      borderColor: colors.stroke.neutral.subtle,
      backgroundColor: colors.bg.neutral.ghost,
      color: colors.fg.neutral.default,
    },
    hover: {
      borderWidth: "0px",
      borderColor: "transparent",
      backgroundColor: colors.bg.neutral.subtle,
      color: colors.fg.neutral.bold,
    },
    selected: {
      borderWidth: "1px",
      borderColor: colors.stroke.neutral.inverse,
      backgroundColor: colors.bg.neutral.subtle,
      color: colors.fg.neutral.bold,
    },
    disabled: {
      borderWidth: "1px",
      borderColor: colors.stroke.neutral.defaultDisabled,
      backgroundColor: colors.bg.neutral.ghost,
      color: colors.fg.neutral.ghost,
    },
  },
  solid: {
    default: {
      borderWidth: "0px",
      borderColor: "transparent",
      backgroundColor: colors.bg.neutral.ghost,
      color: colors.fg.neutral.default,
    },
    hover: {
      borderWidth: "0px",
      borderColor: "transparent",
      backgroundColor: colors.bg.neutral.inverse,
      color: colors.fg.neutral.inverse,
    },
    selected: {
      borderWidth: "0px",
      borderColor: "transparent",
      backgroundColor: colors.bg.neutral.inverse,
      color: colors.fg.neutral.inverse,
    },
    disabled: {
      borderWidth: "0px",
      borderColor: "transparent",
      backgroundColor: colors.bg.neutral.ghost,
      color: colors.fg.neutral.ghost,
    },
  },
};
