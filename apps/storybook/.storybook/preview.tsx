import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";
import "@makers/design-tokens/tokens.css";
import "./preview.css";

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: { light: "theme-light", dark: "theme-dark" },
      defaultTheme: "light",
    }),
  ],
  parameters: {
    layout: "centered",
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Introduction", "Design Tokens", "Components"],
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
