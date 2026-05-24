import { resolve } from "node:path";
import { mergeCss } from "@sopt-mds/vite/plugins";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    mergeCss({
      root: resolve(__dirname, "./src"),
      outFileName: "index.css",
    }),
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
      entry: resolve(__dirname, "src/index.ts"),
    },
    rolldownOptions: {
      external: ["react", "react/jsx-runtime"],
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
