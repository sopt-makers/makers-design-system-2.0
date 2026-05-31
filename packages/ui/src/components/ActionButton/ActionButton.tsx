import clsx from "clsx";
import * as React from "react";
import { addon, base, sizeVariants, variantVariants } from "./ActionButton.css";
import type { ActionButtonSize } from "./types";

type ActionButtonBaseProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size"
> & {
  /** ActionButton의 왼쪽에 들어갈 아이콘 요소입니다. */
  leftAddon?: React.ReactElement;
  /** ActionButton의 오른쪽에 들어갈 아이콘 요소입니다. */
  rightAddon?: React.ReactElement;
};

/** 디자인상 `danger`는 xsmall을 제공하지 않으므로 size에서 제외합니다. */
type DangerVariantProps = {
  variant: "danger";
  size?: Exclude<ActionButtonSize, "xsmall">;
};

type DefaultVariantProps = {
  variant?: "primary" | "secondary";
  size?: ActionButtonSize;
};

export type ActionButtonProps = ActionButtonBaseProps &
  (DangerVariantProps | DefaultVariantProps);

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
