import { IconXClose } from "@sopt-mds/icons";
import { useEffect } from "react";
import { Sidebar } from "../Sidebar";
import * as styles from "./MobileMenu.css";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ≤768에서 햄버거로 여는 풀스크린 메뉴. 화면 전체를 덮으며,
 * 내용은 데스크탑과 동일한 Sidebar를 재사용한다(chrome만 다름).
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // 열린 동안 Esc로 닫기 + 배경 스크롤 잠금
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={styles.panel}
      role="dialog"
      aria-modal="true"
      aria-label="메뉴"
    >
      <div className={styles.closeRow}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="메뉴 닫기"
        >
          <IconXClose />
        </button>
      </div>
      <Sidebar />
    </div>
  );
}
