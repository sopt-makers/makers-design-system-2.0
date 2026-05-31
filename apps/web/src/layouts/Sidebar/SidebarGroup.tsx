import { IconChevronDown, IconChevronRight } from "@sopt-mds/icons";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import type { SidebarGroupItem } from "./constant";
import * as styles from "./Sidebar.css";
import { SidebarChildLink } from "./SidebarChildLink";

/** 그룹이 현재 경로의 자식을 포함하는지. 활성 그룹은 펼친 채로 시작한다. */
function groupContainsPath(group: SidebarGroupItem, path: string): boolean {
  return group.items.some((item) => item.path === path);
}

interface SidebarGroupProps {
  group: SidebarGroupItem;
}

/**
 * 하위가 있는 대분류. 클릭하면 자식 메뉴가 펼침/접힘하며,
 * 그룹 헤더 자체는 선택(active) 대상이 아니다.
 */
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
            <SidebarChildLink key={item.path} link={item} />
          ))}
        </div>
      )}
    </div>
  );
}
