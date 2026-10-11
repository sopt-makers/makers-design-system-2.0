import { colors, radius, spacing, typography } from "@sopt-mds/design-tokens";
import { keyframes, style, styleVariants } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: spacing.s14,
  boxSizing: "border-box",
  width: "100%",
  minHeight: 48,
  padding: `${spacing.s14} ${spacing.s16}`,
  borderRadius: radius.r14,
  background: colors.bg.neutral.inverse,
});

export const content = style({
  display: "flex",
  alignItems: "center",
  gap: spacing.s8,
  flex: "1 0 0",
  minWidth: 0,
});

export const icon = style({
  flexShrink: 0,
  width: 20,
  height: 20,
});

export const iconVariant = styleVariants({
  success: { color: colors.fg.success.default },
  alert: { color: colors.fg.attention.default },
  error: { color: colors.fg.danger.default },
});

export const label = style({
  flex: "1 0 0",
  minWidth: 0,
  margin: 0,
  color: colors.fg.neutral.inverse,
  wordBreak: "break-word",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  ...typography.label3,
});

export const action = style({
  flexShrink: 0,
  selectors: {
    [`${container} &`]: {
      color: colors.fg.secondary.default,
    },
  },
});

export const viewport = style({
  position: "fixed",
  top: "calc(env(safe-area-inset-top, 0px) + 16px)",
  left: 20,
  right: 20,
  zIndex: 1000,
  "@media": {
    "(min-width: 768px)": {
      top: "calc(env(safe-area-inset-top, 0px) + 36px)",
      left: 0,
      right: 0,
      width: 380,
      marginInline: "auto",
    },
  },
});

const SLIDE_OFFSET = "-16px";

const enter = keyframes({
  from: { opacity: 0, transform: `translateY(${SLIDE_OFFSET})` },
  to: { opacity: 1, transform: "translateY(0)" },
});

const exit = keyframes({
  from: { opacity: 1, transform: "translateY(0)" },
  to: { opacity: 0, transform: `translateY(${SLIDE_OFFSET})` },
});

// 큐 진행이 animationend에 묶여 있어 reduced-motion에서도 animation을 끄지 않고 1ms로 줄임
const reducedMotion = {
  "@media": {
    "(prefers-reduced-motion: reduce)": { animationDuration: "1ms" },
  },
} as const;

export const motion = styleVariants({
  enter: { animation: `${enter} 250ms ease-out both`, ...reducedMotion },
  display: {},
  exit: { animation: `${exit} 200ms ease-in forwards`, ...reducedMotion },
});
