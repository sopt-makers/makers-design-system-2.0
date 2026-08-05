import clsx from "clsx";
import * as React from "react";
import { addon, base, sizeVariants, variantVariants } from "./TextButton.css";
import type { TextButtonSize, TextButtonVariant } from "./types";

export interface TextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** TextButton의 강조 수준을 결정합니다. */
  variant?: TextButtonVariant;
  /** TextButton의 크기를 결정합니다. */
  size?: TextButtonSize;
  /** 텍스트 뒤에 들어갈 아이콘 요소입니다. */
  rightAddon?: React.ReactElement;
}

const TextButton = React.forwardRef<HTMLButtonElement, TextButtonProps>(
  (
    {
      variant = "default",
      size = "small",
      type = "button",
      rightAddon,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        className={clsx(
          base,
          sizeVariants[size],
          variantVariants[variant],
          className,
        )}
      >
        {children}
        {rightAddon != null ? (
          <span className={addon}>{rightAddon}</span>
        ) : null}
      </button>
    );
  },
);

TextButton.displayName = "TextButton";

export { TextButton };
