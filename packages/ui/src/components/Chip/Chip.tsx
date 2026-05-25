import clsx from "clsx";
import * as React from "react";
import {
  addon,
  base,
  content,
  input,
  sizeVariants,
  stateVariants,
} from "./Chip.css";
import type { ChipSize } from "./types";

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Chip의 크기를 결정합니다. */
  size?: ChipSize;
  /** Chip의 왼쪽에 들어갈 아이콘 요소입니다. */
  leftAddon?: React.ReactElement;
  /** Chip의 오른쪽에 들어갈 아이콘 요소입니다. */
  rightAddon?: React.ReactElement;
}

type ChipToggleRootProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
>;

type ChipToggleNestedInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "children" | "size" | "style" | "type"
>;

export interface ChipToggleProps extends ChipToggleRootProps {
  /** Chip.Toggle의 크기를 결정합니다. */
  size?: ChipSize;
  /** Chip의 왼쪽에 들어갈 아이콘 요소입니다. */
  leftAddon?: React.ReactElement;
  /** Chip의 오른쪽에 들어갈 아이콘 요소입니다. */
  rightAddon?: React.ReactElement;
  /** Chip.Toggle의 체크 상태를 결정합니다. */
  checked?: boolean;
  /** Chip.Toggle의 체크 상태가 변경될 때 호출되는 함수입니다. */
  onCheckedChange?: (checked: boolean) => void;

  rootRef?: React.Ref<HTMLLabelElement>;
  className?: string;
  style?: React.CSSProperties;

  inputProps?: ChipToggleNestedInputProps;
}

function renderChipContent({
  leftAddon,
  rightAddon,
  children,
}: Pick<ChipProps, "leftAddon" | "rightAddon" | "children">) {
  return (
    <>
      {leftAddon != null ? <span className={addon}>{leftAddon}</span> : null}
      <span className={content}>{children}</span>
      {rightAddon != null ? <span className={addon}>{rightAddon}</span> : null}
    </>
  );
}

const ChipRoot = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
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
          stateVariants.default,
          className,
        )}
      >
        {renderChipContent({ leftAddon, rightAddon, children })}
      </button>
    );
  },
);

const ChipToggle = React.forwardRef<HTMLInputElement, ChipToggleProps>(
  (
    {
      size = "medium",
      leftAddon,
      rightAddon,

      rootRef,
      inputProps,
      disabled,
      children,
      className,
      style,
      onChange,
      onCheckedChange,
      onKeyDown,

      ...restInputProps
    },
    ref,
  ) => {
    const resolvedDisabled = disabled ?? inputProps?.disabled ?? false;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      inputProps?.onChange?.(event);
      onChange?.(event);
      onCheckedChange?.(event.currentTarget.checked);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      inputProps?.onKeyDown?.(event);
      onKeyDown?.(event);

      if (event.defaultPrevented || event.key !== "Enter") {
        return;
      }

      event.preventDefault();
      event.currentTarget.click();
    };

    return (
      <label
        ref={rootRef}
        style={style}
        aria-disabled={resolvedDisabled ? true : undefined}
        className={clsx(
          base,
          sizeVariants[size],
          stateVariants[disabled ? "disabled" : "default"],
          className,
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          disabled={resolvedDisabled}
          className={clsx(input, inputProps?.className)}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          {...inputProps}
          {...restInputProps}
        />
        {renderChipContent({ leftAddon, rightAddon, children })}
      </label>
    );
  },
);

ChipRoot.displayName = "Chip";
ChipToggle.displayName = "Chip.Toggle";

export const Chip = Object.assign(ChipRoot, {
  Toggle: ChipToggle,
});

Chip.displayName = "Chip";
