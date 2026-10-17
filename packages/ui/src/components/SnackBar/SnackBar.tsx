import { IconAlertCircleFilled, IconCheckCircleFilled } from "@sopt-mds/icons";
import clsx from "clsx";
import * as React from "react";
import { TextButton } from "../TextButton";
import * as styles from "./SnackBar.css";
import type { SnackBarAction, SnackBarVariant } from "./types";

export interface SnackBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  variant?: SnackBarVariant;
  action?: SnackBarAction;
  children: React.ReactNode;
}

const VARIANT_ICON: Record<
  Exclude<SnackBarVariant, "default">,
  typeof IconCheckCircleFilled
> = {
  success: IconCheckCircleFilled,
  alert: IconAlertCircleFilled,
  error: IconAlertCircleFilled,
};

const SnackBar = React.forwardRef<HTMLDivElement, SnackBarProps>(
  ({ variant = "default", action, children, className, ...rest }, ref) => {
    const Icon = variant === "default" ? null : VARIANT_ICON[variant];
    const labelRef = React.useRef<HTMLParagraphElement>(null);

    // biome-ignore lint/correctness/useExhaustiveDependencies: children은 본문에서 직접 읽지 않지만, 메시지가 바뀌면 다시 측정하기 위한 트리거 의존성이다.
    React.useEffect(() => {
      if (process.env.NODE_ENV === "production") return;
      const label = labelRef.current;
      if (label != null && label.scrollHeight > label.clientHeight) {
        console.warn(
          "[mds] SnackBar 메시지가 두 줄을 넘어 말줄임 처리되었습니다. 두 줄을 넘는 메시지는 Dialog나 BottomSheet를 사용하세요.",
          label.textContent,
        );
      }
    }, [children]);

    return (
      <div
        role={variant === "error" ? "alert" : "status"}
        {...rest}
        ref={ref}
        className={clsx(styles.container, className)}
      >
        <div className={styles.content}>
          {Icon != null && variant !== "default" && (
            <Icon
              aria-hidden="true"
              className={clsx(styles.icon, styles.iconVariant[variant])}
            />
          )}
          <p ref={labelRef} className={styles.label}>
            {children}
          </p>
        </div>
        {action && (
          <TextButton
            size="medium"
            onClick={action.onClick}
            className={styles.action}
          >
            {action.label}
          </TextButton>
        )}
      </div>
    );
  },
);

SnackBar.displayName = "SnackBar";

export { SnackBar };
