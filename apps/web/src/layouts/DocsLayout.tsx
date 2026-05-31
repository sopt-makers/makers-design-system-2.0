import { IconXClose } from "@sopt-mds/icons";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import * as styles from "./DocsLayout.css";
import { TopNavigation } from "./TopNavigation";

/**
 * 문서 사이트 전역 레이아웃.
 * 상단 내비게이션은 완성됐고, Sidebar / Toc는 각 영역 작업에서
 * placeholder를 실제 컴포넌트로 교체한다.
 */
export function DocsLayout() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={styles.shell}>
      <TopNavigation onMenuClick={() => setMobileMenuOpen(true)} />

      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <span className={styles.placeholderLabel}>sidebar</span>
        </aside>
        <main className={styles.article}>
          <Outlet />
        </main>
        <nav className={styles.toc}>
          <span className={styles.placeholderLabel}>toc</span>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div className={styles.overlay}>
          <button
            type="button"
            className={styles.overlayCloseButton}
            onClick={() => setMobileMenuOpen(false)}
            aria-label="메뉴 닫기"
          >
            <IconXClose />
          </button>
          <p className={styles.overlayPlaceholder}>모바일 메뉴 (준비 중)</p>
        </div>
      )}
    </div>
  );
}
