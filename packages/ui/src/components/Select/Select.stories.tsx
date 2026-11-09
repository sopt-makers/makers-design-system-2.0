import { IconHeartFilled } from "@sopt-mds/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";
import type { SelectType } from "./types";

const COMPONENT_DESCRIPTION = `
  \`Select\`는 여러 항목 중 하나(또는 여러 개)를 고를 때 사용합니다. PC 사용을 권장하며, 모바일은 바텀시트로 대체합니다.\n
  \`Select\` > \`Select.Trigger\` + \`Select.Menu\` > \`Select.Item\`으로 조합합니다.\n
  - **type**: 메뉴 아이템 레이아웃. \`icon\`·\`userList\`는 단일만, \`checkbox\`는 다중만, \`text\`는 둘 다 가능합니다.\n
  - **value / defaultValue / onValueChange**: 제어·비제어 모두 지원합니다. 값은 \`string\`(다중은 \`string[]\`)입니다.\n
  - **Select.Trigger**: \`placeholder\`, 다중 선택의 고정 문구 \`label\`, 커스텀 트리거용 \`asChild\`. 스크린리더용 \`aria-label\`이 필요합니다.\n
  - **Select.Menu**: \`maxHeight\`로 스크롤 기준을 정합니다.\n
  - **Select.Item**: \`description\`(text·userList), \`icon\`(icon), \`profileUrl\`(userList).
`;

const OPTIONS = [
  { value: "pm", label: "기획", description: "Product Manager" },
  { value: "design", label: "디자인", description: "Product Designer" },
  { value: "web", label: "웹", description: "Frontend Web" },
  { value: "server", label: "서버", description: "Backend Server" },
  { value: "ios", label: "iOS", description: "iOS Developer" },
  { value: "android", label: "안드로이드", description: "Android Developer" },
];

type StoryArgs = {
  type: SelectType;
  multiple: boolean;
  placeholder: string;
  label?: string;
};

const meta: Meta<StoryArgs> = {
  title: "Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    type: "text",
    multiple: false,
    placeholder: "Placeholder",
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["icon", "text", "userList", "checkbox"],
      description: "메뉴 아이템 레이아웃 (Figma Menu Type)",
    },
    multiple: {
      control: "boolean",
      description:
        "다중 선택 (Figma Select Type). `text`에서만 바뀌며, `checkbox`는 항상 다중입니다.",
    },
    placeholder: {
      control: "text",
      description: "`Select.Trigger`의 placeholder",
    },
    label: {
      control: "text",
      description:
        "다중 선택에서 2개 이상 골랐을 때 보여줄 고정 문구 (`Select.Trigger`의 label)",
    },
  },
  parameters: {
    controls: {
      include: ["type", "multiple", "placeholder"],
    },
    docs: {
      description: {
        component: COMPONENT_DESCRIPTION,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 240 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const SelectDefault: Story = {
  name: "Select",
  render: ({ type, multiple, placeholder, label }) => {
    const items = OPTIONS.map((option) => (
      <Select.Item
        key={option.value}
        value={option.value}
        icon={<IconHeartFilled />}
        description={type === "icon" ? undefined : option.description}
      >
        {option.label}
      </Select.Item>
    ));
    const content = (
      <>
        <Select.Trigger
          aria-label="파트"
          placeholder={placeholder}
          label={label || undefined}
        />
        <Select.Menu>{items}</Select.Menu>
      </>
    );

    // type·multiple 조합을 바꿀 때 이전 선택값이 남지 않도록 key로 다시 마운트한다.
    const key = `${type}-${multiple}`;

    if (type === "checkbox" || (type === "text" && multiple)) {
      return (
        <Select key={key} type={type} multiple>
          {content}
        </Select>
      );
    }
    return (
      <Select key={key} type={type}>
        {content}
      </Select>
    );
  },
};

/** 아이콘 + 메뉴명. 단일 선택만 가능합니다. */
export const Icon: Story = {
  ...SelectDefault,
  name: "Icon",
  args: { type: "icon" },
  parameters: { controls: { include: ["placeholder"] } },
};

/** 메뉴명 + 설명. 선택된 항목에 체크가 표시되고, 다중 선택도 가능합니다. */
export const Text: Story = {
  ...SelectDefault,
  name: "Text",
  args: { type: "text" },
  parameters: { controls: { include: ["multiple", "placeholder"] } },
};

/** 프로필 + 이름 + 설명. 단일 선택만 가능합니다. */
export const UserList: Story = {
  ...SelectDefault,
  name: "UserList",
  args: { type: "userList" },
  parameters: { controls: { include: ["placeholder"] } },
};

/**
 * 체크박스 + 메뉴명. 다중 선택만 가능하고, 2개 이상 고르면 개수가 표시됩니다.
 *
 * \* `Select.Trigger`의 `label`로 2개 이상 골랐을 때 보일 고정 문구를 정할 수 있습니다. (예시: "파트")
 * 1개만 골랐으면 그 항목 이름이, `label`이 없으면 처음 고른 항목 이름이 보입니다.
 */
export const Checkbox: Story = {
  ...SelectDefault,
  name: "Checkbox",
  args: { type: "checkbox", label: "파트" },
  parameters: { controls: { include: ["label", "placeholder"] } },
};
