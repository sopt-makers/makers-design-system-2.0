import clsx from "clsx";
import * as React from "react";
import { root, sizeVariants } from "./Toggle.css";
import type { ToggleSize } from "./types";

export interface ToggleProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "children" | "size" | "type"
  > {
  /** Toggle의 크기를 결정합니다. */
  size?: ToggleSize;
  /** 선택 상태가 변경될 때 호출됩니다. native `onChange`와 함께 호출됩니다. */
  onCheckedChange?: (checked: boolean) => void;
}

const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      size = "small",
      className,
      checked,
      disabled,
      onChange,
      onCheckedChange,
      ...inputProps
    },
    ref,
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      onCheckedChange?.(event.currentTarget.checked);
    };

    return (
      <input
        {...inputProps}
        ref={ref}
        role="switch"
        checked={checked}
        aria-checked={checked}
        type="checkbox"
        disabled={disabled}
        className={clsx(root, sizeVariants[size], className)}
        onChange={handleChange}
      />
    );
  },
);

Toggle.displayName = "Toggle";

export { Toggle };
