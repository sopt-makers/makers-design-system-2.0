export type Rule = {
  /** --only, 마커 주석, 리포트에서 쓰는 규칙 이름 */
  name: string;
  description: string;
};

/** `mds-migrate --list`에 나오는 규칙 목록 */
export const rules: Rule[] = [];
