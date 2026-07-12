import {
  type RefObject,
  type TextareaHTMLAttributes,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";

/** 입력되는 값의 변경에 따라 높이를 조절합니다. */
export function useAutoSize(
  enabled: boolean,
  value?: TextareaHTMLAttributes<HTMLTextAreaElement>["value"],
): [RefObject<HTMLTextAreaElement | null>, () => void] {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const resize = useCallback(() => {
    const element = ref.current;

    if (element == null) {
      return;
    }

    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }, []);

  /** biome-ignore lint/correctness/useExhaustiveDependencies: value 변경 시 재실행이 필요 */
  useLayoutEffect(() => {
    const element = ref.current;

    if (element == null) {
      return;
    }

    if (!enabled) {
      // autoSize가 꺼지면 inline height를 제거해 CSS의 maxHeight/스크롤로 복귀합니다.
      element.style.height = "";
      return;
    }

    resize();

    // 박스 폭 변화(반응형/addon 등)로 줄바꿈이 바뀌면 높이를 다시 맞춥니다.
    let previousWidth = element.getBoundingClientRect().width;
    const observer = new ResizeObserver(() => {
      const width = element.getBoundingClientRect().width;

      if (width !== previousWidth) {
        previousWidth = width;
        resize();
      }
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, [enabled, value, resize]);

  return [ref, resize];
}
