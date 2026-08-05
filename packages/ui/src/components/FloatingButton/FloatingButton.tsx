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
   * 값이 있으면 아이콘 + 라벨 확장 형태, 렌더될 내용이 없으면(빈 문자열·공백뿐인 문자열·
   * `undefined`·`false`·빈 배열) 아이콘 전용 형태로 렌더링됩니다.
   */
  children?: React.ReactNode;
}

const FloatingButton = React.forwardRef<HTMLButtonElement, FloatingButtonProps>(
  ({ icon, type = "button", children, className, ...rest }, ref) => {
    // 라벨 유무는 "실제로 렌더될 내용이 있는지"로 판정한다. `!= null`이나 `Boolean()`은
    // 빈 문자열·공백만 있는 문자열·배열 children(`{cond && "글쓰기"}{suffix}`처럼 표현식이
    // 둘 이상이면 배열이 되고 배열은 언제나 truthy)을 라벨로 보아, 빈 span과 확장 형태
    // padding이 남는다. React.Children.toArray가 null/false/undefined를 걸러주므로
    // 남은 것 중 공백뿐인 텍스트만 추가로 제외한다. 숫자 `0`은 유효한 라벨로 남긴다.
    // (plans/design-decisions.md TextField 결정 2번 "값 존재로 파생"의 연장)
    const hasLabel = React.Children.toArray(children).some((child) =>
      typeof child === "string" || typeof child === "number"
        ? String(child).trim() !== ""
        : true,
    );

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
