import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";
import { AVATAR_SIZES, AVATAR_STROKE_COLORS } from "./constant";

const COMPONENT_DESCRIPTION = `
  \`Avatar\`는 사용자를 시각적으로 표현하는 원형 이미지 컴포넌트입니다.\n
  - **size**: \`24\` / \`32\` / \`48\` / \`56\` / \`72\` / \`80\` / \`120\` / \`180\` (px). 지정한 px 크기로 렌더링됩니다.\n
  - **src**: 표시할 이미지 URL입니다. 없거나 로드에 실패하면 \`IconUsersFilled\` fallback 아이콘이 렌더링됩니다. 아이콘 size는 avatar size의 1/2입니다.\n
  - **type**: fallback 배경입니다. \`ghost\`(\`bg.neutral.ghost\`) / \`subtle\`(\`bg.neutral.subtle\`). 기본값은 \`subtle\`입니다.\n
  - **strokeColor**: 테두리 색상입니다. stroke 시맨틱 컬러 토큰의 카멜 케이스 key(예: \`neutralDefault\`, \`secondaryDefault\`)를 받으며, 값이 없으면 stroke가 그려지지 않습니다.
`;

const SAMPLE_IMAGE = "https://i.pravatar.cc/300";
const STROKE_COLOR_OPTIONS = Object.keys(AVATAR_STROKE_COLORS);

const meta: Meta<typeof Avatar> = {
  title: "Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: {
    src: SAMPLE_IMAGE,
    alt: "사용자 아바타",
    type: "subtle",
    strokeColor: undefined,
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["ghost", "subtle"],
    },
    strokeColor: {
      control: "select",
      options: [undefined, ...STROKE_COLOR_OPTIONS],
    },
    src: {
      control: "text",
    },
    alt: {
      control: "text",
    },
  },
  parameters: {
    controls: {
      include: ["src", "alt", "type", "strokeColor"],
    },
    docs: {
      description: {
        component: COMPONENT_DESCRIPTION,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Avatar_: Story = {
  name: "Avatar",
  render: ({ size: _size, ...args }) => (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
      {AVATAR_SIZES.map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
      <Avatar type={args.type} size={180} />
    </div>
  ),
};
