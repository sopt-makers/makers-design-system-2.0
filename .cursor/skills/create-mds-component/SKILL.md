---
name: create-mds-component
description: >-
  Create a new @sopt-mds/ui component following this design system's
  conventions. Use when the user asks to create, add, or scaffold a new UI
  component in packages/ui.
---

# Create MDS Component

이 스킬은 `@sopt-mds/ui`에 새 컴포넌트를 추가할 때 디자인 시스템이 강제하는 구조·패턴을 지키도록 안내합니다. 목표는 사용자가 전달한 요구사항(크기/상태/props 등)을 이 레포의 관례에 맞게 구현하는 것입니다.

## When to Use

- 사용자가 `@sopt-mds/ui`(`packages/ui`)에 새 컴포넌트를 만들거나 추가·스캐폴딩해 달라고 할 때.
- 예시 발화: "Badge 컴포넌트 만들어줘", "add a Tooltip component", "새 컴포넌트 추가".
- 기존 컴포넌트의 단순 수정·버그 픽스에는 사용하지 않습니다 (신규 컴포넌트 생성 전용).

## 레퍼런스

가장 정확한 레퍼런스는 실제 코드입니다. 작업 전 다음 두 파일을 열어 패턴을 확인하세요. 새 컴포넌트는 이 둘을 그대로 따릅니다.

- `packages/ui/src/components/Chip/` — 버튼/토글 성격, state + size variant
- `packages/ui/src/components/Toggle/` — native input 기반, size variant

## 시작 시 반드시 물어볼 것

스킬이 트리거되면 코드를 쓰기 전에 `AskQuestion` 툴로 **"이 컴포넌트는 무엇인가요?"**를 물어보세요. 답변은 스토리의 `COMPONENT_DESCRIPTION`(한국어 설명)에 그대로 반영됩니다. 이미 사용자가 대화에서 컴포넌트 설명을 충분히 준 경우엔 그 문장을 확인만 받고 진행해도 됩니다.

질문을 제공할 때는 이 답변이 **스토리 문서(Storybook)의 컴포넌트 설명에 그대로 반영된다**는 점을 프롬프트에 함께 안내하세요. 사용자가 설명의 용도와 톤(문서에 노출되는 한국어 설명)을 알고 답하도록 하기 위함입니다. 예: "이 컴포넌트는 무엇인가요? (입력하신 설명은 Storybook 스토리의 컴포넌트 설명란에 그대로 표시됩니다.)"

컴포넌트 이름(PascalCase)이 불명확하면 함께 확인하세요.

## prop 단계별 인터뷰 (핵심)

파일을 만들기 전에, 컴포넌트의 prop을 **한 번에 하나씩** 사용자에게 질의하며 그 prop이 어떤 스타일 분기를 만드는지 파악합니다. 목적은 사용자의 설명을 그대로 CSS variant로 산출하는 것입니다.

각 prop마다 다음을 확인하세요.

1. **prop 이름과 타입** — 리터럴 유니온인지, boolean인지, 스타일과 무관한 값인지.
2. **스타일 분기 여부** — 이 prop의 값에 따라 달라지는 CSS가 있는지.
3. **값별 스타일** — 있다면 각 값이 어떤 속성(배경/색/테두리/치수 등)을 갖는지.

한 prop 확인이 끝나면 다음 prop으로 넘어가고, 사용자가 "끝"이라고 하거나 더 없을 때까지 반복합니다.

**예시**

> - prop: `variant`, 타입: `"active" | "filled" | "default"`
> - `active`: 배경 `secondary.default`, 글자 `neutral.bold`
> - `filled`: 배경 `neutral.subtle`, 글자 `neutral.bold`
> - `default`: 배경 `neutral.ghost`, 테두리 1px `neutral.subtle`, 글자 `neutral.subtle`

이 답변을 받으면 곧바로 산출합니다.

- `types.ts`: `export type BadgeVariant = "active" | "filled" | "default";`
- `constant.ts`: `BADGE_VARIANT_TOKENS: Record<BadgeVariant, ...>` 토큰 맵
- `<Name>.css.ts`: `variant`가 스타일을 분기하므로 값별 `{ vars: {...} }`를 만들고 `styleVariants`로 노출 ([references/css-variables.md](references/css-variables.md) 참고)

스타일 분기가 없는 prop(예: `onClick`, `children`, `id`)은 CSS variant를 만들지 않고 인터페이스에만 JSDoc과 함께 둡니다. 어떤 속성이 값에 따라 달라지는지가 곧 `--mds-*` CSS 변수 목록이 되므로, 인터뷰 결과에서 변수 목록을 도출하세요.

## 워크플로우

