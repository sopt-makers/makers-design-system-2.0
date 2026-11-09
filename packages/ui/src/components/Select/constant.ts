import { colors, radius, spacing, typography } from "@sopt-mds/design-tokens";
import type { SelectType } from "./types";

/**
 * 색상 토큰. (Figma node 3847-4034, 3847-4070)
 * 모든 값은 @sopt-mds/design-tokens 시맨틱 토큰에서 가져온다.
 */
export const SELECT_COLORS = {
  /** 트리거·메뉴 배경 */
  background: colors.bg.neutral.ghost,
  /** 입력 텍스트·아이템 라벨 */
  text: colors.fg.neutral.bold,
  /** placeholder·description */
  subtleText: colors.fg.neutral.subtle,
  /** Active(열림) 트리거 테두리 */
  activeBorder: colors.stroke.neutral.inverse,
  /** 키보드 포커스 링 */
  focusRing: colors.stroke.neutral.defaultFocused,
  /** 아이템 hover·키보드 활성 배경 */
  itemHighlight: colors.bg.neutral.ghostHover,
  /** text 타입 체크 표시 */
  check: colors.fg.secondary.default,
  /** 다중 선택 개수 tag */
  countBackground: colors.bg.secondary.subtle,
  countText: colors.fg.secondary.default,
} as const;

export const SELECT_TRIGGER_TOKENS = {
  paddingBlock: spacing.s12,
  paddingInline: spacing.s16,
  borderRadius: radius.r10,
  gap: spacing.s12,
  iconSize: spacing.s20,
  /** 전용 토큰 부재로 리터럴 (Figma min-w 100). */
  minWidth: "100px",
  /** 전용 토큰 부재로 리터럴 (Figma h 46 고정, 다중 선택 개수 tag가 있어도 유지). */
  height: "46px",
  typography: typography.label2,
} as const;

export const SELECT_COUNT_TOKENS = {
  paddingBlock: spacing.s4,
  paddingInline: spacing.s8,
  borderRadius: radius.r4,
  typography: typography.label4,
} as const;

export const SELECT_MENU_TOKENS = {
  padding: spacing.s8,
  borderRadius: radius.r12,
  /** 트리거와 메뉴 사이 간격(px). floating-ui offset에 숫자로 넘긴다. */
  offset: 10,
  /**
   * 전용 토큰 부재로 리터럴 (Chip 관례와 동일).
   * 메뉴는 top layer(Popover API)에 떠서 z-index와 무관하다. Popover API 미지원 브라우저용 값이다.
   */
  zIndex: 1,
} as const;

export const SELECT_ITEM_TOKENS = {
  paddingBlock: spacing.s8,
  borderRadius: radius.r8,
  iconSize: spacing.s16,
  checkSize: spacing.s20,
  label: typography.label2,
  description: typography.label3,
} as const;

export type SelectTypeToken = {
  /** 메뉴의 아이템 간격 */
  menuGap: string;
  /** 메뉴 최소 너비 (트리거 폭보다 좁아지지 않는다) */
  menuMinWidth?: string;
  itemPaddingLeft: string;
  itemPaddingRight: string;
  itemGap: string;
};

/** type별 메뉴·아이템 치수. Figma Type마다 padding/gap이 다르다. */
export const SELECT_TYPE_TOKENS: Record<SelectType, SelectTypeToken> = {
  icon: {
    menuGap: spacing.s4,
    itemPaddingLeft: spacing.s10,
    itemPaddingRight: spacing.s12,
    itemGap: spacing.s8,
  },
  text: {
    menuGap: spacing.s0,
    itemPaddingLeft: spacing.s12,
    itemPaddingRight: spacing.s8,
    itemGap: spacing.s10,
  },
  userList: {
    menuGap: spacing.s0,
    itemPaddingLeft: spacing.s8,
    itemPaddingRight: spacing.s12,
    itemGap: spacing.s12,
  },
  checkbox: {
    menuGap: spacing.s4,
    /** 전용 토큰 부재로 리터럴 (Figma min-w 125). */
    menuMinWidth: "125px",
    itemPaddingLeft: spacing.s8,
    itemPaddingRight: spacing.s12,
    itemGap: spacing.s8,
  },
};

/** 트리거 테두리 두께 — 전용 토큰 부재로 리터럴 (Checkbox 관례와 동일). */
export const SELECT_BORDER_WIDTH = "1px";
/** 포커스 링 두께/오프셋 — 전용 토큰 부재로 리터럴 (Checkbox 관례와 동일). */
export const SELECT_FOCUS_RING_WIDTH = "2px";
export const SELECT_FOCUS_RING_OFFSET = "2px";
