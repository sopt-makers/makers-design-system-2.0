import * as React from "react";
import type { SelectType } from "./types";

/**
 * Select 루트가 파트(Trigger/Menu/Item)에 선택 상태와 열림 상태를 주입하기 위한 Context.
 * `null`이면 파트가 `<Select>` 밖에서 쓰인 것이다.
 */
export interface SelectContextValue {
  type: SelectType;
  multiple: boolean;
  /** 선택된 값. 단일 선택도 내부에서는 배열로 다룬다. */
  selected: string[];
  /** 단일은 선택 후 닫고, 다중은 토글한다. */
  select: (value: string) => void;
  open: boolean;
  /** 닫을 때 활성 option도 함께 해제한다. */
  setOpen: (open: boolean) => void;
  /**
   * Item이 자기 label을 등록하고 해제 함수를 돌려받는다.
   *
   * 메뉴가 닫혀 있어도 트리거가 선택된 항목의 label을 보여줘야 해서,
   * Menu는 닫혀도 DOM에 남고 Item은 마운트 시점에 label을 등록한다.
   */
  registerLabel: (value: string, label: React.ReactNode) => () => void;
  labels: ReadonlyMap<string, React.ReactNode>;
  /** 키보드·hover로 활성화된 option의 id. 트리거의 `aria-activedescendant`가 된다. */
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  menuId: string;
  /** option 목록을 DOM 순서대로 찾기 위한 메뉴 요소. */
  menuRef: React.MutableRefObject<HTMLElement | null>;
  setTriggerElement: (node: HTMLElement | null) => void;
  setMenuElement: (node: HTMLElement | null) => void;
  /** floating-ui가 계산한 메뉴 위치. */
  menuStyles: React.CSSProperties;
}

export const SelectContext = React.createContext<SelectContextValue | null>(
  null,
);

export function useSelectContext(part: string): SelectContextValue {
  const context = React.useContext(SelectContext);
  if (context == null) {
    throw new Error(`${part}은(는) <Select> 안에서만 사용할 수 있습니다.`);
  }
  return context;
}
