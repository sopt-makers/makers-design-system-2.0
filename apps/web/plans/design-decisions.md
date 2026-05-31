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
