import { createGlobalVar, style, styleVariants } from "@vanilla-extract/css";
import {
  TEXT_FIELD_BORDER_TOKENS,
  TEXT_FIELD_BORDER_WIDTH,
  TEXT_FIELD_CONTAINER_TOKENS,
  TEXT_FIELD_DESCRIPTION_TOKENS,
  TEXT_FIELD_HELPER_TOKENS,
  TEXT_FIELD_INPUT_TOKENS,
  TEXT_FIELD_LABEL_TOKENS,
  TEXT_FIELD_LAYOUT_TOKENS,
  TEXT_FIELD_REQUIRED_TOKENS,
  TEXT_FIELD_VARIANT_TOKENS,
} from "./constant";
import type { TextFieldVariant } from "./types";

/*
 * TextField CSS variables
 * --mds-text-field-* 값을 컴포넌트 외부에서 오버라이드할 수 있습니다.
 */
const TEXT_FIELD_BACKGROUND_COLOR_VARIABLE =
  "--mds-text-field-background-color";
const TEXT_FIELD_BORDER_COLOR_VARIABLE = "--mds-text-field-border-color";
const TEXT_FIELD_BORDER_WIDTH_VARIABLE = "--mds-text-field-border-width";
const TEXT_FIELD_BORDER_RADIUS_VARIABLE = "--mds-text-field-border-radius";
const TEXT_FIELD_PADDING_BLOCK_VARIABLE = "--mds-text-field-padding-block";
const TEXT_FIELD_PADDING_INLINE_VARIABLE = "--mds-text-field-padding-inline";
const TEXT_FIELD_COLOR_VARIABLE = "--mds-text-field-color";
const TEXT_FIELD_PLACEHOLDER_COLOR_VARIABLE =
  "--mds-text-field-placeholder-color";
const TEXT_FIELD_DISABLED_PLACEHOLDER_COLOR_VARIABLE =
  "--mds-text-field-disabled-placeholder-color";
const TEXT_FIELD_CARET_COLOR_VARIABLE = "--mds-text-field-caret-color";
const TEXT_FIELD_HELPER_COLOR_VARIABLE = "--mds-text-field-helper-color";

type TextFieldCssVariableName =
  | typeof TEXT_FIELD_BACKGROUND_COLOR_VARIABLE
  | typeof TEXT_FIELD_BORDER_COLOR_VARIABLE
  | typeof TEXT_FIELD_BORDER_WIDTH_VARIABLE
  | typeof TEXT_FIELD_BORDER_RADIUS_VARIABLE
  | typeof TEXT_FIELD_PADDING_BLOCK_VARIABLE
  | typeof TEXT_FIELD_PADDING_INLINE_VARIABLE
  | typeof TEXT_FIELD_COLOR_VARIABLE
  | typeof TEXT_FIELD_PLACEHOLDER_COLOR_VARIABLE
  | typeof TEXT_FIELD_DISABLED_PLACEHOLDER_COLOR_VARIABLE
  | typeof TEXT_FIELD_CARET_COLOR_VARIABLE
  | typeof TEXT_FIELD_HELPER_COLOR_VARIABLE;

type TextFieldCssVar<Name extends TextFieldCssVariableName> = `var(${Name})`;

function createTextFieldVar<Name extends TextFieldCssVariableName>(
  name: Name,
): TextFieldCssVar<Name> {
  return createGlobalVar(name.slice(2)) as TextFieldCssVar<Name>;
}

export const textFieldVars = {
  backgroundColor: createTextFieldVar(TEXT_FIELD_BACKGROUND_COLOR_VARIABLE),
  borderColor: createTextFieldVar(TEXT_FIELD_BORDER_COLOR_VARIABLE),
  borderWidth: createTextFieldVar(TEXT_FIELD_BORDER_WIDTH_VARIABLE),
  borderRadius: createTextFieldVar(TEXT_FIELD_BORDER_RADIUS_VARIABLE),
  paddingBlock: createTextFieldVar(TEXT_FIELD_PADDING_BLOCK_VARIABLE),
  paddingInline: createTextFieldVar(TEXT_FIELD_PADDING_INLINE_VARIABLE),
  color: createTextFieldVar(TEXT_FIELD_COLOR_VARIABLE),
  placeholderColor: createTextFieldVar(TEXT_FIELD_PLACEHOLDER_COLOR_VARIABLE),
  disabledPlaceholderColor: createTextFieldVar(
    TEXT_FIELD_DISABLED_PLACEHOLDER_COLOR_VARIABLE,
  ),
  caretColor: createTextFieldVar(TEXT_FIELD_CARET_COLOR_VARIABLE),
  helperColor: createTextFieldVar(TEXT_FIELD_HELPER_COLOR_VARIABLE),
} as const;

