/** 인터랙션 상태. CSS 의사 클래스(:hover/:active/:disabled)로 적용됩니다. */
export type FloatingButtonState = "default" | "hover" | "press" | "disabled";

/**
 * 콘텐츠 형태.
 * - iconOnly: 아이콘만 있는 기본 FAB 형태.
 * - withLabel: 아이콘 + 라벨 텍스트가 있는 확장 형태.
 */
export type FloatingButtonMode = "iconOnly" | "withLabel";
