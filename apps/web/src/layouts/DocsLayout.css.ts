import { colors } from "@sopt-mds/design-tokens";
import { style } from "@vanilla-extract/css";

/**
 * 문서 사이트 셸. Figma 시안 기준 골격만 잡아둔 placeholder.
 * 이후 TopNavigation / Sidebar / Toc 영역을 각 영역 작업에서 채운다.
 *
 * Desktop(~1440): TopNav(64) + [Sidebar(230) | Article | Toc(188)]
 */
export const shell = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

export const topNav = style({
  display: "flex",
  alignItems: "center",
  height: 64,
  flexShrink: 0,
  paddingInline: 24,
  borderBottom: `1px solid ${colors.stroke.neutral.subtle}`,
  color: colors.fg.neutral.bold,
  fontWeight: 600,
});

export const body = style({
  display: "grid",
  gridTemplateColumns: "230px minmax(0, 1fr) 188px",
  flex: 1,
  width: "100%",
  maxWidth: 1440,
  marginInline: "auto",
});

export const sidebar = style({
  paddingBlock: 24,
  paddingInline: 24,
  borderRight: `1px solid ${colors.stroke.neutral.subtle}`,
  color: colors.fg.neutral.subtle,
});

export const article = style({
  minWidth: 0,
  paddingBlock: 40,
  paddingInline: 48,
});

export const toc = style({
  paddingBlock: 40,
  paddingInline: 16,
  color: colors.fg.neutral.subtle,
  fontSize: 13,
});

export const placeholderLabel = style({
  fontSize: 12,
  color: colors.fg.neutral.ghost,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
});
