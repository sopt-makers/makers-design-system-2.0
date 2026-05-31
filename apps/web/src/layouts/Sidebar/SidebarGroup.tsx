import { IconChevronDown, IconChevronRight } from "@sopt-mds/icons";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import type { SidebarMenuGroup } from "./constant";
import * as styles from "./Sidebar.css";
import { SidebarLink } from "./SidebarLink";

/** 그룹이 현재 경로의 항목을 포함하는지. 활성 그룹은 펼친 채로 시작한다. */
function groupContainsPath(group: SidebarMenuGroup, path: string): boolean {
  return group.items.some((item) => item.path === path);
}

interface SidebarGroupProps {
  group: SidebarMenuGroup;
}

/** 클릭으로 펼침/접힘하는 아코디언 메뉴 그룹. */
export function SidebarGroup({ group }: SidebarGroupProps) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(() =>
    groupContainsPath(group, pathname),
  );

  const Chevron = isOpen ? IconChevronDown : IconChevronRight;

  return (
    <div className={styles.group}>
      <button
        type="button"
        className={styles.groupHeader}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className={styles.groupLabel}>{group.label}</span>
        <Chevron className={styles.chevron} />
      </button>

      {isOpen && (
        <div className={styles.groupChildren}>
          <span className={styles.childrenDivider} aria-hidden="true" />
          {group.items.map((item) => (
            <SidebarLink key={item.path} link={item} />
          ))}
        </div>
      )}
    </div>
  );
}
