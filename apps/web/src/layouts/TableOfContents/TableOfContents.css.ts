import { colors, spacing, typography } from "@sopt-mds/design-tokens";
import { style } from "@vanilla-extract/css";

export const tableOfContents = style({
  display: "flex",
  flexDirection: "column",
  gap: spacing.s12,
  paddingTop: spacing.s48,
  paddingBottom: spacing.s8,
  width: "100%",
});

export const title = style({
  ...typography.label3,
  margin: 0,
  color: colors.fg.neutral.ghost,
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: spacing.s4,
  margin: 0,
  padding: 0,
  width: "100%",
  listStyle: "none",
});

export const link = style({
  ...typography.label3,
  display: "block",
  paddingBlock: spacing.s4,
  color: colors.fg.neutral.subtle,
  transition: "color 150ms ease",
  selectors: {
    // hover = selected (디자이너 어노테이션)
    "&:hover": {
      color: colors.fg.neutral.bold,
    },
  },
});

export const linkActive = style({
  color: colors.fg.neutral.bold,
});
