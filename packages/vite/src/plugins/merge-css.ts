import fsp from "node:fs/promises";
import path from "node:path";
import type { Plugin } from "vite";

export type MergeCssOptions = {
  /** CSS 파일을 탐색할 루트 디렉토리 (절대 경로) */
  root: string;
  /** 최종 번들에 출력될 파일 이름 */
  outFileName?: string;
};

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

export function mergeCss(options: MergeCssOptions): Plugin {
  const { root, outFileName = "index.css" } = options;

  return {
    name: "mds:merge-css",
    apply: "build",
    async generateBundle() {
      const files = await collectCssFiles(root);

      if (files.length === 0) {
        this.warn(`${root}에 css 파일이 존재하지 않아요`);
        return;
      }

      const sections: string[] = [];

      for (const relPath of files) {
        const absPath = path.join(root, relPath);
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
