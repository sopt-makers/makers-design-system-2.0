import * as React from "react";
import type { RadioSize } from "./types";

/**
 * RadioGroup이 하위 Radio에 선택 상태/공유 속성을 주입하기 위한 Context.
 * `null`이면 Radio가 그룹 밖(단독)에서 동작 중임을 의미한다.
 */
export interface RadioGroupContextValue {
  /** 그룹 내 radio들이 공유하는 name. */
  name: string;
  /** 현재 선택된 값. */
  value: string | undefined;
  /** 항목이 선택될 때 그룹에 통지한다. */
  onSelect: (value: string) => void;
  /** 그룹 전체 비활성화 여부. */
  disabled: boolean;
  /** 그룹 기본 size (개별 Radio의 size가 우선). */
  size: RadioSize;
}

export const RadioGroupContext =
  React.createContext<RadioGroupContextValue | null>(null);

export function useRadioGroup(): RadioGroupContextValue | null {
  return React.useContext(RadioGroupContext);
}
