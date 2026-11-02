import type { Meta, StoryObj } from "@storybook/react";
import { TopNavigation } from "./TopNavigation";

const meta: Meta<typeof TopNavigation> = {
  title: "TopNavigation",
  component: TopNavigation,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TopNavigation>;

export const Default: Story = {
  args: {},
};
