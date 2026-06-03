export interface NavItem {
  label: string;
  path: string;
}

/** 상단 내비게이션 카테고리 탭. 각 path의 실제 페이지는 이후 단계에서 채운다. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Overview", path: "/overview" },
  { label: "Foundations", path: "/foundations" },
  { label: "Components", path: "/components" },
  { label: "Developments", path: "/developments" },
];
