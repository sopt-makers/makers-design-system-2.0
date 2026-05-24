import { resolve } from "node:path";
import { collectComponentEntries } from "@sopt-mds/vite/utils";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
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
    },
    rolldownOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@sopt-mds/design-tokens",
        "@vanilla-extract/css",
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
