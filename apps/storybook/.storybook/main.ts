import { resolve } from "node:path";
import "@sopt-mds/ui/index.css";
import type { StorybookConfig } from "@storybook/react-vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { mergeConfig } from "vite";

const repoRoot = resolve(process.cwd(), "../..");

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(ts|tsx)",
    {
      directory: resolve(repoRoot, "packages/ui/src"),
      files: "**/*.stories.@(ts|tsx)",
      titlePrefix: "Components",
    },
    {
      directory: resolve(repoRoot, "packages/design-tokens/src"),
      files: "**/*.stories.@(ts|tsx|mdx)",
      titlePrefix: "Design Tokens",
    },
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      include: [resolve(repoRoot, "packages/ui/src/**/*.tsx")],
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  docs: {
    defaultName: "소개",
    autodocs: true,
  },
  viteFinal: (viteConfig) =>
    mergeConfig(viteConfig, {
      plugins: [vanillaExtractPlugin()],
    }),
};

export default config;
