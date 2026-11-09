import { colors, radius, spacing, typography } from "@sopt-mds/design-tokens";
import { style, styleVariants } from "@vanilla-extract/css";

const focusVisibleStyle = {
  outline: `2px solid ${colors.stroke.neutral.defaultFocused}`,
  outlineOffset: "2px",
};

const buttonReset = {
  margin: 0,
  border: "none",
  background: "none",
  appearance: "none",
  cursor: "pointer",
  fontFamily: "inherit",
  color: "inherit",
} as const;

export const base = style({
  display: "flex",
  alignItems: "center",
  gap: spacing.s20,
  boxSizing: "border-box",
  width: "100%",
  paddingBlock: spacing.s4,
  paddingInline: spacing.s12,
  backgroundColor: colors.bg.layer.basement,
  color: colors.fg.neutral.bold,
});

export const sizeVariants = styleVariants({
  sm: { height: "56px" },
  md: { height: "64px" },
});

// md + left 조합에서만 좌우 패딩이 20px로 넓어짐
export const leftLayout = style({
  paddingInline: spacing.s20,
});

export const menuButton = style({
  ...buttonReset,
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  padding: spacing.s8,
  selectors: {
    "&:focus-visible": focusVisibleStyle,
  },
});

const titleSlotBase = style({
  display: "flex",
  flex: "1 0 0",
  alignItems: "center",
  minWidth: "1px",
  height: "100%",
});

export const titleSlotVariants = styleVariants({
  center: [titleSlotBase, { justifyContent: "center", overflow: "hidden" }],
  left: [titleSlotBase, { gap: spacing.s40 }],
});

export const logo = style({
  display: "flex",
  flexShrink: 0,
});

export const menu = style({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  gap: spacing.s16,
});

export const menuItem = style({
  ...typography.title5,
  color: colors.fg.neutral.subtle,
  textDecoration: "none",
  whiteSpace: "nowrap",
  selectors: {
    '&[aria-current="page"]': { color: colors.fg.neutral.bold },
    "&:focus-visible": focusVisibleStyle,
  },
});

export const menuDivider = style({
  flexShrink: 0,
  width: "1px",
  height: "17px",
  marginInline: "-0.5px",
  borderRadius: radius.full,
  backgroundColor: colors.stroke.neutral.default,
});

const rightSlotBase = style({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  height: "100%",
});

export const rightSlotVariants = styleVariants({
  center: [rightSlotBase, { width: "40px" }],
  left: [rightSlotBase, { width: "112px" }],
});

export const avatarButton = style({
  ...buttonReset,
  display: "flex",
  padding: 0,
  borderRadius: radius.full,
  selectors: {
    "&:focus-visible": focusVisibleStyle,
  },
});

export const profileButton = style({
  ...buttonReset,
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
  width: "112px",
  height: "38px",
  paddingLeft: spacing.s4,
  paddingRight: spacing.s8,
  borderRadius: radius.full,
  backgroundColor: colors.bg.layer.default,
  selectors: {
    "&:focus-visible": focusVisibleStyle,
  },
});

export const profileName = style({
  width: "64px",
  overflow: "hidden",
  textAlign: "center",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  ...typography.label3,
});
