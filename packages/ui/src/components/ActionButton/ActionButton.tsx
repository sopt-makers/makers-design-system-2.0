import clsx from "clsx";
import * as React from "react";
import { addon, base, sizeVariants, variantVariants } from "./ActionButton.css";
import type { ActionButtonSize, ActionButtonVariant } from "./types";

export interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** ActionButton의 시각 위계를 결정합니다. */
  variant?: ActionButtonVariant;
  /** ActionButton의 크기를 결정합니다. */
  size?: ActionButtonSize;
  /** ActionButton의 왼쪽에 들어갈 아이콘 요소입니다. */
  leftAddon?: React.ReactElement;
  /** ActionButton의 오른쪽에 들어갈 아이콘 요소입니다. */
  rightAddon?: React.ReactElement;
}

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      type = "button",
      leftAddon,
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
        {leftAddon != null ? <span className={addon}>{leftAddon}</span> : null}
        {children}
        {rightAddon != null ? (
          <span className={addon}>{rightAddon}</span>
        ) : null}
      </button>
    );
  },
);

ActionButton.displayName = "ActionButton";

export { ActionButton };
