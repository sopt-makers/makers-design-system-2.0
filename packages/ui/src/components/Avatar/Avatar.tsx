import { IconUserFilled } from "@sopt-mds/icons";
import clsx from "clsx";
import * as React from "react";
import {
  AVATAR_STROKE_COLOR_VARIABLE,
  base,
  fallback,
  image as imageClass,
  sizeVariants,
  stroke,
} from "./Avatar.css";
import {
  AVATAR_STROKE_COLORS,
  DEFAULT_AVATAR_SIZE,
  getAvatarFallbackIconSize,
} from "./constant";
import type { AvatarSize, AvatarStrokeColor } from "./types";

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** 아바타에 표시할 이미지 URL입니다. 없거나 로드에 실패하면 fallback 아이콘이 렌더링됩니다. */
  src?: string;
  /** 이미지의 대체 텍스트입니다. */
  alt?: string;
  /** 아바타의 크기(px)입니다. 24/32/48/56/72/80/120/180 중 하나입니다. */
  size?: AvatarSize;
  /**
   * stroke(테두리) 색상입니다. stroke 시맨틱 컬러 토큰의 카멜 케이스 key를 받습니다.
   * "neutralDefault", "brandSubtle", "secondaryDefault"
   */
  strokeColor?: AvatarStrokeColor;
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      alt = "",
      size = DEFAULT_AVATAR_SIZE,
      strokeColor,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const showFallback = src == null;
    const fallbackIconSize = getAvatarFallbackIconSize(size);
    const hasStroke = strokeColor != null;

    const resolvedStyle = hasStroke
      ? ({
          ...style,
          [AVATAR_STROKE_COLOR_VARIABLE]: AVATAR_STROKE_COLORS[strokeColor],
        } as React.CSSProperties)
      : style;

    return (
      <span
        {...rest}
        ref={ref}
        style={resolvedStyle}
        className={clsx(base, sizeVariants[size], className)}
      >
        {showFallback ? (
          <span className={fallback} role="img" aria-label={alt || undefined}>
            <IconUserFilled
              width={fallbackIconSize}
              height={fallbackIconSize}
              aria-hidden="true"
            />
          </span>
        ) : (
          <img className={imageClass} src={src} alt={alt} />
        )}
        {hasStroke ? <span className={stroke} aria-hidden="true" /> : null}
      </span>
    );
  },
);

Avatar.displayName = "Avatar";
