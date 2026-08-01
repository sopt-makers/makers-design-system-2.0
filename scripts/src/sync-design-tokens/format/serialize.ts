import { isPlainObject, pascalCase } from "es-toolkit";
import type { BaseColorRef, TypographyBaseRef } from "../types";

function isBaseColorRef(value: unknown): value is BaseColorRef {
  return (
    isPlainObject(value) &&
    value.kind === "baseColor" &&
    typeof value.key === "string"
  );
}

function isTypographyBaseRef(value: unknown): value is TypographyBaseRef {
  return (
    isPlainObject(value) &&
    value.kind === "typographyBase" &&
    typeof value.group === "string" &&
    typeof value.key === "string"
  );
}

/** JS 값을 design-tokens 소스에 맞는 TS 리터럴 문자열로 직렬화합니다. */
export function serializeTsValue(value: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  const next = "  ".repeat(indent + 1);

  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (isBaseColorRef(value)) {
    return `baseColor.${value.key}`;
  }
  if (isTypographyBaseRef(value)) {
    return `typography${pascalCase(value.group)}.${value.key}`;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const lines = value.map(
      (item) => `${next}${serializeTsValue(item, indent + 1)},`,
    );
    return ["[", ...lines, `${pad}]`].join("\n");
  }
  if (isPlainObject(value)) {
    const entries = Object.entries(value);
    if (entries.length === 0) return "{}";
    const lines = entries.map(
      ([key, item]) =>
        `${next}${key}: ${serializeTsValue(item, indent + 1)},`,
    );
    return ["{", ...lines, `${pad}}`].join("\n");
  }

  throw new Error(`Unsupported value: ${String(value)}`);
}
