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
  // hover/press 밑줄이 사라지면서(2026-07-26 디자인 QA) 자리를 예약하던
  // `border-bottom: 1px solid transparent`도 함께 걷어냈다. 남겨 두면 아무 역할 없이
  // 렌더 높이만 1px 늘린다(height 미지정 + padding 0이라 border-box가 흡수하지 못한다).
  border: "none",
  background: "transparent",
  appearance: "none",
  cursor: "pointer",
  fontFamily: "inherit",
  whiteSpace: "nowrap",
  userSelect: "none",
  transition: "color 150ms ease",
  selectors: {
    "&:focus-visible": focusVisibleStyle,
    "&:disabled, &[aria-disabled='true']": {
      color: TEXT_BUTTON_DISABLED_COLOR,
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
