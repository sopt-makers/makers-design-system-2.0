import mdx from "@mdx-js/rollup";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import rehypeSlug from "rehype-slug";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    // MDX는 react 플러그인보다 먼저 동작해 .mdx를 JSX로 변환해야 한다.
    // rehype-slug: 헤딩에 자동 id 부여 → TOC 앵커/스크롤 스파이의 전제.
    {
      enforce: "pre",
      ...mdx({
        providerImportSource: "@mdx-js/react",
        rehypePlugins: [rehypeSlug],
      }),
    },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    vanillaExtractPlugin(),
  ],
});
