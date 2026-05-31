import { colors } from "@sopt-mds/design-tokens";
import { style } from "@vanilla-extract/css";

/**
 * ≤768에서 햄버거로 여는 풀스크린 메뉴.
 * 화면 전체를 덮으며(스크림/드로어 없음) 닫기 버튼 + Sidebar로 구성된다.
 */
export const panel = style({
  position: "fixed",
  inset: 0,
  zIndex: 20,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: 16,
  paddingBlock: 24,
  paddingInline: 24,
  overflowY: "auto",
  backgroundColor: colors.base.gray950,
});

/** 닫기 버튼 행 — 우측 상단. */
export const closeRow = style({
  display: "flex",
  justifyContent: "flex-end",
});

export const closeButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  border: "none",
  background: "transparent",
  color: colors.fg.neutral.bold,
  cursor: "pointer",
});
