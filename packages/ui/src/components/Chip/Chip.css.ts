import { colors, radius } from "@sopt-mds/design-tokens";
import { createGlobalVar, style, styleVariants } from "@vanilla-extract/css";
import { CHIP_SIZE_TOKENS, CHIP_STATE_TOKENS } from "./constant";
import type { ChipSize, ChipState } from "./types";

/*
 * Chip CSS variables
 * --mds-chip-* 값을 컴포넌트 외부에서 오버라이드할 수 있습니다.
 */
const CHIP_BACKGROUND_COLOR_VARIABLE = "--mds-chip-background-color";
const CHIP_COLOR_VARIABLE = "--mds-chip-color";
const CHIP_BORDER_WIDTH_VARIABLE = "--mds-chip-border-width";
const CHIP_BORDER_COLOR_VARIABLE = "--mds-chip-border-color";
const CHIP_FONT_WEIGHT_VARIABLE = "--mds-chip-font-weight";
const CHIP_FONT_SIZE_VARIABLE = "--mds-chip-font-size";
const CHIP_LINE_HEIGHT_VARIABLE = "--mds-chip-line-height";
const CHIP_LETTER_SPACING_VARIABLE = "--mds-chip-letter-spacing";
const CHIP_PADDING_BLOCK_VARIABLE = "--mds-chip-padding-block";
const CHIP_PADDING_INLINE_VARIABLE = "--mds-chip-padding-inline";
const CHIP_HEIGHT_VARIABLE = "--mds-chip-height";
const CHIP_GAP_VARIABLE = "--mds-chip-gap";

type ChipCssVariableName =
  | typeof CHIP_BACKGROUND_COLOR_VARIABLE
  | typeof CHIP_COLOR_VARIABLE
  | typeof CHIP_BORDER_WIDTH_VARIABLE
  | typeof CHIP_BORDER_COLOR_VARIABLE
  | typeof CHIP_FONT_WEIGHT_VARIABLE
  | typeof CHIP_FONT_SIZE_VARIABLE
  | typeof CHIP_LINE_HEIGHT_VARIABLE
  | typeof CHIP_LETTER_SPACING_VARIABLE
  | typeof CHIP_PADDING_BLOCK_VARIABLE
  | typeof CHIP_PADDING_INLINE_VARIABLE
  | typeof CHIP_HEIGHT_VARIABLE
  | typeof CHIP_GAP_VARIABLE;

type ChipCssVar<Name extends ChipCssVariableName> = `var(${Name})`;
type ChipStateVar =
  | typeof chipVars.backgroundColor
  | typeof chipVars.color
  | typeof chipVars.borderWidth
  | typeof chipVars.borderColor;
type ChipSizeVar =
  | typeof chipVars.fontWeight
  | typeof chipVars.fontSize
  | typeof chipVars.lineHeight
  | typeof chipVars.letterSpacing
  | typeof chipVars.paddingBlock
  | typeof chipVars.paddingInline
  | typeof chipVars.height
  | typeof chipVars.gap;

type ChipStateStyle = {
  vars: Record<ChipStateVar, string>;
};

type ChipSizeStyle = {
  vars: Record<ChipSizeVar, string>;
};

function createChipVar<Name extends ChipCssVariableName>(
  name: Name,
): ChipCssVar<Name> {
  return createGlobalVar(name.slice(2)) as ChipCssVar<Name>;
}

export const chipVars = {
  backgroundColor: createChipVar(CHIP_BACKGROUND_COLOR_VARIABLE),
  color: createChipVar(CHIP_COLOR_VARIABLE),
  borderWidth: createChipVar(CHIP_BORDER_WIDTH_VARIABLE),
  borderColor: createChipVar(CHIP_BORDER_COLOR_VARIABLE),
  fontWeight: createChipVar(CHIP_FONT_WEIGHT_VARIABLE),
  fontSize: createChipVar(CHIP_FONT_SIZE_VARIABLE),
  lineHeight: createChipVar(CHIP_LINE_HEIGHT_VARIABLE),
  letterSpacing: createChipVar(CHIP_LETTER_SPACING_VARIABLE),
  paddingBlock: createChipVar(CHIP_PADDING_BLOCK_VARIABLE),
  paddingInline: createChipVar(CHIP_PADDING_INLINE_VARIABLE),
  height: createChipVar(CHIP_HEIGHT_VARIABLE),
  gap: createChipVar(CHIP_GAP_VARIABLE),
} as const;

const chipStateStyles: Record<ChipState, ChipStateStyle> = {
  default: {
    vars: {
      [chipVars.backgroundColor]: CHIP_STATE_TOKENS.default.backgroundColor,
      [chipVars.color]: CHIP_STATE_TOKENS.default.color,
      [chipVars.borderWidth]: CHIP_STATE_TOKENS.default.borderWidth,
      [chipVars.borderColor]: CHIP_STATE_TOKENS.default.borderColor,
    },
  },
  hover: {
    vars: {
      [chipVars.backgroundColor]: CHIP_STATE_TOKENS.hover.backgroundColor,
      [chipVars.color]: CHIP_STATE_TOKENS.hover.color,
      [chipVars.borderWidth]: CHIP_STATE_TOKENS.hover.borderWidth,
      [chipVars.borderColor]: CHIP_STATE_TOKENS.hover.borderColor,
    },
  },
  selected: {
    vars: {
      [chipVars.backgroundColor]: CHIP_STATE_TOKENS.selected.backgroundColor,
      [chipVars.color]: CHIP_STATE_TOKENS.selected.color,
      [chipVars.borderWidth]: CHIP_STATE_TOKENS.selected.borderWidth,
      [chipVars.borderColor]: CHIP_STATE_TOKENS.selected.borderColor,
    },
  },
  /**
   * disabled: {
    vars: {
      [chipVars.backgroundColor]: CHIP_STATE_TOKENS.disabled.backgroundColor,
      [chipVars.color]: CHIP_STATE_TOKENS.disabled.color,
      [chipVars.borderWidth]: CHIP_STATE_TOKENS.disabled.borderWidth,
      [chipVars.borderColor]: CHIP_STATE_TOKENS.disabled.borderColor,
    },
  },
   */
};

