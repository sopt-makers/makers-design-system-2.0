import { IconMenu } from "@sopt-mds/icons";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { NAV_ITEMS } from "./constant";
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
  return (
    <header className={styles.bar}>
      <Link
        to="/"
        className={styles.logoLink}
        aria-label="Makers design system 홈"
      >
        <Logo />
      </Link>

      <nav className={styles.nav} aria-label="주요 메뉴">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            {item.label}
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
    </header>
  );
}
