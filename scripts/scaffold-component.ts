import fsp from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { input } from "@inquirer/prompts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const componentsDir = join(repoRoot, "packages/ui/src");
const uiBarrel = join(repoRoot, "packages/ui/src/index.ts");
const introMdx = join(repoRoot, "apps/storybook/stories/Introduction.mdx");

const exists = async (path: string): Promise<boolean> => {
  return fsp
    .stat(path)
    .then(() => true)
    .catch(() => false);
};

/** 이미 존재하는 컴포넌트 목록 조회 */
const listUpExistingComponentNames = async (): Promise<Set<string>> => {
  try {
    const entries = await fsp.readdir(componentsDir, { withFileTypes: true });
    return new Set(entries.filter((e) => e.isDirectory()).map((e) => e.name));
  } catch {
    return new Set();
  }
};

/** 컴포넌트에 필요한 템플릿 문자열 생성 */
const buildTemplates = (name: string) => {
  const componentTsx = `import type { HTMLAttributes } from "react";
import * as styles from "./${name}.css";

/** 
 * @ts-expect-error - 플레이스 홀더
 * @description 컴포넌트 구현 후 지워주세요
 */
export interface ${name}Props extends HTMLAttributes<HTMLDivElement> {}

export function ${name}({ children, ...rest }: ${name}Props) {
  return (
    <div {...rest} className={styles.root}>
      {children}
    </div>
  );
}
`;

  const cssTs = `import { style } from "@vanilla-extract/css";

export const root = style({});
`;

  const indexTs = `export * from "./${name}";\n`;

  const storyTsx = `import type { Meta, StoryObj } from "@storybook/react";
import { ${name} } from "./${name}";

const meta: Meta<typeof ${name}> = {
  title: "${name}",
  component: ${name},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ${name}>;

export const Default: Story = {
  args: {},
};
`;

  return { componentTsx, cssTs, indexTs, storyTsx };
};

const main = async () => {
  const existing = await listUpExistingComponentNames();

  const name = await input({
    message: "Component name (PascalCase):",
    validate: (value) => {
      const trimmed = value.trim();
      if (!trimmed) return "Name is required";
      /** PascalCase 형식 검증 */
      if (!/^[A-Z][A-Za-z0-9]*$/.test(trimmed)) {
        return "Use PascalCase (e.g. MyButton)";
      }
      /** 이미 존재하는 컴포넌트 목록 검증 */
      if (existing.has(trimmed)) {
        return `Component "${trimmed}" already exists in packages/ui/src`;
      }
      return true;
    },
  });

  const componentDir = join(componentsDir, name);
  const { componentTsx, cssTs, indexTs, storyTsx } = buildTemplates(name);

  await fsp.mkdir(componentDir, { recursive: true });
  await Promise.all([
    fsp.writeFile(join(componentDir, `${name}.tsx`), componentTsx),
    fsp.writeFile(join(componentDir, `${name}.css.ts`), cssTs),
    fsp.writeFile(join(componentDir, "index.ts"), indexTs),
    fsp.writeFile(join(componentDir, `${name}.stories.tsx`), storyTsx),
  ]);

  if (await exists(uiBarrel)) {
    const current = await fsp.readFile(uiBarrel, "utf8");
    const exportLine = `export * from "./${name}";\n`;
    if (!current.includes(exportLine)) {
      await fsp.writeFile(uiBarrel, current + exportLine);
    }
  }

  /** Introduction.mdx에 컴포넌트 링크 추가 */
  if (await exists(introMdx)) {
    const mdx = await fsp.readFile(introMdx, "utf8");
    const slug = name.toLowerCase();
    const link = `[${name}](?path=/docs/components-${slug}--소개)`;

    if (!mdx.includes(link)) {
      const updated = mdx.replace(
        /(## 컴포넌트 목록\n\n[\s\S]*?\S)(\n*$)/,
        `$1\n\n${link}\n`,
      );
      await fsp.writeFile(introMdx, updated);
    }
  }

  console.log(`\n✔ Created ${name}`);
  console.log(`  packages/ui/src/components/${name}/`);
  console.log(`    ├── ${name}.tsx`);
  console.log(`    ├── ${name}.css.ts`);
  console.log(`    ├── ${name}.stories.tsx`);
  console.log(`    └── index.ts`);
  console.log(`  Introduction.mdx에 ${name} 컴포넌트가 추가되었어요.`);
};

main();
