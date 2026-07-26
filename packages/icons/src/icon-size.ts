import type { SVGProps } from "react";

/**
 * 아이콘 크기 단계.
 *
 * 원본 SVG는 24x24로 그려져 있고 `size`를 생략하면 그 크기가 그대로 남는다.
 * 단계 값은 정사각이므로 width와 height에 같은 수를 쓴다.
 *
 * @sopt-mds/ui 컴포넌트들이 addon 슬롯 아이콘에 쓰는 크기(예: ActionButton small은
 * 16px)와는 **별개 스케일**이다. 이름이 겹치지만 서로 참조하지 않는다. 컴포넌트 안에
 * 들어간 아이콘은 컴포넌트가 CSS로 width/height를 덮으므로 그쪽 값이 이긴다.
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
 *
 * 타입에 없는 값이 들어오는 경우(타입 검사를 받지 않는 JS 소비자, 서버에서 내려온
 * 문자열)도 같은 이유로 빈 객체로 떨어뜨린다. `ICON_SIZES[size]`를 그대로 펴면
 * `width: undefined`가 되어 아이콘이 사라진다.
 */
export const resolveIconSize = (
  size?: IconSize,
): Pick<SVGProps<SVGSVGElement>, "width" | "height"> => {
  const px = size === undefined ? undefined : ICON_SIZES[size];
  return px === undefined ? {} : { width: px, height: px };
};
