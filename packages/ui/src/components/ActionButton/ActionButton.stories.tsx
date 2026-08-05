import { IconChevronRight, IconPlus } from "@sopt-mds/icons";
import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { ActionButton } from "./ActionButton";
import { ACTION_BUTTON_HEIGHT_FOR_SIZE } from "./constant";
import type { ActionButtonSize, ActionButtonVariant } from "./types";

/**
 * 높이 목록을 상수에서 만든다. 디자인 QA 때마다 바뀌는 값이라 문서에 손으로 적어 두면
 * 상수만 고치고 설명은 옛 값으로 남는 일이 생긴다.
 */
const HEIGHT_SUMMARY = Object.entries(ACTION_BUTTON_HEIGHT_FOR_SIZE)
  .map(([size, height]) => `\`${size}\`(${Number.parseInt(height, 10)})`)
  .join(" / ");

const COMPONENT_DESCRIPTION = `
  \`ActionButton\`은 가장 높은 시각 위계를 가지는 솔리드 버튼입니다. 화면에서 가장 주요한 행동(CTA)에 사용합니다.\n
  - **variant**: \`primary\`(가장 중요한 행동) / \`secondary\`(부가적이나 강조가 필요한 행동) / \`danger\`(사용이 유의한 행동)\n
  - **size**: 높이는 ${HEIGHT_SUMMARY}입니다. 디자인상 \`danger\`는 \`xsmall\`을 제공하지 않습니다.\n
  - \`leftAddon\` / \`rightAddon\`은 서로 독립적입니다. 한쪽만 넣어도 되고 양쪽을 함께 넣어도 되며, 넣지 않은 쪽은 자리도 차지하지 않습니다. 아이콘 크기는 size에 따라 자동 조정됩니다.
`;

const VARIANTS: ActionButtonVariant[] = ["primary", "secondary", "danger"];
const SIZES: ActionButtonSize[] = ["xsmall", "small", "medium", "large"];

/**
 * 아이콘 토글은 스토리 전용 arg입니다. `leftAddon`/`rightAddon` 자체를 boolean 컨트롤로
 * 만들면(argTypes의 `mapping`) 값이 없을 때 원래 값인 `false`로 폴백해 컴포넌트에 그대로
 * 넘어가고, ActionButton은 `!= null`로 판정하므로 아이콘 없는 빈 박스가 렌더됩니다.
 * 그래서 boolean은 스토리에서만 받고 render에서 요소로 바꿉니다.
 */
type StoryArgs = {
  variant: ActionButtonVariant;
  size: ActionButtonSize;
  disabled: boolean;
  children: string;
  leftIcon: boolean;
  rightIcon: boolean;
};

/**
 * ActionButton의 props는 variant로 갈리는 판별 유니온입니다(`danger`에는 xsmall이 없음).
 * 반면 스토리북은 variant와 size를 독립된 컨트롤로 노출하니 두 값의 조합이 어느 분기에도
 * 그대로 맞지 않습니다. 그래서 이 두 prop만 담은 객체를 컴포넌트 props 타입으로 좁혀
 * 넘깁니다. 캐스팅 범위를 variant/size로 한정해 나머지 prop은 계속 타입 검사를 받습니다.
 */
const variantProps = (variant: ActionButtonVariant, size: ActionButtonSize) =>
  ({ variant, size }) as ComponentProps<typeof ActionButton>;

const meta: Meta<StoryArgs> = {
  title: "ActionButton",
  component: ActionButton,
  tags: ["autodocs"],
  args: {
    children: "Button",
    variant: "primary",
    size: "medium",
    disabled: false,
    leftIcon: false,
    rightIcon: false,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: VARIANTS,
    },
    size: {
      control: "inline-radio",
      options: SIZES,
      description: `높이는 ${HEIGHT_SUMMARY}입니다. 컨트롤은 variant와 독립이라 \`danger\` + \`xsmall\`도 고를 수 있지만, 이 조합은 Figma에 없고 타입으로도 막혀 있으니 참고용으로만 보세요.`,
    },
    disabled: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
    leftIcon: {
      control: "boolean",
      description:
        "왼쪽 아이콘(`leftAddon`)을 렌더할지 결정합니다. 컴포넌트의 prop이 아니라 스토리 전용 컨트롤이고, 켜면 `leftAddon={<IconPlus />}`가 됩니다.",
    },
    rightIcon: {
      control: "boolean",
      description:
        "오른쪽 아이콘(`rightAddon`)을 렌더할지 결정합니다. 왼쪽과 독립적이라 한쪽만 켤 수 있습니다. 켜면 `rightAddon={<IconChevronRight />}`가 됩니다.",
    },
  },
  parameters: {
    controls: {
      include: [
        "variant",
        "size",
        "disabled",
        "children",
        "leftIcon",
        "rightIcon",
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

type Story = StoryObj<StoryArgs>;

export const ActionButtonDefault: Story = {
  name: "ActionButton",
  render: ({ variant, size, disabled, children, leftIcon, rightIcon }) => (
    <ActionButton
      {...variantProps(variant, size)}
      disabled={disabled}
      leftAddon={leftIcon ? <IconPlus /> : undefined}
      rightAddon={rightIcon ? <IconChevronRight /> : undefined}
    >
      {children}
    </ActionButton>
  ),
};
