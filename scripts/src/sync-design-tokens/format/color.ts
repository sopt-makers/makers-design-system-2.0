import { pascalCase } from "es-toolkit";
import type { BaseColors, SemanticColors } from "../types";
import {
  sortAlphabetically,
  sortNumericStringKeys,
} from "../utils/order";
import { serializeTsValue } from "./serialize";

export function formatColorBaseFile(colors: BaseColors): string {
  const families = sortAlphabetically(Object.keys(colors));
  const familyBlocks = families.map((family) => {
    const scales = colors[family] ?? {};
    const scaleKeys = sortNumericStringKeys(Object.keys(scales));
    return scaleKeys
      .map((scale) => `  ${family}${scale}: ${JSON.stringify(scales[scale])},`)
      .join("\n");
  });

  const body = familyBlocks.join("\n\n");

  return [
    "export const baseColor = {",
    body,
    "} as const;",
    "",
    "export type BaseColorToken = keyof typeof baseColor;",
    "",
  ].join("\n");
}

export function formatSemanticColorFile(semantic: SemanticColors): string {
  // group/category/leaf 순서는 update-spec 키 등장 순서를 유지합니다.
  const exports = Object.entries(semantic)
    .map(
      ([group, value]) =>
        `export const color${pascalCase(group)} = ${serializeTsValue(value)} as const;`,
    )
    .join("\n\n");

  return ['import { baseColor } from "./base";', "", exports, ""].join("\n");
}
