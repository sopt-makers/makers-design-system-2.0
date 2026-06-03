import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export interface TableOfContentsItem {
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
  const [items, setItems] = useState<TableOfContentsItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname은 본문에서 직접 읽지 않지만, 경로가 바뀌면 본문이 교체되므로 헤딩을 다시 수집하기 위한 트리거 의존성이다.
  useEffect(() => {
    // 1) 본문에서 id가 달린 h2·h3를 문서 순서대로 수집해 목차 항목으로 만든다.
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

    // 헤딩이 없으면(목차 없는 페이지) 옵저버를 걸 필요 없이 종료.
    if (headings.length === 0) {
      setActiveId(null);
      return;
    }
    // 스크롤 전 초기 활성값은 첫 헤딩(옵저버 콜백이 곧 덮어쓴다).
    setActiveId(headings[0]?.id ?? null);

    // 2) 스크롤 스파이: 각 헤딩의 교차 여부를 추적해 "지금 보고 있는" 섹션을 활성으로.
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

    // 페이지 전환·언마운트 시 이전 옵저버 해제(누수 방지).
    return () => observer.disconnect();
  }, [pathname]);

  return { items, activeId };
}
