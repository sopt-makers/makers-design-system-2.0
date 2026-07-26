import { colors } from "@sopt-mds/design-tokens";
import { createGlobalVar, style, styleVariants } from "@vanilla-extract/css";
import {
  TEXTAREA_BORDER_WIDTH,
  TEXTAREA_COUNTER_COLOR,
  TEXTAREA_DESCRIPTION_COLOR,
  TEXTAREA_DESCRIPTION_INPUT_GAP,
  TEXTAREA_DESCRIPTION_TYPOGRAPHY,
  TEXTAREA_FOOTER_GAP,
  TEXTAREA_FOOTER_TYPOGRAPHY,
  TEXTAREA_HELPER_COLOR,
  TEXTAREA_HELPER_ICON_GAP,
  TEXTAREA_INPUT_FOOTER_GAP,
  TEXTAREA_LABEL_COLOR,
  TEXTAREA_LABEL_DESCRIPTION_GAP,
  TEXTAREA_LABEL_TYPOGRAPHY,
  TEXTAREA_MAX_HEIGHT,
  TEXTAREA_META_PADDING_INLINE,
  TEXTAREA_MIN_HEIGHT,
  TEXTAREA_PADDING_BLOCK,
  TEXTAREA_PADDING_INLINE,
  TEXTAREA_RADIUS,
  TEXTAREA_REQUIRED_COLOR,
  TEXTAREA_REQUIRED_GAP,
  TEXTAREA_STATE_TOKENS,
  TEXTAREA_TEXT_COLOR,
  TEXTAREA_TYPOGRAPHY,
  TEXTAREA_VARIANT_TOKENS,
} from "./constant";
import type { TextAreaVariant } from "./types";

/*
 * TextArea CSS variables
 * --mds-textarea-* 값을 컴포넌트 외부에서 오버라이드할 수 있습니다.
 */
const TEXTAREA_BACKGROUND_COLOR_VARIABLE = "--mds-textarea-background-color";
const TEXTAREA_DISABLED_BACKGROUND_COLOR_VARIABLE =
  "--mds-textarea-disabled-background-color";
const TEXTAREA_BORDER_COLOR_VARIABLE = "--mds-textarea-border-color";
const TEXTAREA_BORDER_WIDTH_VARIABLE = "--mds-textarea-border-width";
const TEXTAREA_RADIUS_VARIABLE = "--mds-textarea-radius";
const TEXTAREA_COLOR_VARIABLE = "--mds-textarea-color";
const TEXTAREA_PLACEHOLDER_COLOR_VARIABLE = "--mds-textarea-placeholder-color";
const TEXTAREA_MIN_HEIGHT_VARIABLE = "--mds-textarea-min-height";
const TEXTAREA_MAX_HEIGHT_VARIABLE = "--mds-textarea-max-height";

/*
 * addon이 차지하는 좌/우 예약 폭(= addon 폭 + gap). 컴포넌트에서 addon을 실제로
 * 측정해 인라인으로 주입하며, addon이 없으면 미설정(fallback 0px)됩니다.
 */
export const TEXTAREA_LEFT_ADDON_INSET_VARIABLE =
  "--mds-textarea-left-addon-inset";
export const TEXTAREA_RIGHT_ADDON_INSET_VARIABLE =
  "--mds-textarea-right-addon-inset";

type TextAreaCssVariableName =
  | typeof TEXTAREA_BACKGROUND_COLOR_VARIABLE
  | typeof TEXTAREA_DISABLED_BACKGROUND_COLOR_VARIABLE
  | typeof TEXTAREA_BORDER_COLOR_VARIABLE
  | typeof TEXTAREA_BORDER_WIDTH_VARIABLE
  | typeof TEXTAREA_RADIUS_VARIABLE
  | typeof TEXTAREA_COLOR_VARIABLE
  | typeof TEXTAREA_PLACEHOLDER_COLOR_VARIABLE
  | typeof TEXTAREA_MIN_HEIGHT_VARIABLE
  | typeof TEXTAREA_MAX_HEIGHT_VARIABLE;

type TextAreaCssVar<Name extends TextAreaCssVariableName> = `var(${Name})`;
type TextAreaVariantVar =
  | typeof textAreaVars.backgroundColor
  | typeof textAreaVars.disabledBackgroundColor;

