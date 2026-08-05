import { colors, radius } from "@sopt-mds/design-tokens";
import { createGlobalVar, style, styleVariants } from "@vanilla-extract/css";
import {
  TOGGLE_FOCUS_RING_OFFSET,
  TOGGLE_FOCUS_RING_WIDTH,
  TOGGLE_SIZE_TOKENS,
  TOGGLE_STATE_TOKENS,
} from "./constant";
import type { ToggleSize, ToggleState } from "./types";

/*
 * Toggle CSS variables
 * --mds-toggle-* 값을 컴포넌트 외부에서 오버라이드할 수 있습니다.
 */
const TOGGLE_TRACK_WIDTH_VARIABLE = "--mds-toggle-track-width";
const TOGGLE_TRACK_HEIGHT_VARIABLE = "--mds-toggle-track-height";
const TOGGLE_TRACK_PADDING_VARIABLE = "--mds-toggle-track-padding";
const TOGGLE_TRACK_BACKGROUND_COLOR_VARIABLE =
  "--mds-toggle-track-background-color";
const TOGGLE_THUMB_SIZE_VARIABLE = "--mds-toggle-thumb-size";
const TOGGLE_THUMB_BACKGROUND_COLOR_VARIABLE =
  "--mds-toggle-thumb-background-color";

type ToggleCssVariableName =
  | typeof TOGGLE_TRACK_WIDTH_VARIABLE
  | typeof TOGGLE_TRACK_HEIGHT_VARIABLE
  | typeof TOGGLE_TRACK_PADDING_VARIABLE
  | typeof TOGGLE_TRACK_BACKGROUND_COLOR_VARIABLE
  | typeof TOGGLE_THUMB_SIZE_VARIABLE
  | typeof TOGGLE_THUMB_BACKGROUND_COLOR_VARIABLE;

type ToggleCssVar<Name extends ToggleCssVariableName> = `var(${Name})`;
type ToggleSizeVar =
  | typeof toggleVars.trackWidth
  | typeof toggleVars.trackHeight
  | typeof toggleVars.trackPadding
  | typeof toggleVars.thumbSize;
type ToggleStateVar =
  | typeof toggleVars.trackBackgroundColor
  | typeof toggleVars.thumbBackgroundColor;

type ToggleSizeStyle = {
  vars: Record<ToggleSizeVar, string>;
};

type ToggleStateStyle = {
  vars: Record<ToggleStateVar, string>;
};

function createToggleVar<Name extends ToggleCssVariableName>(
  name: Name,
): ToggleCssVar<Name> {
  return createGlobalVar(name.slice(2)) as ToggleCssVar<Name>;
}

export const toggleVars = {
  trackWidth: createToggleVar(TOGGLE_TRACK_WIDTH_VARIABLE),
  trackHeight: createToggleVar(TOGGLE_TRACK_HEIGHT_VARIABLE),
  trackPadding: createToggleVar(TOGGLE_TRACK_PADDING_VARIABLE),
  trackBackgroundColor: createToggleVar(TOGGLE_TRACK_BACKGROUND_COLOR_VARIABLE),
  thumbSize: createToggleVar(TOGGLE_THUMB_SIZE_VARIABLE),
  thumbBackgroundColor: createToggleVar(TOGGLE_THUMB_BACKGROUND_COLOR_VARIABLE),
} as const;

const toggleSizeStyles: Record<ToggleSize, ToggleSizeStyle> = {
  small: {
    vars: {
      [toggleVars.trackWidth]: TOGGLE_SIZE_TOKENS.small.trackWidth,
      [toggleVars.trackHeight]: TOGGLE_SIZE_TOKENS.small.trackHeight,
      [toggleVars.trackPadding]: TOGGLE_SIZE_TOKENS.small.trackPadding,
      [toggleVars.thumbSize]: TOGGLE_SIZE_TOKENS.small.thumbSize,
    },
  },
  large: {
    vars: {
      [toggleVars.trackWidth]: TOGGLE_SIZE_TOKENS.large.trackWidth,
      [toggleVars.trackHeight]: TOGGLE_SIZE_TOKENS.large.trackHeight,
      [toggleVars.trackPadding]: TOGGLE_SIZE_TOKENS.large.trackPadding,
      [toggleVars.thumbSize]: TOGGLE_SIZE_TOKENS.large.thumbSize,
    },
  },
};

