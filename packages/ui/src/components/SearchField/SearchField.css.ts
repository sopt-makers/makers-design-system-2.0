import { style, styleVariants } from "@vanilla-extract/css";
import {
  FIELD_CONTAINER_TOKENS,
  FIELD_FOCUS_BORDER_WIDTH,
  FIELD_INPUT_TOKENS,
  SEARCH_FIELD_CLEAR_ICON_COLOR,
  SEARCH_FIELD_ICON_SIZE,
  SEARCH_FIELD_SEARCH_ICON_COLOR,
  SEARCH_FIELD_VARIANT_TOKENS,
} from "./constant";

/** 컨테이너. 포커스 보더는 inset boxShadow라 높이(46px)에 영향을 주지 않는다. */
export const root = style({
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
  width: "100%",
  gap: FIELD_CONTAINER_TOKENS.gap,
  padding: `${FIELD_CONTAINER_TOKENS.paddingBlock} ${FIELD_CONTAINER_TOKENS.paddingInline}`,
  borderRadius: FIELD_CONTAINER_TOKENS.borderRadius,
  overflow: "hidden",
  cursor: "text",
  selectors: {
    "&:focus-within": {
      boxShadow: `inset 0 0 0 ${FIELD_FOCUS_BORDER_WIDTH} ${FIELD_CONTAINER_TOKENS.focusBorderColor}`,
    },
  },
});

export const rootVariants = styleVariants(
  SEARCH_FIELD_VARIANT_TOKENS,
  (token) => ({
    backgroundColor: token.backgroundColor,
  }),
);

/** 실제 입력 요소. WebKit 기본 클리어 버튼은 커스텀 클리어와 중복이라 제거한다. */
export const input = style({
  flex: 1,
  minWidth: 0,
  padding: 0,
  border: "none",
  outline: "none",
  background: "transparent",
  fontFamily: "inherit",
  fontWeight: FIELD_INPUT_TOKENS.fontWeight,
  fontSize: FIELD_INPUT_TOKENS.fontSize,
  lineHeight: FIELD_INPUT_TOKENS.lineHeight,
  letterSpacing: FIELD_INPUT_TOKENS.letterSpacing,
  color: FIELD_INPUT_TOKENS.color,
  caretColor: FIELD_INPUT_TOKENS.caretColor,
  selectors: {
    "&::placeholder": {
      color: FIELD_INPUT_TOKENS.placeholderColor,
    },
    "&::-webkit-search-cancel-button, &::-webkit-search-decoration": {
      display: "none",
    },
  },
});

/** 좌측 검색 아이콘 (장식, 항상 표시). */
export const searchIcon = style({
  flexShrink: 0,
  width: SEARCH_FIELD_ICON_SIZE,
  height: SEARCH_FIELD_ICON_SIZE,
  color: SEARCH_FIELD_SEARCH_ICON_COLOR,
});

/** 클리어 버튼. 값이 있을 때만 렌더되므로 상태별 스타일이 없다. */
export const clearButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: SEARCH_FIELD_ICON_SIZE,
  height: SEARCH_FIELD_ICON_SIZE,
  padding: 0,
  border: 0,
  background: "none",
  cursor: "pointer",
  color: SEARCH_FIELD_CLEAR_ICON_COLOR,
});

/** 클리어 글리프. 버튼 크기를 가득 채운다. */
export const clearIcon = style({
  width: "100%",
  height: "100%",
});
