import { IconHeartFilled, IconSendFilled } from "@sopt-mds/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps, useState } from "react";
import { ActionButton } from "../ActionButton";
import { TextArea } from "./TextArea";

const COMPONENT_DESCRIPTION = `
  \`TextArea\`는 다양한 제스처로 요소를 입력할 때 사용할 수 있어요. TextArea는 2줄 이상의 텍스트를 입력할 케이스를 고려할 경우 사용해요.
`;

const meta: Meta<typeof TextArea> = {
  title: "TextArea",
  component: TextArea,
  tags: ["autodocs"],
  args: {
    variant: "default",
    label: "라벨",
    description: "보조 설명 텍스트입니다.",
    placeholder: "내용을 입력해주세요.",
    helperText: "도움말 텍스트입니다.",
    rows: 4,
    required: false,
    error: false,
    disabled: false,
    showCount: false,
    autoSize: false,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "ghost"],
    },
    label: { control: "text" },
    description: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    required: { control: "boolean" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    showCount: { control: "boolean" },
    autoSize: { control: "boolean" },
    rows: { control: { type: "number", min: 1 } },
    maxLength: { control: { type: "number", min: 0 } },
  },
  parameters: {
    controls: {
      include: [
        "variant",
        "label",
        "description",
        "placeholder",
        "helperText",
        "required",
        "error",
        "disabled",
        "showCount",
        "autoSize",
        "rows",
        "maxLength",
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

type Story = StoryObj<typeof TextArea>;

function ControlledTextArea(args: ComponentProps<typeof TextArea>) {
  const [value, setValue] = useState("");

  return (
    <div style={{ width: 320 }}>
      <TextArea
        {...args}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
    </div>
  );
}

export const TextAreaDefault: Story = {
  name: "TextArea",
  render: (args) => <ControlledTextArea {...args} />,
};

export const AddonExample: Story = {
  args: {
    label: "메시지",
    description: undefined,
    helperText: undefined,
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", gap: "16px" }}>
        <ControlledTextArea
          {...args}
          leftAddon={
            <button
              type="button"
              aria-label="전송"
              style={{
                padding: 0,
                border: "none",
                background: "none",
                cursor: "pointer",
                color: "inherit",
                alignSelf: "start",
              }}
            >
              <IconHeartFilled width={20} height={20} />
            </button>
          }
        />
        <ControlledTextArea
          {...args}
          rightAddon={
            <button
              type="button"
              aria-label="전송"
              style={{
                padding: 0,
                border: "none",
                background: "none",
                cursor: "pointer",
                color: "inherit",
                alignSelf: "end",
              }}
            >
              <IconSendFilled width={20} height={20} />
            </button>
          }
        />
        <ControlledTextArea
          {...args}
          rightAddon={
            <ActionButton size="xsmall" type="button">
              예시 버튼
            </ActionButton>
          }
        />
      </div>
    </div>
  ),
};

export const AutoSize: Story = {
  args: {
    autoSize: true,
  },
  render: (args) => <ControlledTextArea {...args} />,
};

export const ShowCount: Story = {
  args: {
    showCount: true,
    maxLength: 100,
  },
  render: (args) => <ControlledTextArea {...args} />,
};
