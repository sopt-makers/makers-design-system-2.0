import {
  createGlobalVar,
  fallbackVar,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import {
  CHECKBOX_BORDER_WIDTH,
  CHECKBOX_COLORS,
  CHECKBOX_FOCUS_RING_OFFSET,
  CHECKBOX_FOCUS_RING_WIDTH,
  CHECKBOX_SIZE_TOKENS,
  type CheckboxSizeToken,
} from "./constant";
import type { CheckboxSize } from "./types";

/*
 * Checkbox CSS variables
 * --mds-checkbox-* 값을 컴포넌트 외부에서 오버라이드할 수 있습니다.
 */
const CHECKBOX_CONTROL_SIZE_VARIABLE = "--mds-checkbox-control-size";
const CHECKBOX_BOX_SIZE_VARIABLE = "--mds-checkbox-box-size";
const CHECKBOX_ICON_SIZE_VARIABLE = "--mds-checkbox-icon-size";
const CHECKBOX_BORDER_RADIUS_VARIABLE = "--mds-checkbox-border-radius";
const CHECKBOX_GAP_VARIABLE = "--mds-checkbox-gap";
const CHECKBOX_FONT_WEIGHT_VARIABLE = "--mds-checkbox-font-weight";
const CHECKBOX_FONT_SIZE_VARIABLE = "--mds-checkbox-font-size";
const CHECKBOX_LINE_HEIGHT_VARIABLE = "--mds-checkbox-line-height";
const CHECKBOX_LETTER_SPACING_VARIABLE = "--mds-checkbox-letter-spacing";

type CheckboxCssVariableName =
  | typeof CHECKBOX_CONTROL_SIZE_VARIABLE
  | typeof CHECKBOX_BOX_SIZE_VARIABLE
  | typeof CHECKBOX_ICON_SIZE_VARIABLE
  | typeof CHECKBOX_BORDER_RADIUS_VARIABLE
  | typeof CHECKBOX_GAP_VARIABLE
  | typeof CHECKBOX_FONT_WEIGHT_VARIABLE
  | typeof CHECKBOX_FONT_SIZE_VARIABLE
  | typeof CHECKBOX_LINE_HEIGHT_VARIABLE
  | typeof CHECKBOX_LETTER_SPACING_VARIABLE;

type CheckboxCssVar<Name extends CheckboxCssVariableName> = `var(${Name})`;

function createCheckboxVar<Name extends CheckboxCssVariableName>(
  name: Name,
): CheckboxCssVar<Name> {
  return createGlobalVar(name.slice(2)) as CheckboxCssVar<Name>;
}

export const checkboxVars = {
  controlSize: createCheckboxVar(CHECKBOX_CONTROL_SIZE_VARIABLE),
  boxSize: createCheckboxVar(CHECKBOX_BOX_SIZE_VARIABLE),
  iconSize: createCheckboxVar(CHECKBOX_ICON_SIZE_VARIABLE),
  borderRadius: createCheckboxVar(CHECKBOX_BORDER_RADIUS_VARIABLE),
  gap: createCheckboxVar(CHECKBOX_GAP_VARIABLE),
  fontWeight: createCheckboxVar(CHECKBOX_FONT_WEIGHT_VARIABLE),
  fontSize: createCheckboxVar(CHECKBOX_FONT_SIZE_VARIABLE),
  lineHeight: createCheckboxVar(CHECKBOX_LINE_HEIGHT_VARIABLE),
  letterSpacing: createCheckboxVar(CHECKBOX_LETTER_SPACING_VARIABLE),
} as const;

/** Checkbox의 9개 변수는 전부 size 계열(치수/타이포)이다. 색은 변수화 대상이 아니다. */
type CheckboxSizeVar = (typeof checkboxVars)[keyof typeof checkboxVars];

type CheckboxSizeStyle = {
  vars: Record<CheckboxSizeVar, string>;
};

const createSizeStyle = (token: CheckboxSizeToken): CheckboxSizeStyle => ({
  vars: {
    [checkboxVars.controlSize]: token.controlSize,
    [checkboxVars.boxSize]: token.boxSize,
    [checkboxVars.iconSize]: token.iconSize,
    [checkboxVars.borderRadius]: token.borderRadius,
    [checkboxVars.gap]: token.gap,
    [checkboxVars.fontWeight]: token.fontWeight,
    [checkboxVars.fontSize]: token.fontSize,
    [checkboxVars.lineHeight]: token.lineHeight,
    [checkboxVars.letterSpacing]: token.letterSpacing,
  },
});

/**
 * size별 `--mds-checkbox-*` 선언 묶음.
 *
 * 조상에서 Checkbox 치수를 주입하려는 컨테이너(예: Dialog가 `@container` 안에서)가
 * `vars: { ...checkboxSizeStyles.large.vars }` 형태로 그대로 재사용합니다.
 * 평범한 객체이므로 vanilla-extract의 `vars`/`styleVariants` 어느 쪽에도 넣을 수 있습니다.
 */
export const checkboxSizeStyles: Record<CheckboxSize, CheckboxSizeStyle> = {
  small: createSizeStyle(CHECKBOX_SIZE_TOKENS.small),
  large: createSizeStyle(CHECKBOX_SIZE_TOKENS.large),
};

const { small } = CHECKBOX_SIZE_TOKENS;

/*
 * ⚠️ 소비 지점(root/control/box/icon/labelText)은 변수를 "선언하지 않고" 폴백으로만 소비한다.
 *
 * CSS 변수는 해당 요소에 자체 선언이 있으면 조상 선언이 절대 이기지 못한다.
 * root에 `vars`를 깔면(정본 Chip/Toggle의 `base` 방식) 조상 컨테이너가 주입하는
 * `--mds-checkbox-*`가 항상 무시되므로, 여기서만 의도적으로 정본을 벗어난다.
 *
 * - size 미지정: 변수 선언이 어디에도 없음 → 조상 값 상속, 없으면 폴백(= small 토큰).
 * - size 지정: rootSizeVariants가 root에 선언 → 같은 요소의 선언이 조상을 이긴다.
 *
 * 폴백값이 small 토큰이라 `<Checkbox />`는 size 기본값 없이도 기존과 픽셀 동일하다.
 */
export const root = style({
  display: "inline-flex",
  alignItems: "center",
  gap: fallbackVar(checkboxVars.gap, small.gap),
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

/** size를 명시했을 때만 root에 붙는다. 붙는 순간 조상 주입값을 덮어쓴다. */
export const rootSizeVariants = styleVariants(checkboxSizeStyles);

/** 히트영역: 박스보다 크며(small 20 / large 24) 박스를 가운데 정렬한다. */
export const control = style({
  position: "relative",
  display: "inline-flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  width: fallbackVar(checkboxVars.controlSize, small.controlSize),
  height: fallbackVar(checkboxVars.controlSize, small.controlSize),
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
  width: fallbackVar(checkboxVars.boxSize, small.boxSize),
  height: fallbackVar(checkboxVars.boxSize, small.boxSize),
  borderRadius: fallbackVar(checkboxVars.borderRadius, small.borderRadius),
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
  width: fallbackVar(checkboxVars.iconSize, small.iconSize),
  height: fallbackVar(checkboxVars.iconSize, small.iconSize),
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
  fontWeight: fallbackVar(checkboxVars.fontWeight, small.fontWeight),
  fontSize: fallbackVar(checkboxVars.fontSize, small.fontSize),
  lineHeight: fallbackVar(checkboxVars.lineHeight, small.lineHeight),
  letterSpacing: fallbackVar(checkboxVars.letterSpacing, small.letterSpacing),
});