const chipSizeStyles: Record<ChipSize, ChipSizeStyle> = {
  small: {
    vars: {
      [chipVars.fontWeight]: CHIP_SIZE_TOKENS.small.fontWeight,
      [chipVars.fontSize]: CHIP_SIZE_TOKENS.small.fontSize,
      [chipVars.lineHeight]: CHIP_SIZE_TOKENS.small.lineHeight,
      [chipVars.letterSpacing]: CHIP_SIZE_TOKENS.small.letterSpacing,
      [chipVars.paddingBlock]: CHIP_SIZE_TOKENS.small.paddingBlock,
      [chipVars.paddingInline]: CHIP_SIZE_TOKENS.small.paddingInline,
      [chipVars.height]: CHIP_SIZE_TOKENS.small.height,
      [chipVars.gap]: CHIP_SIZE_TOKENS.small.gap,
    },
  },
  medium: {
    vars: {
      [chipVars.fontWeight]: CHIP_SIZE_TOKENS.medium.fontWeight,
      [chipVars.fontSize]: CHIP_SIZE_TOKENS.medium.fontSize,
      [chipVars.lineHeight]: CHIP_SIZE_TOKENS.medium.lineHeight,
      [chipVars.letterSpacing]: CHIP_SIZE_TOKENS.medium.letterSpacing,
      [chipVars.paddingBlock]: CHIP_SIZE_TOKENS.medium.paddingBlock,
      [chipVars.paddingInline]: CHIP_SIZE_TOKENS.medium.paddingInline,
      [chipVars.height]: CHIP_SIZE_TOKENS.medium.height,
      [chipVars.gap]: CHIP_SIZE_TOKENS.medium.gap,
    },
  },
};

const focusVisibleStyle = {
  outline: `2px solid ${colors.stroke.neutral.defaultFocused}`,
  outlineOffset: "2px",
};

export const base = style({
  vars: {
    [chipVars.backgroundColor]: CHIP_STATE_TOKENS.default.backgroundColor,
    [chipVars.color]: CHIP_STATE_TOKENS.default.color,
    [chipVars.borderWidth]: CHIP_STATE_TOKENS.default.borderWidth,
    [chipVars.borderColor]: CHIP_STATE_TOKENS.default.borderColor,
    [chipVars.fontWeight]: CHIP_SIZE_TOKENS.medium.fontWeight,
    [chipVars.fontSize]: CHIP_SIZE_TOKENS.medium.fontSize,
    [chipVars.lineHeight]: CHIP_SIZE_TOKENS.medium.lineHeight,
    [chipVars.letterSpacing]: CHIP_SIZE_TOKENS.medium.letterSpacing,
    [chipVars.paddingBlock]: CHIP_SIZE_TOKENS.medium.paddingBlock,
    [chipVars.paddingInline]: CHIP_SIZE_TOKENS.medium.paddingInline,
    [chipVars.height]: CHIP_SIZE_TOKENS.medium.height,
    [chipVars.gap]: CHIP_SIZE_TOKENS.medium.gap,
  },
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  width: "fit-content",
  height: chipVars.height,
  margin: 0,
  paddingBlock: chipVars.paddingBlock,
  paddingInline: chipVars.paddingInline,
  border: "none",
  borderRadius: radius.full,
  backgroundColor: chipVars.backgroundColor,
  boxShadow: `inset 0 0 0 ${chipVars.borderWidth} ${chipVars.borderColor}`,
  color: chipVars.color,
  appearance: "none",
  cursor: "pointer",
  fontFamily: "inherit",
  fontWeight: chipVars.fontWeight,
  fontSize: chipVars.fontSize,
  lineHeight: chipVars.lineHeight,
  letterSpacing: chipVars.letterSpacing,
  gap: chipVars.gap,
  whiteSpace: "nowrap",
  userSelect: "none",
  transition:
    "background-color 150ms ease, box-shadow 150ms ease, color 150ms ease",
  selectors: {
    "&:not(:disabled):not([aria-disabled='true']):not([data-selected='true']):not(:has(input:checked)):hover":
      chipStateStyles.hover,
    "&[data-selected='true']": chipStateStyles.selected,
    "&:has(input:checked)": chipStateStyles.selected,
    "&:focus-visible": focusVisibleStyle,
    "&:has(input:focus-visible)": focusVisibleStyle,

    "&:disabled, &[aria-disabled='true']": {
      /**...chipStateStyles.disabled, */
      cursor: "not-allowed",
    },
  },
});

export const sizeVariants = styleVariants(chipSizeStyles);

export const stateVariants = styleVariants(chipStateStyles);

export const addon = style({
  zIndex: 1,
  display: "inline-flex",
  flexShrink: 0,
  color: "currentColor",
});

export const content = style({
  zIndex: 1,
});

export const input = style({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  margin: 0,
  opacity: 0,
  cursor: "pointer",

  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
    },
  },
});
