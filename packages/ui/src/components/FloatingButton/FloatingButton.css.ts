import { colors } from "@sopt-mds/design-tokens";
import {
  createVar,
  globalStyle,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import {
  FLOATING_BUTTON_BORDER_RADIUS,
  FLOATING_BUTTON_HEIGHT,
  FLOATING_BUTTON_MODE_TOKENS,
  FLOATING_BUTTON_STATE_TOKENS,
  FLOATING_BUTTON_TYPOGRAPHY,
} from "./constant";

/** 형태별 아이콘 크기. icon이 이 값을 참조합니다. */
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
  height: FLOATING_BUTTON_HEIGHT,
  margin: 0,
  border: "none",
  borderRadius: FLOATING_BUTTON_BORDER_RADIUS,
  overflow: "hidden",
  appearance: "none",
  cursor: "pointer",
  fontFamily: "inherit",
  whiteSpace: "nowrap",
  userSelect: "none",
  backgroundColor: FLOATING_BUTTON_STATE_TOKENS.default.backgroundColor,
  color: FLOATING_BUTTON_STATE_TOKENS.default.color,
  fontWeight: FLOATING_BUTTON_TYPOGRAPHY.fontWeight,
  fontSize: FLOATING_BUTTON_TYPOGRAPHY.fontSize,
  lineHeight: FLOATING_BUTTON_TYPOGRAPHY.lineHeight,
  letterSpacing: FLOATING_BUTTON_TYPOGRAPHY.letterSpacing,
  transition: "background-color 150ms ease, color 150ms ease",
  selectors: {
    "&:not(:disabled):not([aria-disabled='true']):hover": {
      backgroundColor: FLOATING_BUTTON_STATE_TOKENS.hover.backgroundColor,
      color: FLOATING_BUTTON_STATE_TOKENS.hover.color,
    },
    "&:not(:disabled):not([aria-disabled='true']):active": {
      backgroundColor: FLOATING_BUTTON_STATE_TOKENS.press.backgroundColor,
      color: FLOATING_BUTTON_STATE_TOKENS.press.color,
    },
    "&:focus-visible": focusVisibleStyle,
    "&:disabled, &[aria-disabled='true']": {
      backgroundColor: FLOATING_BUTTON_STATE_TOKENS.disabled.backgroundColor,
      color: FLOATING_BUTTON_STATE_TOKENS.disabled.color,
      cursor: "not-allowed",
    },
  },
});

export const modeVariants = styleVariants(
  FLOATING_BUTTON_MODE_TOKENS,
  (token) => ({
    vars: {
      [iconSizeVar]: token.iconSize,
    },
    paddingInline: token.paddingInline,
    paddingBlock: token.paddingBlock,
    gap: token.gap,
  }),
);

export const icon = style({
  display: "inline-flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  width: iconSizeVar,
  height: iconSizeVar,
  color: "currentColor",
});

// icon 내부 아이콘(svg)은 icon 크기를 채웁니다.
globalStyle(`${icon} > svg`, {
  width: "100%",
  height: "100%",
});

export const label = style({
  display: "inline-flex",
  alignItems: "center",
});
