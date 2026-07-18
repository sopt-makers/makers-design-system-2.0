type ValueTracker = { setValue: (value: string) => void };

/**
 * 한글 IME에서 maxLength를 초과하여 입력된 경우를 위한 함수
 * maxLength를 넘는 순간 React의 re-render를 건너뛰기 때문에, 임시로 DOM을 싱크합니다.
 */
export function syncDomValue(element: HTMLTextAreaElement, nextValue: string) {
  if (element.value === nextValue) {
    return;
  }

  element.value = nextValue;

  const tracker = (
    element as HTMLTextAreaElement & {
      _valueTracker?: ValueTracker;
    }
  )._valueTracker;

  // DOM과 동일하게 맞춰야 다음 입력에서 변경 감지가 정상 동작합니다.
  tracker?.setValue(nextValue);
}
