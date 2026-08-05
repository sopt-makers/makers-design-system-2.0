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