type TextFieldVariantVar =
  | typeof textFieldVars.backgroundColor
  | typeof textFieldVars.disabledPlaceholderColor;

type TextFieldVariantStyle = {
  vars: Record<TextFieldVariantVar, string>;
};

const textFieldVariantStyles: Record<TextFieldVariant, TextFieldVariantStyle> =
  {
    default: {
      vars: {
        [textFieldVars.backgroundColor]:
          TEXT_FIELD_VARIANT_TOKENS.default.backgroundColor,
        [textFieldVars.disabledPlaceholderColor]:
          TEXT_FIELD_VARIANT_TOKENS.default.disabledPlaceholderColor,
      },
    },
    bold: {
      vars: {
        [textFieldVars.backgroundColor]:
          TEXT_FIELD_VARIANT_TOKENS.bold.backgroundColor,
        [textFieldVars.disabledPlaceholderColor]:
          TEXT_FIELD_VARIANT_TOKENS.bold.disabledPlaceholderColor,
      },
    },
  };

/** 루트. 헬퍼 행이 입력 컨테이너 바깥이라 헬퍼 색은 여기서 정해 상속시킨다. */
export const root = style({
  vars: {
    [textFieldVars.helperColor]: TEXT_FIELD_HELPER_TOKENS.color,
  },
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  width: "100%",
  gap: TEXT_FIELD_LAYOUT_TOKENS.rootGap,
  selectors: {
    "&:has(input:disabled)": {
      vars: {
        [textFieldVars.helperColor]: TEXT_FIELD_HELPER_TOKENS.disabledColor,
      },
    },
  },
});

export const labelBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: TEXT_FIELD_LAYOUT_TOKENS.labelBlockGap,
  paddingInline: TEXT_FIELD_LAYOUT_TOKENS.labelBlockPaddingInline,
});

export const labelRow = style({
  display: "flex",
  alignItems: "center",
  gap: TEXT_FIELD_LAYOUT_TOKENS.labelGap,
});

export const label = style({
  width: "fit-content",
  fontWeight: TEXT_FIELD_LABEL_TOKENS.fontWeight,
  fontSize: TEXT_FIELD_LABEL_TOKENS.fontSize,
  lineHeight: TEXT_FIELD_LABEL_TOKENS.lineHeight,
  letterSpacing: TEXT_FIELD_LABEL_TOKENS.letterSpacing,
  color: TEXT_FIELD_LABEL_TOKENS.color,
});

export const requiredMark = style({
  fontWeight: TEXT_FIELD_REQUIRED_TOKENS.fontWeight,
  fontSize: TEXT_FIELD_REQUIRED_TOKENS.fontSize,
  lineHeight: TEXT_FIELD_REQUIRED_TOKENS.lineHeight,
  letterSpacing: TEXT_FIELD_REQUIRED_TOKENS.letterSpacing,
  color: TEXT_FIELD_REQUIRED_TOKENS.color,
});

export const description = style({
  margin: 0,
  fontWeight: TEXT_FIELD_DESCRIPTION_TOKENS.fontWeight,
  fontSize: TEXT_FIELD_DESCRIPTION_TOKENS.fontSize,
  lineHeight: TEXT_FIELD_DESCRIPTION_TOKENS.lineHeight,
  letterSpacing: TEXT_FIELD_DESCRIPTION_TOKENS.letterSpacing,
  color: TEXT_FIELD_DESCRIPTION_TOKENS.color,
  wordBreak: "break-word",
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: TEXT_FIELD_LAYOUT_TOKENS.fieldGap,
});

