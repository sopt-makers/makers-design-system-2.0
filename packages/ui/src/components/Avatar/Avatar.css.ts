import { createGlobalVar, style, styleVariants } from "@vanilla-extract/css";
import {
  AVATAR_DEFAULT_TOKENS,
  AVATAR_SIZE_PX,
  AVATAR_STROKE_WIDTH_PX,
  DEFAULT_AVATAR_SIZE,
} from "./constant";

/*
 * Avatar CSS variables
 * These names are intentionally stable so consumers can override
 * --mds-avatar-* values at the component boundary when needed.
 */
const AVATAR_SIZE_VARIABLE = "--mds-avatar-size" as const;
const AVATAR_BORDER_RADIUS_VARIABLE = "--mds-avatar-border-radius" as const;
const AVATAR_BACKGROUND_COLOR_VARIABLE =
  "--mds-avatar-background-color" as const;
const AVATAR_FALLBACK_COLOR_VARIABLE = "--mds-avatar-fallback-color" as const;
const AVATAR_STROKE_WIDTH_VARIABLE = "--mds-avatar-stroke-width" as const;
export const AVATAR_STROKE_COLOR_VARIABLE =
  "--mds-avatar-stroke-color" as const;

type AvatarCssVariableName =
  | typeof AVATAR_SIZE_VARIABLE
  | typeof AVATAR_BORDER_RADIUS_VARIABLE
  | typeof AVATAR_BACKGROUND_COLOR_VARIABLE
  | typeof AVATAR_FALLBACK_COLOR_VARIABLE
  | typeof AVATAR_STROKE_WIDTH_VARIABLE
  | typeof AVATAR_STROKE_COLOR_VARIABLE;

type AvatarCssVar<Name extends AvatarCssVariableName> = `var(${Name})`;

function createAvatarVar<Name extends AvatarCssVariableName>(
  name: Name,
): AvatarCssVar<Name> {
  return createGlobalVar(name.slice(2)) as AvatarCssVar<Name>;
}

export const avatarVars = {
  size: createAvatarVar(AVATAR_SIZE_VARIABLE),
  borderRadius: createAvatarVar(AVATAR_BORDER_RADIUS_VARIABLE),
  backgroundColor: createAvatarVar(AVATAR_BACKGROUND_COLOR_VARIABLE),
  fallbackColor: createAvatarVar(AVATAR_FALLBACK_COLOR_VARIABLE),
  strokeWidth: createAvatarVar(AVATAR_STROKE_WIDTH_VARIABLE),
  strokeColor: createAvatarVar(AVATAR_STROKE_COLOR_VARIABLE),
} as const;

export const base = style({
  vars: {
    [avatarVars.size]: AVATAR_SIZE_PX[DEFAULT_AVATAR_SIZE],
    [avatarVars.borderRadius]: AVATAR_DEFAULT_TOKENS.borderRadius,
    [avatarVars.backgroundColor]: AVATAR_DEFAULT_TOKENS.backgroundColor,
    [avatarVars.fallbackColor]: AVATAR_DEFAULT_TOKENS.fallbackColor,
    [avatarVars.strokeWidth]: AVATAR_STROKE_WIDTH_PX[DEFAULT_AVATAR_SIZE],
    [avatarVars.strokeColor]: AVATAR_DEFAULT_TOKENS.strokeColor,
  },
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  width: avatarVars.size,
  height: avatarVars.size,
  flexShrink: 0,
  borderRadius: avatarVars.borderRadius,
  // 이미지 로드 전/실패 시 노출되는 기본 배경.
  backgroundColor: avatarVars.backgroundColor,
  overflow: "hidden",
});

export const sizeVariants = styleVariants(AVATAR_SIZE_PX, (value, size) => ({
  vars: {
    [avatarVars.size]: value,
    [avatarVars.strokeWidth]: AVATAR_STROKE_WIDTH_PX[size],
  },
}));

export const image = style({
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

/**
 * fallback 영역.
 * - src가 없거나 로드 실패 시 IconUsersFilled 아이콘을 가운데 정렬해 노출합니다.
 * - 아이콘 size는 컴포넌트에서 avatar size의 1/2로 지정합니다.
 */
export const fallback = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: avatarVars.fallbackColor,
});

/**
 * stroke 오버레이.
 * - inset box-shadow로 그려 size에 영향을 주지 않습니다.
 * - 이미지 위에 올라오도록 별도 요소로 분리합니다.
 */
export const stroke = style({
  position: "absolute",
  inset: 0,
  borderRadius: "inherit",
  boxShadow: `inset 0 0 0 ${avatarVars.strokeWidth} ${avatarVars.strokeColor}`,
  pointerEvents: "none",
});
