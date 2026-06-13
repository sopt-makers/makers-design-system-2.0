import clsx from "clsx";
import * as React from "react";
import { RadioGroupContext } from "./context";
import { groupRoot, orientationVariants } from "./RadioGroup.css";
import type { RadioOrientation, RadioSize } from "./types";

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 선택된 값 (제어 컴포넌트). */
  value?: string;
  /** 초기 선택값 (비제어 컴포넌트). */
  defaultValue?: string;
  /** 선택이 바뀔 때 호출됩니다. */
  onValueChange?: (value: string) => void;
  /** 그룹 내 radio들이 공유할 name. 생략 시 자동 생성됩니다. */
  name?: string;
  /** 그룹 전체를 비활성화합니다. */
  disabled?: boolean;
  /** 그룹 기본 size입니다. 개별 Radio의 size가 우선합니다. */
  size?: RadioSize;
  /** 항목 배치 방향입니다. */
  orientation?: RadioOrientation;
}

/**
 * 여러 Radio를 하나의 단일선택 그룹으로 묶는 얇은 래퍼.
 * `value`/`onValueChange`(제어) 또는 `defaultValue`(비제어)로 선택 상태를 관리하고,
 * 공유 `name`·`disabled`·`size`를 Context로 하위 Radio에 주입합니다.
 *
 * 단일선택 강제·방향키 이동은 같은 `name`을 가진 native radio가 처리하며,
 * Context는 선택 값 동기화만 담당합니다.
 *
 * `ref`는 그룹 루트 `<div role="radiogroup">`을 가리킵니다.
 */
const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      name,
      disabled = false,
      size = "small",
      orientation = "vertical",
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const generatedName = React.useId();
    const groupName = name ?? generatedName;

    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] =
      React.useState(defaultValue);
    const currentValue = isControlled ? value : uncontrolledValue;

    const handleSelect = React.useCallback(
      (next: string) => {
        if (!isControlled) {
          setUncontrolledValue(next);
        }
        onValueChange?.(next);
      },
      [isControlled, onValueChange],
    );

    const contextValue = React.useMemo(
      () => ({
        name: groupName,
        value: currentValue,
        onSelect: handleSelect,
        disabled,
        size,
      }),
      [groupName, currentValue, handleSelect, disabled, size],
    );

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div
          {...rest}
          ref={ref}
          role="radiogroup"
          aria-orientation={orientation}
          className={clsx(
            groupRoot,
            orientationVariants[orientation],
            className,
          )}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