export const container = style({
  vars: {
    [textFieldVars.backgroundColor]:
      TEXT_FIELD_VARIANT_TOKENS.default.backgroundColor,
    [textFieldVars.disabledPlaceholderColor]:
      TEXT_FIELD_VARIANT_TOKENS.default.disabledPlaceholderColor,
    [textFieldVars.borderColor]: TEXT_FIELD_BORDER_TOKENS.none,
    [textFieldVars.borderWidth]: TEXT_FIELD_BORDER_WIDTH,
    [textFieldVars.borderRadius]: TEXT_FIELD_CONTAINER_TOKENS.borderRadius,
    [textFieldVars.paddingBlock]: TEXT_FIELD_CONTAINER_TOKENS.paddingBlock,
    [textFieldVars.paddingInline]: TEXT_FIELD_CONTAINER_TOKENS.paddingInline,
    [textFieldVars.color]: TEXT_FIELD_INPUT_TOKENS.color,
    [textFieldVars.placeholderColor]: TEXT_FIELD_INPUT_TOKENS.placeholderColor,
    [textFieldVars.caretColor]: TEXT_FIELD_INPUT_TOKENS.caretColor,
  },
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
  width: "100%",
  borderRadius: textFieldVars.borderRadius,
  backgroundColor: textFieldVars.backgroundColor,
  // 보더는 inset boxShadow — Figma의 inside stroke와 같고 높이(46px)에 영향을 주지 않는다.
  boxShadow: `inset 0 0 0 ${textFieldVars.borderWidth} ${textFieldVars.borderColor}`,
  overflow: "hidden",
  transition: "box-shadow 150ms ease",
  selectors: {
    /**
     * border priority
     * - error > focus > none
     * 두 선택자의 특이도가 같으므로 선언 순서가 곧 우선순위다. error를 뒤에 둘 것.
     */
    "&:focus-within": {
      vars: {
        [textFieldVars.borderColor]: TEXT_FIELD_BORDER_TOKENS.focus,
      },
    },
    "&[data-error='true']": {
      vars: {
        [textFieldVars.borderColor]: TEXT_FIELD_BORDER_TOKENS.error,
      },
    },
  },
});

export const containerVariants = styleVariants(textFieldVariantStyles);

/** 실제 입력 요소. 패딩을 여기 두어 컨테이너 여백을 클릭해도 포커스가 잡힌다. */
export const input = style({
  flex: 1,
  minWidth: 0,
  margin: 0,
  boxSizing: "border-box",
  paddingBlock: textFieldVars.paddingBlock,
  paddingInline: textFieldVars.paddingInline,
  border: "none",
  outline: "none",
  background: "transparent",
  fontFamily: "inherit",
  fontWeight: TEXT_FIELD_INPUT_TOKENS.fontWeight,
  fontSize: TEXT_FIELD_INPUT_TOKENS.fontSize,
  lineHeight: TEXT_FIELD_INPUT_TOKENS.lineHeight,
  letterSpacing: TEXT_FIELD_INPUT_TOKENS.letterSpacing,
  color: textFieldVars.color,
  caretColor: textFieldVars.caretColor,
  selectors: {
    "&::placeholder": {
      color: textFieldVars.placeholderColor,
    },
    // Figma는 disabled를 placeholder 색으로만 표현한다 — 브라우저 기본 흐림을 끈다.
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 1,
      WebkitTextFillColor: textFieldVars.color,
    },
    "&:disabled::placeholder": {
      color: textFieldVars.disabledPlaceholderColor,
      WebkitTextFillColor: textFieldVars.disabledPlaceholderColor,
    },
  },
});

/** 헬퍼 행. 색은 루트의 헬퍼 색 변수를 상속한다(disabled 시 flip). */
export const helperRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: TEXT_FIELD_LAYOUT_TOKENS.helperGap,
  minHeight: TEXT_FIELD_LAYOUT_TOKENS.helperMinHeight,
  paddingInline: TEXT_FIELD_LAYOUT_TOKENS.helperPaddingInline,
  fontWeight: TEXT_FIELD_HELPER_TOKENS.fontWeight,
  fontSize: TEXT_FIELD_HELPER_TOKENS.fontSize,
  lineHeight: TEXT_FIELD_HELPER_TOKENS.lineHeight,
  letterSpacing: TEXT_FIELD_HELPER_TOKENS.letterSpacing,
  color: textFieldVars.helperColor,
});

export const helperText = style({
  flex: 1,
  minWidth: 0,
  margin: 0,
  wordBreak: "break-word",
});

/** 에러 메시지. 카운터는 error일 때도 헬퍼 색을 유지하므로 여기서만 색을 덮는다. */
export const errorMessage = style({
  display: "flex",
  alignItems: "center",
  flex: 1,
  minWidth: 0,
  margin: 0,
  gap: TEXT_FIELD_LAYOUT_TOKENS.errorGap,
  color: TEXT_FIELD_HELPER_TOKENS.errorColor,
  wordBreak: "break-word",
});

export const errorIcon = style({
  flexShrink: 0,
  width: TEXT_FIELD_LAYOUT_TOKENS.errorIconSize,
  height: TEXT_FIELD_LAYOUT_TOKENS.errorIconSize,
});

export const counter = style({
  flexShrink: 0,
  textAlign: "right",
  // 숫자 폭을 고정해 타이핑 중 카운터가 흔들리지 않게 한다.
  fontVariantNumeric: "tabular-nums",
});
