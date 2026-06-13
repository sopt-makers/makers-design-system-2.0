import clsx from "clsx";
import * as React from "react";
import { useRadioGroup } from "./context";
import {
  circle,
  control,
  dot,
  input,
  labelText,
  root,
  rootSizeVariants,
} from "./Radio.css";
import type { RadioSize } from "./types";

export interface RadioProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "children"
  > {
  /** Radio의 크기를 결정합니다. RadioGroup 안에서는 그룹 size를 기본값으로 사용합니다. */
  size?: RadioSize;
  /** Radio 오른쪽에 표시할 라벨입니다. 생략 시 컨트롤만 렌더링되며, 이때 `aria-label`을 권장합니다. */
  label?: React.ReactNode;
  /** 선택될 때 호출됩니다. native `onChange`와 함께 호출됩니다. (radio는 선택 시 checked=true) */
  onCheckedChange?: (checked: boolean) => void;
  /** 바깥 `<label>` 요소에 연결할 ref입니다. (forwardRef는 내부 `<input>`을 가리킵니다.) */
  rootRef?: React.Ref<HTMLLabelElement>;
}

/**
 * 단일 라디오 버튼. 네이티브 `<input type="radio">` 기반이라
 * 같은 `name`을 공유하면 단일선택·폼 제출·키보드(방향키)·제어/비제어가 모두 동작합니다.
 *
 * - `RadioGroup` 안에서는 `name`·선택 상태·`disabled`·`size`를 그룹에서 주입받습니다.
 *   이때 항목을 식별하기 위해 `value`가 필요합니다.
 * - 단독으로 쓸 때는 `checked`/`defaultChecked`·`onCheckedChange`로 제어/비제어합니다.
 * - `className`·`style`은 바깥 `<label>`에 적용됩니다.
 * - `ref`(forwardRef)는 내부 `<input>`을, `rootRef`는 바깥 `<label>`을 가리킵니다.
 */
const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      size: sizeProp,
      label,
      className,
      style,
      rootRef,
      onChange,
      onCheckedChange,
      checked: checkedProp,
      disabled: disabledProp,
      name: nameProp,
      value,
      ...inputProps
    },
    ref,
  ) => {
    const group = useRadioGroup();
    const inGroup = group != null;

    const size = sizeProp ?? group?.size ?? "small";
    const name = nameProp ?? group?.name;
    const disabled = Boolean(disabledProp) || Boolean(group?.disabled);
    // 그룹 안에서는 선택 상태를 그룹 value가 결정하고, 단독에서는 props를 따른다.
    const checked = inGroup
      ? group.value != null && String(value) === group.value
      : checkedProp;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      onCheckedChange?.(event.currentTarget.checked);
      if (inGroup && event.currentTarget.checked && value != null) {
        group.onSelect(String(value));
      }
    };

    return (
      <label
        ref={rootRef}
        style={style}
        className={clsx(root, rootSizeVariants[size], className)}
      >
        <span className={control}>
          <input
            {...inputProps}
            ref={ref}
            type="radio"
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            className={input}
            onChange={handleChange}
          />
          <span className={circle} aria-hidden>
            <span className={dot} />
          </span>
        </span>
        {label != null ? <span className={labelText}>{label}</span> : null}
      </label>
    );
  },
);

Radio.displayName = "Radio";

export { Radio };
