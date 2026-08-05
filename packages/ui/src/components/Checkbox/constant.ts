import { colors, radius, spacing, typography } from "@sopt-mds/design-tokens";
import type { CheckboxSize } from "./types";

export type CheckboxSizeToken = {
  controlSize: string;
  boxSize: string;
  iconSize: string;
  borderRadius: string;
  gap: string;
  fontWeight: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
};

/**
 * size별 치수/타이포 토큰. (Figma node 808-6174)
 * - small: 히트영역 20 / 박스 16 / 아이콘 12, label3(14·18)
 * - large: 히트영역 24 / 박스 20 / 아이콘 16, label2(16·22)
 */
export const CHECKBOX_SIZE_TOKENS: Record<CheckboxSize, CheckboxSizeToken> = {
  small: {
    controlSize: spacing.s20,
    boxSize: spacing.s16,
    iconSize: spacing.s12,
    borderRadius: radius.r4,
    gap: spacing.s4,
    fontWeight: `${typography.label3.fontWeight}`,
    fontSize: typography.label3.fontSize,
    lineHeight: typography.label3.lineHeight,
    letterSpacing: typography.label3.letterSpacing,
  },
  large: {
    controlSize: spacing.s24,
    boxSize: spacing.s20,
    iconSize: spacing.s16,
    borderRadius: radius.r4,
    gap: spacing.s8,
    fontWeight: `${typography.label2.fontWeight}`,
    fontSize: typography.label2.fontSize,
    lineHeight: typography.label2.lineHeight,
    letterSpacing: typography.label2.letterSpacing,
  },
};

/**
 * 상태별 색상 토큰. (Figma node 808-6174 기준)
 * 모든 값은 @sopt-mds/design-tokens 시맨틱 토큰에서 가져온다.
 */
export const CHECKBOX_COLORS = {
  /** 미선택 박스 테두리 */
  boxBorder: colors.stroke.neutral.default,
  /** 미선택 + disabled 박스 테두리 */
  boxBorderDisabled: colors.stroke.neutral.defaultDisabled,
  /** 선택 박스 채움 (secondary/blue) */
  boxFillSelected: colors.fg.secondary.default,
  /** 선택 + disabled 박스 채움 */
  boxFillSelectedDisabled: colors.fg.neutral.ghostDisabled,
  /** 체크 아이콘 (선택) */
  check: colors.fg.neutral.bold,
  /** 체크 아이콘 (disabled 선택) */
  checkDisabled: colors.fg.neutral.defaultDisabled,
  /** 라벨 텍스트 */
  label: colors.fg.neutral.bold,
  /** 라벨 텍스트 (disabled) */
  labelDisabled: colors.fg.neutral.defaultDisabled,
  /** 포커스 링 */
  focusRing: colors.stroke.neutral.defaultFocused,
} as const;

/** 박스 테두리 두께 — 전용 토큰 부재로 리터럴 (Chip의 borderWidth 관례와 동일). */
export const CHECKBOX_BORDER_WIDTH = "1px";
/** 포커스 링 두께/오프셋 — 전용 토큰 부재로 리터럴 (Chip 포커스 링과 동일). */
export const CHECKBOX_FOCUS_RING_WIDTH = "2px";
export const CHECKBOX_FOCUS_RING_OFFSET = "2px";
