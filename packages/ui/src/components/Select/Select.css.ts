import {
  createGlobalVar,
  globalStyle,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import {
  SELECT_BORDER_WIDTH,
  SELECT_COLORS,
  SELECT_COUNT_TOKENS,
  SELECT_FOCUS_RING_OFFSET,
  SELECT_FOCUS_RING_WIDTH,
  SELECT_ITEM_TOKENS,
  SELECT_MENU_TOKENS,
  SELECT_TRIGGER_TOKENS,
  SELECT_TYPE_TOKENS,
} from "./constant";

const trigger = SELECT_TRIGGER_TOKENS;
const item = SELECT_ITEM_TOKENS;

/** floating-ui `size` 미들웨어가 메뉴 요소에 트리거 폭을 넣는 변수. */
export const SELECT_TRIGGER_WIDTH_VARIABLE = "--mds-select-trigger-width";
const triggerWidthVar = createGlobalVar(SELECT_TRIGGER_WIDTH_VARIABLE.slice(2));

/** 폭은 부모를 채운다. 사용처가 className으로 너비를 정한다. */
export const root = style({
  width: "100%",
  minWidth: trigger.minWidth,
});

/*
 * 상태는 prop이 아니라 속성으로 구동한다.
 * - Active: aria-expanded="true"
 * - Default/Filled: placeholder 여부(valueText의 data-placeholder)
 */
export const triggerButton = style({
  display: "flex",
  alignItems: "center",
  gap: trigger.gap,
  boxSizing: "border-box",
  width: "100%",
  height: trigger.height,
  margin: 0,
  padding: `${trigger.paddingBlock} ${trigger.paddingInline}`,
  border: "none",
  borderRadius: trigger.borderRadius,
  backgroundColor: SELECT_COLORS.background,
  color: SELECT_COLORS.text,
  fontFamily: "inherit",
  fontWeight: trigger.typography.fontWeight,
  fontSize: trigger.typography.fontSize,
  lineHeight: trigger.typography.lineHeight,
  letterSpacing: trigger.typography.letterSpacing,
  textAlign: "start",
  cursor: "pointer",
  WebkitTapHighlightColor: "transparent",
  selectors: {
    // Figma의 안쪽 stroke와 같게, 높이를 바꾸지 않는 inset 그림자로 테두리를 그린다.
    '&[aria-expanded="true"]': {
      boxShadow: `inset 0 0 0 ${SELECT_BORDER_WIDTH} ${SELECT_COLORS.activeBorder}`,
    },
    // 열려 있으면 Active 테두리가 포커스를 이미 보여준다.
    '&:focus-visible:not([aria-expanded="true"])': {
      outline: `${SELECT_FOCUS_RING_WIDTH} solid ${SELECT_COLORS.focusRing}`,
      outlineOffset: SELECT_FOCUS_RING_OFFSET,
    },
  },
});

export const valueText = style({
  flex: 1,
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  selectors: {
    "&[data-placeholder]": {
      color: SELECT_COLORS.subtleText,
    },
  },
});

export const count = style({
  flexShrink: 0,
  padding: `${SELECT_COUNT_TOKENS.paddingBlock} ${SELECT_COUNT_TOKENS.paddingInline}`,
  borderRadius: SELECT_COUNT_TOKENS.borderRadius,
  backgroundColor: SELECT_COLORS.countBackground,
  color: SELECT_COLORS.countText,
  fontWeight: SELECT_COUNT_TOKENS.typography.fontWeight,
  fontSize: SELECT_COUNT_TOKENS.typography.fontSize,
  lineHeight: SELECT_COUNT_TOKENS.typography.lineHeight,
  letterSpacing: SELECT_COUNT_TOKENS.typography.letterSpacing,
});

export const chevron = style({
  flexShrink: 0,
  width: trigger.iconSize,
  height: trigger.iconSize,
});

export const menu = style({
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  // popover 기본 스타일(inset 0, margin auto, 테두리, 글자색)을 지운다. 위치는 floating-ui가 정한다.
  inset: "auto",
  margin: 0,
  padding: SELECT_MENU_TOKENS.padding,
  border: "none",
  borderRadius: SELECT_MENU_TOKENS.borderRadius,
  backgroundColor: SELECT_COLORS.background,
  color: SELECT_COLORS.text,
  overflowY: "auto",
  zIndex: SELECT_MENU_TOKENS.zIndex,
  outline: "none",
  selectors: {
    "&[hidden]": {
      display: "none",
    },
  },
});

export const menuTypeVariants = styleVariants(SELECT_TYPE_TOKENS, (token) => ({
  gap: token.menuGap,
  // 메뉴는 트리거보다 좁아지지 않는다. type별 최소 너비가 있으면 둘 중 큰 값.
  minWidth: token.menuMinWidth
    ? `max(${triggerWidthVar}, ${token.menuMinWidth})`
    : triggerWidthVar,
}));

export const itemBase = style({
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
  paddingBlock: item.paddingBlock,
  borderRadius: item.borderRadius,
  color: SELECT_COLORS.text,
  cursor: "pointer",
  userSelect: "none",
  selectors: {
    "&[data-highlighted]": {
      backgroundColor: SELECT_COLORS.itemHighlight,
    },
  },
});

export const itemTypeVariants = styleVariants(SELECT_TYPE_TOKENS, (token) => [
  itemBase,
  {
    paddingLeft: token.itemPaddingLeft,
    paddingRight: token.itemPaddingRight,
    gap: token.itemGap,
  },
]);

export const itemIcon = style({
  display: "inline-flex",
  flexShrink: 0,
  width: item.iconSize,
  height: item.iconSize,
});

// icon 내부 아이콘(svg)은 icon 크기를 채웁니다.
globalStyle(`${itemIcon} > svg`, {
  width: "100%",
  height: "100%",
});

export const itemText = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  minWidth: 0,
});

export const itemLabel = style({
  fontWeight: item.label.fontWeight,
  fontSize: item.label.fontSize,
  lineHeight: item.label.lineHeight,
  letterSpacing: item.label.letterSpacing,
});

export const itemDescription = style({
  color: SELECT_COLORS.subtleText,
  fontWeight: item.description.fontWeight,
  fontSize: item.description.fontSize,
  lineHeight: item.description.lineHeight,
  letterSpacing: item.description.letterSpacing,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const itemCheck = style({
  flexShrink: 0,
  width: item.checkSize,
  height: item.checkSize,
  color: SELECT_COLORS.check,
});

/** 시각용 체크박스. 선택은 option의 aria-selected가 전달하므로 상호작용을 막는다. */
export const itemCheckbox = style({
  display: "inline-flex",
  pointerEvents: "none",
});
