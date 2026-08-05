import { colors, radius, spacing, typography } from "@sopt-mds/design-tokens";
import type { RadioSize } from "./types";

export type RadioSizeToken = {
  controlSize: string;
  circleSize: string;
  dotSize: string;
  gap: string;
  fontWeight: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
};

/**
 * size별 치수/타이포 토큰. (Figma node 808-6230 / 마스터 808-6293)
 * - small: 컨트롤(히트) 22 / 원 16(테두리 1) / dot 8, label3(14·18)
 * - large: 컨트롤(히트) 26 / 원 22(테두리 1) / dot 10, label2(16·22)
 *
 * 컨트롤 22/26·large 원 22는 spacing 스케일에 없는 값이라 리터럴로 둔다
 * (Checkbox의 borderWidth/포커스 링 리터럴 관례와 동일).
 */
export const RADIO_SIZE_TOKENS: Record<RadioSize, RadioSizeToken> = {
  small: {
    controlSize: "22px",
    circleSize: spacing.s16,
    dotSize: spacing.s8,
    gap: spacing.s4,
    fontWeight: `${typography.label3.fontWeight}`,
    fontSize: typography.label3.fontSize,
    lineHeight: typography.label3.lineHeight,
    letterSpacing: typography.label3.letterSpacing,
  },
  large: {
    controlSize: "26px",
    circleSize: "22px",
    dotSize: spacing.s10,
    gap: spacing.s8,
    fontWeight: `${typography.label2.fontWeight}`,
    fontSize: typography.label2.fontSize,
    lineHeight: typography.label2.lineHeight,
    letterSpacing: typography.label2.letterSpacing,
  },
};

/**
 * 상태별 색상 토큰. (Figma node 808-6230 기준)
 * 모든 값은 @sopt-mds/design-tokens 시맨틱 토큰에서 가져온다.
 */
export const RADIO_COLORS = {
  /** 미선택 원 테두리 */
  circleBorder: colors.stroke.neutral.default,
  /** 미선택 + disabled 원 테두리 */
  circleBorderDisabled: colors.stroke.neutral.defaultDisabled,
  /** 선택 원 채움 (secondary/blue) */
  circleFillSelected: colors.fg.secondary.default,
  /** 선택 + disabled 원 채움 */
  circleFillSelectedDisabled: colors.fg.neutral.ghostDisabled,
  /** 선택 dot */
  dot: colors.fg.neutral.bold,
  /** 선택 + disabled dot */
  dotDisabled: colors.fg.neutral.defaultDisabled,
  /** 라벨 텍스트 */
  label: colors.fg.neutral.bold,
  /** 라벨 텍스트 (disabled) */
  labelDisabled: colors.fg.neutral.defaultDisabled,
  /** 포커스 링 */
  focusRing: colors.stroke.neutral.defaultFocused,
} as const;

/** 원 반지름 — 완전한 원. */
export const RADIO_BORDER_RADIUS = radius.full;
/** 원 테두리 두께 — 전용 토큰 부재로 리터럴 (Checkbox/Chip 관례와 동일). */
export const RADIO_BORDER_WIDTH = "1px";
/** 포커스 링 두께/오프셋 — 전용 토큰 부재로 리터럴 (Checkbox/Chip 관례와 동일). */
export const RADIO_FOCUS_RING_WIDTH = "2px";
export const RADIO_FOCUS_RING_OFFSET = "2px";

/** RadioGroup 기본 항목 간격 — Figma 미정의(항목만 정의)라 관례 기본값(override 가능). */
export const RADIO_GROUP_GAP = spacing.s12;
