import { glob } from "node:fs/promises";
import path from "node:path";

const ENTRY_PATTERN = "src/components/*/index.{ts,tsx}";

/**
 * src/components/ 하위의 컴포넌트 디렉토리를 순회하고 컴포넌트 엔트리를 반환해요.
 */
export async function collectComponentEntries(): Promise<
  Record<string, string>
> {
  const entries: Record<string, string> = {};

  for await (const filePath of glob(ENTRY_PATTERN)) {
    const normalized = filePath.replaceAll(path.sep, "/");
    const name = normalized.split("/").at(-2);

    if (name) {
      entries[name] = normalized;
    }
  }

  return entries;
}
