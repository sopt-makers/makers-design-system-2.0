# Design Decisions — apps/web (system web)

## Sidebar (2026-05-31, 이슈 #29)

**요구사항:** 230px 사이드바 = 정적 검색(동작 없음) + 아코디언 메뉴 트리. 활성 경로 선택 표시. 모바일 햄버거 오버레이에서 재사용.

**구조:**
```
layouts/Sidebar/{Sidebar, SidebarGroup, SidebarLink}.tsx + Sidebar.css.ts + constant.ts
```

**핵심 결정 (toss-frontend-fundamentals 근거):**
- **재사용 vs 중복(coupling-allow-duplication):** 데스크탑/모바일은 콘텐츠(검색+트리)가 동일 → `Sidebar` 재사용. 단 `variant`/`isMobile` prop 금지, chrome(테두리/오버레이/닫기)은 wrapper가 담당.
- **숨은 로직 드러내기(expose-hidden-logic):** 활성 그룹 초기 펼침을 `groupContainsPath(group, path)` 명명 함수로 노출. `useEffect` 동기화 안 함, `useState` lazy init만.
- **책임 분리(single-responsibility):** leaf NavLink의 active className 로직이 비자명 → `SidebarLink` 분리. TopNav 탭 링크와는 맥락이 달라 공통화하지 않음(중복 허용).
- **이름-구현 일치:** 검색은 무동작 → 상태 가진 `SidebarSearch` 만들지 않고 Sidebar 내 정적 블록 인라인.
- **아코디언 상태 위치:** 그룹별 지역 `useState` (독립 토글, single-open 요구 없음 → drilling 0, 응집도↑).
- **매직넘버:** 모든 치수 상수화 + design-tokens 매핑. layer 토큰(bg/layer/*)은 패키지 부재 → `base.gray950/900/800` 매핑.

**미확정:** Typography·Spacing 자식 항목은 임의 placeholder 값(확정 시 `constant.ts` 교체).

### Sidebar 대분류 동작 개정 (2026-05-31, 디자이너 요청 반영)
**요청:** 대분류는 하위가 있을 때만 토글(선택 불가), 하위가 없으면 대분류 자체가 선택 가능 링크.
- Colors=그룹(하위 O), Typography·Spacing=단독 링크(하위 X) 확정.

**결정:**
- 데이터 모델을 discriminated union `SidebarMenuItem = SidebarGroupItem | SidebarLinkItem`(명시적 `type` 필드)로 변경. → `items?` 유무 구조 판별(숨은 로직) 회피, narrowing 명확(predictability).
- 컴포넌트: `SidebarGroup`(토글, 선택 불가, `<button>`이라 구조적으로 active 차단) / `SidebarTopLink`(하위 없는 대분류, 행 스타일 NavLink, 선택 가능) / `SidebarChildLink`(기존 SidebarLink 개명, 들여쓴 자식). top·child 분리는 맥락(들여쓰기) 차이로 중복 허용.
- CSS: `selectableRow` 공통 base + `topLink`/`childLink` 합성, `linkActive` 공통.
- 선택(active)은 링크에만, 그룹 헤더엔 안 붙음.

**반응형:** Sidebar는 ≤768에서 숨김(DocsLayout `sidebarCell` display:none), 모바일 메뉴는 4번 영역(햄버거 오버레이)에서 동일 `<Sidebar />` 재사용.

## Article (2026-05-31, 이슈 #29)
**요구사항:** Article = MDX 본문 렌더 영역. Figma(290:930)는 본문 타이포그래피 시스템 정의.

**결정:**
- 컨테이너 셸: DocsLayout `article` 패딩을 Figma대로 pt40/pb24/px32(모바일 px16).
- MDX 요소 → 디자인 토큰 매핑(`src/mdx/mdxComponents.tsx` + `mdx.css.ts`), `MDXProvider`로 전역 1회 등록(main.tsx). 페이지마다 import 반복 회피.
  - h1=heading1, h2=title2, h3=title3, p/li=body1, code(inline)=mono+gray800, pre=gray900 박스, img=gray900 박스, blockquote/hr=stroke 토큰.
- 매핑 객체는 모듈 레벨 상수(렌더 재생성 방지).
- 인라인 링크(`a`) 색은 디자인 미확정 → 임시 fg.secondary+underline, 확정 시 교체.
- Figma의 Subtitle/예시박스 같은 섹션 템플릿용 커스텀 컴포넌트(<Subtitle>/<Figure>)는 실제 문서 작성(5번)에서 필요 확정 시 추가.

**주의:** `src/mdx.d.ts`(ambient `*.mdx` 선언)가 `./mdx` 폴더 import와 충돌 → `mdx-files.d.ts`로 개명.

## TOC (2026-05-31, 이슈 #29)
**요구사항(Figma 어노테이션 290:737):** ①클릭→섹션 이동 ②스크롤→해당 섹션 focused(스크롤 스파이) ③hover=selected=fg.bold.

**결정:**
- `layouts/Toc/{Toc.tsx, Toc.css.ts, useTableOfContents.ts}`. "On this page"(label3 fg.ghost) + h2·h3 앵커 링크(평소 fg.subtle / 활성·hover fg.bold).
- 헤딩 출처: DOM 쿼리(`main h2[id], main h3[id]`) — ref prop-drill 대신 main 셀렉터(결합도↓). 헤딩 id는 **rehype-slug**(vite mdx rehypePlugins)가 부여(한글 헤딩도 slug). → 의존성 추가 승인됨.
- 스크롤 스파이: `useTableOfContents` 훅에서 IntersectionObserver(rootMargin 상단 30%), 경로 변경 시 재수집(pathname 트리거 의존성 — biome-ignore로 의도 문서화). cleanup으로 observer disconnect. 외부(DOM/스크롤) 동기화라 useEffect 정당.
- 앵커 이동: `<a href="#id">` + 헤딩 scroll-margin-top 80 + html scroll-behavior smooth.
- DocsLayout `tocCell` sticky(top 0)로 고정, 콘텐츠 스타일은 Toc가 담당. 헤딩 없으면 Toc는 null 렌더.

## MobileMenu / 햄버거 드로어 (2026-05-31, 이슈 #29)
**요구사항(Figma 278:345):** ≤768에서만 유효. 풀스크린 아닌 **300px 좌측 드로어 + 배경 스크림**. 상단 X + 그 아래 Sidebar(검색+아코디언) 그대로.

**결정:**
- `layouts/MobileMenu/{MobileMenu.tsx, .css.ts}`. 배경 스크림(bg.dim.default)=닫기 버튼 / 300px 드로어(좌측 고정, py24) = 닫기행(X, 우측) + sidebarSlot(px24) + `<Sidebar/>`.
- **Sidebar 재사용 + chrome 분리:** Sidebar에서 `pt48`(데스크탑 chrome) 제거 → `DocsLayout.sidebarCell`로 이동. 오버레이는 px24를 MobileMenu가 제공. Sidebar는 순수 콘텐츠(gap16)로. variant prop 없음.
- **닫기 3경로:** X 버튼 / 스크림 클릭(스크림을 `<button>`으로 만들어 a11y 충족) / Esc(useEffect 키 핸들러). 열림 동안 body 스크롤 락(overflow hidden, cleanup 복원).
- **네비게이션 시 닫기:** DocsLayout `useEffect([pathname])`로 경로 변경 시 close. 아코디언 토글은 경로변경 없어 안 닫힘. Sidebar에 onClose prop-drill 안 함(결합도↓). biome-ignore로 트리거 의존성 명시.
- role="dialog"/aria-modal. (포커스 트랩은 후속 향상 여지)

## MobileMenu 풀스크린 정정 (2026-05-31, 디자이너 확정)
**정정:** 768·375 둘 다 화면 전체를 덮는 **풀스크린** 메뉴(Figma 375 프레임 290:1517에서 인스턴스 w=375/768 풀폭 확인). 앞서 잡았던 300px 좌측 드로어 + 배경 스크림은 폐기.
- panel: position fixed inset 0, px24/py24, 닫기행(X 우측 상단) + `<Sidebar/>`. 스크림/드로어 없음.
- Esc 닫기 + body 스크롤 락 + 네비게이션 시 닫기는 유지.