type TextAreaVariantStyle = {
  vars: Record<TextAreaVariantVar, string>;
};

function createTextAreaVar<Name extends TextAreaCssVariableName>(
  name: Name,
): TextAreaCssVar<Name> {
  return createGlobalVar(name.slice(2)) as TextAreaCssVar<Name>;
}

export const textAreaVars = {
  backgroundColor: createTextAreaVar(TEXTAREA_BACKGROUND_COLOR_VARIABLE),
  disabledBackgroundColor: createTextAreaVar(
    TEXTAREA_DISABLED_BACKGROUND_COLOR_VARIABLE,
  ),
  borderColor: createTextAreaVar(TEXTAREA_BORDER_COLOR_VARIABLE),
  borderWidth: createTextAreaVar(TEXTAREA_BORDER_WIDTH_VARIABLE),
  radius: createTextAreaVar(TEXTAREA_RADIUS_VARIABLE),
  color: createTextAreaVar(TEXTAREA_COLOR_VARIABLE),
  placeholderColor: createTextAreaVar(TEXTAREA_PLACEHOLDER_COLOR_VARIABLE),
  minHeight: createTextAreaVar(TEXTAREA_MIN_HEIGHT_VARIABLE),
  maxHeight: createTextAreaVar(TEXTAREA_MAX_HEIGHT_VARIABLE),
} as const;

const textAreaVariantStyles: Record<TextAreaVariant, TextAreaVariantStyle> = {
  default: {
    vars: {
      [textAreaVars.backgroundColor]:
        TEXTAREA_VARIANT_TOKENS.default.backgroundColor,
      [textAreaVars.disabledBackgroundColor]:
        TEXTAREA_VARIANT_TOKENS.default.disabledBackgroundColor,
    },
  },
  bold: {
    vars: {
      [textAreaVars.backgroundColor]:
        TEXTAREA_VARIANT_TOKENS.bold.backgroundColor,
      [textAreaVars.disabledBackgroundColor]:
        TEXTAREA_VARIANT_TOKENS.bold.disabledBackgroundColor,
    },
  },
};

