import { colors, radius, spacing, typography } from "@sopt-mds/design-tokens";
import type { TextFieldVariant } from "./types";

/** 입력 컨테이너 — Figma node 1223:1355 실측 (높이 46 = 10 + 26 + 10). */
export const TEXT_FIELD_CONTAINER_TOKENS = {
  paddingBlock: spacing.s10,
  paddingInline: spacing.s16,
  borderRadius: radius.r10,
} as const;

/** 세로 스택 간격과 부속 요소 치수 — Figma node 1223:1349 실측. */
export const TEXT_FIELD_LAYOUT_TOKENS = {
  rootGap: spacing.s10,
  fieldGap: spacing.s6,
  labelBlockGap: spacing.s2,
  labelBlockPaddingInline: spacing.s2,
  labelGap: spacing.s4,
  helperPaddingInline: spacing.s2,
  helperGap: spacing.s20,
  /** Figma는 헬퍼 행 높이를 16으로 고정하지만 body3 line-height가 18이라 최소 높이로 둔다. */
  helperMinHeight: spacing.s16,
  errorGap: spacing.s4,
  errorIconSize: spacing.s14,
} as const;

/** 보더 두께 — 전용 토큰 부재로 리터럴 (Checkbox·SearchField 관례와 동일). */
export const TEXT_FIELD_BORDER_WIDTH = "1px";

/** 보더 색. error > focus > none 순으로 덮인다. */
export const TEXT_FIELD_BORDER_TOKENS = {
  none: "transparent",
  focus: colors.stroke.neutral.defaultFocused,
  error: colors.stroke.danger.default,
} as const;

/** 입력 텍스트 — body1 + 캐럿(brand)/placeholder 색. */
export const TEXT_FIELD_INPUT_TOKENS = {
  ...typography.body1,
  fontWeight: `${typography.body1.fontWeight}`,
  color: colors.fg.neutral.bold,
  caretColor: colors.fg.brand.default,
  placeholderColor: colors.fg.neutral.ghost,
} as const;

export const TEXT_FIELD_LABEL_TOKENS = {
  ...typography.title5,
  fontWeight: `${typography.title5.fontWeight}`,
  color: colors.fg.neutral.bold,
} as const;

/** 필수 표시 별표 — 라벨보다 한 단계 큰 title4. */
export const TEXT_FIELD_REQUIRED_TOKENS = {
  ...typography.title4,
  fontWeight: `${typography.title4.fontWeight}`,
  color: colors.fg.brand.default,
} as const;

export const TEXT_FIELD_DESCRIPTION_TOKENS = {
  ...typography.body2,
  fontWeight: `${typography.body2.fontWeight}`,
  color: colors.fg.neutral.default,
} as const;

/** 헬퍼·카운터·에러 메시지 공통 타이포. 카운터는 error일 때도 기본 색을 유지한다. */
export const TEXT_FIELD_HELPER_TOKENS = {
  ...typography.body3,
  fontWeight: `${typography.body3.fontWeight}`,
  color: colors.fg.neutral.ghost,
  disabledColor: colors.fg.neutral.ghostDisabled,
  errorColor: colors.fg.danger.default,
} as const;

export type TextFieldVariantToken = {
  backgroundColor: string;
  disabledPlaceholderColor: string;
};

/**
 * variant별 배경 — default는 layer 표면 위, bold는 기본 표면 위에 놓일 때.
 * bold의 배경은 이름과 달리 bg.neutral.ghost다. 디자인이 variant명만 Ghost→Bold로
 * 바꾼 것이고 색은 그대로라, 토큰 스케일(bold > default > subtle > ghost)과 어긋난다.
 * bold의 disabled placeholder는 Figma상 일반 placeholder와 값이 같아 흐려지지 않는다.
 */
export const TEXT_FIELD_VARIANT_TOKENS: Record<
  TextFieldVariant,
  TextFieldVariantToken
> = {
  default: {
    backgroundColor: colors.bg.layer.default,
    disabledPlaceholderColor: colors.fg.neutral.ghostDisabled,
  },
  bold: {
    backgroundColor: colors.bg.neutral.ghost,
    disabledPlaceholderColor: colors.fg.neutral.defaultDisabled,
  },
};
