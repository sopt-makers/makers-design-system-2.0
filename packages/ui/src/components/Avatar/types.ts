import type { colors } from "@sopt-mds/design-tokens";

/**
 * Avatar의 크기를 결정합니다. 값은 렌더링되는 px 크기와 동일합니다.
 * - 24 / 32 / 48 / 56 / 72 / 80 / 120 / 180
 */
export type AvatarSize = 24 | 32 | 48 | 56 | 72 | 80 | 120 | 180;

/**
 * fallback(사람 아이콘)이 렌더링될 때 배경 스타일을 결정합니다.
 * - ghost: `bg.neutral.ghost`
 * - subtle: `bg.neutral.subtle`
 */
export type AvatarType = "ghost" | "subtle";

type StrokeColorTokens = typeof colors.stroke;

/**
 * stroke 시맨틱 컬러 토큰의 key를 카멜 케이스로 평탄화한 유니온입니다.
 * - 예: stroke.neutral.default → "neutralDefault"
 * - 예: stroke.brand.subtle → "brandSubtle"
 */
export type AvatarStrokeColor = {
  [Group in keyof StrokeColorTokens]: {
    [Key in keyof StrokeColorTokens[Group]]: `${Group & string}${Capitalize<
      Key & string
    >}`;
  }[keyof StrokeColorTokens[Group]];
}[keyof StrokeColorTokens];
