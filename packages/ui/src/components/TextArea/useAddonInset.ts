import { type RefObject, useLayoutEffect, useRef, useState } from "react";
import { TEXTAREA_ADDON_GAP_VALUE } from "./constant";

/**
 * addon 요소의 실제 폭을 측정합니다.
 * addon의 폭만큼 textarea의 padding을 확보해 텍스트가 addon 아래로 겹치지 않도록 합니다.
 */
export function useAddonInset(
  enabled: boolean,
): [RefObject<HTMLSpanElement>, number] {
  const ref = useRef<HTMLSpanElement>(null);
  const [inset, setInset] = useState(0);

  useLayoutEffect(() => {
    const element = ref.current;

    if (!enabled || element == null) {
      setInset(0);
      return;
    }

    const update = () => {
      const width = element.getBoundingClientRect().width;
      setInset(width > 0 ? width + TEXTAREA_ADDON_GAP_VALUE : 0);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => observer.disconnect();
  }, [enabled]);

  return [ref, inset];
}
