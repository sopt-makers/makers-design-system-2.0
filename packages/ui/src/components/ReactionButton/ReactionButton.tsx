import clsx from "clsx";
import * as React from "react";
import { addon, base, pill, sizeVariants, text } from "./ReactionButton.css";
import type { ReactionButtonSize } from "./types";

export interface ReactionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** ReactionButton의 크기를 결정합니다. */
  size?: ReactionButtonSize;
  /** 토글 선택 상태입니다. (aria-pressed로 반영) */
  selected?: boolean;
  /** 왼쪽에 들어갈 반응 아이콘 요소입니다. */
  leftAddon?: React.ReactElement;
  /** 오른쪽에 들어갈 아이콘 요소입니다. (예: chevron) */
  rightAddon?: React.ReactElement;
  /** 반응 개수입니다. */
  count?: string | number;
  /** 라벨 텍스트입니다. */
  children?: React.ReactNode;
}

const ReactionButton = React.forwardRef<HTMLButtonElement, ReactionButtonProps>(
  (
    {
      size = "small",
      selected = false,
      type = "button",
      leftAddon,
      rightAddon,
      count,
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
        aria-pressed={selected}
        className={clsx(
          base,
          sizeVariants[size],
          size !== "xsmall" && pill,
          className,
        )}
      >
        {leftAddon != null ? <span className={addon}>{leftAddon}</span> : null}
        {children != null ? <span className={text}>{children}</span> : null}
        {count != null ? <span className={text}>{count}</span> : null}
        {rightAddon != null ? (
          <span className={addon}>{rightAddon}</span>
        ) : null}
      </button>
    );
  },
);

ReactionButton.displayName = "ReactionButton";

export { ReactionButton };
