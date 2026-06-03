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
    label: "Colors",
    items: [
      {
        type: "link",
        label: "Color system",
        path: "/foundations/color-system",
      },
      {
        type: "link",
        label: "Semantic color",
        path: "/foundations/semantic-color",
      },
      {
        type: "link",
        label: "Migration Reference",
        path: "/foundations/migration-reference",
      },
    ],
  },
  { type: "link", label: "Typography", path: "/foundations/typography" },
  { type: "link", label: "Spacing", path: "/foundations/spacing" },
];
