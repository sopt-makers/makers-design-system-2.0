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
  left: [titleSlotBase, { gap: spacing.s40, overflow: "hidden" }],
});

export const logo = style({
  display: "flex",
  flexShrink: 0,
});

// 넘치는 지점의 메뉴에 말줄임이 붙도록 한 줄 인라인 흐름으로 배치
export const menu = style({
  ...typography.title5,
  minWidth: 0,
  padding: spacing.s4,
  margin: `calc(-1 * ${spacing.s4})`,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: ["ellipsis", '"..."'],
  color: colors.fg.neutral.subtle,
});

export const menuItem = style({
  color: "inherit",
  textDecoration: "none",
  selectors: {
    "&:not(:first-child)": { marginInlineStart: spacing.s16 },
    '&[aria-current="page"]': { color: colors.fg.neutral.bold },
    "&:focus-visible": focusVisibleStyle,
  },
});

export const menuDivider = style({
  display: "inline-block",
  verticalAlign: "top",
  width: "1px",
  height: "17px",
  marginTop: "3.5px",
  marginInlineStart: `calc(${spacing.s16} - 0.5px)`,
  marginInlineEnd: "-0.5px",
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
