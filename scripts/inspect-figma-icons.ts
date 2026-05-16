import { existsSync } from "node:fs";
import { resolve } from "node:path";

const envPath = resolve(process.cwd(), ".env");
if (existsSync(envPath)) {
  process.loadEnvFile(envPath);
}

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID;

if (!FIGMA_TOKEN) {
  console.error("Missing FIGMA_TOKEN. Add it to .env or export it in your shell.");
  process.exit(1);
}
if (!FIGMA_FILE_ID) {
  console.error("Missing FIGMA_FILE_ID. Add it to .env or export it in your shell.");
  process.exit(1);
}

type FigmaNode = {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  componentPropertyDefinitions?: Record<string, { type: string; defaultValue: unknown; variantOptions?: string[] }>;
};

type FigmaFileResponse = {
  name: string;
  lastModified: string;
  document: FigmaNode;
};

type ComponentInfo = { name: string; path: string; id: string };
type ComponentSetInfo = ComponentInfo & { variants: string[] };

const walk = (
  node: FigmaNode,
  components: ComponentInfo[],
  componentSets: ComponentSetInfo[],
  parentPath: string[] = [],
): void => {
  const path = [...parentPath, node.name];

  if (node.type === "COMPONENT") {
    components.push({ name: node.name, path: path.join(" > "), id: node.id });
  }

  if (node.type === "COMPONENT_SET") {
    componentSets.push({
      name: node.name,
      path: path.join(" > "),
      id: node.id,
      variants: (node.children ?? []).map((c) => c.name),
    });
  }

  for (const child of node.children ?? []) {
    walk(child, components, componentSets, path);
  }
};

const main = async (): Promise<void> => {
  const res = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_ID}?depth=4`, {
    headers: { "X-Figma-Token": FIGMA_TOKEN },
  });

  if (!res.ok) {
    console.error(`Figma API ${res.status}: ${await res.text()}`);
    process.exit(1);
  }

  const file = (await res.json()) as FigmaFileResponse;

  console.log(`File: ${file.name}`);
  console.log(`Last modified: ${file.lastModified}`);
  console.log();

  console.log("=== Pages ===");
  for (const page of file.document.children ?? []) {
    const childCount = page.children?.length ?? 0;
    console.log(`- [${page.type}] ${page.name} (${childCount} top-level children)`);
  }
  console.log();

  const components: ComponentInfo[] = [];
  const componentSets: ComponentSetInfo[] = [];
  walk(file.document, components, componentSets);

  const iconSet = componentSets.find((cs) => cs.path.endsWith("> icon"));
  if (!iconSet) {
    console.error("Could not find an 'icon' ComponentSet in the file.");
    process.exit(1);
  }

  const parseVariant = (variant: string): { type: string; style: string } => {
    const props = Object.fromEntries(
      variant.split(",").map((kv) => {
        const [k, v] = kv.split("=").map((s) => s.trim());
        return [k ?? "", v ?? ""];
      }),
    );
    return { type: props.type ?? "", style: props.style ?? "" };
  };

  const iconVariants = iconSet.variants.map(parseVariant);
  const uniqueTypes = [...new Set(iconVariants.map((v) => v.type))].sort();

  console.log(`=== Icon ComponentSet ===`);
  console.log(`Path: ${iconSet.path}`);
  console.log(`Total variants: ${iconVariants.length}`);
  console.log(`Unique types: ${uniqueTypes.length}`);
  console.log();

  console.log(`=== All unique icon types ===`);
  for (const type of uniqueTypes) {
    const styles = iconVariants.filter((v) => v.type === type).map((v) => v.style);
    console.log(`${type}\t${styles.join(",")}`);
  }
};

main();
