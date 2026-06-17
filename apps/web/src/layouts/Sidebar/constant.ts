export interface SidebarLinkItem {
  type: "link";
  label: string;
  path: string;
}

export interface SidebarGroupItem {
  type: "group";
  label: string;
  items: SidebarLinkItem[];
}

/** 대분류는 자식이 있으면 그룹(토글), 없으면 단독 링크(선택 가능). */
export type SidebarMenuItem = SidebarGroupItem | SidebarLinkItem;

export const SIDEBAR_MENU: SidebarMenuItem[] = [
  {
    type: "group",
    label: "Overview",
    items: [
      { type: "link", label: "MDS Overviews", path: "/overview/mds-overviews" },
      { type: "link", label: "Progress Board", path: "/overview/progress-board" },
    ],
  },
  {
    type: "group",
    label: "Foundations",
    items: [
      { type: "link", label: "Design Tokens", path: "/foundations/design-tokens" },
      { type: "link", label: "Color System", path: "/foundations/color-system" },
      { type: "link", label: "Color Token Reference", path: "/foundations/color-token-reference" },
      { type: "link", label: "Typography System", path: "/foundations/typography-system" },
      { type: "link", label: "Typography Token Reference", path: "/foundations/typography-token-reference" },
      { type: "link", label: "Spacing System", path: "/foundations/spacing-system" },
      { type: "link", label: "Spacing Token Reference", path: "/foundations/spacing-token-reference" },
      { type: "link", label: "Radius System", path: "/foundations/radius-system" },
      { type: "link", label: "Radius Token Reference", path: "/foundations/radius-token-reference" },
    ],
  },
  {
    type: "group",
    label: "Components",
    items: [],
  },
  {
    type: "group",
    label: "Developments",
    items: [],
  },
];