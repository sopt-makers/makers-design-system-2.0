import { existsSync, readdirSync } from "node:fs";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { transform } from "@svgr/core";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(__dirname, "..");
const srcRoot = resolve(packageRoot, "src");
const repoRoot = resolve(packageRoot, "../..");

const envPath = resolve(repoRoot, ".env");
if (existsSync(envPath)) {
  process.loadEnvFile(envPath);
}

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID;

if (!FIGMA_TOKEN || !FIGMA_FILE_ID) {
  console.error("Missing FIGMA_TOKEN or FIGMA_FILE_ID in environment.");
  process.exit(1);
}

/**
 * 피그마 type 값의 오타를 보정한다. 디자이너가 피그마에서 정정하면 해당 항목 제거.
 * 대소문자 차이(`Facebook`, `CalendarDate` 등)는 lowerFirst로 자동 정규화하므로 여기 둘 필요 없음.
 */
const TYPO_FIXES: Record<string, string> = {
  mesageCheck: "messageCheck",
  imagCheck: "imageCheck",
};

type FigmaNode = {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
};
type FigmaFileResponse = { document: FigmaNode };
type FigmaImagesResponse = { err: string | null; images: Record<string, string | null> };

type IconVariant = {
  figmaType: string;
  name: string;
  style: "filled" | "outlined";
  nodeId: string;
};

const callFigma = async <T>(path: string): Promise<T> => {
  const res = await fetch(`https://api.figma.com${path}`, {
    headers: { "X-Figma-Token": FIGMA_TOKEN },
  });
  if (!res.ok) {
    throw new Error(`Figma API ${res.status} ${res.statusText}: ${await res.text()}`);
  }
  return (await res.json()) as T;
};

const toKebab = (camel: string): string =>
  camel.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const toPascal = (camel: string): string =>
  camel.charAt(0).toUpperCase() + camel.slice(1);

const lowerFirst = (s: string): string => s.charAt(0).toLowerCase() + s.slice(1);

const normalizeName = (figmaType: string): string =>
  lowerFirst(TYPO_FIXES[figmaType] ?? figmaType);

const parseVariant = (variant: string): { type: string; style: string } => {
  const props = Object.fromEntries(
    variant.split(",").map((kv) => {
      const [k, v] = kv.split("=").map((s) => s.trim());
      return [k ?? "", v ?? ""];
    }),
  );
  return { type: props.type ?? "", style: props.style ?? "" };
};

const findIconSet = (document: FigmaNode): FigmaNode | undefined => {
  const stack: FigmaNode[] = [document];
  while (stack.length > 0) {
    const node = stack.pop();
    if (!node) continue;
    if (node.type === "COMPONENT_SET" && node.name === "icon") {
      return node;
    }
    if (node.children) {
      stack.push(...node.children);
    }
  }
  return undefined;
};

const collectVariants = (iconSet: FigmaNode): IconVariant[] => {
  const variants: IconVariant[] = [];
  for (const child of iconSet.children ?? []) {
    if (child.type !== "COMPONENT") continue;
    const { type: figmaType, style } = parseVariant(child.name);
    if (!figmaType || !style) {
      console.warn(`  ⚠ Skipping variant with missing type/style: ${child.name}`);
      continue;
    }
    if (style !== "filled" && style !== "outlined") {
      console.warn(`  ⚠ Unknown style '${style}' for ${figmaType}`);
      continue;
    }
    variants.push({
      figmaType,
      name: normalizeName(figmaType),
      style,
      nodeId: child.id,
    });
  }
  return variants;
};

const chunk = <T>(arr: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
};

const fetchSvgUrls = async (nodeIds: string[]): Promise<Record<string, string>> => {
  const urls: Record<string, string> = {};
  for (const batch of chunk(nodeIds, 50)) {
    const params = new URLSearchParams({
      ids: batch.join(","),
      format: "svg",
    });
    const res = await callFigma<FigmaImagesResponse>(
      `/v1/images/${FIGMA_FILE_ID}?${params.toString()}`,
    );
    if (res.err) throw new Error(`Figma /v1/images: ${res.err}`);
    for (const [id, url] of Object.entries(res.images)) {
      if (url) urls[id] = url;
    }
  }
  return urls;
};

