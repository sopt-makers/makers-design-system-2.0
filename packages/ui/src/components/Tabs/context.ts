import * as React from "react";
import type { TabsSize, TabsVariant } from "./types";

/**
 * Tabs 루트가 List/Trigger에 선택 상태와 시각 축을 주입하기 위한 Context.
 * `null`이면 파트가 `<Tabs>` 밖에서 쓰인 것이다.
 */
export interface TabsContextValue {
  /** Trigger와 Content의 id를 서로 연결하기 위한 접두사. */
  baseId: string;
  /** 현재 선택된 탭의 value. 아무것도 선택되지 않았으면 `undefined`. */
  value: string | undefined;
  /** 탭을 선택한다. 제어 모드면 `onValueChange`만 호출하고 내부 상태는 바꾸지 않는다. */
  select: (value: string) => void;
  size: TabsSize;
  variant: TabsVariant;
}

export const TabsContext = React.createContext<TabsContextValue | null>(null);

export function useTabsContext(part: string): TabsContextValue {
  const context = React.useContext(TabsContext);
  if (context == null) {
    throw new Error(`${part}은(는) <Tabs> 안에서만 사용할 수 있습니다.`);
  }
  return context;
}

/** Trigger와 Content가 aria-controls / aria-labelledby로 서로를 가리키는 id. */
export function getTriggerId(baseId: string, value: string) {
  return `${baseId}-trigger-${encodeURIComponent(value)}`;
}

export function getContentId(baseId: string, value: string) {
  return `${baseId}-content-${encodeURIComponent(value)}`;
}
