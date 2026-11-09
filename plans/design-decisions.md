# 설계 결정 기록

## Checkbox (Figma node 808-6174) — 2026-06-11

### 요구사항
- 기본 체크박스 동작(복수선택이 기본 — 각 체크박스 독립).
- Radix 인터페이스(`Checkbox.Root` + `Checkbox.Indicator`)를 검토해 우리 DS에 맞는 인터페이스 채택.
- 디자인 토큰을 우리가 작성한 것으로 정확히 구현.

### 결정

1. **인터페이스: flat 단일 컴포넌트** (Radix식 컴파운드 미채택)
   - Radix가 `Root`+`Indicator`로 나누는 이유는 headless(무스타일) 라이브러리라 스타일/아이콘 슬롯이 필요하고, 아이콘 교체·폼 참여(hidden input)·동작/표현 분리를 위해서다.
   - 우리 체크박스는 비주얼이 고정(우리 박스 + `IconCheck`)이라 슬롯의 이점이 없고, 네이티브 `<input type="checkbox">`만으로 복수선택·폼·키보드·제어/비제어가 전부 해결된다.
   - 레포에 이미 `Chip.Toggle`이 동일 패턴(hidden native input + label + `checked`/`onCheckedChange`)으로 존재 → 이를 독립 컴포넌트로 승격. Radix 의존성(레포 전체 0) 추가는 불필요.
   - **API 단순화(Chip.Toggle 대비)**: `inputProps` escape hatch와 `resolvedDisabled`(두 경로 disabled 병합)를 **제거**. 나머지 native input 속성은 `...inputProps` rest로 input에 그대로 전달하고, `className`/`style`은 바깥 `<label>`에 적용. 가독성·예측가능성(리뷰어 이해 용이)을 일관성보다 우선. `disabled`는 rest로 흘러가 `:has(input:disabled)`가 처리하므로 `resolvedDisabled` 불필요.

2. **복수선택**: 각 `Checkbox`가 독립 native input → 라디오식 그룹 단일선택 강제 없음. 그룹 바인딩은 배열 상태로 호출부에서 처리(스토리 `MultiSelect`로 시연).

3. **Indeterminate: 현재 범위에서 제외** (사용자 결정). Figma 프레임에 해당 상태 비주얼이 없음. 다만 디자이너 노트("상위 위계로 활성화 여부 제어")는 전체선택(부모) 패턴 → 향후 indeterminate가 필요. 구조상 `indeterminate` prop + ref 동기화 + `input:indeterminate + box` 규칙 + minus 글리프로 손쉽게 확장 가능하도록 남겨둠.

4. **상태 구동**: state prop 대신 native input의 pseudo-class(`:checked`/`:disabled`/`:checked:disabled`/`:focus-visible`)를 CSS 인접 형제 선택자(`input + box`)로 구동. Chip.css.ts의 `:has(input:checked)` 관례와 동일 철학.

5. **사이즈 처리**: size별 값은 root에 CSS 변수(`createVar`)로 세팅하고 하위 요소가 상속 → root에만 size 변형 클래스 부착.

