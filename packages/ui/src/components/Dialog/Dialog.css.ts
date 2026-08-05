import { colors, radius, typography } from "@sopt-mds/design-tokens";
import { createGlobalVar, style, styleVariants } from "@vanilla-extract/css";
import {
  checkboxSizeStyles,
  type checkboxVars,
} from "../Checkbox/Checkbox.css";
import {
  DIALOG_ACTIONS_GAP,
  DIALOG_ACTIONS_MARGIN_TOP,
  DIALOG_CONTENT_GAP,
  DIALOG_DESCRIPTION_MAX_HEIGHT,
  DIALOG_DEVICE_TOKENS,
  type DialogDeviceToken,
} from "./constant";
import type { DialogDevice } from "./types";

/*
 * Dialog CSS variables
 * --mds-dialog-* 값을 컴포넌트 외부에서 오버라이드할 수 있습니다.
 */
const DIALOG_WIDTH_VARIABLE = "--mds-dialog-width";
const DIALOG_PADDING_VARIABLE = "--mds-dialog-padding";
const DIALOG_TEXT_GAP_VARIABLE = "--mds-dialog-text-gap";
const DIALOG_DESCRIPTION_FONT_WEIGHT_VARIABLE =
  "--mds-dialog-description-font-weight";
const DIALOG_DESCRIPTION_FONT_SIZE_VARIABLE =
  "--mds-dialog-description-font-size";
const DIALOG_DESCRIPTION_LINE_HEIGHT_VARIABLE =
  "--mds-dialog-description-line-height";
const DIALOG_DESCRIPTION_LETTER_SPACING_VARIABLE =
  "--mds-dialog-description-letter-spacing";
const DIALOG_BACKGROUND_COLOR_VARIABLE = "--mds-dialog-background-color";
const DIALOG_BORDER_RADIUS_VARIABLE = "--mds-dialog-border-radius";

type DialogCssVariableName =
  | typeof DIALOG_WIDTH_VARIABLE
  | typeof DIALOG_PADDING_VARIABLE
  | typeof DIALOG_TEXT_GAP_VARIABLE
  | typeof DIALOG_DESCRIPTION_FONT_WEIGHT_VARIABLE
  | typeof DIALOG_DESCRIPTION_FONT_SIZE_VARIABLE
  | typeof DIALOG_DESCRIPTION_LINE_HEIGHT_VARIABLE
  | typeof DIALOG_DESCRIPTION_LETTER_SPACING_VARIABLE
  | typeof DIALOG_BACKGROUND_COLOR_VARIABLE
  | typeof DIALOG_BORDER_RADIUS_VARIABLE;

type DialogCssVar<Name extends DialogCssVariableName> = `var(${Name})`;

function createDialogVar<Name extends DialogCssVariableName>(
  name: Name,
): DialogCssVar<Name> {
  return createGlobalVar(name.slice(2)) as DialogCssVar<Name>;
}

export const dialogVars = {
  width: createDialogVar(DIALOG_WIDTH_VARIABLE),
  padding: createDialogVar(DIALOG_PADDING_VARIABLE),
  textGap: createDialogVar(DIALOG_TEXT_GAP_VARIABLE),
  descriptionFontWeight: createDialogVar(
    DIALOG_DESCRIPTION_FONT_WEIGHT_VARIABLE,
  ),
  descriptionFontSize: createDialogVar(DIALOG_DESCRIPTION_FONT_SIZE_VARIABLE),
  descriptionLineHeight: createDialogVar(
    DIALOG_DESCRIPTION_LINE_HEIGHT_VARIABLE,
  ),
  descriptionLetterSpacing: createDialogVar(
    DIALOG_DESCRIPTION_LETTER_SPACING_VARIABLE,
  ),
  backgroundColor: createDialogVar(DIALOG_BACKGROUND_COLOR_VARIABLE),
  borderRadius: createDialogVar(DIALOG_BORDER_RADIUS_VARIABLE),
} as const;

type DialogDeviceVar =
  | typeof dialogVars.width
  | typeof dialogVars.padding
  | typeof dialogVars.textGap
  | typeof dialogVars.descriptionFontWeight
  | typeof dialogVars.descriptionFontSize
  | typeof dialogVars.descriptionLineHeight
  | typeof dialogVars.descriptionLetterSpacing;

type CheckboxSizeVar = (typeof checkboxVars)[keyof typeof checkboxVars];

type DialogDeviceStyle = {
  vars: Record<DialogDeviceVar | CheckboxSizeVar, string>;
};

/**
 * device 하나가 폭·여백·타이포·Checkbox 크기를 전부 결정한다.
 *
 * 선언은 root 한 곳에서만 하고 panel/description은 상속받아 소비한다.
 * 치수가 서로 다른 요소에 흩어져 있어도 "device를 바꾸면 세트로 바뀐다"는 사실이
 * 한 객체에 남는다.
 */
const createDeviceStyle = (token: DialogDeviceToken): DialogDeviceStyle => ({
  vars: {
    [dialogVars.width]: token.width,
    [dialogVars.padding]: token.padding,
    [dialogVars.textGap]: token.textGap,
    [dialogVars.descriptionFontWeight]: `${token.descriptionTypography.fontWeight}`,
    [dialogVars.descriptionFontSize]: token.descriptionTypography.fontSize,
    [dialogVars.descriptionLineHeight]: token.descriptionTypography.lineHeight,
    [dialogVars.descriptionLetterSpacing]:
      token.descriptionTypography.letterSpacing,
    // 본문 Checkbox가 `size`를 생략하면 이 값을 상속받는다.
    ...checkboxSizeStyles[token.checkboxSize].vars,
  },
});

