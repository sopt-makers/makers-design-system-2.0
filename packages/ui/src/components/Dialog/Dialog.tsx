import clsx from "clsx";
import * as React from "react";
import { ActionButton } from "../ActionButton";
import { DialogContext, useDialogContext } from "./context";
import {
  actionButton,
  actions,
  description,
  panel,
  root,
  title,
} from "./Dialog.css";
import type { DialogActionVariant } from "./types";

export interface DialogProps
  extends Omit<
    React.DialogHTMLAttributes<HTMLDialogElement>,
    "open" | "title"
  > {
  /** Dialog의 열림 여부입니다. 제어 컴포넌트로만 동작합니다. */
  open: boolean;
  /**
   * 열림 상태가 바뀔 때 호출됩니다.
   *
   * Esc, Dialog.Cancel/Dialog.Action 클릭 등 모든 닫힘 경로에서 `false`로 호출됩니다.
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Dialog.Title / Dialog.Description / Dialog.Actions와 임의의 본문(Checkbox 등)을 조합합니다.
   *
   * Dialog.Title은 반드시 포함해야 합니다.
   */
  children?: React.ReactNode;
}

/** 포커스를 되돌릴 후보를 가까운 순으로 모은다. */
function collectAncestors(node: Element | null): HTMLElement[] {
  const chain: HTMLElement[] = [];
  for (let el = node; el instanceof HTMLElement; el = el.parentElement) {
    chain.push(el);
  }
  return chain;
}

/**
 * 브라우저의 자동 포커스 복원은 트리거가 여전히 focusable할 때만 동작한다.
 * 트리거가 언마운트됐으면 포커스가 `<body>`로 떨어지므로, 살아있는 가장 가까운
 * 조상으로 되돌린다. 브라우저 복원과 겹쳐 실행돼도 무해하다.
 */
function restoreFocus(chain: HTMLElement[]) {
  const target = chain.find(
    (el) =>
      el.isConnected &&
      !el.hasAttribute("disabled") &&
      el.closest("[inert]") == null,
  );
  if (target == null) return;
  if (!target.hasAttribute("tabindex") && target.tabIndex < 0) {
    target.setAttribute("tabindex", "-1");
  }
  target.focus({ preventScroll: true });
}

/**
 * 확인·안내를 위한 모달 다이얼로그입니다. 네이티브 `<dialog>` 기반이라
 * 포커스 트랩·top layer·Esc·`::backdrop`이 브라우저에서 그대로 동작합니다.
 *
 * - Figma의 action 축은 prop이 아니라 **합성**으로 표현합니다.
 *   Dialog.Cancel을 렌더하지 않으면 Information(버튼 1개), Dialog.Action에
 *   `variant="danger"`를 주면 Danger가 됩니다.
 * - 레이아웃은 뷰포트가 아니라 Dialog 자신의 폭에서 파생됩니다.
 *   앱의 브레이크포인트에 맞춰 `--mds-dialog-width`를 덮어쓰면 됩니다.
 * - 배경 클릭으로는 닫히지 않습니다. 확인을 요구하는 다이얼로그의 기본 동작입니다.
 */
const DialogRoot = ({
  open,
  onOpenChange,
  children,
  className,
  ...rest
}: DialogProps) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const restoreChainRef = React.useRef<HTMLElement[]>([]);
  const openRef = React.useRef(open);
  openRef.current = open;

  const id = React.useId();
  const titleId = `${id}title`;
  const descriptionId = `${id}description`;

  const [descriptionCount, setDescriptionCount] = React.useState(0);

  // 열고 닫는 것은 반드시 명령형으로 한다. `open` 속성을 렌더하면 non-modal이 되고,
  // 그 상태에서 showModal()을 부르면 InvalidStateError가 난다.
  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog == null) return;

    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }

    restoreChainRef.current = collectAncestors(document.activeElement);
    dialog.showModal();

    // showModal()은 body 스크롤을 막지 않는다. CSS만으로는 Safari에서 해결되지 않아
    // 직접 잠근다.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [open]);

  // Esc나 close()로 닫힌 것을 state에 반영하고 포커스를 되돌린다.
  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog == null) return;

    const handleClose = () => {
      restoreFocus(restoreChainRef.current);
      if (openRef.current) onOpenChange(false);
    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onOpenChange]);

  // Title이 없으면 스크린리더가 다이얼로그의 목적을 읽지 못한다. 합성 API는 이걸
  // 타입으로 막을 수 없어 개발 중에만 경고한다.
  React.useEffect(() => {
    if (process.env.NODE_ENV === "production" || !open) return;
    if (document.getElementById(titleId) == null) {
      console.warn(
        "[mds] Dialog에 Dialog.Title이 없습니다. 스크린리더가 다이얼로그의 제목을 읽지 못합니다.",
      );
    }
  }, [open, titleId]);

  const close = React.useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const registerDescription = React.useCallback(() => {
    setDescriptionCount((count) => count + 1);
    return () => setDescriptionCount((count) => count - 1);
  }, []);

  const contextValue = React.useMemo(
    () => ({ titleId, descriptionId, registerDescription, close }),
    [titleId, descriptionId, registerDescription, close],
  );

  return (
    <dialog
      {...rest}
      ref={dialogRef}
      className={clsx(root, className)}
      aria-labelledby={titleId}
      aria-describedby={descriptionCount > 0 ? descriptionId : undefined}
    >
      <DialogContext.Provider value={contextValue}>
        <div className={panel}>{children}</div>
      </DialogContext.Provider>
    </dialog>
  );
};

