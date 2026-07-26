import { colors, spacing } from "@sopt-mds/design-tokens";
import type { TagSize, TagType, TagVariant } from "./types";

export const TAG_HEIGHT_FOR_SIZE: Record<TagSize, string> = {
  small: spacing.s24,
  medium: "26px",
};

export const TAG_COLOR_STYLE_VARIANT = {
  "default-solid": {
    backgroundColor: colors.bg.neutral.subtle,
    color: colors.fg.neutral.bold,
  },
  "default-subtle": {
    backgroundColor: colors.bg.neutral.subtle,
    color: colors.fg.neutral.subtle,
  },
  "primary-solid": {
    backgroundColor: colors.bg.brand.default,
    color: colors.fg.neutral.inverse,
  },
  "primary-subtle": {
    backgroundColor: colors.bg.brand.ghost,
    color: colors.fg.brand.default,
  },
  "secondary-solid": {
    backgroundColor: colors.bg.secondary.default,
    color: colors.fg.neutral.bold,
  },
  "secondary-subtle": {
    backgroundColor: colors.bg.secondary.subtle,
    color: colors.fg.secondary.default,
  },
} as const;

export type TagColorStyleVariantKey = keyof typeof TAG_COLOR_STYLE_VARIANT;

export function tagColorStyleVariantKey(
  variant: TagVariant,
  type: TagType,
): TagColorStyleVariantKey {
  return `${variant}-${type}`;
}
