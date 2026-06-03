import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import * as styles from "./DocsLayout.css";
import { MobileMenu } from "./MobileMenu";
import { Sidebar } from "./Sidebar";
import { TableOfContents } from "./TableOfContents";
import { TopNavigation } from "./TopNavigation";

/**
 * 문서 사이트 전역 레이아웃.
 * 데스크탑은 [Sidebar | 본문 | TableOfContents] 3컬럼, ≤768은 헤더+햄버거 드로어(MobileMenu).
 */
export function DocsLayout() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // 네비게이션이 일어나면(링크 클릭으로 경로 변경) 드로어를 닫는다.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname 변화 자체가 트리거이며, 닫기 동작만 수행한다.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className={styles.shell}>
      <TopNavigation onMenuClick={() => setMobileMenuOpen(true)} />

      <div className={styles.body}>
        <aside className={styles.sidebarCell}>
          <Sidebar />
        </aside>
        <main className={styles.article}>
          <Outlet />
        </main>
        <div className={styles.tableOfContentsCell}>
          <TableOfContents />
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </div>
  );
}
