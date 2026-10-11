import { colors, spacing, typography } from "@sopt-mds/design-tokens";
import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { Tabs } from "./Tabs";
import type { TabsSize, TabsVariant } from "./types";

const COMPONENT_DESCRIPTION = `
  \`Tabs\`는 관련된 콘텐츠를 분류하고 그중 하나를 고르는 컴포넌트입니다. **단일 선택**만 가능합니다.\n
  \`Tabs\`(선택 상태) > \`Tabs.List\`(탭 묶음) > \`Tabs.Trigger\`(탭)로 조합합니다. 본문은 \`Tabs.Content\`로 보여줍니다. 링크 탭처럼 본문을 직접 그리는 경우에는 쓰지 않아도 됩니다.\n
  - **variant**: 화면에 탭이 모두 노출되면 \`fill\`, 탭이 많아 넘치면 \`hug\`를 사용합니다.\n
  - **children**(\`Tabs.Trigger\`): 탭 라벨. 문장이 아닌 단어로만 씁니다.\n
  - **tag**(\`Tabs.Trigger\`): 텍스트만 넘기며, Tag 모양은 고정이라 바꿀 수 없습니다.\n
  - **asChild**(\`Tabs.Trigger\`): 링크 등 자식 요소를 탭으로 렌더합니다.\n
  - **키보드**: ←/→ 이동(순환), Home/End. 이동한 탭이 바로 선택되고 disabled 탭은 건너뜁니다.\n
  **사용 가이드**\n
\`\`\`tsx
const [tab, setTab] = useState("home");

<Tabs value={tab} onValueChange={setTab}>
  <Tabs.List aria-label="모임">
    <Tabs.Trigger value="home" tag="N">홈</Tabs.Trigger>
    <Tabs.Trigger value="all">전체 모임</Tabs.Trigger>
    <Tabs.Trigger value="mine">내 모임</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="home"><Home /></Tabs.Content>
  <Tabs.Content value="all"><All /></Tabs.Content>
  <Tabs.Content value="mine"><Mine /></Tabs.Content>
</Tabs>

// 선택 상태를 직접 관리하지 않으면 defaultValue만 넘깁니다.
<Tabs defaultValue="home">...</Tabs>
\`\`\`
`;

type StoryArgs = {
  size: TabsSize;
  variant: TabsVariant;
  divider: boolean;
  tag: boolean;
  disabled: boolean;
};

/** Figma 모바일 예시 폭. Tabs는 부모 폭(100%)을 따르므로 캔버스에서만 폭을 제한한다. */
const STORY_WIDTH = 335;

const SIZES: TabsSize[] = ["large", "medium", "small"];

const meta: Meta<StoryArgs> = {
  title: "Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    size: "large",
    variant: "fill",
    divider: true,
    tag: false,
    disabled: false,
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: SIZES,
    },
    variant: {
      control: "inline-radio",
      options: ["fill", "hug"] satisfies TabsVariant[],
      description:
        "`fill`(Fixed): 영역 너비를 똑같이 나눠 가져요. 길이가 고정된 Indicator를 사용해요.<br /><br />`hug`(Scrollable): 영역 너비를 넘치면 스크롤돼요. Indicator가 Text의 길이와 동일해요.",
    },
    divider: {
      control: "boolean",
      description: "Tabs 하단 전체 너비에 구분선을 표시해요. (`Tabs.List`)",
    },
    tag: {
      control: "boolean",
      description: "Text 뒤에 Tag를 표시해요. (`Tabs.Trigger`)",
    },
    disabled: {
      control: "boolean",
      description:
        "탭을 선택할 수 없게 해요. 키보드로 이동할 때도 건너뛰어요. (`Tabs.Trigger`)",
    },
  },
  parameters: {
    controls: {
      include: ["size", "variant", "divider", "tag", "disabled"],
    },
    docs: {
      description: {
        component: COMPONENT_DESCRIPTION,
      },
    },
  },
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const TabsDefault: Story = {
  name: "Tabs",
  decorators: [
    (Story) => (
      <div style={{ width: STORY_WIDTH }}>
        <Story />
      </div>
    ),
  ],
  render: ({ size, variant, divider, tag, disabled }) => (
    <Tabs defaultValue="home" size={size} variant={variant}>
      <Tabs.List divider={divider} aria-label="메뉴">
        <Tabs.Trigger value="home" tag={tag ? "N" : undefined}>
          홈
        </Tabs.Trigger>
        <Tabs.Trigger value="all">전체 모임</Tabs.Trigger>
        <Tabs.Trigger value="mine" disabled={disabled}>
          내 모임
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs>
  ),
};

