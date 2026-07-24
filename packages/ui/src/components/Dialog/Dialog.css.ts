import { colors, radius, typography } from "@sopt-mds/design-tokens";
import { createGlobalVar, fallbackVar, style } from "@vanilla-extract/css";
import { checkboxSizeStyles } from "../Checkbox/Checkbox.css";
import {
  DIALOG_ACTIONS_GAP,
  DIALOG_ACTIONS_MARGIN_TOP,
  DIALOG_CONTAINER_BREAKPOINT,
  DIALOG_CONTENT_GAP,
  DIALOG_DEFAULT_WIDTH,
  DIALOG_DESCRIPTION_MAX_HEIGHT,
  DIALOG_LAYOUT_TOKENS,
  type DialogLayout,
} from "./constant";

/*
 * Dialog CSS variables
 * --mds-dialog-* 값을 컴포넌트 외부에서 오버라이드할 수 있습니다.
 */
const DIALOG_WIDTH_VARIABLE = "--mds-dialog-width";
const DIALOG_PADDING_VARIABLE = "--mds-dialog-padding";
const DIALOG_TEXT_GAP_VARIABLE = "--mds-dialog-text-gap";
const DIALOG_BACKGROUND_COLOR_VARIABLE = "--mds-dialog-background-color";
const DIALOG_BORDER_RADIUS_VARIABLE = "--mds-dialog-border-radius";

type DialogCssVariableName =
  | typeof DIALOG_WIDTH_VARIABLE
  | typeof DIALOG_PADDING_VARIABLE
  | typeof DIALOG_TEXT_GAP_VARIABLE
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
  backgroundColor: createDialogVar(DIALOG_BACKGROUND_COLOR_VARIABLE),
  borderRadius: createDialogVar(DIALOG_BORDER_RADIUS_VARIABLE),
} as const;

type DialogLayoutVar = typeof dialogVars.padding | typeof dialogVars.textGap;

const dialogLayoutVars = (
  layout: DialogLayout,
): Record<DialogLayoutVar, string> => ({
  [dialogVars.padding]: DIALOG_LAYOUT_TOKENS[layout].padding,
  [dialogVars.textGap]: DIALOG_LAYOUT_TOKENS[layout].textGap,
});

const wideContainer = `(min-width: ${DIALOG_CONTAINER_BREAKPOINT})`;

/**
 * 최상위 `<dialog>`.
 *
 * width는 `vars`로 선언하지 않고 폴백으로만 소비한다. 앱이 자기 브레이크포인트로
 * 조상에서 덮어쓰는 지점이라, root가 선언하면 상속이 막혀 오버라이드가 불가능해진다.
 * (Checkbox의 `--mds-checkbox-*`와 같은 이유)
 *
 * `container-type: inline-size`로 자신을 컨테이너로 만들어, 내부 레이아웃이
 * 뷰포트가 아니라 **자기 폭**에서 파생되게 한다. 덕분에 전역 브레이크포인트가 필요 없고,
 * 앱이 400px을 걸어도 좁은 화면에서 UA가 클램프하면 자동으로 narrow로 내려간다.
 */
export const root = style({
  vars: {
    [dialogVars.backgroundColor]: colors.bg.neutral.ghost,
    [dialogVars.borderRadius]: radius.r14,
  },
  containerType: "inline-size",
  boxSizing: "border-box",
  width: fallbackVar(dialogVars.width, DIALOG_DEFAULT_WIDTH),
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

/**
 * 실제 콘텐츠 상자. padding을 root가 아니라 여기서 거는 이유는
 * `container-type: inline-size`가 만드는 컨테이너 폭이 root의 content-box라서,
 * root에 padding을 주면 컨테이너 폭이 padding만큼 줄어 임계값 계산이 어긋나기 때문이다.
 */
export const panel = style({
  vars: {
    ...dialogLayoutVars("narrow"),
    // 조상에서 Checkbox 치수를 주입한다. Checkbox가 `size`를 생략하면 이 값을 상속받는다.
    ...checkboxSizeStyles.small.vars,
  },
  display: "flex",
  flexDirection: "column",
  gap: DIALOG_CONTENT_GAP,
  padding: dialogVars.padding,
  "@container": {
    [wideContainer]: {
      vars: {
        ...dialogLayoutVars("wide"),
        ...checkboxSizeStyles.large.vars,
      },
    },
  },
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
  fontWeight: `${typography.body2.fontWeight}`,
  fontSize: typography.body2.fontSize,
  lineHeight: typography.body2.lineHeight,
  letterSpacing: typography.body2.letterSpacing,
  "@container": {
    [wideContainer]: {
      fontSize: typography.body1.fontSize,
      lineHeight: typography.body1.lineHeight,
      letterSpacing: typography.body1.letterSpacing,
    },
  },
});

export const actions = style({
  display: "flex",
  gap: DIALOG_ACTIONS_GAP,
  marginTop: `calc(${DIALOG_ACTIONS_MARGIN_TOP} - ${DIALOG_CONTENT_GAP})`,
});

/**
 * 버튼 폭 — Figma를 그대로 옮긴 것이다.
 *
 * 버튼이 2개면 좁든 넓든 항상 절반씩 채운다. 1개일 때만 갈리는데,
 * 좁으면 내용만큼(hug), 넓으면 가득 찬다.
 *
 * `:only-child`라서 "버튼이 1개"라는 조건이 곧 Information 변형이 된다 —
 * Dialog.Cancel을 렌더하지 않는 것만으로 축이 파생되므로 prop이 필요 없다.
 */
export const actionButton = style({
  flex: "1 1 0%",
  minWidth: 0,
  selectors: {
    "&:only-child": {
      flex: "0 0 auto",
    },
  },
  "@container": {
    [wideContainer]: {
      selectors: {
        "&:only-child": {
          flex: "1 1 0%",
        },
      },
    },
  },
});
