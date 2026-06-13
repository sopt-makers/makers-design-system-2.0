import { createVar, style, styleVariants } from "@vanilla-extract/css";
import {
  RADIO_BORDER_RADIUS,
  RADIO_BORDER_WIDTH,
  RADIO_COLORS,
  RADIO_FOCUS_RING_OFFSET,
  RADIO_FOCUS_RING_WIDTH,
  RADIO_SIZE_TOKENS,
} from "./constant";

/*
 * size에 따라 달라지는 값은 root에 CSS 변수로 세팅하고,
 * 하위 요소(control/circle/dot/labelText)는 상속받아 사용한다.
 * 덕분에 size 변형 클래스를 root에만 붙이면 된다.
 */
const controlSizeVar = createVar();
const circleSizeVar = createVar();
const dotSizeVar = createVar();
const gapVar = createVar();
const fontWeightVar = createVar();
const fontSizeVar = createVar();
const lineHeightVar = createVar();
const letterSpacingVar = createVar();

const { small } = RADIO_SIZE_TOKENS;

export const root = style({
  vars: {
    [controlSizeVar]: small.controlSize,
    [circleSizeVar]: small.circleSize,
    [dotSizeVar]: small.dotSize,
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
  color: RADIO_COLORS.label,
  cursor: "pointer",
  userSelect: "none",
  WebkitTapHighlightColor: "transparent",
  selectors: {
    "&:has(input:disabled)": {
      color: RADIO_COLORS.labelDisabled,
      cursor: "not-allowed",
    },
  },
});

export const rootSizeVariants = styleVariants(RADIO_SIZE_TOKENS, (token) => ({
  vars: {
    [controlSizeVar]: token.controlSize,
    [circleSizeVar]: token.circleSize,
    [dotSizeVar]: token.dotSize,
    [gapVar]: token.gap,
    [fontWeightVar]: token.fontWeight,
    [fontSizeVar]: token.fontSize,
    [lineHeightVar]: token.lineHeight,
    [letterSpacingVar]: token.letterSpacing,
  },
}));

/** 히트영역: 원보다 크며(small 22 / large 26) 원을 가운데 정렬한다. */
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

/** 시각적 라디오 원. 상태는 input의 pseudo-class로 구동된다. */
export const circle = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  width: circleSizeVar,
  height: circleSizeVar,
  borderRadius: RADIO_BORDER_RADIUS,
  border: `${RADIO_BORDER_WIDTH} solid ${RADIO_COLORS.circleBorder}`,
  backgroundColor: "transparent",
  color: RADIO_COLORS.dot,
  transition: "background-color 150ms ease, border-color 150ms ease",
  selectors: {
    // 선택 (활성)
    [`${input}:checked + &`]: {
      borderColor: "transparent",
      backgroundColor: RADIO_COLORS.circleFillSelected,
    },
    // 비활성 · 미선택
    [`${input}:disabled + &`]: {
      borderColor: RADIO_COLORS.circleBorderDisabled,
    },
    // 비활성 · 선택 (specificity가 높아 위 두 규칙을 덮는다)
    [`${input}:checked:disabled + &`]: {
      borderColor: "transparent",
      backgroundColor: RADIO_COLORS.circleFillSelectedDisabled,
      color: RADIO_COLORS.dotDisabled,
    },
    // 키보드 포커스
    [`${input}:focus-visible + &`]: {
      outline: `${RADIO_FOCUS_RING_WIDTH} solid ${RADIO_COLORS.focusRing}`,
      outlineOffset: RADIO_FOCUS_RING_OFFSET,
    },
  },
});

/** 가운데 dot. 선택 상태에서만 보인다(색은 circle에서 currentColor로 상속). */
export const dot = style({
  width: dotSizeVar,
  height: dotSizeVar,
  borderRadius: RADIO_BORDER_RADIUS,
  backgroundColor: "currentColor",
  opacity: 0,
  pointerEvents: "none",
  transition: "opacity 150ms ease",
  selectors: {
    [`${input}:checked + ${circle} &`]: {
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
