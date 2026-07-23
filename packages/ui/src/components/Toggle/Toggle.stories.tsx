import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toggle } from "./Toggle";

const COMPONENT_DESCRIPTION = `
  \`Toggle\`은 단일 boolean 값을 켜고 끄는 스위치 컴포넌트입니다. 네이티브 \`<input type="checkbox">\` 기반이라 폼 제출·키보드(Space)·제어/비제어가 모두 동작합니다.\n
  \`checked\` + \`onCheckedChange\`로 제어하거나 \`defaultChecked\`로 비제어로 사용할 수 있습니다. 라벨이 필요하면 \`aria-label\` 또는 외부 \`<label htmlFor>\`을 사용하세요.
`;

const meta: Meta<typeof Toggle> = {
  title: "Toggle",
  component: Toggle,
  tags: ["autodocs"],
  args: {
    size: "small",
    disabled: false,
    defaultChecked: false,
    "aria-label": "토글",
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["small", "large"],
    },
    disabled: {
      control: "boolean",
    },
    defaultChecked: {
      control: "boolean",
    },
  },
  parameters: {
    controls: {
      include: ["size", "disabled", "defaultChecked"],
    },
    docs: {
      description: {
        component: COMPONENT_DESCRIPTION,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const ToggleDefault: Story = {
  name: "Toggle",
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Toggle {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};
