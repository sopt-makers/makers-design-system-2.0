import { radius, spacing, typography } from "@sopt-mds/design-tokens";
import { style, styleVariants } from "@vanilla-extract/css";
import { TAG_COLOR_STYLE_VARIANT, TAG_HEIGHT_FOR_SIZE } from "./constant";

export const base = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  border: "none",
  fontFamily: "inherit",
  whiteSpace: "nowrap",
});

export const shapeVariants = styleVariants({
  pill: { borderRadius: radius.full },
  rect: { borderRadius: radius.r4 },
});

export const sizeVariants = styleVariants({
  small: {
    ...typography.label4,
    paddingInline: spacing.s8,
    height: TAG_HEIGHT_FOR_SIZE.small,
    gap: spacing.s2,
  },
  medium: {
    ...typography.label3,
    paddingInline: spacing.s8,
    height: TAG_HEIGHT_FOR_SIZE.medium,
    gap: spacing.s2,
  },
  large: {
    ...typography.label2,
    paddingInline: spacing.s10,
    height: TAG_HEIGHT_FOR_SIZE.large,
    gap: spacing.s4,
  },
});

export const tagColorStyleVariants = styleVariants(TAG_COLOR_STYLE_VARIANT);
