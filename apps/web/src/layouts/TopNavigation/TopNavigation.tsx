import { IconMenu } from "@sopt-mds/icons";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { NAV_TABS } from "../navigation";
import * as styles from "./TopNavigation.css";

interface TopNavigationProps {
  /** ≤768px에서 노출되는 햄버거 버튼 클릭 콜백 (모바일 메뉴 열기). */
  onMenuClick: () => void;
}

/**
 * 문서 사이트 상단 내비게이션.
 * - 데스크탑(>768): 로고 + 카테고리 탭
 * - 태블릿·모바일(≤768): 로고 + 햄버거 버튼 (탭은 숨김)
 */
export function TopNavigation({ onMenuClick }: TopNavigationProps) {
  const { pathname } = useLocation();

  // NavLink의 isActive는 링크 대상(첫 문서)과만 비교하므로 같은 탭의 다른 문서에서 꺼진다.
  // 탭은 경로 접두사를 소유하므로 접두사로 판정한다.
  const isTabActive = (tabPath: string) =>
    pathname === tabPath || pathname.startsWith(`${tabPath}/`);

  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <Link
          to="/"
          className={styles.logoLink}
          aria-label="Makers design system 홈"
        >
          <Logo />
        </Link>

        <nav className={styles.nav} aria-label="주요 메뉴">
          {NAV_TABS.map((tab) => (
            <NavLink
              key={tab.path}
              // 탭은 경로 접두사일 뿐이라 눌렀을 때는 첫 문서로 보낸다.
              to={tab.indexPath}
              // 대신 활성 판정은 접두사 전체로 한다 — 하위 문서에서도 탭이 선택돼 보여야 한다.
              className={() =>
                isTabActive(tab.path)
                  ? `${styles.navLink} ${styles.navLinkActive}`
                  : styles.navLink
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          onClick={onMenuClick}
          aria-label="메뉴 열기"
        >
          <IconMenu />
        </button>
      </div>
    </header>
  );
}
