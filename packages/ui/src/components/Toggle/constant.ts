import { colors, spacing } from "@sopt-mds/design-tokens";
import type { ToggleSize, ToggleState } from "./types";

export type ToggleSizeToken = {
  trackWidth: string;
  trackHeight: string;
  trackPadding: string;
  thumbSize: string;
};

export type ToggleStateToken = {
  trackBackgroundColor: string;
  thumbBackgroundColor: string;
};

export const TOGGLE_SIZE_TOKENS: Record<ToggleSize, ToggleSizeToken> = {
  small: {
    trackWidth: "26px",
    trackHeight: spacing.s16,
    trackPadding: spacing.s2,
    thumbSize: spacing.s12,
  },
  large: {
    trackWidth: spacing.s36,
    trackHeight: spacing.s20,
    trackPadding: spacing.s2,
    thumbSize: spacing.s16,
  },
};

export const TOGGLE_STATE_TOKENS: Record<ToggleState, ToggleStateToken> = {
  unselected: {
    trackBackgroundColor: colors.fg.neutral.ghost,
    thumbBackgroundColor: colors.fg.neutral.bold,
  },
  selected: {
    trackBackgroundColor: colors.fg.secondary.default,
    thumbBackgroundColor: colors.fg.neutral.bold,
  },
  disabled: {
    trackBackgroundColor: colors.fg.neutral.ghostDisabled,
    thumbBackgroundColor: colors.fg.neutral.defaultDisabled,
  },
};

export const TOGGLE_FOCUS_RING_WIDTH = "2px";
export const TOGGLE_FOCUS_RING_OFFSET = "2px";
