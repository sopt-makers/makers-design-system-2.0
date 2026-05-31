import { colors } from "@sopt-mds/design-tokens";
import { globalStyle } from "@vanilla-extract/css";

/**
 * 전역 리셋 + 다크 테마 베이스.
 * system web은 Figma 시안 그대로 다크 테마 단일 모드로 시작한다.
 */
globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("html, body", {
  margin: 0,
  padding: 0,
});

globalStyle("body", {
  backgroundColor: colors.base.gray950,
  color: colors.fg.neutral.default,
  fontFamily:
    '"SUIT Variable", "SUIT", -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", sans-serif',
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle("#root", {
  minHeight: "100vh",
});
