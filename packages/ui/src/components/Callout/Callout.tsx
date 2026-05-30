import { IconAlertCircleOutlined, IconChevronRight } from "@sopt-mds/icons";
import type { ReactNode } from "react";
import * as styles from "./Callout.css";

/** 콜아웃의 시맨틱 톤. `danger`는 경고, `information`은 정보 안내에 사용합니다. */
export type CalloutVariant = "danger" | "information";

export interface CalloutAction {
  /** 액션 버튼에 표시될 텍스트 라벨. */
  label: string;
  /** 액션 버튼 클릭 시 호출되는 핸들러. */
  onClick: () => void;
}

export interface CalloutProps {
  /** 콜아웃의 시맨틱 톤. */
  variant: CalloutVariant;
  /**
   * variant별 디폴트 아이콘 노출 여부.
   * @default false
   */
  showIcon?: boolean;
  /**
   * 콜아웃 하단에 표시되는 "텍스트 + 셰브론" 형태의 인라인 액션.
   * 라벨과 핸들러를 함께 전달해야 표시됩니다.
   */
  action?: CalloutAction;
  /** 콜아웃 본문 콘텐츠. */
  children: ReactNode;
}

const ariaRole: Record<CalloutVariant, "alert" | "status"> = {
  danger: "alert",
  information: "status",
};

/**
 * 텍스트나 글에서 발췌한 내용을 시각적 단서로 묶어 시선을 집중시키는 인포메이션 박스.
 *
 * - `variant`별로 디폴트 아이콘과 색이 자동 매핑됩니다.
 * - 본문(`children`) 외에 옵셔널 `action`(텍스트 + 셰브론) 슬롯을 가집니다.
 */
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
        <IconAlertCircleOutlined
          aria-hidden="true"
          className={`${styles.icon} ${styles.iconVariant[variant]}`}
        />
      )}
      <div className={styles.contents}>
        <p className={styles.body}>{children}</p>
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className={styles.action}
          >
            {action.label}
            <IconChevronRight aria-hidden="true" width={16} height={16} />
          </button>
        )}
      </div>
    </div>
  );
}
