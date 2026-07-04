import { IconChevronRight, IconPlus } from "@sopt-mds/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { ActionButton } from "./ActionButton";
import type { ActionButtonSize, ActionButtonVariant } from "./types";

const COMPONENT_DESCRIPTION = `
  \`ActionButton\`은 가장 높은 시각 위계를 가지는 솔리드 버튼입니다. 화면에서 가장 주요한 행동(CTA)에 사용합니다.\n
  - **variant**: \`primary\`(가장 중요한 행동) / \`secondary\`(부가적이나 강조가 필요한 행동) / \`danger\`(사용이 유의한 행동)\n
  - **size**: \`xsmall\`(32) / \`small\`(36) / \`medium\`(46) / \`large\`(56). 디자인상 \`danger\`는 \`xsmall\`을 제공하지 않습니다.\n
  - \`leftAddon\` / \`rightAddon\`으로 아이콘을 함께 사용할 수 있습니다. 아이콘 크기는 size에 따라 자동 조정됩니다.
`;

const VARIANTS: ActionButtonVariant[] = ["primary", "secondary", "danger"];
const SIZES: ActionButtonSize[] = ["xsmall", "small", "medium", "large"];

const meta: Meta<typeof ActionButton> = {
  title: "ActionButton",
  component: ActionButton,
  tags: ["autodocs"],
  args: {
    children: "Button",
    variant: "primary",
    size: "medium",
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

type Story = StoryObj<typeof ActionButton>;

export const ActionButtonDefault: Story = {
  name: "ActionButton",
};

export const WithAddon: Story = {
  render: (args) => (
    <ActionButton
      {...args}
      leftAddon={<IconPlus />}
      rightAddon={<IconChevronRight />}
    >
      {args.children}
    </ActionButton>
  ),
};
