import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * 활성 헤딩 판정 영역: 뷰포트 상단 30%.
 * (하단 70%를 잘라내 "상단에 걸린" 헤딩만 교차로 인정)
 */
const OBSERVER_ROOT_MARGIN = "0px 0px -70% 0px";

/**
 * 현재 페이지 본문(main)의 h2·h3를 수집하고, 스크롤 위치에 맞는 활성 id를 추적한다.
 * 외부(DOM·스크롤)와의 동기화이므로 useEffect 사용이 정당하다.
 * 경로가 바뀌면 본문이 교체되므로 다시 수집한다.
 */
export function useTableOfContents() {
  const { pathname } = useLocation();
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname은 본문에서 직접 읽지 않지만, 경로가 바뀌면 본문이 교체되므로 헤딩을 다시 수집하기 위한 트리거 의존성이다.
  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLHeadingElement>("main h2[id], main h3[id]"),
    );

    setItems(
      headings.map((heading) => ({
        id: heading.id,
        text: heading.textContent ?? "",
        level: heading.tagName === "H2" ? 2 : 3,
      })),
    );

    if (headings.length === 0) {
      setActiveId(null);
      return;
    }
    setActiveId(headings[0]?.id ?? null);

    const visibility = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.isIntersecting);
        }
        // 문서 순서상 가장 위에서 교차 중인 헤딩이 활성
        const topMostVisible = headings.find((heading) =>
          visibility.get(heading.id),
        );
        if (topMostVisible) {
          setActiveId(topMostVisible.id);
        }
      },
      { rootMargin: OBSERVER_ROOT_MARGIN },
    );
    for (const heading of headings) {
      observer.observe(heading);
    }

    return () => observer.disconnect();
  }, [pathname]);

  return { items, activeId };
}
