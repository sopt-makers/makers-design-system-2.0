import { join, resolve } from "node:path";
import { DEFAULT_UPDATE_SPEC_PATH, DESIGN_TOKENS_SRC, REPO_ROOT } from "./constants";
import { formatColorBaseFile, formatSemanticColorFile } from "./format/color";
import { formatRadiusFile } from "./format/radius";
import { formatSemanticTypographyFile } from "./format/semantic-typography";
import { formatSpacingFile } from "./format/spacing";
import { formatTypographyBaseFile } from "./format/typography";
import type { OutputFile, TokenUpdateSpec } from "./types";
import { readJsonFile, writeFileIfChanged } from "./utils/file";
import { isPlainObject } from "./utils/object";

function parseArgs(argv: string[]) {
  const args = {
    spec: DEFAULT_UPDATE_SPEC_PATH,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--spec" || arg === "-s") {
      const value = argv[i + 1];
      if (!value) throw new Error("--spec 경로가 필요합니다.");
      args.spec = resolve(REPO_ROOT, value);
      i += 1;
    }
  }

  return args;
}

function assertUpdateSpec(value: unknown): asserts value is TokenUpdateSpec {
  if (!isPlainObject(value)) {
    throw new Error("update-spec은 JSON object여야 합니다.");
  }

  const allowed = new Set([
    "baseColor",
    "semanticColor",
    "spacing",
    "typographyBase",
    "semanticTypography",
    "radius",
  ]);

  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) {
      throw new Error(`알 수 없는 update-spec 키: ${key}`);
    }
  }
}

function buildOutputFiles(spec: TokenUpdateSpec): OutputFile[] {
  const files: OutputFile[] = [];

  if (spec.baseColor != null) {
    files.push({
      path: join(DESIGN_TOKENS_SRC, "color/base.ts"),
      contents: formatColorBaseFile(spec.baseColor),
    });
  }

  if (spec.semanticColor != null) {
    files.push({
      path: join(DESIGN_TOKENS_SRC, "color/semantic.ts"),
      contents: formatSemanticColorFile(spec.semanticColor),
    });
  }

  if (spec.spacing != null) {
    files.push({
      path: join(DESIGN_TOKENS_SRC, "space/base.ts"),
      contents: formatSpacingFile(spec.spacing),
    });
  }

  if (spec.typographyBase != null) {
    files.push({
      path: join(DESIGN_TOKENS_SRC, "typography/base.ts"),
      contents: formatTypographyBaseFile(spec.typographyBase),
    });
  }

  if (spec.radius != null) {
    files.push({
      path: join(DESIGN_TOKENS_SRC, "radius/base.ts"),
      contents: formatRadiusFile(spec.radius),
    });
  }

  if (spec.semanticTypography != null) {
    files.push({
      path: join(DESIGN_TOKENS_SRC, "typography/semantic.ts"),
      contents: formatSemanticTypographyFile(spec.semanticTypography),
    });
  }

  return files;
}

async function writeOutputs(files: OutputFile[]) {
  const changed: string[] = [];
  for (const file of files) {
    const didChange = await writeFileIfChanged(file.path, file.contents);
    if (didChange) changed.push(file.path);
  }
  return changed;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const raw = await readJsonFile<unknown>(args.spec);
  assertUpdateSpec(raw);

  const files = buildOutputFiles(raw);
  if (files.length === 0) {
    throw new Error(
      "update-spec에 적용할 섹션이 없습니다. baseColor/semanticColor/… 중 하나 이상 필요합니다.",
    );
  }

  const changed = await writeOutputs(files);

  if (changed.length === 0) {
    console.log("No design token changes.");
    return;
  }

  console.log("Updated design tokens:");
  for (const path of changed) {
    console.log(`- ${path}`);
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
