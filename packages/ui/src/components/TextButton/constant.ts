import { colors, typography } from "@sopt-mds/design-tokens";
import type { TextButtonSize, TextButtonVariant } from "./types";

/* Figma `text button` 마스터(node 171:164) 실측값 기준. */

export type TextButtonSizeToken = {
  fontWeight: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  iconSize: string;
};

export const TEXT_BUTTON_SIZE_TOKENS: Record<
  TextButtonSize,
  TextButtonSizeToken
> = {
  small: {
    ...typography.label4,
    fontWeight: `${typography.label4.fontWeight}`,
    iconSize: "16px",
  },
  medium: {
    ...typography.label3,
    fontWeight: `${typography.label3.fontWeight}`,
    iconSize: "18px",
  },
};

/** variant별 텍스트 색. */
export const TEXT_BUTTON_VARIANT_COLOR: Record<TextButtonVariant, string> = {
  default: colors.fg.neutral.default,
  emphasis: colors.fg.neutral.bold,
};

/** disabled 텍스트 색 (variant 무관). */
export const TEXT_BUTTON_DISABLED_COLOR = colors.fg.neutral.defaultDisabled;

/** hover/press 시 나타나는 밑줄 색. */
export const TEXT_BUTTON_UNDERLINE_COLOR = colors.stroke.neutral.defaultFocused;
