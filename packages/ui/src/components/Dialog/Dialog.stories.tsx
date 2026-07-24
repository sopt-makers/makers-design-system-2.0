import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties } from "react";
import { useState } from "react";
import { ActionButton } from "../ActionButton";
import { Checkbox } from "../Checkbox";
import { Dialog } from "./Dialog";

const COMPONENT_DESCRIPTION = `
  \`Dialog\`는 확인이나 안내를 위한 모달 다이얼로그입니다. 네이티브 \`<dialog>\` 기반이라 포커스 트랩·top layer·Esc·\`::backdrop\`이 브라우저에서 그대로 동작합니다.\n
  **Figma의 변형은 대부분 prop이 아니라 합성으로 표현합니다.** \`Dialog.Cancel\`을 렌더하지 않으면 Information(버튼 1개)이 되고, \`Dialog.Action\`에 \`variant="danger"\`를 주면 Danger가 됩니다. 체크박스와 설명도 넣고 빼는 것으로 결정됩니다. 그래서 루트가 받는 건 \`open\`과 \`onOpenChange\`뿐입니다.\n
  파트는 \`Dialog.Title\`(필수, \`aria-labelledby\` 자동 연결), \`Dialog.Description\`(선택, \`aria-describedby\` 자동 연결), \`Dialog.Actions\`, \`Dialog.Cancel\`, \`Dialog.Action\`입니다. Cancel과 Action은 클릭 시 자동으로 닫히며, \`onClick\`에서 \`event.preventDefault()\`로 막을 수 있습니다.\n
  레이아웃은 뷰포트가 아니라 **Dialog 자신의 폭**에서 파생됩니다(컨테이너 쿼리). 앱은 자기 브레이크포인트에 맞춰 \`--mds-dialog-width\`만 덮어쓰면 여백·타이포·버튼 배치·체크박스 크기가 함께 따라옵니다.\n
  \`\`\`tsx
  const responsiveDialog = style({
    vars: { "--mds-dialog-width": "303px" },
    "@media": { "screen and (min-width: 768px)": { vars: { "--mds-dialog-width": "400px" } } },
  });

  <Dialog className={responsiveDialog} open={open} onOpenChange={setOpen}>
  \`\`\`
`;

type StoryArgs = {
  width: number;
  checkbox: boolean;
  description: boolean;
};

/** 앱이 브레이크포인트로 거는 값을 스토리에서 흉내낸다. */
const widthStyle = (width: number) =>
  ({ "--mds-dialog-width": `${width}px` }) as CSSProperties;

const meta: Meta<StoryArgs> = {
  title: "Dialog",
  component: Dialog,
  tags: ["autodocs"],
  args: {
    width: 303,
    checkbox: true,
    description: true,
  },
  argTypes: {
    width: {
      name: "--mds-dialog-width",
      control: { type: "range", min: 260, max: 460, step: 1 },
      description:
        "앱이 자기 브레이크포인트로 거는 값입니다. 360px을 넘으면 넓은 레이아웃으로 바뀝니다.",
    },
    checkbox: {
      control: "boolean",
      description:
        "`<Checkbox />`를 렌더할지 결정합니다. Dialog의 prop이 아니라 합성입니다. `size`를 생략하면 Dialog 폭에 맞춰 크기가 정해집니다.",
    },
    description: {
      control: "boolean",
      description:
        "`<Dialog.Description />`을 렌더할지 결정합니다. 이것도 prop이 아니라 합성입니다.",
    },
  },
  parameters: {
    // include는 argTypes의 `name`(표시 이름)으로 매칭된다. width는 name을 바꿨으므로
    // 키(`width`)가 아니라 바뀐 이름을 적어야 한다.
    controls: {
      include: ["--mds-dialog-width", "checkbox", "description"],
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
  render: ({ width, checkbox, description }) => {
    const [open, setOpen] = useState(false);
    const [muted, setMuted] = useState(false);

    return (
      <>
        <ActionButton onClick={() => setOpen(true)}>
          다이얼로그 열기
        </ActionButton>
        <Dialog open={open} onOpenChange={setOpen} style={widthStyle(width)}>
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
  render: ({ width, checkbox, description }) => {
    const [open, setOpen] = useState(false);
    const [muted, setMuted] = useState(false);

    return (
      <>
        <ActionButton onClick={() => setOpen(true)}>
          Information 열기
        </ActionButton>
        <Dialog open={open} onOpenChange={setOpen} style={widthStyle(width)}>
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
  render: ({ width, checkbox, description }) => {
    const [open, setOpen] = useState(false);
    const [muted, setMuted] = useState(false);

    return (
      <>
        <ActionButton variant="danger" onClick={() => setOpen(true)}>
          Danger 열기
        </ActionButton>
        <Dialog open={open} onOpenChange={setOpen} style={widthStyle(width)}>
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
