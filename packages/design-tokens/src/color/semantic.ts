import { baseColor } from "./base";

export const colorFg = {
  neutral: {
    bold: baseColor.gray10,
    default: baseColor.gray100,
    defaultDisabled: baseColor.gray500,
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
    inverseHover: baseColor.gray100,
    inversePressed: baseColor.gray100,
    bold: baseColor.gray500,
    boldDisabled: baseColor.gray700,
    default: baseColor.gray600,
    defaultHover: baseColor.gray500,
    defaultPressed: baseColor.gray500,
    defaultDisabled: baseColor.gray800,
    subtle: baseColor.gray700,
    subtleHover: baseColor.gray600,
    subtlePressed: baseColor.gray600,
    ghost: baseColor.gray800,
    ghostHover: baseColor.gray700,
    ghostPressed: baseColor.gray700,
  },
  brand: {
    default: baseColor.orange400,
    subtle: baseColor.orange700,
    ghost: baseColor.orange950,
  },
  secondary: {
    default: baseColor.blue400,
    defaultHover: baseColor.blue500,
    defaultPressed: baseColor.blue600,
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
    defaultHover: baseColor.red500,
    defaultPressed: baseColor.red600,
    ghost: baseColor.red950,
  },
  dim: {
    default: "rgba(15, 16, 18, 0.8)",
  },
} as const;

export const colorStroke = {
  neutral: {
    default: baseColor.gray600,
    defaultFocused: baseColor.gray200,
    defaultDisabled: baseColor.gray700,
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
