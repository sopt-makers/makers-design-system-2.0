import { spacing } from "@sopt-mds/design-tokens";
import { style, styleVariants } from "@vanilla-extract/css";
import {
  TABS_COLORS,
  TABS_LINE_WIDTH,
  TABS_SIZE_TOKENS,
  TABS_VARIANT_TOKENS,
} from "./constant";

/** 2.0 공통 포커스 링. */
const FOCUS_RING = `2px solid ${TABS_COLORS.focusRing}`;

/** flex/grid 자식이어도 탭 목록의 min-content만큼 늘어나지 않게 해 hug 스크롤이 동작하게 한다. */
export const root = style({
  minWidth: 0,
});

export const list = style({
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
  width: "100%",
  margin: 0,
  padding: 0,
});

/**
 * divider는 배경으로 그린다. 스크롤 컨테이너의 배경(background-attachment: scroll)은
 * 내용과 함께 움직이지 않으므로 hug에서 스크롤해도 고정되고, 자식인 Trigger의
 * 인디케이터가 그 위에 겹친다. 두 선 모두 컨테이너 안쪽 맨 아래 2px에 놓인다.
 */
export const divider = style({
  backgroundImage: `linear-gradient(${TABS_COLORS.divider}, ${TABS_COLORS.divider})`,
  backgroundSize: `100% ${TABS_LINE_WIDTH}`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
});

export const listVariants = styleVariants({
  fill: {},
  hug: {
    overflowX: "auto",
    overflowY: "hidden",
    scrollbarWidth: "none",
    selectors: {
      "&::-webkit-scrollbar": { display: "none" },
    },
  },
});

export const trigger = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  gap: spacing.s4,
  boxSizing: "border-box",
  margin: 0,
  paddingBlock: 0,
  border: "none",
  background: "transparent",
  appearance: "none",
  color: TABS_COLORS.label,
  cursor: "pointer",
  fontFamily: "inherit",
  textDecoration: "none",
  whiteSpace: "nowrap",
  userSelect: "none",
  transition: "color 150ms ease",
  selectors: {
    "&[aria-selected='true']": {
      color: TABS_COLORS.labelSelected,
    },
    // 선택된 탭이 disabled인 조합은 Figma에 없어 disabled 모양을 우선한다.
    "&:disabled, &[aria-disabled='true']": {
      color: TABS_COLORS.labelDisabled,
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      outline: FOCUS_RING,
    },
    "&::after": {
      content: "",
      position: "absolute",
      bottom: 0,
      height: TABS_LINE_WIDTH,
      backgroundColor: TABS_COLORS.indicator,
      visibility: "hidden",
    },
    "&[aria-selected='true']:not(:disabled):not([aria-disabled='true'])::after":
      {
        visibility: "visible",
      },
  },
});

export const triggerSizeVariants = styleVariants(TABS_SIZE_TOKENS, (token) => ({
  height: token.height,
  fontWeight: token.fontWeight,
  fontSize: token.fontSize,
  lineHeight: token.lineHeight,
  letterSpacing: token.letterSpacing,
}));

export const triggerVariants = styleVariants({
  /** 영역 너비 균등 분할. 라벨 + Tag 묶음은 가운데 정렬. */
  fill: {
    flex: "1 1 0",
    minWidth: 0,
    justifyContent: "center",
    paddingInline: TABS_VARIANT_TOKENS.fill.paddingInline,
    selectors: {
      "&::after": {
        left: TABS_VARIANT_TOKENS.fill.indicatorInset,
        right: TABS_VARIANT_TOKENS.fill.indicatorInset,
      },
      "&:focus-visible": { outlineOffset: "2px" },
    },
  },
  /** 내용 폭. 줄바꿈·축소 없음. */
  hug: {
    flex: "none",
    paddingInline: TABS_VARIANT_TOKENS.hug.paddingInline,
    selectors: {
      "&::after": {
        left: TABS_VARIANT_TOKENS.hug.indicatorInset,
        right: TABS_VARIANT_TOKENS.hug.indicatorInset,
      },
      // 스크롤 컨테이너가 바깥 링을 잘라내므로 안쪽으로 그린다.
      "&:focus-visible": { outlineOffset: "-2px" },
    },
  },
});

export const tag = style({
  flexShrink: 0,
});
