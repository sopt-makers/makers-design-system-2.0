import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // jscodeshift testUtils가 전역 describe/it/expect를 쓴다
    globals: true,
  },
  build: {
    target: "node22",
    minify: false,
    outDir: "dist",
    lib: {
      entry: {
        cli: resolve(import.meta.dirname, "src/cli.ts"),
      },
    },
    rolldownOptions: {
      external: [/^node:/, /^jscodeshift/],
      output: [
        {
          format: "es",
          dir: "dist",
          entryFileNames: "[name].js",
        },
      ],
    },
  },
});
