import { IconSearchOutlined, IconXCircleFilled } from "@sopt-mds/icons";
import clsx from "clsx";
import {
  clearButton,
  clearIcon,
  input as inputStyle,
  root,
  rootVariants,
  searchIcon,
} from "./SearchField.css";
import type { SearchFieldVariant } from "./types";
import { forwardRef, useImperativeHandle, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";

export interface SearchFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "children" | "value" | "defaultValue"
  > {
  /** 배경 variant를 결정합니다. 놓이는 표면에 따라 선택하세요. */
  variant?: SearchFieldVariant;
  /** 제어 모드 값입니다. */
  value?: string;
  /** 비제어 모드 초기값입니다. */
  defaultValue?: string;
  /** 값이 변경될 때 호출됩니다. native `onChange`와 함께 호출됩니다. */
  onValueChange?: (value: string) => void;
  /** Enter로 검색을 실행할 때 호출됩니다. 지정 시 form 기본 제출을 막습니다. */
  onSearch?: (value: string) => void;
  /** 클리어 버튼 / Escape로 값이 비워질 때 호출됩니다. */
  onClear?: () => void;
  /** 바깥 `<div>` 요소에 연결할 ref입니다. (forwardRef는 내부 `<input>`을 가리킵니다.) */
  rootRef?: React.Ref<HTMLDivElement>;
}

/** IME 조합 중인 키 이벤트인지 판별한다(조합 확정 Enter/Escape 이중 처리 방지). */
const isComposing = (event: React.KeyboardEvent<HTMLInputElement>) =>
  event.nativeEvent.isComposing || event.keyCode === 229;

/**
 * 검색 입력 필드. 네이티브 `<input type="search">` 기반이라
 * 폼 제출·키보드(Enter 검색/Escape 클리어)·제어/비제어가 모두 동작합니다.
 *
 * - 값이 있으면 클리어 버튼이 항상 표시됩니다(disabled/readOnly 제외).
 * - 클리어는 native input 이벤트를 발화하므로 `onChange`·`onValueChange`가 함께 호출됩니다.
 * - `className`·`style`은 바깥 `<div>`에 적용됩니다.
 * - `ref`(forwardRef)는 내부 `<input>`을, `rootRef`는 바깥 `<div>`를 가리킵니다.
 * - 접근 가능한 이름을 위해 `aria-label`(또는 연결된 `<label>`)을 권장합니다.
 */
const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      variant = "default",
      value,
      defaultValue,
      onValueChange,
      onSearch,
      onClear,
      className,
      style,
      rootRef,
      onChange,
      onKeyDown,
      disabled,
      readOnly,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const isControlled = value !== undefined;
    // :placeholder-shown은 placeholder 미지정 시 오판하므로 값 존재를 직접 추적한다.
    const [uncontrolledHasValue, setUncontrolledHasValue] = useState(
      Boolean(defaultValue),
    );
    const hasValue = isControlled ? value !== "" : uncontrolledHasValue;
    const showClear = hasValue && !disabled && !readOnly;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      onValueChange?.(event.target.value);
      if (!isControlled) {
        setUncontrolledHasValue(event.target.value !== "");
      }
    };

    /** native value setter로 비우고 input 이벤트를 발화해 React onChange 경로를 태운다. */
    const clear = () => {
      const input = inputRef.current;
      if (input == null) {
        return;
      }
      Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value",
      )?.set?.call(input, "");
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
      onClear?.();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);
      // 사용자 핸들러가 preventDefault했으면 내장 동작을 실행하지 않는다.
      if (event.defaultPrevented || isComposing(event)) {
        return;
      }
      if (event.key === "Enter" && onSearch != null) {
        // form 중복 제출 방지
        event.preventDefault();
        onSearch(event.currentTarget.value);
        return;
      }
      // 값이 있을 때만 Escape를 소비한다(비어 있으면 전파돼 부모 오버레이 닫힘 허용).
      // readOnly는 keydown을 받지만 값을 바꾸면 안 되므로 제외한다.
      if (
        event.key === "Escape" &&
        !readOnly &&
        event.currentTarget.value !== ""
      ) {
        event.preventDefault();
        clear();
      }
    };

    /** 컨테이너 클릭 시 input으로 포커스 위임(클리어 버튼 클릭 제외). */
    const handleRootClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (
        event.target instanceof Element &&
        event.target.closest("button") != null
      ) {
        return;
      }
      inputRef.current?.focus();
    };

    return (
      <div
        ref={rootRef}
        style={style}
        className={clsx(root, rootVariants[variant], className)}
        onClick={handleRootClick}
      >
        <IconSearchOutlined className={searchIcon} aria-hidden />
        <input
          enterKeyHint="search"
          {...rest}
          ref={inputRef}
          type="search"
          className={inputStyle}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {showClear ? (
          <button
            type="button"
            tabIndex={-1}
            aria-label="검색어 지우기"
            className={clearButton}
            onPointerDown={(event) => event.preventDefault()}
            onClick={clear}
          >
            <IconXCircleFilled className={clearIcon} aria-hidden />
          </button>
        ) : null}
      </div>
    );
  },
);

SearchField.displayName = "SearchField";

export { SearchField };