export interface DialogTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

/** 다이얼로그의 제목입니다. `aria-labelledby`로 자동 연결됩니다. */
const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...rest }, ref) => {
    const { titleId } = useDialogContext("Dialog.Title");
    return (
      <h2 {...rest} ref={ref} id={titleId} className={clsx(title, className)} />
    );
  },
);

export interface DialogDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

/** 다이얼로그의 설명입니다. 생략할 수 있으며, 있으면 `aria-describedby`로 자동 연결됩니다. */
const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, ...rest }, ref) => {
  const { descriptionId, registerDescription } =
    useDialogContext("Dialog.Description");

  React.useEffect(() => registerDescription(), [registerDescription]);

  return (
    <p
      {...rest}
      ref={ref}
      id={descriptionId}
      className={clsx(description, className)}
    />
  );
});

export interface DialogActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * 버튼 행입니다.
 *
 * Dialog.Cancel과 Dialog.Action을 함께 넣으면 둘이 폭을 절반씩 나누고,
 * Dialog.Action만 넣으면 Information 변형이 됩니다.
 */
const DialogActions = React.forwardRef<HTMLDivElement, DialogActionsProps>(
  ({ className, ...rest }, ref) => (
    <div {...rest} ref={ref} className={clsx(actions, className)} />
  ),
);

/** variant와 size는 Dialog가 정하므로 소비자에게 열지 않는다. */
type DialogActionButtonProps = Omit<
  React.ComponentPropsWithoutRef<typeof ActionButton>,
  "variant" | "size"
>;

export interface DialogCancelProps extends DialogActionButtonProps {}

/**
 * 취소 버튼입니다. 클릭하면 다이얼로그가 닫힙니다.
 *
 * 다이얼로그가 열릴 때 이 버튼에 포커스가 잡힙니다. `onClick`에서
 * `event.preventDefault()`를 호출하면 닫히지 않습니다.
 */
const DialogCancel = React.forwardRef<HTMLButtonElement, DialogCancelProps>(
  ({ className, onClick, ...rest }, ref) => {
    const { close } = useDialogContext("Dialog.Cancel");

    // React의 autoFocus prop은 <dialog> 안에서 동작하지 않는다(facebook/react#23301).
    // 소문자 autofocus를 JSX로 쓰면 React가 경고하므로 DOM에 직접 건다.
    // 브라우저는 autofocus 자손을 첫 focusable보다 우선하므로, 본문에 Checkbox가 있어도
    // 초기 포커스가 이 버튼에 잡힌다.
    const setRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        node?.setAttribute("autofocus", "");
        if (typeof ref === "function") ref(node);
        else if (ref != null) ref.current = node;
      },
      [ref],
    );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (!event.defaultPrevented) close();
    };

    return (
      <ActionButton
        {...rest}
        ref={setRef}
        variant="secondary"
        className={clsx(actionButton, className)}
        onClick={handleClick}
      />
    );
  },
);

export interface DialogActionProps extends DialogActionButtonProps {
  /** 확인 버튼의 시각 위계입니다. 되돌릴 수 없는 동작이면 `danger`를 씁니다. */
  variant?: DialogActionVariant;
}

/**
 * 확인 버튼입니다. 클릭하면 다이얼로그가 닫힙니다.
 *
 * 비동기 작업이 끝난 뒤에 닫으려면 `onClick`에서 `event.preventDefault()`를
 * 호출하고, 작업이 끝난 뒤 직접 `onOpenChange(false)`를 호출하세요.
 */
const DialogAction = React.forwardRef<HTMLButtonElement, DialogActionProps>(
  ({ variant = "primary", className, onClick, ...rest }, ref) => {
    const { close } = useDialogContext("Dialog.Action");

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (!event.defaultPrevented) close();
    };

    return (
      <ActionButton
        {...rest}
        ref={ref}
        variant={variant}
        className={clsx(actionButton, className)}
        onClick={handleClick}
      />
    );
  },
);

DialogRoot.displayName = "Dialog";
DialogTitle.displayName = "Dialog.Title";
DialogDescription.displayName = "Dialog.Description";
DialogActions.displayName = "Dialog.Actions";
DialogCancel.displayName = "Dialog.Cancel";
DialogAction.displayName = "Dialog.Action";

export const Dialog = Object.assign(DialogRoot, {
  Title: DialogTitle,
  Description: DialogDescription,
  Actions: DialogActions,
  Cancel: DialogCancel,
  Action: DialogAction,
});

Dialog.displayName = "Dialog";
