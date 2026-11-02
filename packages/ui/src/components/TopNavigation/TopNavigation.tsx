import clsx from "clsx";
import type { HTMLAttributes } from "react";
import { base } from "./TopNavigation.css";

export interface TopNavigationProps extends HTMLAttributes<HTMLDivElement> {
  /** @example 이 prop에 대한 설명을 작성하세요. */
}

export function TopNavigation({ className, children, ...rest }: TopNavigationProps) {
  return (
    <div className={clsx(base, className)} {...rest}>
      {children}
    </div>
  );
}
