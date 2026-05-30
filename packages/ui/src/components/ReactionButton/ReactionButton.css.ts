import { colors, radius } from "@sopt-mds/design-tokens";
import {
  createVar,
  globalStyle,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import {
  REACTION_BUTTON_PILL,
  REACTION_BUTTON_SIZE_TOKENS,
  REACTION_BUTTON_TEXT_COLOR,
} from "./constant";

/** size별 아이콘 크기. addon이 이 값을 참조합니다. */
const iconSizeVar = createVar();

const focusVisibleStyle = {
  outline: `2px solid ${colors.stroke.neutral.defaultFocused}`,
  outlineOffset: "2px",
};

export const base = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  width: "fit-content",
  margin: 0,
  borderStyle: "solid",
  borderWidth: 0,
  borderColor: "transparent",
  background: "transparent",
  appearance: "none",
  cursor: "pointer",
  fontFamily: "inherit",
  whiteSpace: "nowrap",
  userSelect: "none",
  color: REACTION_BUTTON_TEXT_COLOR.unselected,
  transition:
    "background-color 150ms ease, border-color 150ms ease, color 150ms ease",
  selectors: {
    "&[aria-pressed='true']:not(:disabled):not([aria-disabled='true'])": {
      color: REACTION_BUTTON_TEXT_COLOR.selected,
    },
    "&:focus-visible": focusVisibleStyle,
    "&:disabled, &[aria-disabled='true']": {
      color: REACTION_BUTTON_TEXT_COLOR.disabled,
      cursor: "not-allowed",
    },
  },
});

/** pill(small/medium/large) 형태에만 적용되는 배경/테두리. */
export const pill = style({
  borderWidth: 1,
  borderColor: REACTION_BUTTON_PILL.borderColor,
  borderRadius: radius.full,
  backgroundColor: REACTION_BUTTON_PILL.background,
  selectors: {
    "&:not(:disabled):not([aria-disabled='true']):hover": {
      borderColor: REACTION_BUTTON_PILL.borderColorHover,
    },
    "&:disabled, &[aria-disabled='true']": {
      backgroundColor: REACTION_BUTTON_PILL.backgroundDisabled,
      borderColor: REACTION_BUTTON_PILL.borderColorDisabled,
    },
  },
});

export const sizeVariants = styleVariants(
  REACTION_BUTTON_SIZE_TOKENS,
  (token) => ({
    vars: {
      [iconSizeVar]: token.iconSize,
    },
    height: token.height,
    paddingInline: token.paddingInline,
    paddingBlock: token.paddingBlock,
    gap: token.gap,
    fontWeight: token.fontWeight,
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
    letterSpacing: token.letterSpacing,
  }),
);

export const addon = style({
  display: "inline-flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  width: iconSizeVar,
  height: iconSizeVar,
  color: "currentColor",
});

// addon 내부 아이콘(svg)은 addon 크기를 채웁니다.
globalStyle(`${addon} > svg`, {
  width: "100%",
  height: "100%",
});

export const text = style({
  display: "inline-flex",
  alignItems: "center",
});
