import type { Meta, StoryObj } from "@storybook/react";
import { ActionButton } from "../ActionButton";
import { SnackBar } from "./SnackBar";
import { SnackBarProvider, useSnackBar } from "./SnackBarProvider";
import type { SnackBarVariant } from "./types";

const COMPONENT_DESCRIPTION = `
  \`SnackBar\`는 사용자의 행동에 대한 **간단한 피드백 또는 수행해야 할 행동**을 알려주는 토스트입니다. \n
  중요한 결정이나 필수 액션은 SnackBar가 아닌 다른 컴포넌트로 제공합니다.\n
  - **variant**: \`default\`(아이콘 없음) / \`success\` / \`alert\` / \`error\`. 이 외의 아이콘은 사용하지 않습니다. **(필요한 경우, 디자인 플랫폼 팀에 문의해주세요!)**\n
  - **action**: 오른쪽 텍스트 버튼(선택). 하나만 제공하며 **짧은 레이블**을 사용합니다. 메시지는 최대 두 줄이며, 넘치면 말줄임 처리되고 **개발 모드에서 콘솔 경고**가 뜹니다. 두 줄을 넘는 메시지는 Dialog나 BottomSheet를 사용해 주세요.\n
  - **위치**: 모바일(Web / iOS / Android)은 Fill · 좌우 20px · Safe Area Top + 16px, Tablet(768px 이상) · Desktop은 폭 380px · Safe Area Top + 36px (가운데 정렬).\n
  - **모션**: Enter(slide down + fade in · 250ms · ease-out) → Display(\`duration\`, **기본 4초**이며 **조율 가능**해요.) → Exit(slide up + fade out · 200ms · ease-in).\n
  - **한 번에 1개**만 표시하고, 여러 건은 발생 순서대로 큐에 쌓여 **이전 SnackBar의 Exit 완료 직후 노출**됩니다.\n
  <br/>
  ### 사용법\n
  **1. 앱 루트를 \`SnackBarProvider\`로 한 번 감쌉니다.**\n
  \`\`\`tsx
  <SnackBarProvider>
      <App />
  </SnackBarProvider>
  \`\`\`
  **2. 띄우고 싶은 곳에서 \`useSnackBar().show()\`를 호출합니다.**\n
  \`\`\`tsx
  const snackBar = useSnackBar();

  const handleSubmit = async () => {
      try {
        await submit();
        snackBar.show({
          variant: "success",
          message: "프로젝트가 등록되었어요.",
          action: { label: "보러가기", onClick: () => navigate("/project") },
        });
      } catch {
        snackBar.show({ variant: "error", message: "업로드에 실패했어요." });
      }
  }

  \`\`\`
  **\`show()\` 옵션**\n
  | 옵션 | 설명 |
  | --- | --- |
  | \`message\` | 메시지. 최대 두 줄 **(필수)**|
  | \`variant\` | \`default\`(기본) / \`success\` / \`alert\` / \`error\` |
  | \`action\` | \`{ label, onClick }\`. 누르면 \`onClick\` 호출 후 닫힘 |
  | \`duration\` | 노출 시간(ms). 기본 값 \`4000\` |
`;

const VARIANTS: SnackBarVariant[] = ["default", "success", "alert", "error"];

type StoryArgs = {
  variant: SnackBarVariant;
  children: string;
  showAction: boolean;
  actionLabel: string;
};

const meta: Meta<StoryArgs> = {
  title: "SnackBar",
  component: SnackBar,
  tags: ["autodocs"],
  args: {
    variant: "success",
    children: "프로젝트가 등록되었어요.",
    showAction: false,
    actionLabel: "보러가기",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: VARIANTS,
    },
    children: {
      control: "text",
      description: "메시지. 최대 두 줄까지 노출됩니다.",
    },
    showAction: {
      control: "boolean",
      description: "`action` prop 전달 여부 (스토리 전용 컨트롤).",
    },
    actionLabel: {
      control: "text",
      description: "`action.label` (스토리 전용 컨트롤).",
      if: { arg: "showAction" },
    },
  },
  parameters: {
    controls: {
      include: ["variant", "children", "showAction", "actionLabel"],
    },
    docs: {
      description: {
        component: COMPONENT_DESCRIPTION,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 343 }}>
        <Story />
      </div>
    ),
  ],
  render: ({ variant, children, showAction, actionLabel }) => (
    <SnackBar
      variant={variant}
      action={
        showAction ? { label: actionLabel, onClick: () => {} } : undefined
      }
    >
      {children}
    </SnackBar>
  ),
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const SnackBarDefault: Story = {
  name: "SnackBar",
};

function QueueDemo() {
  const snackBar = useSnackBar();
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <ActionButton
        onClick={() =>
          snackBar.show({
            variant: "success",
            message: "프로젝트가 등록되었어요.",
          })
        }
      >
        1건
      </ActionButton>
      <ActionButton
        variant="secondary"
        onClick={() => {
          snackBar.show({ message: "첫 번째 토스트예요.", duration: 2000 });
          snackBar.show({
            variant: "alert",
            message: "두 번째 토스트예요.",
            duration: 2000,
          });
          snackBar.show({
            variant: "error",
            message: "세 번째 토스트예요.",
            action: { label: "닫기", onClick: () => {} },
          });
        }}
      >
        3건 연속 (큐)
      </ActionButton>
    </div>
  );
}

export const Motion: Story = {
  parameters: { controls: { disable: true } },
  decorators: [
    (Story) => (
      <SnackBarProvider>
        <Story />
      </SnackBarProvider>
    ),
  ],
  render: () => <QueueDemo />,
};
