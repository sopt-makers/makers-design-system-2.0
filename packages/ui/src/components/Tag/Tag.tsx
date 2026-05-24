import clsx from "clsx";
import type { HTMLAttributes, ReactElement } from "react";
import { tagColorStyleVariantKey } from "./constant";
import {
  base,
  shapeVariants,
  sizeVariants,
  tagColorStyleVariants,
} from "./Tag.css";
import type { TagShape, TagSize, TagType, TagVariant } from "./types";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Tag의 색상 테마를 결정합니다. */
  variant?: TagVariant;
  /** Tag의 크기를 결정합니다. */
  size?: TagSize;
  /** Tag의 모양을 결정합니다. */
  shape?: TagShape;
  /** Tag의 종류를 결정합니다. */
  type?: TagType;
  /** Tag의 왼쪽에 들어갈 아이콘 요소입니다. */
  leftAddon?: ReactElement;
}

export function Tag({
  variant = "default",
  size = "medium",
  shape = "rect",
  type = "solid",
  leftAddon,
  children,
  className,
  ...rest
}: TagProps) {
  return (
    <span
      className={clsx(
        base,
        shapeVariants[shape],
        sizeVariants[size],
        tagColorStyleVariants[tagColorStyleVariantKey(variant, type)],
        className,
      )}
      {...rest}
    >
      {leftAddon != null ? leftAddon : null}
      {children}
    </span>
  );
}
