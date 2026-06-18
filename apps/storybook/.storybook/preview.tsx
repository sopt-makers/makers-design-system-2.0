import { withThemeByClassName } from "@storybook/addon-themes";
import type { Decorator, Preview } from "@storybook/react";
import "./preview.css";

/**
 * DS는 다크 배경 전제(foreground 토큰이 거의 흰색)라, 스토리가 흰 배경에 놓이면
 * 컴포넌트가 보이지 않는다. 모든 스토리를 테마에 맞는 캔버스 박스로 감싸
 * Canvas/Docs 어느 모드에서나 컴포넌트가 올바른 배경 위에 렌더되게 한다.
 */
const CANVAS_BG: Record<string, string> = {
  light: "#ffffff",
  dark: "#0f1012", // base.gray950
};

const withCanvasBackground: Decorator = (Story, context) => {
  const theme = (context.globals.theme as string | undefined) ?? "dark";

  return (
    <div
      data-canvas-theme={theme}
      style={{
        background: CANVAS_BG[theme] ?? CANVAS_BG.dark,
        padding: 24,
        borderRadius: 8,
      }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: { light: "theme-light", dark: "theme-dark" },
      defaultTheme: "dark",
    }),
    withCanvasBackground,
  ],
  parameters: {
    layout: "centered",
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Introduction", "Design Tokens", "Icons", "Components"],
      },
    },
    backgrounds: { disable: true },
    docs: {
      toc: true,
    },
  },
  tags: ["autodocs"],
};

export default preview;
