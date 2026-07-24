import * as React from "react";

/**
 * Dialog 루트가 파트(Title/Description/Cancel)에 id와 닫기 동작을 주입하기 위한 Context.
 * `null`이면 파트가 `<Dialog>` 밖에서 쓰인 것이다.
 */
export interface DialogContextValue {
  /** Dialog.Title이 사용할 id. 루트가 `aria-labelledby`로 참조한다. */
  titleId: string;
  /** Dialog.Description이 사용할 id. 루트가 `aria-describedby`로 참조한다. */
  descriptionId: string;
  /**
   * Description이 렌더 중임을 루트에 알리고, 해제 함수를 돌려준다.
   *
   * Description 없이 `aria-describedby`를 걸면 존재하지 않는 id를 가리키게 되어
   * 스크린리더가 설명을 찾지 못하고 axe도 위반으로 잡는다. 그래서 루트는
   * Description이 실제로 있을 때만 속성을 건다.
   */
  registerDescription: () => () => void;
  /** 네이티브 `close()`를 호출한다. close 이벤트를 거쳐 `onOpenChange(false)`로 이어진다. */
  close: () => void;
}

export const DialogContext = React.createContext<DialogContextValue | null>(
  null,
);

export function useDialogContext(part: string): DialogContextValue {
  const context = React.useContext(DialogContext);
  if (context == null) {
    throw new Error(`${part}은(는) <Dialog> 안에서만 사용할 수 있습니다.`);
  }
  return context;
}
