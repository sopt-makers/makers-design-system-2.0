import { colors } from "@sopt-mds/design-tokens";
import {
  createVar,
  globalStyle,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import {
  TEXT_BUTTON_DISABLED_COLOR,
  TEXT_BUTTON_SIZE_TOKENS,
  TEXT_BUTTON_UNDERLINE_COLOR,
  TEXT_BUTTON_VARIANT_COLOR,
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
  boxSizing: "border-box",
  width: "fit-content",
  margin: 0,
  padding: 0,
  border: "none",
  // 밑줄 자리를 미리 예약해 hover 시 레이아웃 시프트를 방지합니다.
  borderBottom: "1px solid transparent",
  background: "transparent",
  appearance: "none",
  cursor: "pointer",
  fontFamily: "inherit",
  whiteSpace: "nowrap",
  userSelect: "none",
  transition: "color 150ms ease, border-color 150ms ease",
  selectors: {
    "&:not(:disabled):not([aria-disabled='true']):hover": {
      borderBottomColor: TEXT_BUTTON_UNDERLINE_COLOR,
    },
    "&:not(:disabled):not([aria-disabled='true']):active": {
      borderBottomColor: TEXT_BUTTON_UNDERLINE_COLOR,
    },
    "&:focus-visible": focusVisibleStyle,
    "&:disabled, &[aria-disabled='true']": {
      color: TEXT_BUTTON_DISABLED_COLOR,
      borderBottomColor: "transparent",
      cursor: "not-allowed",
    },
  },
});

export const sizeVariants = styleVariants(TEXT_BUTTON_SIZE_TOKENS, (token) => ({
  vars: {
    [iconSizeVar]: token.iconSize,
  },
  fontWeight: token.fontWeight,
  fontSize: token.fontSize,
  lineHeight: token.lineHeight,
  letterSpacing: token.letterSpacing,
}));

export const variantVariants = styleVariants(
  TEXT_BUTTON_VARIANT_COLOR,
  (color) => ({ color }),
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
