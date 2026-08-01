import { pascalCase } from "es-toolkit";
import type { TypographyBase } from "../types";
import { serializeTsValue } from "./serialize";

export function formatTypographyBaseFile(typography: TypographyBase): string {
  const exports = Object.entries(typography)
    .map(
      ([group, value]) =>
        `export const typography${pascalCase(group)} = ${serializeTsValue(value)} as const;`,
    )
    .join("\n\n");

  return `${exports}\n`;
}
