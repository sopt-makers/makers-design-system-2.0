import { IconHeartFilled } from "@sopt-mds/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ReactionButton } from "./ReactionButton";
import type { ReactionButtonSize } from "./types";

const COMPONENT_DESCRIPTION = `
  \`ReactionButton\`은 박수·좋아요·궁금해요 등 콘텐츠에 대한 감정 반응을 표현하는 **토글형** 버튼입니다.\n
  - **size**: \`xsmall\`(배경 없는 bare) / \`small\` / \`medium\` / \`large\`(pill)\n
  - **selected**: 토글 선택 상태. \`aria-pressed\`로 반영되며 선택 시 텍스트/아이콘 색이 강조됩니다.\n
  - \`leftAddon\`(반응 아이콘) / \`children\`(라벨) / \`count\`(개수) / \`rightAddon\`(예: chevron)을 조합합니다.
`;

const SIZES: ReactionButtonSize[] = ["xsmall", "small", "medium", "large"];

const meta: Meta<typeof ReactionButton> = {
  title: "ReactionButton",
  component: ReactionButton,
  tags: ["autodocs"],
  args: {
    size: "small",
    selected: false,
    disabled: false,
    children: "좋아요",
    count: 12,
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: SIZES,
    },
    selected: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
  parameters: {
    controls: {
      include: ["size", "selected", "disabled", "children", "count"],
    },
    docs: {
      description: {
        component: COMPONENT_DESCRIPTION,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ReactionButton>;

const renderWithIcon: Story["render"] = (args) => (
  <ReactionButton {...args} leftAddon={<IconHeartFilled />} />
);

export const Default: Story = {
  render: renderWithIcon,
};

export const Selected: Story = {
  args: { selected: true },
  render: renderWithIcon,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: renderWithIcon,
};

export const Toggleable: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(false);

    return (
      <ReactionButton
        {...args}
        selected={selected}
        onClick={() => setSelected((prev) => !prev)}
        leftAddon={<IconHeartFilled />}
        count={selected ? 13 : 12}
      />
    );
  },
};
