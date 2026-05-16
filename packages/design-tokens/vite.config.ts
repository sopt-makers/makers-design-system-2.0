import fsp from "node:fs/promises";
import path, { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    mergeTokenCss({
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
      cssFileName: "index",
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

const ROOT_DIR = path.resolve(__dirname, "./src");

async function collectCssFiles(root: string): Promise<string[]> {
  const entries = await fsp.readdir(root, {
    withFileTypes: true,
    recursive: true,
  });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".css"))
    .map((entry) => {
      const parentDir = entry.parentPath ?? entry.path;
      return path.relative(root, path.join(parentDir, entry.name));
    })
    .sort();
}

type MergeTokenCssOptions = {
  outFileName?: string;
};

/** design-tokens 패키지 source 내 css 파일 검색 및 index.css 파일로의 통합 */
export function mergeTokenCss(options: MergeTokenCssOptions): Plugin {
  const { outFileName = "index.css" } = options;

  return {
    name: "merge-token-css",
    apply: "build",
    async generateBundle() {
      const files = await collectCssFiles(ROOT_DIR);

      if (files.length === 0) {
        this.warn(`${ROOT_DIR}에 css 파일이 존재하지 않아요`);
        return;
      }

      const sections: string[] = [];

      for (const relPath of files) {
        const absPath = path.join(ROOT_DIR, relPath);
        const content = (await fsp.readFile(absPath, "utf-8")).trim();
        const tokenName = path.basename(relPath, path.extname(relPath));
        const displayPath = relPath.replaceAll(path.sep, "/");

        const banner = [
          "/* ============================================================",
          `   ${tokenName} (${displayPath})`,
          "   ============================================================ */",
        ].join("\n");

        sections.push(`${banner}\n${content}`);

        this.addWatchFile(absPath);
      }

      this.emitFile({
        type: "asset",
        fileName: outFileName,
        source: `${sections.join("\n\n")}\n`,
      });
    },
  };
}
