import type { SpacingTokens } from "../types";
import { sortKeysByNumberSeries } from "../utils/order";

export function formatSpacingFile(spacing: SpacingTokens): string {
  const keys = sortKeysByNumberSeries(Object.keys(spacing));
  const body = keys
    .map((key) => `  ${key}: ${JSON.stringify(spacing[key])},`)
    .join("\n");

  return [
    "export const spacingBase = {",
    body,
    "} as const;",
    "",
    "export type SpacingToken = keyof typeof spacingBase;",
    "",
  ].join("\n");
}
