import { IconChevronRight } from "@sopt-mds/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { TextButton } from "./TextButton";
import type { TextButtonSize, TextButtonVariant } from "./types";

const COMPONENT_DESCRIPTION = `
  \`TextButton\`은 배경 없이 텍스트로만 이루어진 버튼입니다. 보조적인 행동에 사용합니다.\n
  - **variant**: \`default\`(기본) / \`emphasis\`(더 밝게 강조)\n
  - **size**: \`small\`(12px) / \`medium\`(14px)\n
  - \`rightAddon\`으로 텍스트 뒤에 아이콘을 둘 수 있습니다. 아이콘 크기는 size에 따라 자동 조정됩니다.\n
  - hover / press에 별도 시각 변화는 없습니다. 상태 표시는 focus 링과 disabled 색뿐입니다.
`;

const VARIANTS: TextButtonVariant[] = ["default", "emphasis"];
const SIZES: TextButtonSize[] = ["small", "medium"];

const meta: Meta<typeof TextButton> = {
  title: "TextButton",
  component: TextButton,
  tags: ["autodocs"],
  args: {
    children: "text button",
    variant: "default",
    size: "small",
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: VARIANTS,
    },
    size: {
      control: "inline-radio",
      options: SIZES,
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
      include: ["variant", "size", "disabled", "children"],
    },
    docs: {
      description: {
        component: COMPONENT_DESCRIPTION,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextButton>;

export const TextButtonDefault: Story = {
  name: "TextButton",
};

export const WithAddon: Story = {
  render: (args) => <TextButton {...args} rightAddon={<IconChevronRight />} />,
};
