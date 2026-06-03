import { NavLink } from "react-router-dom";
import type { SidebarLinkItem } from "./constant";
import * as styles from "./Sidebar.css";

interface SidebarChildLinkProps {
  link: SidebarLinkItem;
}

/** 그룹 안의 들여쓴 자식 링크. 활성 경로일 때 선택 스타일을 입는다. */
export function SidebarChildLink({ link }: SidebarChildLinkProps) {
  return (
    <NavLink
      to={link.path}
      className={({ isActive }) =>
        isActive ? `${styles.childLink} ${styles.linkActive}` : styles.childLink
      }
    >
      {link.label}
    </NavLink>
  );
}
