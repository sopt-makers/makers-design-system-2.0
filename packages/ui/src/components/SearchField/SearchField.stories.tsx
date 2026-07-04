import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SearchField } from "./SearchField";

const COMPONENT_DESCRIPTION = `
  \`SearchField\`는 검색어를 입력하는 필드입니다. 네이티브 \`<input type="search">\` 기반이라 폼 제출·키보드(Enter 검색/Escape 클리어)·제어/비제어가 모두 동작합니다.\n
  값이 있으면 클리어 버튼이 항상 표시되고, Enter는 \`onSearch\`를, Escape·클리어 버튼은 값을 비우고 \`onClear\`를 호출합니다(한국어 IME 조합 중에는 동작하지 않습니다). 접근 가능한 이름을 위해 \`aria-label\`을 권장합니다.
`;

const STORY_WIDTH = 335;

const meta: Meta<typeof SearchField> = {
  title: "SearchField",
  component: SearchField,
  tags: ["autodocs"],
  args: {
    variant: "default",
    placeholder: "검색어를 입력해 주세요",
    disabled: false,
    "aria-label": "검색",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "ghost"],
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
      include: ["variant", "placeholder", "disabled"],
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
  render: (args) => (
    <div style={{ width: STORY_WIDTH }}>
      <SearchField {...args} />
    </div>
  ),
};

export const Ghost: Story = {
  name: "Ghost",
  args: { variant: "ghost" },
  parameters: { controls: { include: ["placeholder", "disabled"] } },
  render: (args) => (
    <div style={{ width: STORY_WIDTH }}>
      <SearchField {...args} />
    </div>
  ),
};

const FRUITS = ["사과", "바나나", "딸기", "포도", "복숭아"];

export const Controlled: Story = {
  name: "제어 컴포넌트",
  parameters: { controls: { include: ["variant"] } },
  render: (args) => {
    const [keyword, setKeyword] = useState("");
    const filtered = FRUITS.filter((fruit) => fruit.includes(keyword));

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          width: STORY_WIDTH,
        }}
      >
        <SearchField
          {...args}
          value={keyword}
          onValueChange={setKeyword}
          aria-label="과일 검색"
          placeholder="과일 이름으로 필터링"
        />
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {filtered.map((fruit) => (
            <li key={fruit}>{fruit}</li>
          ))}
        </ul>
      </div>
    );
  },
};

export const Search: Story = {
  name: "검색 실행",
  parameters: { controls: { include: ["variant"] } },
  render: (args) => {
    const [submitted, setSubmitted] = useState<string | null>(null);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          width: STORY_WIDTH,
        }}
      >
        <SearchField {...args} onSearch={setSubmitted} />
        <p style={{ margin: 0 }}>
          {submitted == null
            ? "Enter를 눌러 검색을 실행하세요."
            : `검색 실행: "${submitted}"`}
        </p>
      </div>
    );
  },
};
