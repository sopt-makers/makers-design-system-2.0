export type BaseColorRef = {
  kind: "baseColor";
  key: string;
};

export type TypographyBaseRef = {
  kind: "typographyBase";
  group: "weight" | "size" | "lineHeight" | "letterSpacing";
  key: string;
};

export type SemanticTypographyStyle = {
  fontWeight: TypographyBaseRef;
  fontSize: TypographyBaseRef;
  lineHeight: TypographyBaseRef;
  letterSpacing: TypographyBaseRef;
};

/** family → scale → hex/rgba */
export type BaseColors = Record<string, Record<string, string>>;

export type SpacingTokens = Record<string, string>;
export type RadiusTokens = Record<string, string>;

/** group(weight/size/...) → 토큰 맵 */
export type TypographyBase = Record<string, Record<string, string | number>>;

/** heading1 / body2 등 */
export type SemanticTypography = Record<string, SemanticTypographyStyle>;

/**
 * semantic color group(fg/bg/stroke) → category → leaf.
 * leaf 값은 BaseColorRef 또는 문자열 리터럴.
 */
export type SemanticColors = Record<string, Record<string, unknown>>;

/**
 * 에이전트가 Figma token.json을 해석해 만든 정규화 명세.
 * 존재하는 섹션만 포함하며, 포함된 섹션은 SSOT로 해당 파일을 통째로 교체한다.
 */
export type TokenUpdateSpec = {
  baseColor?: BaseColors;
  semanticColor?: SemanticColors;
  spacing?: SpacingTokens;
  typographyBase?: TypographyBase;
  semanticTypography?: SemanticTypography;
  radius?: RadiusTokens;
};

export type OutputFile = {
  path: string;
  contents: string;
};
