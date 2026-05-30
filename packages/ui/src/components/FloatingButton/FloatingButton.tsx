import clsx from "clsx";
import * as React from "react";
import {
  base,
  icon as iconClass,
  label as labelClass,
  modeVariants,
} from "./FloatingButton.css";

export interface FloatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼에 표시할 아이콘 요소입니다. */
  icon: React.ReactElement;
  /**
   * 라벨 텍스트입니다.
   * 값이 있으면 아이콘 + 라벨 확장 형태, 없으면 아이콘 전용 형태로 렌더링됩니다.
   */
  children?: React.ReactNode;
}

const FloatingButton = React.forwardRef<HTMLButtonElement, FloatingButtonProps>(
  ({ icon, type = "button", children, className, ...rest }, ref) => {
    const hasLabel = children != null && children !== false;

    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        className={clsx(
          base,
          hasLabel ? modeVariants.withLabel : modeVariants.iconOnly,
          className,
        )}
      >
        <span className={iconClass}>{icon}</span>
        {hasLabel ? <span className={labelClass}>{children}</span> : null}
      </button>
    );
  },
);

FloatingButton.displayName = "FloatingButton";

export { FloatingButton };
