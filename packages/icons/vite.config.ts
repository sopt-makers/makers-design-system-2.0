import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: resolve(__dirname, "./tsconfig.lib.json"),
      entryRoot: "src",
      include: ["src"],
    }),
  ],
  build: {
    minify: false,
    outDir: "dist",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
    },
    /**
     * https://rolldown.rs/reference/
     */
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
