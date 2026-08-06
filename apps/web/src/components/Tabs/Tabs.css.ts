import { colors, spacing, typography } from "@sopt-mds/design-tokens";
import { globalStyle, style } from "@vanilla-extract/css";

/** 활성 탭 하단 인디케이터 두께 — 상단 내비게이션과 같은 값. */
const ACTIVE_INDICATOR_WIDTH = 2;

export const tabs = style({
  display: "flex",
  flexDirection: "column",
  gap: spacing.s24,
  marginBlock: spacing.s24,
});

export const tabList = style({
  display: "flex",
  gap: spacing.s24,
  borderBottom: `1px solid ${colors.stroke.neutral.ghost}`,
});

/**
 * 탭 버튼.
 *
 * 비활성도 투명 보더를 깔아 자리를 예약한다. 선택이 바뀔 때 글자가 2px 튀지 않게 하려는
 * 것이며, 상단 내비게이션이 패딩 차이로 푸는 것과 다르다 — 여기는 아래에 실선이 있어
 * 패딩을 흔들면 실선과의 간격까지 같이 흔들린다.
 */
export const tab = style({
  ...typography.label2,
  paddingBottom: spacing.s8,
  border: "none",
  borderBottom: `${ACTIVE_INDICATOR_WIDTH}px solid transparent`,
  background: "transparent",
  color: colors.fg.neutral.ghost,
  cursor: "pointer",
  transition: "color 150ms ease",
  selectors: {
    "&:hover": {
      color: colors.fg.neutral.default,
    },
  },
});

export const tabActive = style({
  color: colors.fg.neutral.bold,
  borderBottomColor: colors.fg.neutral.bold,
  selectors: {
    // 활성 탭은 hover에도 bold 색을 유지한다.
    "&:hover": {
      color: colors.fg.neutral.bold,
    },
  },
});

export const panel = style({});

// 패널 첫 요소의 상단 마진이 탭과의 간격을 흔들지 않게 한다.
// 자식은 문서가 넣는 임의의 MDX 요소라 선택자로만 잡을 수 있다.
globalStyle(`${panel} > :first-child`, {
  marginTop: 0,
});
