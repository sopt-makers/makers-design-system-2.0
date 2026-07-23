import { IconCheck } from "@sopt-mds/icons";
import clsx from "clsx";
import * as React from "react";
import {
  box,
  control,
  icon,
  input,
  labelText,
  root,
  rootSizeVariants,
} from "./Checkbox.css";
import type { CheckboxSize } from "./types";

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "children"
  > {
  /**
   * Checkbox의 크기를 결정합니다.
   *
   * 생략하면 크기 클래스가 붙지 않아 조상이 주입한 `--mds-checkbox-*` 값을 상속받습니다.
   * 상속값이 없으면 `small` 치수로 렌더링됩니다.
   */
  size?: CheckboxSize;
  /** Checkbox 오른쪽에 표시할 라벨입니다. 생략 시 컨트롤만 렌더링되며, 이때 `aria-label`을 권장합니다. */
  label?: React.ReactNode;
  /** 체크 상태가 변경될 때 호출됩니다. native `onChange`와 함께 호출됩니다. */
  onCheckedChange?: (checked: boolean) => void;
  /** 바깥 `<label>` 요소에 연결할 ref입니다. (forwardRef는 내부 `<input>`을 가리킵니다.) */
  rootRef?: React.Ref<HTMLLabelElement>;
}

/**
 * 단일 boolean 체크박스. 네이티브 `<input type="checkbox">` 기반이라
 * 복수선택(각 인스턴스가 독립)·폼 제출·키보드(Space)·제어/비제어가 모두 동작합니다.
 *
 * - `className`·`style`은 바깥 `<label>`에 적용됩니다.
 * - 그 외 native input 속성(`checked`, `defaultChecked`, `disabled`, `name`, `value` 등)은
 *   내부 `<input>`으로 그대로 전달됩니다.
 * - `ref`(forwardRef)는 내부 `<input>`을, `rootRef`는 바깥 `<label>`을 가리킵니다.
 * - 치수/타이포는 `--mds-checkbox-*` 변수로 오버라이드할 수 있습니다. `size`를 생략하면
 *   조상이 주입한 값을 상속받고, `size`를 명시하면 그 값이 상속을 덮어씁니다.
 */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size,
      label,
      className,
      style,
      rootRef,
      onChange,
      onCheckedChange,
      ...inputProps
    },
    ref,
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      onCheckedChange?.(event.currentTarget.checked);
    };

    return (
      <label
        ref={rootRef}
        style={style}
        className={clsx(root, size && rootSizeVariants[size], className)}
      >
        <span className={control}>
          <input
            {...inputProps}
            ref={ref}
            type="checkbox"
            className={input}
            onChange={handleChange}
          />
          <span className={box} aria-hidden>
            <IconCheck className={icon} />
          </span>
        </span>
        {label != null ? <span className={labelText}>{label}</span> : null}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