```
- [ ] 1. 컴포넌트 설명을 AskQuestion으로 확보 (스토리 description용)
- [ ] 2. prop을 한 step씩 인터뷰하여 각 prop의 스타일 분기·값별 스타일 확정
- [ ] 3. 인터뷰 결과로 variant 타입·토큰 맵·CSS 변수 목록 산출
- [ ] 4. 6개 파일 생성 (types → constant → css → tsx → stories → index 순 권장)
- [ ] 5. components 배럴 export + Introduction.mdx 링크 추가
- [ ] 6. 검증 (typecheck / build)
```

디렉터리: `packages/ui/src/components/<Name>/`

| 파일 | 역할 |
|------|------|
| `types.ts` | `Size` 등에서 파생한 variant 유니온 타입 정의 |
| `constant.ts` | size/state별 디자인 토큰 맵 (`@sopt-mds/design-tokens` 사용, 하드코딩 지양) |
| `<Name>.css.ts` | vanilla-extract 스타일 + `--mds-*` CSS 변수 |
| `<Name>.tsx` | `forwardRef` 컴포넌트, prop마다 JSDoc |
| `<Name>.stories.tsx` | `COMPONENT_DESCRIPTION` + autodocs |
| `index.ts` | `export * from "./<Name>"; export type * from "./types";` |

> 확장자는 반드시 `<Name>.stories.tsx`입니다 (JSX 사용). `.stories.ts`가 아닙니다.

## 핵심 규칙

### 1. CSS 변수 (오버라이드 가능)

사용처에서 스타일을 오버라이드할 수 있도록 컴포넌트의 조정 가능한 속성을 `--mds-<component>-<property>` CSS 변수로 노출합니다. variant(size/state)별 값은 이 변수들에 토큰을 매핑해 지정합니다.

패턴이 정교하므로 **전체 템플릿과 규칙은 [references/css-variables.md](references/css-variables.md)를 반드시 읽고** 따르세요. 요약하면: 변수명 문자열 상수 → 유니온 타입 → `createGlobalVar`를 감싼 `create<Name>Var` → `<name>Vars` 객체 → `constant.ts` 토큰을 `{ vars: {...} }`로 매핑 → `styleVariants`로 노출.

요구사항에서 "무엇이 크기/상태에 따라 달라지는가", "사용처가 무엇을 커스터마이즈할 수 있어야 하는가"를 뽑아내 변수 목록을 정하세요.

### 2. 컴포넌트 인터페이스 (JSDoc 필수)

`react-docgen-typescript`가 각 prop의 JSDoc을 Storybook 문서 설명으로 변환합니다. 따라서 **모든 public prop에 의미를 설명하는 JSDoc 주석**을 답니다.

```tsx
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Badge의 크기를 결정합니다. */
  size?: BadgeSize;
  /** Badge의 왼쪽에 들어갈 아이콘 요소입니다. */
  leftAddon?: React.ReactElement;
}
```

`React.forwardRef`로 구현하고 `displayName`을 설정합니다. `className`/`style`은 외부에서 병합 가능하도록 두고, `clsx(base, sizeVariants[size], className)` 형태로 결합합니다.

### 3. 스토리

상단에 `COMPONENT_DESCRIPTION` 상수(사용자 답변)를 두고 `parameters.docs.description.component`에 연결합니다. `tags: ["autodocs"]`를 포함합니다.

```tsx
const COMPONENT_DESCRIPTION = `
  \`Badge\`는 ... 컴포넌트입니다.
`;

const meta: Meta<typeof Badge> = {
  title: "Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: COMPONENT_DESCRIPTION } },
  },
};
```

기본 스토리의 `name`은 컴포넌트 표시명(예: `"Badge"`)으로 지정합니다 (Chip 참고).

### 4. 배선 (barrel + Introduction)

컴포넌트 완성 후 두 곳을 갱신합니다.

- `packages/ui/src/components/index.ts` 에 알파벳 순서로 `export * from "./<Name>";` 추가. (이 배럴이 `packages/ui/src/index.ts`를 통해 재노출됩니다.)
- `apps/storybook/stories/Introduction.mdx` 의 `## 컴포넌트 목록` 아래에 링크 추가:

```
[<Name>](?path=/docs/components-<slug>--소개)
```

`<slug>`는 컴포넌트명 소문자입니다 (예: `Badge` → `badge`).

### 5. 검증

생성 후 해당 패키지를 검증합니다.

```bash
pnpm --filter @sopt-mds/ui typecheck
pnpm --filter @sopt-mds/ui build
```

## 안티패턴 회피

- 색상/치수 하드코딩 산재 금지 → `constant.ts` 토큰 맵을 단일 출처로 사용.
- `state` prop 이중관리 대신 가능한 경우 native pseudo-class(`:checked`/`:disabled`/`:focus-visible`)와 인접 형제/`:has()` 선택자로 상태를 구동 (Chip/Toggle 관례).
- native 요소로 해결되는 상호작용(체크/버튼 등)을 `div + onClick`으로 대체 금지 (접근성).
- prop JSDoc 누락 금지 → autodocs 품질과 직결.
