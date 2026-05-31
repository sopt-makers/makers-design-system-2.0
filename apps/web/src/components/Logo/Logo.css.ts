import { colors, typography } from "@sopt-mds/design-tokens";
import { style } from "@vanilla-extract/css";

export const logo = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  color: colors.fg.neutral.bold,
});

export const wordmark = style({
  ...typography.label1,
  whiteSpace: "nowrap",
});
