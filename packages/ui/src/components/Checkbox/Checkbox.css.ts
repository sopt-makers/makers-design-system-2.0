import { createVar, style, styleVariants } from "@vanilla-extract/css";
import {
  CHECKBOX_BORDER_WIDTH,
  CHECKBOX_COLORS,
  CHECKBOX_FOCUS_RING_OFFSET,
  CHECKBOX_FOCUS_RING_WIDTH,
  CHECKBOX_SIZE_TOKENS,
} from "./constant";

/*
 * size에 따라 달라지는 값은 root에 CSS 변수로 세팅하고,
 * 하위 요소(control/box/icon/labelText)는 상속받아 사용한다.
 * 덕분에 size 변형 클래스를 root에만 붙이면 된다.
 */
const controlSizeVar = createVar();
const boxSizeVar = createVar();
const boxRadiusVar = createVar();
const iconSizeVar = createVar();
const gapVar = createVar();
const fontWeightVar = createVar();
const fontSizeVar = createVar();
const lineHeightVar = createVar();
const letterSpacingVar = createVar();

const { small } = CHECKBOX_SIZE_TOKENS;

export const root = style({
  vars: {
    [controlSizeVar]: small.controlSize,
    [boxSizeVar]: small.boxSize,
    [boxRadiusVar]: small.borderRadius,
    [iconSizeVar]: small.iconSize,
    [gapVar]: small.gap,
    [fontWeightVar]: small.fontWeight,
    [fontSizeVar]: small.fontSize,
    [lineHeightVar]: small.lineHeight,
    [letterSpacingVar]: small.letterSpacing,
  },
  display: "inline-flex",
  alignItems: "center",
  gap: gapVar,
  margin: 0,
  color: CHECKBOX_COLORS.label,
  cursor: "pointer",
  userSelect: "none",
  WebkitTapHighlightColor: "transparent",
  selectors: {
    "&:has(input:disabled)": {
      color: CHECKBOX_COLORS.labelDisabled,
      cursor: "not-allowed",
    },
  },
});

export const rootSizeVariants = styleVariants(
  CHECKBOX_SIZE_TOKENS,
  (token) => ({
    vars: {
      [controlSizeVar]: token.controlSize,
      [boxSizeVar]: token.boxSize,
      [boxRadiusVar]: token.borderRadius,
      [iconSizeVar]: token.iconSize,
      [gapVar]: token.gap,
      [fontWeightVar]: token.fontWeight,
      [fontSizeVar]: token.fontSize,
      [lineHeightVar]: token.lineHeight,
      [letterSpacingVar]: token.letterSpacing,
    },
  }),
);

/** 히트영역: 박스보다 크며(small 20 / large 24) 박스를 가운데 정렬한다. */
export const control = style({
  position: "relative",
  display: "inline-flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  width: controlSizeVar,
  height: controlSizeVar,
});

/** 실제 상호작용 요소. 시각적으로 숨기고 히트영역 전체를 덮는다. */
export const input = style({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  margin: 0,
  opacity: 0,
  cursor: "inherit",
});

/** 시각적 체크박스 박스. 상태는 input의 pseudo-class로 구동된다. */
export const box = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  width: boxSizeVar,
  height: boxSizeVar,
  borderRadius: boxRadiusVar,
  border: `${CHECKBOX_BORDER_WIDTH} solid ${CHECKBOX_COLORS.boxBorder}`,
  backgroundColor: "transparent",
  color: CHECKBOX_COLORS.check,
  transition: "background-color 150ms ease, border-color 150ms ease",
  selectors: {
    // 선택 (활성)
    [`${input}:checked + &`]: {
      borderColor: "transparent",
      backgroundColor: CHECKBOX_COLORS.boxFillSelected,
    },
    // 비활성 · 미선택
    [`${input}:disabled + &`]: {
      borderColor: CHECKBOX_COLORS.boxBorderDisabled,
    },
    // 비활성 · 선택 (specificity가 높아 위 두 규칙을 덮는다)
    [`${input}:checked:disabled + &`]: {
      borderColor: "transparent",
      backgroundColor: CHECKBOX_COLORS.boxFillSelectedDisabled,
      color: CHECKBOX_COLORS.checkDisabled,
    },
    // 키보드 포커스
    [`${input}:focus-visible + &`]: {
      outline: `${CHECKBOX_FOCUS_RING_WIDTH} solid ${CHECKBOX_COLORS.focusRing}`,
      outlineOffset: CHECKBOX_FOCUS_RING_OFFSET,
    },
  },
});

/** 체크 글리프. 선택 상태에서만 보인다(색은 box에서 currentColor로 상속). */
export const icon = style({
  width: iconSizeVar,
  height: iconSizeVar,
  opacity: 0,
  pointerEvents: "none",
  transition: "opacity 150ms ease",
  selectors: {
    [`${input}:checked + ${box} &`]: {
      opacity: 1,
    },
  },
});

/** 라벨 텍스트. 색은 root에서 상속(disabled 시 root가 색을 바꾼다). */
export const labelText = style({
  fontFamily: "inherit",
  fontWeight: fontWeightVar,
  fontSize: fontSizeVar,
  lineHeight: lineHeightVar,
  letterSpacing: letterSpacingVar,
});
