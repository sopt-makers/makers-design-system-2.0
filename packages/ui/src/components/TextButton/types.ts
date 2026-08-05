import type { Size } from "../type";

/**
 * Text Button의 강조 수준을 결정합니다.
 * - default: 기본 텍스트 색.
 * - emphasis: 더 밝은 강조 텍스트 색.
 */
export type TextButtonVariant = "default" | "emphasis";

/** Text Button의 크기를 결정합니다. small(12px) / medium(14px) */
export type TextButtonSize = Extract<Size, "small" | "medium">;
