import type { Meta, StoryObj } from "@storybook/react";
import { Callout } from "./Callout";

const meta: Meta<typeof Callout> = {
  title: "Callout",
  component: Callout,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "radio", options: ["danger", "information"] },
    showIcon: { control: "boolean" },
  },
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof Callout>;

export const CalloutDefault: Story = {
  name: "Callout",
  args: {
    variant: "danger",
    showIcon: true,
    children: "사용자가 꼭 읽어야 하는 중요한 경고사항에 사용해요.",
    action: { label: "text button", onClick: () => {} },
  },
};
