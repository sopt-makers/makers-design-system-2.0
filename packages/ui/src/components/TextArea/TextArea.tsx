import { IconAlertCircleOutlined } from "@sopt-mds/icons";
import clsx from "clsx";
import * as React from "react";
import { mergeRefs } from "../../utils/mergeRefs";
import { syncDomValue } from "./dom";
import {
  addon,
  autoSize as autoSizeStyle,
  base,
  container,
  counter,
  description as descriptionStyle,
  footer,
  helper,
  helperIcon,
  inputWrapper,
  label as labelStyle,
  requiredMark,
  TEXTAREA_LEFT_ADDON_INSET_VARIABLE,
  TEXTAREA_RIGHT_ADDON_INSET_VARIABLE,
  variants,
} from "./TextArea.css";
import type { TextAreaVariant } from "./types";
import { useAddonInset } from "./useAddonInset";
import { useAutoSize } from "./useAutoSize";
import { clampValueToMaxLength } from "./util";

const HELPER_ICON_SIZE = 16;

export interface TextAreaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "defaultValue" | "value"
  > {
  /** TextArea의 배경/테두리 스타일을 결정합니다. */
  variant?: TextAreaVariant;
  /** 제어 컴포넌트의 현재 값입니다. */
  value: string;
  /** 값이 변경될 때 변경된 문자열 값을 인자로 호출됩니다. `onChange`와 함께 사용할 수 있습니다. */
  onValueChange?: (value: string) => void;
  /** TextArea 상단에 표시되는 라벨입니다. */
  label?: React.ReactNode;
  /** label 하단에 표시되는 보조 설명입니다. */
  description?: React.ReactNode;
  /** input 하단에 표시되는 도움말입니다. `error`가 true이면 에러 메시지로 표시됩니다. */
  helperText?: React.ReactNode;
  /** 필수 입력 여부입니다. true이면 label 옆에 `*` 표시가 붙습니다. */
  required?: boolean;
  /** 에러 상태 여부입니다. 테두리와 helper text를 danger 색으로 강조하고 `aria-invalid`를 설정합니다. */
  error?: boolean;
  /** `maxLength` 기준 글자 수 카운터(`현재/최대`)를 helper text row에 표시합니다. */
  showCount?: boolean;
  /** input 좌측에 주입되는 요소입니다. textarea의 padding spacing에 맞춰 상단에 고정됩니다. */
  leftAddon?: React.ReactNode;
  /** input 우측에 주입되는 요소입니다. textarea의 padding spacing에 맞춰 상단에 고정됩니다. */
  rightAddon?: React.ReactNode;
  /** true이면 스크롤 없이 입력되는 텍스트 높이에 맞춰 height가 자동으로 조절됩니다. */
  autoSize?: boolean;
  /** 루트 컨테이너에 전달되는 클래스명입니다. */
  className?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      variant = "default",
      label,
      description,
      helperText,
      required = false,
      error = false,
      showCount = false,
      leftAddon,
      rightAddon,
      autoSize = false,
      maxLength,
      value,
      disabled,
      id,
      className,
      style,
      onChange,
      onValueChange,
      ...rest
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const textAreaId = id ?? generatedId;
    const helperId = `${textAreaId}-helper`;

    const currentCount = value.length;

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const nextValue = clampValueToMaxLength(
        event.currentTarget.value,
        maxLength,
      );

      syncDomValue(event.currentTarget, nextValue);

      onChange?.(event);
      onValueChange?.(nextValue);
    };

    const autoSizeRef = useAutoSize(autoSize, value);
    const textAreaRef = mergeRefs(ref, autoSizeRef);

    const helperVariant = disabled ? "disabled" : error ? "error" : "default";
    const hasLabel = label != null && label !== "";
    const hasDescription = description != null && description !== "";
    const hasHelperText = helperText != null && helperText !== "";
    const hasFooter = hasHelperText || showCount;

    const [leftAddonRef, leftAddonInset] = useAddonInset(leftAddon != null);
    const [rightAddonRef, rightAddonInset] = useAddonInset(rightAddon != null);

    const inputWrapperStyle = {
      [TEXTAREA_LEFT_ADDON_INSET_VARIABLE]:
        leftAddonInset > 0 ? `${leftAddonInset}px` : undefined,
      [TEXTAREA_RIGHT_ADDON_INSET_VARIABLE]:
        rightAddonInset > 0 ? `${rightAddonInset}px` : undefined,
    } as React.CSSProperties;

    return (
      <div className={clsx(container, className)} style={style}>
        {hasLabel ? (
          <label htmlFor={textAreaId} className={labelStyle}>
            {label}
            {required ? (
              <span className={requiredMark} aria-hidden="true">
                *
              </span>
            ) : null}
          </label>
        ) : null}

        {hasDescription ? (
          <p className={descriptionStyle}>{description}</p>
        ) : null}

        <div
          className={clsx(inputWrapper, variants[variant])}
          style={inputWrapperStyle}
        >
          {leftAddon != null ? (
            <span ref={leftAddonRef} className={addon.left}>
              {leftAddon}
            </span>
          ) : null}

          <textarea
            {...rest}
            ref={textAreaRef}
            id={textAreaId}
            value={value}
            maxLength={maxLength}
            disabled={disabled}
            required={required}
            aria-invalid={error || undefined}
            aria-describedby={hasHelperText ? helperId : undefined}
            className={clsx(base, autoSize && autoSizeStyle)}
            onChange={handleChange}
          />

          {rightAddon != null ? (
            <span ref={rightAddonRef} className={addon.right}>
              {rightAddon}
            </span>
          ) : null}
        </div>

        {hasFooter ? (
          <div className={footer}>
            {hasHelperText ? (
              <span id={helperId} className={helper[helperVariant]}>
                {error && !disabled ? (
                  <IconAlertCircleOutlined
                    className={helperIcon}
                    width={HELPER_ICON_SIZE}
                    height={HELPER_ICON_SIZE}
                    aria-hidden="true"
                  />
                ) : null}
                {helperText}
              </span>
            ) : null}

            {showCount ? (
              <span className={counter[disabled ? "disabled" : "default"]}>
                {maxLength != null
                  ? `${currentCount}/${maxLength}`
                  : currentCount}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

export { TextArea };
