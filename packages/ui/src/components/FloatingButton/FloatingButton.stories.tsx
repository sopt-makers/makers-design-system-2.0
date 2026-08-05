import { IconPlus } from "@sopt-mds/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { FloatingButton } from "./FloatingButton";

const COMPONENT_DESCRIPTION = `
  \`FloatingButton\`은 화면에 떠 있는(FAB) 형태의 솔리드 버튼입니다. 가장 주요한 행동에 사용합니다.\n
  - \`icon\` prop으로 아이콘을 전달합니다.\n
  - \`children\`(라벨)이 있으면 **아이콘 + 라벨 확장 형태**, 비어 있으면 **아이콘 전용 형태**로 렌더링됩니다. 라벨을 끄는 별도 prop은 없고 렌더될 내용이 없으면(빈 문자열·공백뿐인 문자열·\`undefined\`) 그대로 아이콘 전용이 됩니다.\n
  - 스토리북의 \`label\` 컨트롤을 끄면 아이콘 전용으로 바뀌는 것을 확인할 수 있습니다. 이 컨트롤은 스토리 전용이며 컴포넌트 prop이 아닙니다.\n
  - 아이콘 전용 형태에서는 접근성을 위해 \`aria-label\`을 함께 전달하세요.
`;

/** 텍스트 컨트롤까지 비웠을 때 아이콘 전용 버튼에 남길 접근 가능한 이름입니다. */
const FALLBACK_LABEL = "글쓰기";

type StoryArgs = {
  label: boolean;
  children: string;
  disabled: boolean;
};

const meta: Meta<StoryArgs> = {
  title: "FloatingButton",
  component: FloatingButton,
  tags: ["autodocs"],
  args: {
    label: true,
    children: "글쓰기",
    disabled: false,
  },
  argTypes: {
    label: {
      control: "boolean",
      description:
        "라벨을 렌더할지 결정합니다. FloatingButton의 prop이 아니라 `children`을 넘길지 말지의 스토리 전용 스위치입니다. 끄면 아이콘 전용 형태가 되고, 아래 텍스트 값을 `aria-label`로 넘겨 접근 가능한 이름을 유지합니다.",
    },
    children: {
      control: "text",
      description:
        "라벨 텍스트입니다. 비우거나 공백만 남겨도 아이콘 전용 형태가 됩니다(라벨 유무는 실제로 렌더될 내용이 있는지로 판정합니다).",
    },
    disabled: {
      control: "boolean",
      description: "비활성 상태입니다.",
    },
  },
  parameters: {
    controls: {
      include: ["label", "children", "disabled"],
    },
    docs: {
      description: {
        component: COMPONENT_DESCRIPTION,
      },
    },
  },
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const FloatingButtonDefault: Story = {
  name: "FloatingButton",
  render: ({ label, children, disabled }) => {
    const labelText = label ? children.trim() : "";

    return (
      <FloatingButton
        icon={<IconPlus />}
        disabled={disabled}
        // 라벨이 보일 때 aria-label까지 주면 이름이 중복되므로 아이콘 전용일 때만 넘긴다.
        // 텍스트 컨트롤을 비운 채 라벨을 끄면 이름 없는 버튼이 되므로 기본 이름으로 대체한다.
        aria-label={
          labelText === "" ? children.trim() || FALLBACK_LABEL : undefined
        }
      >
        {labelText}
      </FloatingButton>
    );
  },
};
