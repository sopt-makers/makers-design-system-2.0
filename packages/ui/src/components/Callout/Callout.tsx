import type { ReactNode } from "react";
import { AlertCircleIcon, ChevronRightIcon } from "./Callout.icons";
import * as styles from "./Callout.css";

export type CalloutVariant = "danger" | "information";

export interface CalloutAction {
  label: string;
  onClick: () => void;
}

export interface CalloutProps {
  variant: CalloutVariant;
  showIcon?: boolean;
  action?: CalloutAction;
  children: ReactNode;
}

const ariaRole: Record<CalloutVariant, "alert" | "status"> = {
  danger: "alert",
  information: "status",
};

export function Callout({
  variant,
  showIcon = false,
  action,
  children,
}: CalloutProps) {
  return (
    <div
      role={ariaRole[variant]}
      className={`${styles.container} ${styles.containerVariant[variant]}`}
    >
      {showIcon && (
        <AlertCircleIcon
          className={`${styles.icon} ${styles.iconVariant[variant]}`}
        />
      )}
      <div className={styles.contents}>
        <p className={`${styles.body} ${styles.bodyVariant[variant]}`}>
          {children}
        </p>
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className={styles.action}
          >
            {action.label}
            <ChevronRightIcon />
          </button>
        )}
      </div>
    </div>
  );
}
