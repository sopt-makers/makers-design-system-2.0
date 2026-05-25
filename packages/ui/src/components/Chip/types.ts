import type { Size } from "../type";

export type ChipSize = Extract<Size, "small" | "medium">;

export type ChipState = "default" | "hover" | "selected";