const downloadSvg = async (url: string): Promise<string> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download SVG: ${res.status} ${res.statusText}`);
  return res.text();
};

const applyCurrentColor = (svg: string): string =>
  svg
    .replace(/(\s)stroke="(?!none|currentColor)[^"]+"/g, '$1stroke="currentColor"')
    .replace(/(\s)fill="(?!none|currentColor)[^"]+"/g, '$1fill="currentColor"');

/**
 * Monochrome SVG는 currentColor로 치환해 테마/color prop을 따르게 하고,
 * 다색 SVG(예: googleColor, github의 음각 디테일)는 원본 색상을 보존한다.
 */
const isMonochromeSvg = (svg: string): boolean => {
  const colors = new Set<string>();
  for (const match of svg.matchAll(/(?:fill|stroke)="([^"]+)"/g)) {
    const value = match[1];
    if (value && value !== "none" && value !== "currentColor") {
      colors.add(value.toLowerCase());
    }
  }
  return colors.size === 1;
};

const buildComponentSource = async (
  rawSvg: string,
  componentName: string,
): Promise<string> => {
  const preprocessed = isMonochromeSvg(rawSvg) ? applyCurrentColor(rawSvg) : rawSvg;

  return transform(
    preprocessed,
    {
      typescript: true,
      ref: true,
      expandProps: "end",
      jsxRuntime: "automatic",
      plugins: ["@svgr/plugin-jsx"],
      template: ({ jsx, componentName: name }, { tpl }) => tpl`
import { forwardRef } from "react";
import type { SVGProps } from "react";

const ${name} = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => ${jsx});

${name}.displayName = "${name}";

export default ${name};
`,
    },
    { componentName },
  );
};

const writeRootIndex = async (
  entries: { fileName: string; componentName: string }[],
): Promise<void> => {
  const sorted = [...entries].sort((a, b) => a.componentName.localeCompare(b.componentName));
  const lines = sorted.map(
    (e) => `export { default as ${e.componentName} } from "./${e.fileName}";`,
  );
  await writeFile(join(srcRoot, "index.ts"), `${lines.join("\n")}\n`);
};

const cleanPreviousOutput = async (): Promise<void> => {
  for (const entry of readdirSync(srcRoot, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.startsWith("ic-") && entry.name.endsWith(".tsx")) {
      await rm(join(srcRoot, entry.name), { force: true });
    }
  }
};

const main = async (): Promise<void> => {
  console.log("→ Fetching Figma file structure...");
  const file = await callFigma<FigmaFileResponse>(`/v1/files/${FIGMA_FILE_ID}?depth=4`);

  const iconSet = findIconSet(file.document);
  if (!iconSet) {
    throw new Error("Could not find ComponentSet named 'icon' in the Figma file.");
  }

  const variants = collectVariants(iconSet);
  console.log(`→ Found ${variants.length} icon variants`);

  const styleCount = new Map<string, Set<string>>();
  for (const v of variants) {
    if (!styleCount.has(v.name)) styleCount.set(v.name, new Set());
    styleCount.get(v.name)?.add(v.style);
  }

  const fileSlug = (v: IconVariant): string => {
    const kebab = toKebab(v.name);
    const hasMultiple = (styleCount.get(v.name)?.size ?? 0) > 1;
    return hasMultiple ? `ic-${kebab}-${v.style}` : `ic-${kebab}`;
  };

  const componentName = (v: IconVariant): string => {
    const pascal = toPascal(v.name);
    const hasMultiple = (styleCount.get(v.name)?.size ?? 0) > 1;
    return hasMultiple ? `Icon${pascal}${toPascal(v.style)}` : `Icon${pascal}`;
  };

  console.log("→ Resolving Figma SVG URLs (batched)...");
  const urls = await fetchSvgUrls(variants.map((v) => v.nodeId));

  console.log("→ Cleaning previous output...");
  await mkdir(srcRoot, { recursive: true });
  await cleanPreviousOutput();

  console.log("→ Downloading SVGs and generating components...");
  const entries: { fileName: string; componentName: string }[] = [];

  let done = 0;
  const total = variants.length;

  await Promise.all(
    variants.map(async (v) => {
      const url = urls[v.nodeId];
      if (!url) {
        console.warn(`  ⚠ No SVG URL for ${v.figmaType}/${v.style}`);
        return;
      }
      const rawSvg = await downloadSvg(url);
      const cname = componentName(v);
      const tsx = await buildComponentSource(rawSvg, cname);
      const fname = fileSlug(v);
      await writeFile(join(srcRoot, `${fname}.tsx`), tsx);
      entries.push({ fileName: fname, componentName: cname });

      done += 1;
      if (done % 25 === 0 || done === total) {
        console.log(`  ${done}/${total} generated`);
      }
    }),
  );

  console.log("→ Writing index file...");
  await writeRootIndex(entries);

  console.log(`✔ Done. Generated ${done} icon components.`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
