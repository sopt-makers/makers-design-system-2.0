/**
 * 문서 사이트 내비게이션 단일 소스.
 *
 * 사이드바는 전체 메뉴가 아니라 **현재 탭에 속한 메뉴만** 보여준다(디자인 QA). 탭 목록과
 * 사이드바 메뉴를 따로 두면 둘이 어긋나므로(메뉴 없는 탭, 탭 없는 메뉴) 한 트리에 모았다.
 * 상단바는 `label`/`path`만, 사이드바는 `sidebar`만 읽는다.
 */

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

export interface NavTab {
  /** 상단바에 노출되는 이름. */
  label: string;
  /** 탭이 소유하는 경로 접두사. 이 아래 경로에서는 이 탭의 사이드바가 뜬다. */
  path: string;
  /** 탭을 눌렀을 때 열리는 문서. 문서가 있는 첫 항목을 가리킨다. */
  indexPath: string;
  sidebar: SidebarMenuItem[];
}

/*
 * 아직 문서(MDX)가 없는 경로도 메뉴에는 싣는다. 라우터가 잡지 못한 경로는 NotReadyPage로
 * 떨어지므로 링크는 살아 있고, 문서를 채우면 그때 라우트만 연결하면 된다.
 *
 * 시안에 `Sys`/`Ref.`로 줄여 적힌 것은 자리 부족 때문이며 실제 라벨은 풀네임이다.
 */
// 비어 있지 않은 튜플로 선언한다 — 매칭 실패 시 첫 탭으로 떨어지는 규칙이 성립하려면
// 첫 원소가 반드시 있어야 하고, 그 사실을 타입으로 못 박아야 폴백에 옵셔널이 끼지 않는다.
export const NAV_TABS: [NavTab, ...NavTab[]] = [
  {
    label: "Overview",
    path: "/overview",
    indexPath: "/overview/design-token",
    sidebar: [
      { type: "link", label: "MDS", path: "/overview/mds" },
      { type: "link", label: "Design Token", path: "/overview/design-token" },
      {
        type: "link",
        label: "Progress Board",
        path: "/overview/progress-board",
      },
    ],
  },
  {
    label: "Foundations",
    path: "/foundations",
    indexPath: "/foundations/color-system",
    sidebar: [
      {
        type: "group",
        label: "Colors",
        items: [
          {
            type: "link",
            label: "Color System",
            path: "/foundations/color-system",
          },
          {
            type: "link",
            label: "Color Reference",
            path: "/foundations/color-token-reference",
          },
        ],
      },
      {
        type: "group",
        label: "Typography",
        items: [
          {
            type: "link",
            label: "Typography System",
            path: "/foundations/typography-system",
          },
          {
            type: "link",
            label: "Typography Reference",
            path: "/foundations/typography-token-reference",
          },
        ],
      },
      {
        type: "group",
        label: "Radius",
        items: [
          {
            type: "link",
            label: "Radius System",
            path: "/foundations/radius-system",
          },
          {
            type: "link",
            label: "Radius Reference",
            path: "/foundations/radius-token-reference",
          },
        ],
      },
      {
        type: "group",
        label: "Spacing",
        items: [
          {
            type: "link",
            label: "Spacing System",
            path: "/foundations/spacing-system",
          },
          {
            type: "link",
            label: "Spacing Reference",
            path: "/foundations/spacing-token-reference",
          },
        ],
      },
      {
        type: "group",
        label: "UX Writing",
        items: [
          {
            type: "link",
            label: "Tone of Voice",
            path: "/foundations/tone-of-voice",
          },
          {
            type: "link",
            label: "Writing Principles",
            path: "/foundations/writing-principles",
          },
          { type: "link", label: "Language", path: "/foundations/language" },
          { type: "link", label: "Grammar", path: "/foundations/grammar" },
        ],
      },
    ],
  },
  {
    label: "Components",
    path: "/components",
    indexPath: "/components/avatar",
    sidebar: [
      { type: "link", label: "Avatar", path: "/components/avatar" },
      { type: "link", label: "Button", path: "/components/button" },
      { type: "link", label: "Chip", path: "/components/chip" },
      { type: "link", label: "Control", path: "/components/control" },
      { type: "link", label: "Callout", path: "/components/callout" },
      { type: "link", label: "Dialog", path: "/components/dialog" },
      { type: "link", label: "Input", path: "/components/input" },
      { type: "link", label: "Tab", path: "/components/tab" },
      { type: "link", label: "Tag", path: "/components/tag" },
    ],
  },
  {
    label: "Developments",
    path: "/developments",
    indexPath: "/developments/migration",
    sidebar: [
      { type: "link", label: "Migration", path: "/developments/migration" },
    ],
  },
];

/**
 * 경로가 속한 탭. 어느 탭에도 속하지 않으면(홈 `/` 등) 첫 탭으로 떨어진다 —
 * 사이드바를 통째로 비우는 것보다 첫 탭 메뉴를 보여주는 편이 길을 잃지 않는다.
 */
export function findTabByPath(pathname: string): NavTab {
  const matched = NAV_TABS.find(
    (tab) => pathname === tab.path || pathname.startsWith(`${tab.path}/`),
  );
  return matched ?? NAV_TABS[0];
}
