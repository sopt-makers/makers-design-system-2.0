import { colors } from "@sopt-mds/design-tokens";
import { globalStyle } from "@vanilla-extract/css";

/**
 * 전역 리셋 + 다크 테마 베이스.
 * system web은 Figma 시안 그대로 다크 테마 단일 모드로 시작한다.
 */
globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

/**
 * 폼 컨트롤(button·input 등)은 기본적으로 부모(body)의 글꼴을 상속하지 않아
 * 브라우저 기본 글꼴(Arial 등)로 렌더된다. 디자인 글꼴(SUIT)에 맞추기 위해
 * 명시적으로 상속시킨다. (예: 사이드바 "Colors" 그룹 헤더 button)
 */
globalStyle("button, input, select, textarea, optgroup", {
  font: "inherit",
  letterSpacing: "inherit",
});

globalStyle("html, body", {
  margin: 0,
  padding: 0,
});

globalStyle("html", {
  scrollBehavior: "smooth",
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
