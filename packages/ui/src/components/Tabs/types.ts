import type { Size } from "../type";

export type TabsSize = Extract<Size, "small" | "medium" | "large">;

/**
 * Tabs와 Tab의 짝을 함께 결정합니다. (Figma의 Tabs Variant × Tab Variant 축)
 *
 * - `fill`: Fixed Tabs + Fill Tab. 탭이 영역 너비를 균등 분할합니다.
 * - `hug`: Scrollable Tabs + Hug Tab. 탭이 내용 폭을 갖고, 넘치면 가로 스크롤됩니다.
 */
export type TabsVariant = "fill" | "hug";
