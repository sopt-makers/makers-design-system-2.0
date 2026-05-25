import { IconHeartFilled, IconXClose } from "@sopt-mds/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Chip } from "./Chip";

const COMPONENT_DESCRIPTION = `
  \`Chip\`은 사용자가 선택하거나 입력하는 값을 표시하는 컴포넌트입니다. 기본적으로 버튼의 성격을 가지고 있습니다.\n
  \`Chip.Toggle\`은 Control 가능한 Chip 컴포넌트입니다. 기본적으로 Checkbox의 성격을 가지고 있습니다.
`;

const meta: Meta<typeof Chip> = {
  title: "Chip",
  component: Chip,
  tags: ["autodocs"],
  args: {
    size: "medium",
    disabled: false,
    children: "Chip",
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["small", "medium"],
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
      include: ["size", "disabled", "children"],
    },
    docs: {
      description: {
        component: COMPONENT_DESCRIPTION,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const ChipDefault: Story = {
  name: "Chip",
  render: (args) => <Chip {...args}>{args.children}</Chip>,
};

export const ChipToggle: Story = {
  name: "Chip.Toggle",
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <Chip.Toggle
        size={args.size}
        disabled={args.disabled}
        checked={checked}
        onCheckedChange={setChecked}
      >
        {args.children}
      </Chip.Toggle>
    );
  },
};

export const ChipWithAddon: Story = {
  render: (args) => {
    return (
      <Chip
        {...args}
        leftAddon={<IconHeartFilled width={16} height={16} />}
        rightAddon={<IconXClose width={20} height={20} />}
      >
        {args.children}
      </Chip>
    );
  },
};
