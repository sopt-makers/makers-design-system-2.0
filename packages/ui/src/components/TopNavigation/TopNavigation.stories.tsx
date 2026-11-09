import type { Meta, StoryObj } from "@storybook/react";
import { TopNavigation } from "./TopNavigation";

const COMPONENT_DESCRIPTION = `
  \`TopNavigation\`은 화면 최상단에서 현재 위치를 알려주고, 주요 액션을 제공해요.\n
  - **size**: 화면 폭에 맞춰 \`sm\` 또는 \`md\`를 선택해요. (sm: 320–767 / md: 768~) \`sm\`에서는 좌측 메뉴 아이콘으로 내비게이션을 열어요. \`sm\`은 **Left여도 타이틀이 중앙 정렬**돼요.\n
  - **Title Slot**: 로고 단독 또는 (로고 + 메뉴) 탭을 넣어요. 지면에 따라 Slot 내부에 탭과 같은 다른 UI 요소를 넣는 것도 가능해요.\n
  - **Profile**: 로그인 상태에서는 \`Profile=true\`로 아바타를 보여줘요. \`md\` Left는 아바타와 이름을 함께 보여줘요. 비로그인 상태에서는 \`Profile=false\`를 사용해요.\n
  <br/>
  ### 사용법\n
  **1. 화면 폭에 맞는 \`size\`를 넘겨요. 좌측 메뉴 아이콘이 있는 레이아웃(sm 전체, md Center)에서는 클릭을 \`onMenuClick\`으로 받아요.**\n
  \`\`\`tsx
  <TopNavigation
      size="sm"
      onMenuClick={openDrawer}
      profile={isLoggedIn}
      profileSrc={user?.imageUrl}
  />
  \`\`\`
  **2. md Left에서는 \`TopNavigation.Menu\`로 로고 옆에 메뉴 탭을 넣어요. 현재 페이지 메뉴에는 \`active\`를 주고, Next.js \`Link\`는 \`asChild\`로 감싸요.**\n
  \`\`\`tsx
  <TopNavigation
      variant="left"
      size="md"
      profile={isLoggedIn}
      profileSrc={user?.imageUrl}
      profileName={user?.name}
      onProfileClick={openMyPage}
  >
      <TopNavigation.Menu>
          <TopNavigation.MenuItem asChild active>
              <Link href="/members">멤버</Link>
          </TopNavigation.MenuItem>
          <TopNavigation.MenuItem asChild>
              <Link href="/community">커뮤니티</Link>
          </TopNavigation.MenuItem>
          <TopNavigation.MenuDivider />
          <TopNavigation.MenuItem asChild>
              <Link href="/review">활동후기 업로드</Link>
          </TopNavigation.MenuItem>
      </TopNavigation.Menu>
  </TopNavigation>
  \`\`\`
  메뉴 탭이 아닌 다른 UI가 필요한 지면이라면 \`children\`에 직접 넣어요. 이때 모양과 내부 간격은 사용처에서 정해요. 로고 옆 요소는 md Left에서만 보여요.\n
  **3. 메뉴 버튼으로 내비게이션을 연다면 열림 상태를 함께 넘겨요. 스크린 리더가 열림과 닫힘을 읽어줘요.**\n
  \`\`\`tsx
  <TopNavigation
      size="sm"
      onMenuClick={toggleDrawer}
      menuExpanded={isDrawerOpen}
  />
  \`\`\`
`;

const menuTab = (
  <TopNavigation.Menu>
    <TopNavigation.MenuItem href="#" active>
      멤버
    </TopNavigation.MenuItem>
    <TopNavigation.MenuItem href="#">커뮤니티</TopNavigation.MenuItem>
    <TopNavigation.MenuItem href="#">모임</TopNavigation.MenuItem>
    <TopNavigation.MenuItem href="#">프로젝트</TopNavigation.MenuItem>
    <TopNavigation.MenuItem href="#">커피솝</TopNavigation.MenuItem>
    <TopNavigation.MenuDivider />
    <TopNavigation.MenuItem href="#">활동후기 업로드</TopNavigation.MenuItem>
  </TopNavigation.Menu>
);

const meta: Meta<typeof TopNavigation> = {
  title: "TopNavigation",
  component: TopNavigation,
  tags: ["autodocs"],
  args: {
    variant: "center",
    size: "sm",
    profile: true,
    profileName: "세글자",
  },
  argTypes: {
    variant: { control: "radio", options: ["center", "left"] },
    size: { control: "radio", options: ["sm", "md"] },
    children: {
      control: { type: "radio", labels: { none: "없음", menuTab: "메뉴 탭" } },
      options: ["none", "menuTab"],
      mapping: { none: undefined, menuTab: menuTab },
      if: { arg: "variant", eq: "left" },
    },
    // 함수 prop은 컨트롤로 편집할 수 없어 설명만 표에 남긴다.
    onProfileClick: { control: false },
    onMenuClick: { control: false },
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: COMPONENT_DESCRIPTION,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TopNavigation>;

export const TopNavigationDefault: Story = {
  name: "TopNavigation",
};
