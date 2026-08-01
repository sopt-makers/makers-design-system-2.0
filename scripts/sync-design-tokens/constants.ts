import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const REPO_ROOT = resolve(__dirname, "../..");
export const DESIGN_TOKENS_SRC = join(REPO_ROOT, "packages/design-tokens/src");

/** 에이전트가 작성하는 정규화 명세 기본 경로 */
export const DEFAULT_UPDATE_SPEC_PATH = join(
  REPO_ROOT,
  ".sync-design-tokens/update-spec.json",
);
