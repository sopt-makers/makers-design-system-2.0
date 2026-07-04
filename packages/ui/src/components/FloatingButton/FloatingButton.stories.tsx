import { IconPlus } from "@sopt-mds/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { FloatingButton } from "./FloatingButton";

const COMPONENT_DESCRIPTION = `
  \`FloatingButton\`은 화면에 떠 있는(FAB) 형태의 솔리드 버튼입니다. 가장 주요한 행동에 사용합니다.\n
  - \`icon\` prop으로 아이콘을 전달합니다.\n
  - \`children\`(라벨)이 있으면 **아이콘 + 라벨 확장 형태**, 없으면 **아이콘 전용 형태**로 렌더링됩니다.\n
  - 아이콘 전용 형태에서는 접근성을 위해 \`aria-label\`을 함께 전달하세요.
`;

const meta: Meta<typeof FloatingButton> = {
  title: "FloatingButton",
  component: FloatingButton,
  tags: ["autodocs"],
  args: {
    children: "글쓰기",
    disabled: false,
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
  parameters: {
    controls: {
      include: ["disabled", "children"],
    },
    docs: {
      description: {
        component: COMPONENT_DESCRIPTION,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FloatingButton>;

export const FloatingButtonDefault: Story = {
  name: "FloatingButton",
  render: (args) => <FloatingButton {...args} icon={<IconPlus />} />,
};
