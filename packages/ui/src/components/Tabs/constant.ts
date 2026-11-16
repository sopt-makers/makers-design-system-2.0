import { colors, spacing, typography } from "@sopt-mds/design-tokens";
import type { TabsSize, TabsVariant } from "./types";

/**
 * Trigger 높이 = 라벨 line-height + Tab Contents 세로 패딩(s6 × 2) + 2px.
 * Figma는 50 / 44 / 38 고정값이지만 대응 토큰이 없어 위 규칙으로 파생한다.
 */
function triggerHeight(lineHeight: string) {
  return `calc(${lineHeight} + ${spacing.s6} * 2 + ${spacing.s2})`;
}

export const TABS_SIZE_TOKENS = {
  large: {
    ...typography.heading2,
    height: triggerHeight(typography.heading2.lineHeight),
  },
  medium: {
    ...typography.heading3,
    height: triggerHeight(typography.heading3.lineHeight),
  },
  small: {
    ...typography.heading4,
    height: triggerHeight(typography.heading4.lineHeight),
  },
} as const satisfies Record<TabsSize, object>;

export const TABS_VARIANT_TOKENS = {
  /** Trigger padding s8 + Tab Contents padding s16. 인디케이터는 Trigger padding(s8) 안쪽 폭. */
  fill: {
    paddingInline: `calc(${spacing.s8} + ${spacing.s16})`,
    indicatorInset: spacing.s8,
  },
  /** 인디케이터는 Tab Contents(라벨 + Tag) 폭. */
  hug: {
    paddingInline: spacing.s10,
    indicatorInset: spacing.s10,
  },
} as const satisfies Record<TabsVariant, object>;

export const TABS_COLORS = {
  label: colors.fg.neutral.ghost,
  labelSelected: colors.fg.neutral.bold,
  labelDisabled: colors.fg.neutral.ghostDisabled,
  indicator: colors.stroke.neutral.inverse,
  divider: colors.stroke.neutral.ghost,
  focusRing: colors.stroke.neutral.defaultFocused,
} as const;

/** 인디케이터와 divider 두께. */
export const TABS_LINE_WIDTH = spacing.s2;
