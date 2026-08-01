import fsp from "node:fs/promises";

export async function readJsonFile<T>(path: string): Promise<T> {
  const raw = await fsp.readFile(path, "utf8");
  return JSON.parse(raw) as T;
}

/** 내용이 동일하면 쓰지 않고 false를 반환합니다. */
export async function writeFileIfChanged(
  path: string,
  contents: string,
): Promise<boolean> {
  const previous = await fsp.readFile(path, "utf8").catch(() => null);
  if (previous === contents) return false;
  await fsp.writeFile(path, contents, "utf8");
  return true;
}

export async function writeJsonFile(
  path: string,
  value: unknown,
): Promise<boolean> {
  return writeFileIfChanged(path, `${JSON.stringify(value, null, 2)}\n`);
}
