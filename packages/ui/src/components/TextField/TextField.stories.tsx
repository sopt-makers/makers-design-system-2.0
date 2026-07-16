import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField";

const COMPONENT_DESCRIPTION = `
  \`TextField\`는 한 줄 텍스트를 입력받는 필드입니다. 네이티브 \`<input type="text">\` 기반이라 폼 제출·검증·제어/비제어가 모두 동작합니다.\n
  \`label\`·\`description\`·\`helperText\`·\`errorMessage\`는 값이 있을 때만 렌더되고, \`errorMessage\`를 주면 에러 상태(보더·아이콘·\`aria-invalid\`)가 되며 헬퍼 텍스트 자리를 대신합니다. \`maxLength\`를 주면 우측 하단에 글자수 카운터가 표시됩니다. \`label\` 없이 쓸 때는 접근 가능한 이름을 위해 \`aria-label\`을 권장합니다.
`;

// Figma 예시 프레임 폭 (node 1223:1349, 335)
const STORY_WIDTH = 335;

const meta: Meta<typeof TextField> = {
  title: "TextField",
  component: TextField,
  tags: ["autodocs"],
  args: {
    variant: "default",
    label: "Label",
    required: true,
    description: "Description",
    helperText: "Helper Text",
    errorMessage: "",
    value: "",
    placeholder: "Placeholder",
    maxLength: 20,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "ghost"],
    },
    label: {
      control: "text",
    },
    required: {
      control: "boolean",
    },
    description: {
      control: "text",
    },
    helperText: {
      control: "text",
    },
    errorMessage: {
      control: "text",
    },
    value: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    maxLength: {
      control: "number",
    },
    disabled: {
      control: "boolean",
    },
  },
  parameters: {
    controls: {
      include: [
        "variant",
        "label",
        "required",
        "description",
        "helperText",
        "errorMessage",
        "value",
        "placeholder",
        "maxLength",
        "disabled",
      ],
    },
    docs: {
      description: {
        component: COMPONENT_DESCRIPTION,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const TextFieldDefault: Story = {
  name: "TextField",
  // 캔버스 타이핑과 Controls의 value가 양방향으로 동기화되도록 args에 연결한다.
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <div style={{ width: STORY_WIDTH }}>
        <TextField {...args} onValueChange={(value) => updateArgs({ value })} />
      </div>
    );
  },
};
