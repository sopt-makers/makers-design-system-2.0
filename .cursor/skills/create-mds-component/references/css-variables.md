# CSS 변수 패턴 (vanilla-extract)

이 디자인 시스템의 모든 컴포넌트는 조정 가능한 스타일 속성을 `--mds-<component>-<property>` 형태의 CSS 변수로 노출합니다. 목적은 두 가지입니다.

1. **오버라이드 자유성** — 사용처에서 `style={{ "--mds-badge-background-color": ... }}`로 커스터마이즈 가능.
2. **일관성** — variant(size/state)별 값을 토큰 맵에서 이 변수들에 매핑하므로 스타일 정의가 한 곳으로 모임.

정본 예시는 `packages/ui/src/components/Chip/Chip.css.ts`와 `Toggle/Toggle.css.ts`입니다. 새 컴포넌트는 아래 구조를 그대로 따릅니다.

## 구조 (순서대로)

### 1. 변수명 문자열 상수

`--mds-<component>-` 접두사를 붙입니다.

```ts
const BADGE_BACKGROUND_COLOR_VARIABLE = "--mds-badge-background-color";
const BADGE_COLOR_VARIABLE = "--mds-badge-color";
const BADGE_HEIGHT_VARIABLE = "--mds-badge-height";
```

### 2. 변수명 유니온 타입

```ts
type BadgeCssVariableName =
  | typeof BADGE_BACKGROUND_COLOR_VARIABLE
  | typeof BADGE_COLOR_VARIABLE
  | typeof BADGE_HEIGHT_VARIABLE;
```

### 3. `create<Name>Var` 추상화

`createGlobalVar`(vanilla-extract)를 감싸 고정된 변수명을 그대로 사용합니다. `name.slice(2)`는 앞의 `--`를 제거하기 위한 것입니다.

```ts
type BadgeCssVar<Name extends BadgeCssVariableName> = `var(${Name})`;

function createBadgeVar<Name extends BadgeCssVariableName>(
  name: Name,
): BadgeCssVar<Name> {
  return createGlobalVar(name.slice(2)) as BadgeCssVar<Name>;
}
```

### 4. `<name>Vars` 객체

의미 있는 키로 변수를 묶어 export 합니다.

```ts
export const badgeVars = {
  backgroundColor: createBadgeVar(BADGE_BACKGROUND_COLOR_VARIABLE),
  color: createBadgeVar(BADGE_COLOR_VARIABLE),
  height: createBadgeVar(BADGE_HEIGHT_VARIABLE),
} as const;
```

### 5. variant → 변수 매핑

variant를 size 계열(치수/타이포)과 state 계열(색)로 나누고, 각 변수 그룹의 유니온 타입을 만든 뒤 `constant.ts` 토큰을 `{ vars: {...} }` 형태로 매핑합니다.

```ts
type BadgeStateVar = typeof badgeVars.backgroundColor | typeof badgeVars.color;
type BadgeSizeVar = typeof badgeVars.height;

const badgeStateStyles: Record<BadgeState, { vars: Record<BadgeStateVar, string> }> = {
  default: {
    vars: {
      [badgeVars.backgroundColor]: BADGE_STATE_TOKENS.default.backgroundColor,
      [badgeVars.color]: BADGE_STATE_TOKENS.default.color,
    },
  },
  // ...나머지 state
};

const badgeSizeStyles: Record<BadgeSize, { vars: Record<BadgeSizeVar, string> }> = {
  small: { vars: { [badgeVars.height]: BADGE_SIZE_TOKENS.small.height } },
  // ...나머지 size
};
```

### 6. `base` 스타일 + `styleVariants`

`base`에는 기본값 variant의 `vars`를 깔고, 실제 CSS 속성은 변수를 참조합니다. variant는 `styleVariants`로 노출해 컴포넌트에서 `clsx`로 합칩니다.

```ts
export const base = style({
  vars: {
    [badgeVars.backgroundColor]: BADGE_STATE_TOKENS.default.backgroundColor,
    [badgeVars.color]: BADGE_STATE_TOKENS.default.color,
    [badgeVars.height]: BADGE_SIZE_TOKENS.small.height,
  },
  height: badgeVars.height,
  backgroundColor: badgeVars.backgroundColor,
  color: badgeVars.color,
  // ...레이아웃/트랜지션 등
});

export const sizeVariants = styleVariants(badgeSizeStyles);
export const stateVariants = styleVariants(badgeStateStyles);
```

## 상태 우선순위

상태를 CSS 선택자로 구동할 때는 우선순위를 주석으로 명시하고 selector 특이도로 표현합니다 (Chip 참고).

```ts
selectors: {
  /**
   * state priority
   * - disabled > hover > selected > default
   */
  "&:not(:disabled):hover": stateStyles.hover,
  "&:disabled, &[aria-disabled='true']": { ...stateStyles.disabled, cursor: "not-allowed" },
},
```

## 토큰 소스

`constant.ts`의 값은 가능한 한 `@sopt-mds/design-tokens`의 `colors`/`spacing`/`typography`/`radius`에서 가져옵니다. 전용 토큰이 없어 리터럴이 불가피하면(예: `borderWidth: "1px"`, 포커스 링 `2px`) 그 이유를 주석으로 남기고 상수로 분리합니다.
