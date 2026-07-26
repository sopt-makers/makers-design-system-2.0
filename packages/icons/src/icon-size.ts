import type { SVGProps } from "react";

/**
 * 아이콘 크기 단계.
 *
 * 원본 SVG는 24x24로 그려져 있고 `size`를 생략하면 그 크기가 그대로 남는다.
 * 단계 값은 정사각이므로 width와 height에 같은 수를 쓴다.
 */
export const ICON_SIZES = {
  small: 12,
  medium: 14,
} as const;

export type IconSize = keyof typeof ICON_SIZES;

export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * 아이콘 크기 단계입니다. 생략하면 원본 크기(24x24)로 렌더링됩니다.
   * `width`/`height`를 직접 넘기면 그쪽이 우선합니다.
   */
  size?: IconSize;
}

/**
 * `size`를 svg의 width/height로 푼다.
 *
 * 미지정이면 빈 객체를 반환해 svg에 선언된 기본값(24)이 살아남는다.
 * `undefined`를 담은 객체를 돌려주면 React가 속성을 지워 버려 크기가 0이 되므로
 * 키 자체를 만들지 않는 편이 안전하다.
 */
export const resolveIconSize = (
  size?: IconSize,
): Pick<SVGProps<SVGSVGElement>, "width" | "height"> =>
  size === undefined
    ? {}
    : { width: ICON_SIZES[size], height: ICON_SIZES[size] };
