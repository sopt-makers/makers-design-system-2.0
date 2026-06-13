import { style, styleVariants } from "@vanilla-extract/css";
import { RADIO_GROUP_GAP } from "./constant";

export const groupRoot = style({
  display: "flex",
  gap: RADIO_GROUP_GAP,
});

export const orientationVariants = styleVariants({
  vertical: { flexDirection: "column" },
  horizontal: { flexDirection: "row", alignItems: "center" },
});
