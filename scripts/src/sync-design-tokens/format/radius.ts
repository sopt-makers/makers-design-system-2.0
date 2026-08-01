import type { RadiusTokens } from "../types";
import { sortKeysByNumberSeries } from "../utils/order";

export function formatRadiusFile(radius: RadiusTokens): string {
  const keys = sortKeysByNumberSeries(Object.keys(radius));
  const body = keys
    .map((key) => `  ${key}: ${JSON.stringify(radius[key])},`)
    .join("\n");

  return [
    "export const radiusBase = {",
    body,
    "} as const;",
    "",
    "export type RadiusToken = keyof typeof radiusBase;",
    "",
  ].join("\n");
}
