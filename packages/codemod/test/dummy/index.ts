import type { API, FileInfo } from "jscodeshift";
import { RENAMES } from "./renames.ts";

/** 테스트 러너 확인용 더미. 실제 변환 규칙이 아니다. */
export const parser = "tsx";

export default function transform(file: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const root = j(file.source);

  root.find(j.Identifier).forEach((path) => {
    const next = RENAMES[path.node.name];
    if (next) path.node.name = next;
  });

  return root.toSource();
}
