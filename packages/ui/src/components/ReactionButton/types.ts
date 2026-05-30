import type { Size } from "../type";

/**
 * Reaction Button의 크기를 결정합니다.
 * - xsmall: 배경/테두리 없는 bare 형태
 * - small / medium / large: pill 형태
 */
export type ReactionButtonSize = Extract<
  Size,
  "xsmall" | "small" | "medium" | "large"
>;
