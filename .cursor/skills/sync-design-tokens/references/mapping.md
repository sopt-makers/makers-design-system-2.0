# Design Token Mapping (Figma → update-spec)

에이전트가 `token.json`을 `.sync-design-tokens/update-spec.json`으로 옮길 때 사용한다.  
스크립트는 update-spec만 받으며 Figma 스키마를 모른다.

## Figma → spec 키

| Figma | update-spec |
|---|---|
| `base.color.base.{family}.{scale}` | `baseColor[family][scale]` |
| `semantic.color.{group}.{category}.{name}` | `semanticColor[group][category][camelCase(name)]` |
| `base.spacing.base.size.{sN}` | `spacing[sN]` |
| `base.typography.base.weight.*` | `typographyBase.weight` |
| `base.typography.base.size.{N\|tN}` | `typographyBase.size.tN` |
| `base.typography.base.lineHeight.*` | `typographyBase.lineHeight.tN` |
| `base.typography.base.letterSpacing.*` | `typographyBase.letterSpacing` (`em`) |
| `semantic.typography.{cat}["typography.{cat}.{N}"]` | `semanticTypography[{cat}{N}]` |
| `base.radius.base.{key}` | `radius[key]` |

`base.typography.base.font` 등은 design-tokens에 매핑하지 않으면 **spec에서 생략**.

## Alias

| Figma | update-spec 값 |
|---|---|
| `{color.base.gray.10}` / `{color.base.gray10}` | `{ "kind": "baseColor", "key": "gray10" }` |
| `#RRGGBB` / `rgba(...)` | 문자열 그대로 |
| `typography.base.weight.bold` | `{ "kind": "typographyBase", "group": "weight", "key": "bold" }` |
| `typography.base.size.t32` | `{ "kind": "typographyBase", "group": "size", "key": "t32" }` |
| `-2%` letterSpacing | `"-0.02em"` |

해석 불능 alias는 중단하고 사용자에게 보고한다.

## 정렬

1. payload 등장 순서 (spec 키 순서에 반영)
2. 번호 키: 숫자 오름차순 우선
3. `baseColor` family: 알파벳 오름차순 (스크립트도 재정렬)

semantic typography: category는 payload 순, 내부 N 오름차순.  
스타일 필드 고정: `fontWeight`, `fontSize`, `lineHeight`, `letterSpacing`.

## SSOT

- Figma에 없는 키 → spec 미포함 → 파일에서 삭제
- Figma에 없는 섹션 → spec 키 생략 → 파일 유지

## 전수 검토 포인트

1. Figma leaf 수 ≈ spec leaf 수 (섹션별)
2. spec leaf 수 ≈ TS export 키 수
3. 참조 표기 `baseColor.*` / `typographyWeight.*` 등
4. `%`가 출력에 남아 있지 않은지
