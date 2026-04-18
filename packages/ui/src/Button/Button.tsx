import { semanticColor } from "@makers/design-tokens";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const sizeStyle: Record<ButtonSize, { padding: string; fontSize: string }> = {
  sm: { padding: "6px 12px", fontSize: "13px" },
  md: { padding: "10px 16px", fontSize: "14px" },
  lg: { padding: "14px 20px", fontSize: "16px" },
};

const variantStyle: Record<
  ButtonVariant,
  { background: string; color: string }
> = {
  primary: { background: semanticColor.primary, color: "#fff" },
  secondary: {
    background: semanticColor.backgroundSubtle,
    color: semanticColor.foreground,
  },
  danger: { background: semanticColor.danger, color: "#fff" },
};

export function Button({
  variant = "primary",
  size = "md",
  style,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      style={{
        border: "none",
        borderRadius: 8,
        fontWeight: 600,
        cursor: "pointer",
        ...sizeStyle[size],
        ...variantStyle[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}
