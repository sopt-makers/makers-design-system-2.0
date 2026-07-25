import type { Size } from "../type";

export type ChipSize = Extract<Size, "small" | "medium">;

export type ChipType = "outlined" | "solid";

export type ChipState = "default" | "hover" | "selected" | "disabled";
