export interface SidebarMenuLink {
  label: string;
  path: string;
}

export interface SidebarMenuGroup {
  label: string;
  items: SidebarMenuLink[];
}

export const SIDEBAR_MENU: SidebarMenuGroup[] = [
  {
    label: "Colors",
    items: [
      { label: "Color system", path: "/foundations/color-system" },
      { label: "Semantic color", path: "/foundations/semantic-color" },
      {
        label: "Migration Reference",
        path: "/foundations/migration-reference",
      },
    ],
  },
  // TODO Typography·Spacing 자식은 미확정 — 임의 placeholder 값 (확정 시 교체)
  {
    label: "Typography",
    items: [
      { label: "Font", path: "/foundations/typography/font" },
      { label: "Text styles", path: "/foundations/typography/text-styles" },
    ],
  },
  {
    label: "Spacing",
    items: [{ label: "Space scale", path: "/foundations/spacing/space-scale" }],
  },
];
