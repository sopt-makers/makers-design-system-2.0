import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchField } from "./SearchField";

const COMPONENT_DESCRIPTION = `
  \`SearchField\`는 검색어를 입력하는 필드입니다. 네이티브 \`<input type="search">\` 기반이라 폼 제출·키보드(Enter 검색/Escape 클리어)·제어/비제어가 모두 동작합니다.\n
  값이 있으면 클리어 버튼이 항상 표시되고, Enter는 \`onSearch\`를, Escape·클리어 버튼은 값을 비우고 \`onClear\`를 호출합니다(한국어 IME 조합 중에는 동작하지 않습니다). 접근 가능한 이름을 위해 \`aria-label\`을 권장합니다.
`;

// Figma 예시 프레임 폭 (node 1223:1334, 335×46)
const STORY_WIDTH = 335;

const meta: Meta<typeof SearchField> = {
  title: "SearchField",
  component: SearchField,
  tags: ["autodocs"],
  args: {
    variant: "default",
    value: "",
    placeholder: "검색어를 입력해 주세요",
    disabled: false,
    "aria-label": "검색",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "bold"],
    },
    value: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
  parameters: {
    controls: {
      include: ["variant", "value", "placeholder", "disabled"],
    },
    docs: {
      description: {
        component: COMPONENT_DESCRIPTION,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchField>;

export const SearchFieldDefault: Story = {
  name: "SearchField",
  // 캔버스 타이핑과 Controls의 value가 양방향으로 동기화되도록 args에 연결한다.
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <div style={{ width: STORY_WIDTH }}>
        <SearchField
          {...args}
          onValueChange={(value) => updateArgs({ value })}
        />
      </div>
    );
  },
};
