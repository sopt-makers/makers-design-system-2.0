import { NavLink } from "react-router-dom";
import type { SidebarMenuLink } from "./constant";
import * as styles from "./Sidebar.css";

interface SidebarLinkProps {
  link: SidebarMenuLink;
}

/** 사이드바 메뉴의 leaf 링크. 활성 경로일 때 선택 스타일을 입는다. */
export function SidebarLink({ link }: SidebarLinkProps) {
  return (
    <NavLink
      to={link.path}
      className={({ isActive }) =>
        isActive ? `${styles.link} ${styles.linkActive}` : styles.link
      }
    >
      {link.label}
    </NavLink>
  );
}
