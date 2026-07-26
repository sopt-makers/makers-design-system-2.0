import type { Size } from "../type";

export type TagVariant = "default" | "primary" | "secondary";

export type TagShape = "pill" | "rect";

export type TagType = "solid" | "subtle";

export type TagSize = Extract<Size, "small" | "medium">;
