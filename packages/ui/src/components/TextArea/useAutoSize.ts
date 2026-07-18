import {
  type RefObject,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";

/**
 * textarea가 콘텐츠 높이에 맞춰 늘어나도록 합니다.
 * value 변경 시 높이를 맞추며, 반환된 ref를 textarea에 바인딩해야 합니다.
 */
export function useAutoSize(
  enabled: boolean,
  value: string,
): RefObject<HTMLTextAreaElement | null> {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const resize = useCallback(() => {
    const element = ref.current;

    if (element == null) {
      return;
    }

    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: value 변경 시 재실행이 필요합니다.
  useLayoutEffect(() => {
    const element = ref.current;

    if (element == null) {
      return;
    }

    if (!enabled) {
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

  return ref;
}
