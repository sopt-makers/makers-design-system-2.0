import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import * as React from "react";
import {
  addon,
  base,
  content,
  input,
  sizeVariants,
  typeVariants,
} from "./Chip.css";
import type { ChipSize, ChipType } from "./types";

export interface ChipOwnProps {
  /**
   * true면 Chip을 자식 요소로 렌더링합니다.
   * @default false
   */
  asChild?: boolean;
  /** Chip의 크기를 결정합니다. */
  size?: ChipSize;
  /** Chip의 표현 방식을 결정합니다. */
  type?: ChipType;
  /** Chip의 왼쪽에 들어갈 아이콘 요소입니다. */
  leftAddon?: React.ReactElement;
  /** Chip의 오른쪽에 들어갈 아이콘 요소입니다. */
  rightAddon?: React.ReactElement;
}

type ChipPropsWithRef = Omit<
  React.ComponentPropsWithRef<"button">,
  keyof ChipOwnProps
> &
  ChipOwnProps;

export type ChipProps = ChipPropsWithRef;

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
  /** Chip.Toggle의 표현 방식을 결정합니다. */
  type?: ChipType;
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
}: Pick<ChipOwnProps, "leftAddon" | "rightAddon"> & {
  children?: React.ReactNode;
}) {
  return (
    <>
      {leftAddon != null ? <span className={addon}>{leftAddon}</span> : null}
      <span className={content}>{children}</span>
      {rightAddon != null ? <span className={addon}>{rightAddon}</span> : null}
    </>
  );
}

const ChipRoot = React.forwardRef(
  (props: ChipPropsWithRef, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const {
      asChild = false,
      size = "medium",
      type = "outlined",
      leftAddon,
      rightAddon,
      children,
      className,
      ...rest
    } = props;

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        {...rest}
        {...(!asChild ? { type: "button" as const } : null)}
        ref={ref}
        className={clsx(
          base,
          sizeVariants[size],
          typeVariants[type],
          className,
        )}
      >
        {asChild
          ? children
          : renderChipContent({ leftAddon, rightAddon, children })}
      </Comp>
    );
  },
) as React.ForwardRefExoticComponent<ChipPropsWithRef>;

const ChipToggle = React.forwardRef<HTMLInputElement, ChipToggleProps>(
  (
    {
      size = "medium",
      type = "outlined",
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
          typeVariants[type],
          className,
        )}
      >
        <input
          {...inputProps}
          {...restInputProps}
          ref={ref}
          type="checkbox"
          disabled={resolvedDisabled}
          className={clsx(input, inputProps?.className)}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
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