const dialogDeviceStyles: Record<DialogDevice, DialogDeviceStyle> = {
  mobile: createDeviceStyle(DIALOG_DEVICE_TOKENS.mobile),
  pc: createDeviceStyle(DIALOG_DEVICE_TOKENS.pc),
};

/**
 * 최상위 `<dialog>`.
 *
 * 폭은 device가 정하는 고정값이다. 뷰포트·컨테이너 폭에서 파생되는 값이 하나도 없어야
 * 하므로(2026-08-05 디자인 QA) 컨테이너 쿼리를 쓰지 않는다. 화면 크기에 따라 다른 폭이
 * 필요하면 앱이 `device`를 골라 넘긴다.
 */
export const root = style({
  vars: {
    ...dialogDeviceStyles.mobile.vars,
    [dialogVars.backgroundColor]: colors.bg.neutral.ghost,
    [dialogVars.borderRadius]: radius.r14,
  },
  boxSizing: "border-box",
  width: dialogVars.width,
  // UA 스타일시트가 `<dialog>`에 max-width: calc(100% - 6px - 2em)을 건다.
  // 그대로 두면 좁은 뷰포트에서 폭이 줄어 고정이 깨지므로 해제한다.
  maxWidth: "none",
  padding: 0,
  border: "none",
  borderRadius: dialogVars.borderRadius,
  backgroundColor: dialogVars.backgroundColor,
  color: colors.fg.neutral.bold,
  // 진입만 넣는다. 퇴장 트랜지션은 `overlay` 속성이 필요한데 Chrome 전용이라
  // 넣으면 브라우저마다 다르게 보인다.
  transition: "opacity 150ms ease, transform 150ms ease",
  "@starting-style": {
    opacity: 0,
    transform: "scale(0.96)",
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: "none",
    },
  },
  selectors: {
    "&::backdrop": {
      backgroundColor: colors.bg.dim.default,
    },
  },
});

/** device별 `--mds-dialog-*` 선언 묶음. root에 붙는다. */
export const deviceVariants = styleVariants(dialogDeviceStyles);

/** 실제 콘텐츠 상자. root는 여백 없이 폭만 잡고, 안쪽 여백은 여기서 건다. */
export const panel = style({
  display: "flex",
  flexDirection: "column",
  gap: DIALOG_CONTENT_GAP,
  padding: dialogVars.padding,
});

export const title = style({
  margin: 0,
  color: colors.fg.neutral.bold,
  fontWeight: `${typography.heading3.fontWeight}`,
  fontSize: typography.heading3.fontSize,
  lineHeight: typography.heading3.lineHeight,
  letterSpacing: typography.heading3.letterSpacing,
});

/*
 * 간격 계산 — panel의 gap은 DIALOG_CONTENT_GAP(24, Figma "Container" gap)이고,
 * 그보다 좁아야 하는 두 곳만 음수 마진으로 끌어올린다.
 *
 *   Title → Description   8/12  = 24 + (textGap - 24)
 *   Description → 본문     24    = gap 그대로
 *   본문 → Actions        20    = 24 + (20 - 24)
 *
 * 본문(Checkbox 등)은 임의의 자식이라 선택자로 잡을 수 없다. gap을 24로 두고
 * 예외 두 개만 당기는 편이, 모든 자식에 마진을 깔고 되돌리는 것보다 조합이 안전하다.
 * (Description·Checkbox·Actions 중 무엇이 빠져도 나머지 간격이 유지된다.)
 */
export const description = style({
  marginTop: `calc(${dialogVars.textGap} - ${DIALOG_CONTENT_GAP})`,
  marginBottom: 0,
  maxHeight: DIALOG_DESCRIPTION_MAX_HEIGHT,
  overflowY: "auto",
  overscrollBehavior: "contain",
  color: colors.fg.neutral.default,
  fontWeight: dialogVars.descriptionFontWeight,
  fontSize: dialogVars.descriptionFontSize,
  lineHeight: dialogVars.descriptionLineHeight,
  letterSpacing: dialogVars.descriptionLetterSpacing,
});

export const actions = style({
  display: "flex",
  gap: DIALOG_ACTIONS_GAP,
  marginTop: `calc(${DIALOG_ACTIONS_MARGIN_TOP} - ${DIALOG_CONTENT_GAP})`,
});

/**
 * 버튼 폭 — 개수와 device에 무관하게 항상 행을 채운다.
 * 2개면 gap을 뺀 폭을 절반씩 나누고, 1개면 행 전체를 차지한다.
 *
 * 처음에는 좁은 폭에서 버튼이 1개일 때만 내용 폭에 맞췄다. Figma가 그렇게
 * 그려져 있었기 때문인데, 이는 Figma의 실수였고 디자이너가 Figma를 full width로
 * 수정했다(2026-07-25 디자인 QA 확정). 그래서 예외를 지웠다.
 *
 * 덕분에 "버튼이 1개"(Information 변형)라는 조건을 CSS가 알아야 할 이유도 없어졌다.
 * 변형은 Dialog.Cancel을 렌더하지 않는 합성으로만 파생되고, 폭 규칙은 flex 하나로 끝난다.
 */
export const actionButton = style({
  flex: "1 1 0%",
  minWidth: 0,
});
