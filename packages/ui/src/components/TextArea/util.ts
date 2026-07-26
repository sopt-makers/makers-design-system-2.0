export function clampValueToMaxLength(
  value: string,
  maxLength?: number,
): string {
  if (maxLength == null || value.length <= maxLength) {
    return value;
  }

  return value.slice(0, maxLength);
}
