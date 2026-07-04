import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const COMPONENT_DESCRIPTION = `
  \`Checkbox\`는 사용자가 옵션을 선택/해제하는 컴포넌트입니다. 네이티브 \`<input type="checkbox">\` 기반이라 **복수선택(각 체크박스가 독립)**·폼 제출·키보드(Space)·제어/비제어가 모두 동작합니다.\n
  \`checked\` + \`onCheckedChange\`로 제어하거나 \`defaultChecked\`로 비제어로 사용할 수 있습니다. \`label\`을 생략하면 컨트롤만 렌더링되며, 이때 \`aria-label\`을 권장합니다.
`;

const meta: Meta<typeof Checkbox> = {
  title: "Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    size: "small",
    label: "Label",
    disabled: false,
    defaultChecked: false,
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["small", "large"],
    },
    label: {
      control: "text",
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
      include: ["size", "label", "disabled", "defaultChecked"],
    },
    docs: {
      description: {
        component: COMPONENT_DESCRIPTION,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const CheckboxDefault: Story = {
  name: "Checkbox",
  render: (args) => <Checkbox {...args} />,
};
