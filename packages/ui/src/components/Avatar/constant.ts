import { colors, radius } from "@sopt-mds/design-tokens";
import type { AvatarSize, AvatarStrokeColor } from "./types";

/** 선택 가능한 모든 size 목록(px). */
export const AVATAR_SIZES: AvatarSize[] = [24, 32, 48, 56, 72, 80, 120, 180];

/** 기본 size. */
export const DEFAULT_AVATAR_SIZE: AvatarSize = 48;

/** size별 width/height 값. */
export const AVATAR_SIZE_PX: Record<AvatarSize, string> = {
  24: "24px",
  32: "32px",
  48: "48px",
  56: "56px",
  72: "72px",
  80: "80px",
  120: "120px",
  180: "180px",
};

/**
 * fallback 아이콘(IconUsersFilled)의 size는 avatar size의 1/2입니다.
 * 예: size 120 → 아이콘 60.
 */
export function getAvatarFallbackIconSize(size: AvatarSize): number {
  return size / 2;
}

/**
 * stroke 시맨틱 컬러 토큰을 카멜 케이스 key → 실제 색상 값으로 평탄화한 맵입니다.
 * `strokeColor` prop 값을 실제 색상으로 변환할 때 사용합니다.
 * 예: "neutralDefault" → colors.stroke.neutral.default
 */
export const AVATAR_STROKE_COLORS: Record<AvatarStrokeColor, string> = (() => {
  const result = {} as Record<AvatarStrokeColor, string>;

  for (const [group, values] of Object.entries(colors.stroke)) {
    for (const [key, value] of Object.entries(
      values as Record<string, string>,
    )) {
      const camelKey =
        `${group}${key.charAt(0).toUpperCase()}${key.slice(1)}` as AvatarStrokeColor;
      result[camelKey] = value;
    }
  }

  return result;
})();

export type AvatarDefaultToken = {
  borderRadius: string;
  backgroundColor: string;
  fallbackColor: string;
  strokeWidth: string;
  strokeColor: string;
};

/**
 * CSS variable 기본값.
 * - fallbackColor: src가 없거나 로드 실패 시 노출되는 fallback 아이콘 색상입니다.
 * - strokeColor: `stroke.secondary.default` 토큰을 사용합니다.
 * - strokeWidth: 실제 stroke 유무와 무관하게 size가 유지되도록 inset으로 적용됩니다.
 */
export const AVATAR_DEFAULT_TOKENS: AvatarDefaultToken = {
  borderRadius: radius.full,
  backgroundColor: colors.bg.neutral.subtle,
  fallbackColor: colors.fg.neutral.ghost,
  strokeWidth: "1px",
  strokeColor: colors.stroke.secondary.default,
};
