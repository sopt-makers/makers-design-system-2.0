import { colors, radius, spacing, typography } from "@sopt-mds/design-tokens";
import type { SearchFieldVariant } from "./types";

export const FIELD_CONTAINER_TOKENS = {
  paddingBlock: spacing.s10,
  paddingInline: spacing.s14,
  gap: spacing.s8,
  borderRadius: radius.r10,
  /** 포커스 보더  */
  focusBorderColor: colors.stroke.neutral.defaultFocused,
} as const;

/** 입력 텍스트 공통 토큰 — body1 + 캐럿(brand orange)/placeholder 색. */
export const FIELD_INPUT_TOKENS = {
  ...typography.body1,
  fontWeight: `${typography.body1.fontWeight}`,
  color: colors.fg.neutral.bold,
  caretColor: colors.base.orange400,
  placeholderColor: colors.fg.neutral.ghost,
} as const;

/** 포커스 보더 두께 — 전용 토큰 부재로 리터럴 (Checkbox 관례와 동일). */
export const FIELD_FOCUS_BORDER_WIDTH = "1px";

export type SearchFieldVariantToken = {
  backgroundColor: string;
};

/** variant별 배경 — default는 layer 표면 위, ghost는 기본 표면 위에 놓일 때. */
export const SEARCH_FIELD_VARIANT_TOKENS: Record<
  SearchFieldVariant,
  SearchFieldVariantToken
> = {
  default: {
    backgroundColor: colors.bg.layer.default,
  },
  ghost: {
    backgroundColor: colors.bg.neutral.ghost,
  },
};

/** 검색/클리어 아이콘 크기·색 */
export const SEARCH_FIELD_ICON_SIZE = spacing.s20;
export const SEARCH_FIELD_SEARCH_ICON_COLOR = colors.fg.neutral.default;
export const SEARCH_FIELD_CLEAR_ICON_COLOR = colors.fg.neutral.bold;
