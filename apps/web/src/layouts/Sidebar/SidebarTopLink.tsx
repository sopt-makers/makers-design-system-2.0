import { IconChevronRight } from "@sopt-mds/icons";
import { NavLink } from "react-router-dom";
import type { SidebarLinkItem } from "./constant";
import * as styles from "./Sidebar.css";

interface SidebarTopLinkProps {
  link: SidebarLinkItem;
}

/**
 * 하위가 없는 대분류 링크. 그룹 헤더와 같은 행 스타일이며 선택 가능하다.
 * 셰브론(›)은 펼침이 아니라 이동을 나타내는 장식 표시다.
 */
export function SidebarTopLink({ link }: SidebarTopLinkProps) {
  return (
    <NavLink
      to={link.path}
      className={({ isActive }) =>
        isActive ? `${styles.topLink} ${styles.linkActive}` : styles.topLink
      }
    >
      <span className={styles.groupLabel}>{link.label}</span>
      <IconChevronRight className={styles.chevron} aria-hidden="true" />
    </NavLink>
  );
}