### 토큰 매핑 / 신규 토큰
- 선택 채움 `fg.secondary.default`(blue400 #346ffa), 미선택 테두리 `stroke.neutral.default`(gray600), 비활성 테두리 `stroke.neutral.defaultDisabled`(gray700), 체크 `fg.neutral.bold`(gray10), 라벨/비활성 라벨 `fg.neutral.bold`/`fg.neutral.defaultDisabled`, radius `r4`, gap `s4`/`s8`, 타이포 `label3`/`label2`.
- **신규 토큰 추가**: Figma `fg/neutral/ghost-disabled`(#2e2e35=gray700)가 우리 `fg.neutral`에 없어 `colors.fg.neutral.ghostDisabled = gray700` 추가(`semantic.ts` + `color.css` 미러). disabled-선택 박스 채움에 사용.
- 전용 토큰 부재로 리터럴 유지: 박스 테두리 1px, 포커스 링 2px/offset 2px, 트랜지션 150ms (Chip과 동일 관례). 추후 borderWidth/motion/control-size 토큰 도입 시 치환 대상.

### 안티패턴 회피
- checked 내부 useState 이중관리 금지 → native input 위임.
- 색상/치수 하드코딩 산재 금지 → `constant.ts` 토큰 맵 단일 출처.
- div+onClick 커스텀 체크박스 금지 → native input 기반(a11y).

## Select (Figma node 3847-4034, 3847-4070, 3850-11022) — 2026-11-09

### 요구사항
- Figma Select(Type Single/Multiple × State Default/Active/Filled)와 Select / Menu(Type Icon/Text/UserList/Checkbox × State Default/Hover)를 구현한다.
- v1(`SelectV2`)의 불편(비제어 전용, `Option` 객체 값, 타입 캐스팅)을 해소한다.
- 사용처 조사: sopt-makers-frontend, sopt-operation-frontend에서 `SelectV2` 18곳(16파일).

### 결정

1. **인터페이스: 컴파운드** (`Select` / `Select.Trigger` / `Select.Menu` / `Select.Item`)
   - Tabs(PR #106)에서 팀이 정한 원칙("당장 비용보다 확장·교체 비용을 우선, 사용처 복잡도는 AI·문서·마이그레이션 툴로 상쇄")을 따른다.
   - Select만 원칙을 벗어날 근거가 없고, 확장 근거는 Tabs보다 크다: Figma에서 Menu가 별도 컴포넌트, 커스텀 트리거, 이후 Group/Separator 등.
   - options 배열은 확장 시 render prop이 계속 늘어난다(Ant Design의 `optionRender`/`dropdownRender`/`labelRender`).
   - v1의 `Trigger` + `TriggerContent`(18/18 함께 사용)는 `Select.Trigger` 하나로 합친다. children 없이 쓰면 Figma 트리거, `asChild`면 사용처 요소가 트리거가 된다(Tabs.Trigger·Chip과 같은 Slot 방식, 버튼 중첩 방지).
   - 컴파운드의 고유 비용인 "닫힌 메뉴의 label 표시"는 Item이 마운트 시 label을 Root에 등록해 해결한다. 이를 위해 Menu는 닫혀도 DOM에 남고 `hidden`만 토글한다.

2. **값: 제어 + 비제어, `string`만**
   - `value`/`defaultValue`/`onValueChange` (RadioGroup·Tabs 컨벤션). v1의 `key` 리마운트 우회 7곳이 이 부재 때문이었다.
   - 단일은 `string | null`(`null` = 선택 없음; 사용처가 `''`를 "전체" 값으로 쓰므로 빈 문자열을 센티널로 쓰지 않는다), 다중은 `string[]`.
   - `number`는 받지 않는다. Radix·Mantine·Chakra·Seed와 같은 선택이며, `1`과 `"1"`이 섞여(URL 쿼리 vs API id) `===` 비교가 조용히 실패하는 버그를 원천 차단한다. number id 사용처(2곳)는 `String()` 변환.
   - 표시 데이터(label/description/icon/profileUrl)는 Item props로 받는다. value는 식별자만.

3. **type: 루트에서 메뉴 단위로 지정** (`'icon' | 'text' | 'userList' | 'checkbox'`)
   - Figma가 Type을 메뉴 단위로 정의하고 타입마다 padding/gap이 다르다. v1도 루트 `type`.
   - v1의 `textDesc`/`userListDesc`는 제거: v2 Figma에서 description은 아이템별 on/off.
   - 다중 선택 가능 여부는 Figma 노트를 따른다: icon·userList는 단일만, checkbox는 다중만, text는 둘 다(체크 표시). 잘못된 조합은 타입 에러.
   - text 타입은 선택된 항목에 체크 표시를 한다(Figma "선택적으로 사용"; 다중 text에서는 유일한 선택 표시이고, 단일에서도 다시 열었을 때 선택 항목을 알 수 있다).

4. **메뉴 위치: floating-ui (`@floating-ui/react-dom`), `strategy: 'fixed'`, portal 없음**
   - absolute는 탈락: 사용처(operation 알림 모달 `overflow-y: auto`) 안에서 잘린다.
   - body portal(v1)은 탈락: 레포 Dialog는 native `showModal()`이라 바깥이 inert → 메뉴가 다이얼로그 뒤에 깔린다.
   - 위로 뒤집기가 필요하다: v1이 자동으로 뒤집었으므로 빼면 긴 폼·모달 하단에서 회귀.
   - 뒤집기 + 스크롤/리사이즈 추적을 직접 구현하는 대신 업계 표준(Radix·Base UI·Mantine·Ark·Seed 모두 floating-ui)을 쓴다. 의존성 1개(수 KB, 위치 계산 전용)로, 이후 떠 있는 UI(드롭다운·툴팁)에서 재사용한다.
   - 메뉴 폭은 트리거 폭 이상(`size` 미들웨어).
   - **열리면 Popover API(`popover="manual"`)로 top layer에 올린다.** fixed만으로는 조상에 `transform`이 있으면(Storybook 문서 페이지 등) 그 영역에 갇혀 잘린다. top layer는 조상의 `overflow`·`transform`·`z-index`를 무시하고, DOM 위치는 그대로라 native Dialog 안에서도 inert가 되지 않는다. floating-ui 1.8은 top layer 위치 계산을 지원한다. 미지원 브라우저는 기존 fixed 방식으로 동작한다.
   - top layer에서는 `strategy: 'absolute'`를 쓴다. 문서 기준이라 페이지 스크롤에 브라우저가 직접 같이 움직여, fixed에서 생기던 스크롤 흔들림(JS 위치 갱신이 한 프레임 늦음)이 없다. 페이지 안의 스크롤 박스에서는 여전히 한 프레임 늦게 따라간다(Radix·MUI는 열려 있는 동안 스크롤을 막아 피함).

5. **다중 선택 트리거 문구** — 기본은 첫 선택 label + 2개 이상이면 개수 tag. `Select.Trigger`의 `label`은 **2개 이상일 때만** 고정 문구 + 개수로 바뀌고, 1개면 그 항목 이름을 보여준다. v1은 1개여도 고정 문구라, crew 필터 2곳이 "1개면 항목 이름"으로 바꾸는 우회 코드를 직접 짜고 있었다(Figma는 2개 선택 시안만 있음).

6. **UserList 아바타: v1 그대로 `profileUrl` 문자열** — 렌더는 레포 `Avatar`(32, subtle, fallback)로 Figma에 맞춘다.

7. **너비: 루트 100%** (`min-width` 100) — TextField/TextArea/SearchField와 일관. 사용처 8곳+가 너비를 덮어쓰고 있었다. Figma 160은 시안 샘플 값.

8. **스크롤: `Select.Menu`의 `maxHeight`** — v1 `visibleOptions`의 하드코딩 높이 계산(42/62/48) 제거. Figma "Scroll 발생 조건은 각 팀 디자이너가 설정".

9. **접근성/키보드**: 트리거 `role="combobox"`(포커스는 트리거에 유지, `aria-activedescendant`), 메뉴 `listbox`/`option`(`aria-selected`). ↑↓·Home/End·Enter/Space·Esc·Tab, 바깥 클릭으로 닫기. 단일은 선택 시 닫히고 재클릭해도 해제되지 않음, 다중은 열린 채 토글.
   - checkbox 타입의 체크박스는 시각용(`aria-hidden`, `tabIndex=-1`)으로만 쓴다. v1은 버튼 안에 실제 체크박스를 넣어 인터랙티브 중첩 + `stopPropagation` 우회가 있었다.

10. **SSR 첫 화면 label: 알려진 한계로 둔다**
   - 트리거 label은 Item이 layout effect로 등록한 값이라, 서버 렌더링에서 초기값이 있으면 첫 화면 트리거가 비어 있다가 hydration 후 채워진다. 서버와 hydration 첫 렌더가 모두 빈칸이라 hydration 불일치는 없다.
   - v1은 `defaultValue`에 label이 든 Option 객체를 받아 이 문제가 없었다.
   - 현재 사용처 영향 0곳: 세 레포에서 서버 데이터 페이지(`getServerSideProps`/`getStaticProps`/`getInitialProps`)는 `playground/pages/makers` 하나이고 Select가 없다. 나머지는 값이 hydration 이후에 들어온다.
   - 라이브러리 비교(소스 확인): Seed는 우리와 같은 등록 구조로 같은 한계를 둠(`useSelectOptions.ts` 주석). Radix도 서버에서 빈칸이고 `Select.Value` children을 탈출구로 둠. Base UI는 선택 사항 `items` prop으로 해결.
   - 필요해지면 Base UI처럼 Root에 선택 사항 `items`(value·label 배열)를 추가한다. 추가해도 기존 사용처는 바뀌지 않는다.

### 범위 밖 (컴파운드라 이후 파트 추가로 확장)
- Figma에 없는 상태: disabled, label/error.
- `open` 제어 prop, 폼 `name`(hidden input), 타입어헤드, Group/Separator, Menu 단독 드롭다운, @멘션, 모바일 바텀시트.

### 토큰 매핑
- 트리거: 배경 `bg.neutral.ghost`, radius `r10`, padding `s12`/`s16`, 텍스트 label2 `fg.neutral.bold`, placeholder `fg.neutral.subtle`, Active 테두리 1px `stroke.neutral.inverse`(Figma 안쪽 stroke와 같게 inset box-shadow로 그려 높이를 바꾸지 않음), 높이 46 고정(다중 선택 개수 tag가 있어도 유지), chevron 20 + 간격 `s12`.
- 개수 tag: `bg.secondary.subtle` / `fg.secondary.default`, label4, padding `s4`/`s8`, radius `r4`.
- 메뉴: 배경 `bg.neutral.ghost`, padding `s8`, radius `r12`, 아이템 간격 `s4`(icon·checkbox만), 트리거와 간격 10px.
- 아이템: radius `r8`, py `s8`, hover/키보드 활성 `bg.neutral.ghostHover`, label label2 `fg.neutral.bold`, description label3 `fg.neutral.subtle`, 체크 20 `fg.secondary.default`.
  - icon: pl `s10` pr `s12` gap `s8`, 아이콘 16 / text: pl `s12` pr `s8` gap `s10` / userList: pl `s8` pr `s12` gap `s12`, Avatar 32 / checkbox: pl `s8` pr `s12` gap `s8`, Checkbox large.
- 리터럴: 테두리 1px, 포커스 링 2px/offset 2px(Checkbox 관례), 메뉴 offset 10px, min-width 100(트리거)/125(checkbox 메뉴).