export const container = style({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

/**
 * 레이아웃 순서: label - description - input - helper text
 * 요소가 선택적으로 렌더링되므로 gap을 marginTop으로 두고 first-child에서 초기화합니다.
 */
export const label = style({
  display: "flex",
  alignItems: "center",
  gap: TEXTAREA_REQUIRED_GAP,
  paddingInline: TEXTAREA_META_PADDING_INLINE,
  color: TEXTAREA_LABEL_COLOR,
  fontFamily: "inherit",
  fontWeight: TEXTAREA_LABEL_TYPOGRAPHY.fontWeight,
  fontSize: TEXTAREA_LABEL_TYPOGRAPHY.fontSize,
  lineHeight: TEXTAREA_LABEL_TYPOGRAPHY.lineHeight,
  letterSpacing: TEXTAREA_LABEL_TYPOGRAPHY.letterSpacing,
  selectors: {
    "&:first-child": {
      marginTop: 0,
    },
  },
});

export const requiredMark = style({
  color: TEXTAREA_REQUIRED_COLOR,
});

export const description = style({
  margin: 0,
  marginTop: TEXTAREA_LABEL_DESCRIPTION_GAP,
  paddingInline: TEXTAREA_META_PADDING_INLINE,
  color: TEXTAREA_DESCRIPTION_COLOR,
  fontFamily: "inherit",
  fontWeight: TEXTAREA_DESCRIPTION_TYPOGRAPHY.fontWeight,
  fontSize: TEXTAREA_DESCRIPTION_TYPOGRAPHY.fontSize,
  lineHeight: TEXTAREA_DESCRIPTION_TYPOGRAPHY.lineHeight,
  letterSpacing: TEXTAREA_DESCRIPTION_TYPOGRAPHY.letterSpacing,
  selectors: {
    "&:first-child": {
      marginTop: 0,
    },
  },
});

/**
 * 입력 박스. background/padding/border를 소유하며 leftAddon/textarea/rightAddon을
 * flex row로 배치합니다. addon은 상단에 고정(align-self: flex-start)됩니다.
 *
 * border는 box-shadow inset으로 그립니다. layout(w/h)에 영향을 주지 않으므로
 * state(default→focus→error)로 border 색만 바뀌어도 크기가 변하지 않습니다.
 */
export const inputWrapper = style({
  vars: {
    [textAreaVars.backgroundColor]:
      TEXTAREA_VARIANT_TOKENS.default.backgroundColor,
    [textAreaVars.disabledBackgroundColor]:
      TEXTAREA_VARIANT_TOKENS.default.disabledBackgroundColor,
    [textAreaVars.borderColor]: TEXTAREA_STATE_TOKENS.default.borderColor,
    [textAreaVars.borderWidth]: TEXTAREA_BORDER_WIDTH,
    [textAreaVars.radius]: TEXTAREA_RADIUS,
    [textAreaVars.minHeight]: TEXTAREA_MIN_HEIGHT,
  },
  boxSizing: "border-box",
  position: "relative",
  display: "block",
  width: "100%",
  minHeight: textAreaVars.minHeight,
  marginTop: TEXTAREA_DESCRIPTION_INPUT_GAP,
  paddingBlock: TEXTAREA_PADDING_BLOCK,
  paddingInline: 0,
  border: "none",
  borderRadius: textAreaVars.radius,
  backgroundColor: textAreaVars.backgroundColor,
  boxShadow: `inset 0 0 0 ${textAreaVars.borderWidth} ${textAreaVars.borderColor}`,
  WebkitTapHighlightColor: "transparent",
  transition: "box-shadow 150ms ease, background-color 150ms ease",
  selectors: {
    "&:first-child": {
      marginTop: 0,
    },
    /**
     * state priority
     * - disabled > error > focused > default(border 없음)
     */
    "&:focus-within": {
      vars: {
        [textAreaVars.borderColor]: TEXTAREA_STATE_TOKENS.focused.borderColor,
      },
    },
    "&:has(textarea[aria-invalid='true'])": {
      vars: {
        [textAreaVars.borderColor]: TEXTAREA_STATE_TOKENS.error.borderColor,
      },
    },
    "&:has(textarea:disabled)": {
      vars: {
        [textAreaVars.backgroundColor]: textAreaVars.disabledBackgroundColor,
        [textAreaVars.borderColor]: TEXTAREA_STATE_TOKENS.disabled.borderColor,
      },
      cursor: "not-allowed",
    },
  },
});

export const variants = styleVariants(textAreaVariantStyles);

/**
 * addon 래퍼.
 * textarea 위에 absolute로 겹쳐 배치되어, textarea 내부 스크롤과 무관하게
 * 항상 고정된 위치에 렌더링됩니다. top/bottom을 padding에 맞춰 textarea의
 * 콘텐츠 영역 높이만큼 늘어나며, 정렬을 강제하지 않으므로 주입된 요소의
 * 세로/가로 위치는 사용처에서 alignSelf/margin 등으로 자유롭게 조절할 수 있습니다.
 */
const addonBase = {
  position: "absolute",
  top: TEXTAREA_PADDING_BLOCK,
  bottom: TEXTAREA_PADDING_BLOCK,
  display: "flex",
  color: "currentColor",
} as const;

export const addon = styleVariants({
  left: {
    ...addonBase,
    left: TEXTAREA_PADDING_INLINE,
  },
  right: {
    ...addonBase,
    right: TEXTAREA_PADDING_INLINE,
  },
});

/**
 * bare textarea. 배경/테두리는 inputWrapper가 소유하고, textarea는 박스 전체
 * 폭을 차지하는 스크롤 컨테이너로 동작합니다. 좌/우 padding은 addon 예약 폭만큼
 * 확보되어 텍스트가 absolute addon 아래로 겹치지 않습니다.
 */
export const base = style({
  vars: {
    [textAreaVars.color]: TEXTAREA_TEXT_COLOR.default,
    [textAreaVars.placeholderColor]: TEXTAREA_TEXT_COLOR.placeholder,
    [textAreaVars.maxHeight]: TEXTAREA_MAX_HEIGHT,
  },
  boxSizing: "border-box",
  display: "block",
  minWidth: 0,
  width: "100%",
  maxHeight: textAreaVars.maxHeight,
  margin: 0,
  padding: 0,
  paddingLeft: `calc(${TEXTAREA_PADDING_INLINE} + var(${TEXTAREA_LEFT_ADDON_INSET_VARIABLE}, 0px))`,
  paddingRight: `calc(${TEXTAREA_PADDING_INLINE} + var(${TEXTAREA_RIGHT_ADDON_INSET_VARIABLE}, 0px))`,
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  color: textAreaVars.color,
  appearance: "none",
  WebkitAppearance: "none",
  scrollbarWidth: "thin",
  scrollbarColor: `${colors.bg.neutral.default} transparent`,
  WebkitTapHighlightColor: "transparent",
  fontFamily: "inherit",
  fontWeight: TEXTAREA_TYPOGRAPHY.fontWeight,
  fontSize: TEXTAREA_TYPOGRAPHY.fontSize,
  lineHeight: TEXTAREA_TYPOGRAPHY.lineHeight,
  letterSpacing: TEXTAREA_TYPOGRAPHY.letterSpacing,
  resize: "none",
  overflowY: "auto",
  selectors: {
    "&::placeholder": {
      color: textAreaVars.placeholderColor,
      // Firefox 등에서 placeholder에 기본 opacity(<1)가 적용되는 것을 정규화
      opacity: 1,
    },
    // 브라우저 기본 disabled 흐림을 끄고 토큰 색으로만 표현합니다.
    "&:disabled": {
      vars: {
        [textAreaVars.color]: TEXTAREA_TEXT_COLOR.disabled,
        [textAreaVars.placeholderColor]:
          TEXTAREA_TEXT_COLOR.placeholderDisabled,
      },
      cursor: "not-allowed",
      opacity: 1,
      WebkitTextFillColor: textAreaVars.color,
    },
    "&:disabled::placeholder": {
      color: textAreaVars.placeholderColor,
      opacity: 1,
      WebkitTextFillColor: textAreaVars.placeholderColor,
    },
  },
});

/**
 * autoSize 모드. 높이 제한(maxHeight)과 스크롤을 없애 콘텐츠에 맞춰 늘어납니다.
 * 실제 height는 컴포넌트가 scrollHeight 기준으로 inline 설정합니다.
 */
export const autoSize = style({
  maxHeight: "none",
  overflowY: "hidden",
});

export const footer = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: TEXTAREA_FOOTER_GAP,
  marginTop: TEXTAREA_INPUT_FOOTER_GAP,
  paddingInline: TEXTAREA_META_PADDING_INLINE,
});

