import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./Radio";
import { RadioGroup } from "./RadioGroup";

const COMPONENT_DESCRIPTION = `
  \`Radio\`는 여러 항목 중 **하나를 선택**할 때 사용하는 컴포넌트입니다. 네이티브 \`<input type="radio">\` 기반이라 같은 \`name\`을 공유하면 단일선택·폼 제출·키보드(방향키)·제어/비제어가 모두 동작합니다.\n
  여러 항목을 묶을 때는 \`RadioGroup\`으로 감싸면 \`name\`·선택 상태·\`disabled\`·\`size\`가 자동으로 주입되어, 각 \`Radio\`에 \`checked\`/\`onChange\`를 일일이 배선할 필요가 없습니다. \`label\`을 생략하면 컨트롤만 렌더링되며, 이때 \`aria-label\`을 권장합니다.
`;

const meta: Meta<typeof Radio> = {
  title: "Radio",
  component: Radio,
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

type Story = StoryObj<typeof Radio>;

export const RadioDefault: Story = {
  name: "Radio",
  render: (args) => <Radio {...args} />,
};

const TRACK_OPTIONS = [
  { value: "design", label: "디자인" },
  { value: "frontend", label: "프론트엔드" },
  { value: "backend", label: "백엔드" },
  { value: "plan", label: "기획" },
];

export const Group: Story = {
  name: "RadioGroup",
  parameters: { controls: { include: ["size"] } },
  render: ({ size }) => (
    <RadioGroup name="track" size={size} defaultValue="frontend">
      {TRACK_OPTIONS.map((option) => (
        <Radio key={option.value} value={option.value} label={option.label} />
      ))}
    </RadioGroup>
  ),
};
