import type { Size } from "../type";

export type ToggleSize = Extract<Size, "small" | "large">;

export type ToggleState = "selected" | "unselected" | "disabled";