/* ---------- 컨트롤로 한 번에 볼 수 없는 비교: 두 variant를 나란히 ---------- */

const labelStyle = {
  ...typography.label3,
  margin: 0,
  color: colors.fg.neutral.subtle,
};

function Compare({
  columns,
}: {
  columns: { title: string; description: string; children: ReactNode }[];
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.s40 }}>
      {columns.map(({ title, description, children }) => (
        <div key={title} style={{ width: STORY_WIDTH }}>
          <p
            style={{
              ...typography.title3,
              margin: 0,
              color: colors.fg.neutral.bold,
            }}
          >
            {title}
          </p>
          <p style={{ ...labelStyle, marginBottom: spacing.s16 }}>
            {description}
          </p>
          {children}
        </div>
      ))}
    </div>
  );
}

const SCROLLABLE_LABELS = ["HOT", "질문", "파트Talk", "솝티클", "자유", "취업"];
const FIXED_LABELS = ["홈", "전체 모임", "내 모임"];

function LabelTabs({
  variant,
  labels,
}: {
  variant: TabsVariant;
  labels: string[];
}) {
  return (
    <Tabs defaultValue={labels[0]} variant={variant}>
      <Tabs.List aria-label={variant}>
        {labels.map((label) => (
          <Tabs.Trigger key={label} value={label}>
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs>
  );
}

/** 탭 개수에 따라 variant를 고릅니다. */
export const TabsVariants: Story = {
  name: "Scrollable / Fixed",
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => (
    <Compare
      columns={[
        {
          title: "Scrollable",
          description: "영역 너비를 넘치면 스크롤돼요.",
          children: <LabelTabs variant="hug" labels={SCROLLABLE_LABELS} />,
        },
        {
          title: "Fixed",
          description: "영역 너비를 똑같이 나눠 가져요.",
          children: <LabelTabs variant="fill" labels={FIXED_LABELS} />,
        },
      ]}
    />
  ),
};

// 라벨이 길면 fill 칸을 거의 채워 hug와 Indicator 길이 차이가 안 보이므로 짧은 라벨을 쓴다.
function StateTabs({ variant }: { variant: TabsVariant }) {
  return (
    <Tabs defaultValue="selected" variant={variant}>
      <Tabs.List divider={false} aria-label={`${variant} 상태`}>
        <Tabs.Trigger value="selected">선택</Tabs.Trigger>
        <Tabs.Trigger value="enabled">기본</Tabs.Trigger>
        <Tabs.Trigger value="disabled" disabled>
          비활성
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs>
  );
}

/** Tab의 Selected / Enabled / Disabled와 variant별 Indicator 길이를 비교합니다. */
export const TabStates: Story = {
  name: "Tab 상태",
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => (
    <Compare
      columns={[
        {
          title: "Hug",
          description: "Indicator가 Text의 길이와 동일해요.",
          children: <StateTabs variant="hug" />,
        },
        {
          title: "Fill",
          description: "길이가 고정된 Indicator를 사용해요.",
          children: <StateTabs variant="fill" />,
        },
      ]}
    />
  ),
};

/** 선택된 탭의 본문을 `Tabs.Content`로 보여줍니다. 링크 탭처럼 본문을 직접 그리는 경우에는 쓰지 않아도 됩니다. */
export const TabsWithContent: Story = {
  name: "Tabs.Content",
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => (
    <div style={{ width: STORY_WIDTH, color: colors.fg.neutral.bold }}>
      <Tabs defaultValue="home">
        <Tabs.List aria-label="모임">
          <Tabs.Trigger value="home">홈</Tabs.Trigger>
          <Tabs.Trigger value="all">전체 모임</Tabs.Trigger>
          <Tabs.Trigger value="mine">내 모임</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="home" style={{ padding: spacing.s16 }}>
          홈 본문
        </Tabs.Content>
        <Tabs.Content value="all" style={{ padding: spacing.s16 }}>
          전체 모임 본문
        </Tabs.Content>
        <Tabs.Content value="mine" style={{ padding: spacing.s16 }}>
          내 모임 본문
        </Tabs.Content>
      </Tabs>
    </div>
  ),
};
