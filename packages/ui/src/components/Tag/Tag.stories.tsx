import { IconHeartOutlined } from "@sopt-mds/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Tag",
  component: Tag,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const _Tag: Story = {
  args: {
    children: "Tag",
  },
};

export const _TagIcon: Story = {
  name: "Tag with Addon",
  args: {
    children: "Tag",
    size: "medium",
  },
  render: (args) => {
    const iconSize = args.size === "small" ? 12 : 14;

    return (
      <Tag
        {...args}
        leftAddon={<IconHeartOutlined width={iconSize} height={iconSize} />}
      />
    );
  },
};
