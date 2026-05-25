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
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["small", "medium"],
    },
    disabled: {
      control: "boolean",
    },
  },
  parameters: {
    controls: {
      include: ["size", "disabled"],
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

export const _Chip: Story = {
  render: (args) => (
    <Chip {...args}>{args.size === "small" ? "Small" : "Medium"}</Chip>
  ),
};

export const _ChipToggle: Story = {
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
        {args.size === "small" ? "Small" : "Medium"}
      </Chip.Toggle>
    );
  },
};

export const _ChipWithAddon: Story = {
  render: (args) => {
    return (
      <Chip
        {...args}
        leftAddon={<IconSample />}
        rightAddon={<CloseIconSample />}
      >
        {args.size === "small" ? "Small" : "Medium"}
      </Chip>
    );
  },
};

function IconSample() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sample Icon"
    >
      <path
        d="M12 3.75L14.56 8.94L20.29 9.77L16.15 13.81L17.13 19.51L12 16.81L6.87 19.51L7.85 13.81L3.71 9.77L9.44 8.94L12 3.75Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CloseIconSample() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Close Icon"
    >
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
