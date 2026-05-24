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

const dangerText = "사용자가 꼭 읽어야 하는 중요한 경고사항에 사용해요.";
const informationText = "정보를 표기할 때 사용해요.";
const noop = () => {};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: dangerText,
  },
};

export const DangerWithIcon: Story = {
  args: {
    variant: "danger",
    showIcon: true,
    children: dangerText,
  },
};

export const DangerWithIconAndAction: Story = {
  args: {
    variant: "danger",
    showIcon: true,
    children: dangerText,
    action: { label: "text button", onClick: noop },
  },
};

export const Information: Story = {
  args: {
    variant: "information",
    children: informationText,
  },
};

export const InformationWithIcon: Story = {
  args: {
    variant: "information",
    showIcon: true,
    children: informationText,
  },
};

export const InformationWithIconAndAction: Story = {
  args: {
    variant: "information",
    showIcon: true,
    children: informationText,
    action: { label: "text button", onClick: noop },
  },
};