const footerTextBase = {
  margin: 0,
  fontFamily: "inherit",
  fontWeight: TEXTAREA_FOOTER_TYPOGRAPHY.fontWeight,
  fontSize: TEXTAREA_FOOTER_TYPOGRAPHY.fontSize,
  lineHeight: TEXTAREA_FOOTER_TYPOGRAPHY.lineHeight,
  letterSpacing: TEXTAREA_FOOTER_TYPOGRAPHY.letterSpacing,
} as const;

const helperTextBase = {
  ...footerTextBase,
  display: "inline-flex",
  alignItems: "center",
  gap: TEXTAREA_HELPER_ICON_GAP,
} as const;

export const helper = styleVariants({
  default: {
    ...helperTextBase,
    color: TEXTAREA_HELPER_COLOR.default,
  },
  error: {
    ...helperTextBase,
    color: TEXTAREA_HELPER_COLOR.error,
  },
  disabled: {
    ...helperTextBase,
    color: TEXTAREA_HELPER_COLOR.disabled,
  },
});

export const helperIcon = style({
  display: "inline-flex",
  flexShrink: 0,
  color: "currentColor",
});

export const counter = styleVariants({
  default: {
    ...footerTextBase,
    flexShrink: 0,
    marginLeft: "auto",
    color: TEXTAREA_COUNTER_COLOR.default,
  },
  disabled: {
    ...footerTextBase,
    flexShrink: 0,
    marginLeft: "auto",
    color: TEXTAREA_COUNTER_COLOR.disabled,
  },
});
