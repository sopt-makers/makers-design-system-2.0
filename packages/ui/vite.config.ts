import { resolve } from "node:path";
import { collectComponentEntries } from "@sopt-mds/vite/utils";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vanillaExtractPlugin(),
    dts({
      tsconfigPath: resolve(__dirname, "./tsconfig.lib.json"),
      entryRoot: "src",
      include: ["src"],
      exclude: ["src/**/*.stories.tsx"],
    }),
  ],
  build: {
    minify: false,
    outDir: "dist",
    lib: {
      entry: {
        index: "src/index.ts",
        ...(await collectComponentEntries()),
      },
      cssFileName: "index",
    },
    rolldownOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@sopt-mds/design-tokens",
      ],
      output: [
        {
          format: "es",
          dir: "dist",
          entryFileNames: "[name].js",
          chunkFileNames: "chunks/[name]-[hash].js",
        },
      ],
    },
  },
});
