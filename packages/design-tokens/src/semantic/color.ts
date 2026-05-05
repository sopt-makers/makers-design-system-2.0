import { baseColor } from "../base/color";

export const colorFg = {
  neutral: {
    bold: baseColor.gray10,
    default: baseColor.gray100,
    "default-disabled": baseColor.gray500,
    subtle: baseColor.gray300,
    ghost: baseColor.gray500,
    inverse: baseColor.gray950,
  },
  brand: {
    default: baseColor.orange400,
  },
  secondary: {
    default: baseColor.blue400,
  },
  success: {
    bold: baseColor.green100,
    default: baseColor.green400,
    subtle: baseColor.green600,
  },
  danger: {
    bold: baseColor.red100,
    default: baseColor.red400,
    subtle: baseColor.red600,
  },
  attention: {
    bold: baseColor.yellow200,
    default: baseColor.yellow400,
    subtle: baseColor.yellow600,
  },
  information: {
    default: baseColor.blue400,
    subtle: baseColor.blue600,
  },
} as const;

export const colorBg = {
  neutral: {
    inverse: baseColor.gray10,
    "inverse-hover": baseColor.gray100,
    "inverse-pressed": baseColor.gray100,
    bold: baseColor.gray500,
    "bold-disabled": baseColor.gray700,
    default: baseColor.gray600,
    "default-hover": baseColor.gray500,
    "default-pressed": baseColor.gray500,
    "default-disabled": baseColor.gray800,
    subtle: baseColor.gray700,
    "subtle-hover": baseColor.gray600,
    "subtle-pressed": baseColor.gray600,
    ghost: baseColor.gray800,
    "ghost-hover": baseColor.gray700,
    "ghost-pressed": baseColor.gray700,
  },
  brand: {
    default: baseColor.orange400,
    subtle: baseColor.orange700,
    ghost: baseColor.orange950,
  },
  secondary: {
    default: baseColor.blue400,
    "default-hover": baseColor.blue500,
    "default-pressed": baseColor.blue600,
    subtle: baseColor.blue900,
    ghost: baseColor.blue950,
  },
  information: {
    ghost: baseColor.blue950,
  },
  success: {
    ghost: baseColor.green950,
  },
  danger: {
    default: baseColor.red400,
    "default-hover": baseColor.red500,
    "default-pressed": baseColor.red600,
    ghost: baseColor.red950,
  },
  dim: {
    default: "rgba(15, 16, 18, 0.8)",
  },
} as const;

export const colorStroke = {
  neutral: {
    default: baseColor.gray600,
    "default-focused": baseColor.gray200,
    "default-disabled": baseColor.gray700,
    inverse: baseColor.gray10,
    subtle: baseColor.gray700,
    ghost: baseColor.gray800,
  },
  brand: {
    default: baseColor.orange400,
    subtle: baseColor.orange600,
  },
  secondary: {
    default: baseColor.blue400,
    subtle: baseColor.blue600,
  },
  information: {
    subtle: baseColor.blue600,
  },
  danger: {
    default: baseColor.red400,
  },
} as const;
