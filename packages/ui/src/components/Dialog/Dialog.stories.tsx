import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ActionButton } from "../ActionButton";
import { Checkbox } from "../Checkbox";
import { Dialog } from "./Dialog";
import type { DialogDevice } from "./types";

const COMPONENT_DESCRIPTION = `
  \`Dialog\`는 확인이나 안내를 위한 모달 다이얼로그입니다. 네이티브 \`<dialog>\` 기반이라 포커스 트랩·top layer·Esc·\`::backdrop\`이 브라우저에서 그대로 동작합니다.\n
  **Figma의 변형은 대부분 prop이 아니라 합성으로 표현합니다.** \`Dialog.Cancel\`을 렌더하지 않으면 Information(버튼 1개)이 되고, \`Dialog.Action\`에 \`variant="danger"\`를 주면 Danger가 됩니다. 체크박스와 설명도 넣고 빼는 것으로 결정됩니다.\n
  파트는 \`Dialog.Title\`(필수, \`aria-labelledby\` 자동 연결), \`Dialog.Description\`(선택, \`aria-describedby\` 자동 연결), \`Dialog.Actions\`, \`Dialog.Cancel\`, \`Dialog.Action\`입니다. Cancel과 Action은 클릭 시 자동으로 닫히며, \`onClick\`에서 \`event.preventDefault()\`로 막을 수 있습니다.\n
  **폭은 \`device\`가 정하는 고정값입니다.** \`mobile\`은 303px, \`pc\`는 400px이며 뷰포트나 컨테이너 폭에 반응하지 않습니다. 여백·본문 타이포·Checkbox 크기도 같은 prop에서 함께 파생되므로, 화면 크기에 따라 다른 폭이 필요하면 앱이 직접 골라 넘깁니다. 버튼은 개수와 device에 무관하게 항상 행을 채웁니다.\n
  \`\`\`tsx
  const isPC = useMediaQuery("(min-width: 768px)");

  <Dialog device={isPC ? "pc" : "mobile"} open={open} onOpenChange={setOpen}>
  \`\`\`
`;

type StoryArgs = {
  device: DialogDevice;
  checkbox: boolean;
  description: boolean;
};

const meta: Meta<StoryArgs> = {
  title: "Dialog",
  component: Dialog,
  tags: ["autodocs"],
  args: {
    device: "mobile",
    checkbox: true,
    description: true,
  },
  argTypes: {
    device: {
      control: "inline-radio",
      options: ["mobile", "pc"] satisfies DialogDevice[],
      description:
        "폭과 그에 딸린 내부 치수를 결정합니다. `mobile` 303px / `pc` 400px 고정입니다.",
    },
    checkbox: {
      control: "boolean",
      description:
        "`<Checkbox />`를 렌더할지 결정합니다. Dialog의 prop이 아니라 합성입니다. `size`를 생략하면 `device`에 맞춰 크기가 정해집니다.",
    },
    description: {
      control: "boolean",
      description:
        "`<Dialog.Description />`을 렌더할지 결정합니다. 이것도 prop이 아니라 합성입니다.",
    },
  },
  parameters: {
    controls: {
      include: ["device", "checkbox", "description"],
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

/** 버튼 2개(취소 + 확인)인 기본 형태입니다. */
export const DialogDefault: Story = {
  name: "Dialog",
  render: ({ device, checkbox, description }) => {
    const [open, setOpen] = useState(false);
    const [muted, setMuted] = useState(false);

    return (
      <>
        <ActionButton onClick={() => setOpen(true)}>
          다이얼로그 열기
        </ActionButton>
        <Dialog open={open} onOpenChange={setOpen} device={device}>
          <Dialog.Title>알림을 받을까요?</Dialog.Title>
          {description && (
            <Dialog.Description>
              중요한 소식이 있을 때만 보내드려요. 설정에서 언제든 끌 수 있어요.
            </Dialog.Description>
          )}
          {checkbox && (
            <Checkbox
              label="다시 보지 않기"
              checked={muted}
              onCheckedChange={setMuted}
            />
          )}
          <Dialog.Actions>
            <Dialog.Cancel>나중에</Dialog.Cancel>
            <Dialog.Action>받을게요</Dialog.Action>
          </Dialog.Actions>
        </Dialog>
      </>
    );
  },
};

/** `Dialog.Cancel`을 렌더하지 않으면 Information이 됩니다. variant prop은 없습니다. */
export const Information: Story = {
  render: ({ device, checkbox, description }) => {
    const [open, setOpen] = useState(false);
    const [muted, setMuted] = useState(false);

    return (
      <>
        <ActionButton onClick={() => setOpen(true)}>
          Information 열기
        </ActionButton>
        <Dialog open={open} onOpenChange={setOpen} device={device}>
          <Dialog.Title>저장했어요</Dialog.Title>
          {description && (
            <Dialog.Description>
              변경한 내용이 모두 반영됐어요.
            </Dialog.Description>
          )}
          {checkbox && (
            <Checkbox
              label="다시 보지 않기"
              checked={muted}
              onCheckedChange={setMuted}
            />
          )}
          <Dialog.Actions>
            <Dialog.Action>확인</Dialog.Action>
          </Dialog.Actions>
        </Dialog>
      </>
    );
  },
};

/** `Dialog.Action`에 `variant="danger"`를 주면 Danger가 됩니다. */
export const Danger: Story = {
  render: ({ device, checkbox, description }) => {
    const [open, setOpen] = useState(false);
    const [muted, setMuted] = useState(false);

    return (
      <>
        <ActionButton variant="danger" onClick={() => setOpen(true)}>
          Danger 열기
        </ActionButton>
        <Dialog open={open} onOpenChange={setOpen} device={device}>
          <Dialog.Title>정말 삭제할까요?</Dialog.Title>
          {description && (
            <Dialog.Description>삭제하면 되돌릴 수 없어요.</Dialog.Description>
          )}
          {checkbox && (
            <Checkbox
              label="다시 보지 않기"
              checked={muted}
              onCheckedChange={setMuted}
            />
          )}
          <Dialog.Actions>
            <Dialog.Cancel>취소</Dialog.Cancel>
            <Dialog.Action variant="danger">삭제</Dialog.Action>
          </Dialog.Actions>
        </Dialog>
      </>
    );
  },
};
