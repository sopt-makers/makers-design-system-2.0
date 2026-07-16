import { IconInfoCircleOutlined } from "@sopt-mds/icons";
import clsx from "clsx";
import * as React from "react";
import {
  container,
  containerVariants,
  counter as counterStyle,
  description as descriptionStyle,
  errorIcon,
  errorMessage as errorMessageStyle,
  field,
  helperRow,
  helperText as helperTextStyle,
  input as inputStyle,
  labelBlock,
  labelRow,
  label as labelStyle,
  requiredMark,
  root,
} from "./TextField.css";
import type { TextFieldVariant } from "./types";

export interface TextFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "children" | "value" | "defaultValue"
  > {
  /** 배경 variant를 결정합니다. 놓이는 표면에 따라 선택하세요. */
  variant?: TextFieldVariant;
  /** 입력 위에 표시되는 라벨입니다. `required`가 true면 옆에 `*`가 붙습니다. */
  label?: React.ReactNode;
  /** 라벨 아래 보조 설명입니다. */
  description?: React.ReactNode;
  /** 입력 아래 도움말입니다. `errorMessage`가 있으면 그 자리를 내줍니다. */
  helperText?: React.ReactNode;
  /** 에러 메시지입니다. 지정하면 에러 상태(보더·아이콘·`aria-invalid`)가 됩니다. */
  errorMessage?: React.ReactNode;
  /** 제어 모드 값입니다. */
  value?: string;
  /** 비제어 모드 초기값입니다. */
  defaultValue?: string;
  /** 값이 변경될 때 호출됩니다. native `onChange`와 함께 호출됩니다. */
  onValueChange?: (value: string) => void;
  /** 바깥 `<div>` 요소에 연결할 ref입니다. (forwardRef는 내부 `<input>`을 가리킵니다.) */
  rootRef?: React.Ref<HTMLDivElement>;
}

/**
 * 한 줄 텍스트를 입력받는 필드. 라벨·설명·헬퍼 텍스트·글자수 카운터·에러 메시지를
 * 함께 관리하며, 네이티브 `<input type="text">` 기반이라 폼 제출·검증·제어/비제어가 모두 동작합니다.
 *
 * - `label`·`description`·`helperText`·`errorMessage`는 값이 있을 때만 렌더됩니다.
 * - `errorMessage`가 있으면 에러 상태가 되고 헬퍼 텍스트 자리를 대신합니다.
 * - `maxLength`를 주면 우측 하단에 `현재/최대` 카운터가 표시됩니다.
 * - `className`·`style`은 바깥 `<div>`에 적용됩니다.
 * - `ref`(forwardRef)는 내부 `<input>`을, `rootRef`는 바깥 `<div>`를 가리킵니다.
 * - `label` 없이 쓸 때는 접근 가능한 이름을 위해 `aria-label`을 권장합니다.
 */
const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      variant = "default",
      label,
      description,
      helperText,
      errorMessage,
      value,
      defaultValue,
      onValueChange,
      className,
      style,
      rootRef,
      onChange,
      id,
      maxLength,
      required,
      disabled,
      "aria-describedby": ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const isControlled = value !== undefined;
    const [uncontrolledLength, setUncontrolledLength] = React.useState(
      defaultValue?.length ?? 0,
    );
    const currentLength = isControlled ? value.length : uncontrolledLength;

    const hasLabel = Boolean(label);
    const hasDescription = Boolean(description);
    const hasHelperText = Boolean(helperText);
    const hasError = Boolean(errorMessage);
    const hasCounter = maxLength !== undefined;
    const hasMessage = hasError || hasHelperText;

    const reactId = React.useId();
    const inputId = id ?? reactId;
    const descriptionId = `${inputId}-description`;
    const messageId = `${inputId}-message`;

    const describedBy =
      [
        hasDescription ? descriptionId : null,
        hasMessage ? messageId : null,
        ariaDescribedBy,
      ]
        .filter(Boolean)
        .join(" ") || undefined;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      onValueChange?.(event.target.value);
      if (!isControlled) {
        setUncontrolledLength(event.target.value.length);
      }
    };

    return (
      <div ref={rootRef} style={style} className={clsx(root, className)}>
        {hasLabel || hasDescription ? (
          <div className={labelBlock}>
            {hasLabel ? (
              <div className={labelRow}>
                <label htmlFor={inputId} className={labelStyle}>
                  {label}
                </label>
                {/* native required가 이미 AT에 전달되므로 별표는 시각 장식이다. */}
                {required ? (
                  <span className={requiredMark} aria-hidden>
                    *
                  </span>
                ) : null}
              </div>
            ) : null}
            {hasDescription ? (
              <p id={descriptionId} className={descriptionStyle}>
                {description}
              </p>
            ) : null}
          </div>
        ) : null}
        <div className={field}>
          <div
            className={clsx(container, containerVariants[variant])}
            data-error={hasError || undefined}
          >
            <input
              {...rest}
              ref={inputRef}
              id={inputId}
              type="text"
              className={inputStyle}
              value={value}
              defaultValue={defaultValue}
              maxLength={maxLength}
              required={required}
              disabled={disabled}
              aria-invalid={hasError || undefined}
              aria-describedby={describedBy}
              onChange={handleChange}
            />
          </div>
          {hasMessage || hasCounter ? (
            <div className={helperRow}>
              {hasError ? (
                <p id={messageId} className={errorMessageStyle}>
                  <IconInfoCircleOutlined className={errorIcon} aria-hidden />
                  {errorMessage}
                </p>
              ) : hasHelperText ? (
                <p id={messageId} className={helperTextStyle}>
                  {helperText}
                </p>
              ) : null}
              {hasCounter ? (
                <span className={counterStyle}>
                  {currentLength}/{maxLength}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  },
);

TextField.displayName = "TextField";

export { TextField };
