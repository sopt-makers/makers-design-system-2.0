import type { Size } from "../type";

/** Action Button의 시각 위계를 결정합니다. */
export type ActionButtonVariant = "primary" | "secondary" | "danger";

/**
 * Action Button의 크기를 결정합니다.
 * - xsmall: 32px / small: 36px / medium: 46px / large: 56px
 * - 디자인상 `danger`는 xsmall을 제공하지 않습니다.
 */
export type ActionButtonSize = Extract<
  Size,
  "xsmall" | "small" | "medium" | "large"
>;

/** 인터랙션 상태. CSS 의사 클래스(:hover/:active/:disabled)로 적용됩니다. */
export type ActionButtonState = "default" | "hover" | "press" | "disabled";
