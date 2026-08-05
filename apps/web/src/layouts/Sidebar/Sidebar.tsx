import { IconSearchOutlined } from "@sopt-mds/icons";
import { useLocation } from "react-router-dom";
import { findTabByPath } from "../navigation";
import * as styles from "./Sidebar.css";
import { SidebarGroup } from "./SidebarGroup";
import { SidebarTopLink } from "./SidebarTopLink";

/**
 * 문서 사이트 사이드바 콘텐츠 (검색 + 아코디언 메뉴).
 * chrome(테두리·오버레이 등)은 감싸는 쪽이 담당하며, 데스크탑 사이드바와
 * 모바일 햄버거 오버레이에서 동일하게 재사용한다.
 *
 * 전체 메뉴가 아니라 현재 경로가 속한 탭의 메뉴만 보여준다(디자인 QA).
 */
export function Sidebar() {
  const { pathname } = useLocation();
  const tab = findTabByPath(pathname);

  return (
    <div className={styles.sidebar}>
      {/* 정적 검색 표시 — 현재 동작 없음 (시각 placeholder) */}
      <div className={styles.search}>
        <IconSearchOutlined className={styles.searchIcon} aria-hidden="true" />
        <span className={styles.searchPlaceholder}>Search</span>
      </div>

      <nav className={styles.nav} aria-label={`${tab.label} 메뉴`}>
        {tab.sidebar.map((item) =>
          item.type === "group" ? (
            <SidebarGroup key={item.label} group={item} />
          ) : (
            <SidebarTopLink key={item.path} link={item} />
          ),
        )}
      </nav>
    </div>
  );
}
