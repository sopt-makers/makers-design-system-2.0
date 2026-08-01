/** `s12`, `r8`, `t16`, `heading1` 등에서 trailing number를 추출합니다. */
export function extractTrailingNumber(key: string): number | null {
  const match = key.match(/(\d+)$/);
  if (!match) return null;
  return Number(match[1]);
}

/**
 * 번호 시리즈 키는 숫자 오름차순, 비번호 키는 원래 상대 순서를 유지합니다.
 * 번호/비번호가 섞인 경우: 비번호는 원래 인덱스 기준으로 안정 정렬합니다.
 */
export function sortKeysByNumberSeries(keys: string[]): string[] {
  return [...keys].sort((a, b) => {
    const na = extractTrailingNumber(a);
    const nb = extractTrailingNumber(b);
    if (na != null && nb != null) return na - nb;
    if (na != null) return -1;
    if (nb != null) return 1;
    return 0;
  });
}

export function sortNumericStringKeys(keys: string[]): string[] {
  return [...keys].sort((a, b) => Number(a) - Number(b));
}

export function sortAlphabetically(keys: string[]): string[] {
  return [...keys].sort((a, b) => a.localeCompare(b));
}

export function orderObjectKeys<T>(
  source: Record<string, T>,
  orderedKeys: string[],
): Record<string, T> {
  const result: Record<string, T> = {};
  for (const key of orderedKeys) {
    if (key in source) {
      result[key] = source[key] as T;
    }
  }
  return result;
}