const toggleStateStyles: Record<ToggleState, ToggleStateStyle> = {
  unselected: {
    vars: {
      [toggleVars.trackBackgroundColor]:
        TOGGLE_STATE_TOKENS.unselected.trackBackgroundColor,
      [toggleVars.thumbBackgroundColor]:
        TOGGLE_STATE_TOKENS.unselected.thumbBackgroundColor,
    },
  },
  selected: {
    vars: {
      [toggleVars.trackBackgroundColor]:
        TOGGLE_STATE_TOKENS.selected.trackBackgroundColor,
      [toggleVars.thumbBackgroundColor]:
        TOGGLE_STATE_TOKENS.selected.thumbBackgroundColor,
    },
  },
  disabled: {
    vars: {
      [toggleVars.trackBackgroundColor]:
        TOGGLE_STATE_TOKENS.disabled.trackBackgroundColor,
      [toggleVars.thumbBackgroundColor]:
        TOGGLE_STATE_TOKENS.disabled.thumbBackgroundColor,
    },
  },
};

const focusVisibleStyle = {
  outline: `${TOGGLE_FOCUS_RING_WIDTH} solid ${colors.stroke.neutral.defaultFocused}`,
  outlineOffset: TOGGLE_FOCUS_RING_OFFSET,
};

const thumbCheckedTranslateX = `calc(${toggleVars.trackWidth} - ${toggleVars.thumbSize} - ${toggleVars.trackPadding} - ${toggleVars.trackPadding})`;

export const root = style({
  vars: {
    [toggleVars.trackWidth]: TOGGLE_SIZE_TOKENS.small.trackWidth,
    [toggleVars.trackHeight]: TOGGLE_SIZE_TOKENS.small.trackHeight,
    [toggleVars.trackPadding]: TOGGLE_SIZE_TOKENS.small.trackPadding,
    [toggleVars.thumbSize]: TOGGLE_SIZE_TOKENS.small.thumbSize,
    [toggleVars.trackBackgroundColor]:
      TOGGLE_STATE_TOKENS.unselected.trackBackgroundColor,
    [toggleVars.thumbBackgroundColor]:
      TOGGLE_STATE_TOKENS.unselected.thumbBackgroundColor,
  },
  appearance: "none",
  WebkitAppearance: "none",
  boxSizing: "border-box",
  position: "relative",
  display: "inline-flex",
  flexShrink: 0,
  alignItems: "center",
  width: toggleVars.trackWidth,
  height: toggleVars.trackHeight,
  margin: 0,
  padding: toggleVars.trackPadding,
  borderRadius: radius.full,
  backgroundColor: toggleVars.trackBackgroundColor,
  cursor: "pointer",
  WebkitTapHighlightColor: "transparent",
  transition: "background-color 150ms ease",
  selectors: {
    "&::before": {
      content: "",
      display: "block",
      width: toggleVars.thumbSize,
      height: toggleVars.thumbSize,
      borderRadius: radius.full,
      backgroundColor: toggleVars.thumbBackgroundColor,
      transform: "translateX(0)",
      transition:
        "background-color 150ms ease, transform 150ms ease, width 150ms ease, height 150ms ease",
    },
    "&:checked::before": {
      transform: `translateX(${thumbCheckedTranslateX})`,
    },
    /**
     * state priority
     * - disabled > selected > unselected
     */
    "&:checked:not(:disabled)": toggleStateStyles.selected,
    "&:disabled": {
      ...toggleStateStyles.disabled,
      cursor: "not-allowed",
    },
    "&:focus-visible": focusVisibleStyle,
  },
});

export const sizeVariants = styleVariants(toggleSizeStyles);
