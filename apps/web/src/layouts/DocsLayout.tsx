import { Outlet } from "react-router-dom";
import * as styles from "./DocsLayout.css";

/**
 * 문서 사이트 전역 레이아웃.
 * 현재는 골격만 잡힌 placeholder이며, TopNavigation / Sidebar / Toc는
 * 각 영역 작업(Figma 시안 수령 후)에서 실제 컴포넌트로 교체한다.
 */
export function DocsLayout() {
  return (
    <div className={styles.shell}>
      <header className={styles.topNav}>Makers design system</header>
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
    </div>
  );
}
