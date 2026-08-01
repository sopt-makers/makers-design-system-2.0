import type { SemanticTypography } from "../types";
import { serializeTsValue } from "./serialize";

export function formatSemanticTypographyFile(
  typography: SemanticTypography,
): string {
  return [
    "import {",
    "  typographyLetterSpacing,",
    "  typographyLineHeight,",
    "  typographySize,",
    "  typographyWeight,",
    '} from "./base";',
    "",
    `export const semanticTypography = ${serializeTsValue(typography)} as const;`,
    "",
  ].join("\n");
}
