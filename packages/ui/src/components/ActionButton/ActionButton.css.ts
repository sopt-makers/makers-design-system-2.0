import { colors } from "@sopt-mds/design-tokens";
import {
  createVar,
  globalStyle,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import {
  ACTION_BUTTON_SIZE_TOKENS,
  ACTION_BUTTON_VARIANT_STATE_TOKENS,
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
  border: "none",
  overflow: "hidden",
  appearance: "none",
  cursor: "pointer",
  fontFamily: "inherit",
  whiteSpace: "nowrap",
  userSelect: "none",
  transition: "background-color 150ms ease, color 150ms ease",
  selectors: {
    "&:focus-visible": focusVisibleStyle,
    "&:disabled, &[aria-disabled='true']": {
      cursor: "not-allowed",
    },
  },
});

export const sizeVariants = styleVariants(
  ACTION_BUTTON_SIZE_TOKENS,
  (token) => ({
    vars: {
      [iconSizeVar]: token.iconSize,
    },
    height: token.height,
    paddingInline: token.paddingInline,
    paddingBlock: token.paddingBlock,
    borderRadius: token.borderRadius,
    gap: token.gap,
    fontWeight: token.fontWeight,
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
    letterSpacing: token.letterSpacing,
  }),
);

export const variantVariants = styleVariants(
  ACTION_BUTTON_VARIANT_STATE_TOKENS,
  (states) => ({
    backgroundColor: states.default.backgroundColor,
    color: states.default.color,
    selectors: {
      "&:not(:disabled):not([aria-disabled='true']):hover": {
        backgroundColor: states.hover.backgroundColor,
        color: states.hover.color,
      },
      "&:not(:disabled):not([aria-disabled='true']):active": {
        backgroundColor: states.press.backgroundColor,
        color: states.press.color,
      },
      "&:disabled, &[aria-disabled='true']": {
        backgroundColor: states.disabled.backgroundColor,
        color: states.disabled.color,
      },
    },
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
