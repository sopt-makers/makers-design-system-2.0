import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
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
