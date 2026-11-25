import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const CLI = resolve(import.meta.dirname, "../src/cli.ts");
const run = (...args: string[]) =>
  spawnSync(process.execPath, [CLI, ...args], { encoding: "utf8" });

describe("mds-migrate", () => {
  it("--help는 사용법을 출력하고 0으로 끝난다", () => {
    const { status, stdout } = run("--help");
    expect(status).toBe(0);
    expect(stdout).toContain("mds-migrate <scan|token> <경로>");
  });

  it("--list는 규칙이 없다고 출력하고 0으로 끝난다", () => {
    const { status, stdout } = run("--list");
    expect(status).toBe(0);
    expect(stdout.trim()).toBe("등록된 규칙이 없어요.");
  });

  it.each([
    [[]],
    [["token", "src"]],
    [["nope"]],
    [["--bogus"]],
  ])("%j는 0이 아닌 코드로 끝난다", (args) => {
    const { status, stderr } = run(...args);
    expect(status).toBe(1);
    expect(stderr).not.toBe("");
  });
});
