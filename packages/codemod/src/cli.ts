#!/usr/bin/env node
import { parseArgs } from "node:util";
import { rules } from "./transforms/index.ts";

const COMMANDS: Record<string, string> = {
  scan: "v1 토큰 사용처를 판정해 리포트를 만든다 (미구현)",
  token: "v1 색/글자 토큰을 v2로 바꾼다 (미구현)",
};

const HELP = `사용법: mds-migrate <${Object.keys(COMMANDS).join("|")}> <경로> [옵션]

명령
${Object.entries(COMMANDS)
  .map(([name, description]) => `  ${name.padEnd(8)}${description}`)
  .join("\n")}

옵션
  --dry            소스 파일을 쓰지 않고 요약만 출력 (미구현)
  --print          변환 결과를 출력 (미구현)
  --report <파일>  리포트 JSON 저장 (미구현)
  --only <규칙>    지정한 규칙만 실행 (미구현)
  --list           규칙 목록 출력
  -h, --help       도움말 출력`;

const main = (args: string[]): number => {
  const { values, positionals } = parseArgs({
    args,
    allowPositionals: true,
    options: {
      dry: { type: "boolean" },
      print: { type: "boolean" },
      report: { type: "string" },
      only: { type: "string" },
      list: { type: "boolean" },
      help: { type: "boolean", short: "h" },
    },
  });

  if (values.help) {
    console.log(HELP);
    return 0;
  }

  if (values.list) {
    console.log(
      rules.length === 0
        ? "등록된 규칙이 없어요."
        : rules
            .map(({ name, description }) => `${name}  ${description}`)
            .join("\n"),
    );
    return 0;
  }

  const [command] = positionals;
  if (!command) {
    console.error(HELP);
    return 1;
  }

  console.error(
    Object.hasOwn(COMMANDS, command)
      ? `${command} 명령은 아직 구현되지 않았어요.`
      : `알 수 없는 명령이에요: ${command}`,
  );
  return 1;
};

try {
  process.exitCode = main(process.argv.slice(2));
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
